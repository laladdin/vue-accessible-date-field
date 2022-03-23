<template>
  <div class="vue-accessible-date-field">
    <!-- date field -->
    <div class="date-field-section">
      <input id="dateField" class="date-field" type="text" placeholder="dd.mm.yyyy">
      <button class="icon open-calendar-btn" @click="showCalendar = true">
        <img class="open-calendar-icon" alt="calendar icon" :src="require('@/assets/calendar-icon.svg')">
      </button>
    </div>
    <!-- date picker -->
    <div v-if="showCalendar" class="datepicker-section">
      <div @click="handleBackdropClick" class="backdrop" ref="backdrop"></div> 
      <div class="calendar-modal" role="dialog" aria-modal="true" aria-label="Choose Date">    
        <div class="datepicker">
            <div class="datepicker-header-line">
                <button type="button" class="arrow-button" @click="goToPreviousYear" aria-label="go to previous year">&laquo;</button>
                <button type="button" class="arrow-button" @click="goToPreviousMonth" aria-label="go to previous month">&lsaquo;</button>
                <h2 id="datepickerHeader" class="datepicker-header">{{ pickerHeaderMonthAndYear }}</h2>
                <button type="button" class="arrow-button" @click="goToNextMonth" aria-label="go to next month">&rsaquo;</button>
                <button type="button" class="arrow-button" @click="goToNextYear" aria-label="go to next year">&raquo;</button>
            </div>
            <table id="datapickerTableId" class="datepicker-grid" role="grid" aria-labelledby="datepickerHeader">
                <thead>
                  <tr>
                    <th scope="col" v-for="day in dayNamesShort" :key="day" abbr=""> {{ day }} </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="week in amountOfWeeksInMonth()" :key="week" class="datepicker-table-row">
                    <td v-for="(item, index) in daysVisibleCurrentMonth" :key="index" :data-day="createDate(item.day)" class="datapicker-td"> 
                      <span v-if="indexOfDayInThisWeek(week, index)" 
                        @click="handleDateClick($event, index)" 
                        :tabindex="-1" 
                        role="gridcell"
                        class="datepicker-day" 
                        :class="{'disabled-day': item.disabled}">
                        {{ item.day }}
                      </span>                     
                    </td>
                  </tr>
                </tbody>
            </table>
          </div>    
        <div class="buttons">          
          <button class="close-calendar-modal" @click="showCalendar = false">Cancel</button>
          <button class="choose-selected-date" @click="showCalendar = false">OK</button>          
        </div>
      </div>    
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface DateData {
  showCalendar: boolean;
  locale: string;
  buttonLabel: string;
  dayNames: string[];
  dayNamesShort: string[];
  months: { name: string, numberOfDays: number | null }[];
  previousMonth: number | null;
  currentMonth: number | null;
  nextMonth: number | null;
  year: number | null;  
  daysVisibleThisMonthTest: { day: number | null, disabled: boolean };
  selectedDate: Date | null;
}

export default /*#__PURE__*/defineComponent({
  name: 'VueAccessibleDateField', // vue component name
  data(): DateData {
    return {
      showCalendar: false,
      locale: 'en',
      buttonLabel: 'Choose date',
      dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      months: [{ name: 'January', numberOfDays: 31 }, 
        { name: 'February', numberOfDays: null }, 
        { name: 'March', numberOfDays: 31 },  
        { name: 'April', numberOfDays: 30 },  
        { name: 'May', numberOfDays: 31 },  
        { name: 'June', numberOfDays: 30 },  
        { name: 'July', numberOfDays: 31 },  
        { name: 'August', numberOfDays: 31 },  
        { name: 'September', numberOfDays: 30 },  
        { name: 'October', numberOfDays: 31 },  
        { name: 'November', numberOfDays: 30 }, 
        { name: 'December', numberOfDays: 31 }], 
      previousMonth: null,
      currentMonth: null,
      nextMonth: null,
      year: null,
      daysVisibleThisMonthTest: { day: null, disabled: false },
      selectedDate: null,      
    };
  },
  computed: {
    pickerHeaderMonthAndYear(): string {
      if (this.year == null) {
        this.year = this.getDateNow().getFullYear();     
      }
      if (this.checkIfLeapYear(this.year)) {
        this.months[1].numberOfDays = 29;
      } else {
        this.months[1].numberOfDays = 28;
      }

      if (this.currentMonth == null) {
        this.currentMonth = this.getDateNow().getMonth();
      }   
      let monthIndex = this.currentMonth;
      let monthString = this.months[monthIndex].name;
      return monthString + ' ' + this.year;
    },
    daysVisibleCurrentMonth(): { day: number | null, disabled: boolean }[] | undefined {
      let daysInMonth = null;
      let lastMothIndex = 0;
      let lastWeekdayPreviousMonth = null;
      let lastDayPreviousMonth = null;
      let allDaysVisible: { day: number | null, disabled: boolean }[]  = [];

      if (this.currentMonth !== null) {
        lastMothIndex = this.previousMonthIndex(this.currentMonth);
        lastWeekdayPreviousMonth = this.getLastDayOfMonth(lastMothIndex);
        lastDayPreviousMonth = this.months[lastMothIndex]?.numberOfDays;
        
        if (lastDayPreviousMonth && lastWeekdayPreviousMonth && lastWeekdayPreviousMonth !== 0) {          
          
          for (let i = lastWeekdayPreviousMonth; i >= 1; i--) {      
            allDaysVisible.push({day: lastDayPreviousMonth, disabled: true});
            lastDayPreviousMonth = lastDayPreviousMonth - 1;            
            }
            allDaysVisible.reverse();
        }
        
      }

      if (this.currentMonth !== null && this.months !== null) {
        daysInMonth = this.months[this.currentMonth].numberOfDays;    
                      
        if (daysInMonth != null) {
          for (let i = 1; i <= daysInMonth; i++) {
            allDaysVisible.push({day: i, disabled: false});
          }

          if ((this.amountOfWeeksInMonth() * 7 - allDaysVisible.length) > 0) {  
            let daysOfNextMonth = this.amountOfWeeksInMonth() * 7 - allDaysVisible.length;

            for (let i = 1; i <= daysOfNextMonth; i++) {
              allDaysVisible.push({day: i, disabled: true});
            }
          }                
        } 
      }     
      return allDaysVisible;      
      
    },
    isDayDisabled(): boolean {
      return false
    }
  },
  methods: {
    getDateNow(): Date {
      return new Date();
    },
    handleBackdropClick(): void {
      this.showCalendar = false;                    
    },
    handleDateClick(event: Event, index: number): void {
      let tdCell = (event.target as HTMLTableCellElement);
      tdCell.tabIndex = 0;
      tdCell.ariaSelected = "true";
      //tdCell.role = "gridcell";
      console.log("tdCell", tdCell)                 
      console.log("index", index)                                
      console.log("tagName",(event.target as HTMLTableElement).tagName)                 
    },
    // getMonthStringByIndex(i: number): string {
    //   return this.months[i].name
    // },
    checkIfLeapYear(year: number): boolean {
      return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    },
    goToPreviousYear(): void {
      if (this.year) {
        this.year = this.year - 1;
      }    
    },
    goToNextYear(): void {
      if (this.year) {
        this.year = this.year + 1;
      }    
    },
    previousMonthIndex(currentIndex: number): number {
      let index = currentIndex;

      if (index == 0) {
        return 11;
      } else {
        return index - 1;
      }
    },
    goToPreviousMonth(): void {
      if (this.currentMonth || this.currentMonth == 0) {
        if (this.currentMonth == 0) {
          this.currentMonth = 11; 
          if (this.year) {
            this.year = this.year - 1;
          }          
        } else {
          this.currentMonth = this.currentMonth - 1;
        }        
      }
    },
    goToNextMonth(): void {
      if (this.currentMonth || this.currentMonth == 0) {
        if (this.currentMonth == 11) {
          this.currentMonth = 9;
          if (this.year) {
            this.year = this.year + 1;
          } 
        } else {
          this.currentMonth = this.currentMonth + 1;  
        }
      }
    },
    amountOfWeeksInMonth(): number {
      if (this.currentMonth == null) {
          this.currentMonth = this.getDateNow().getMonth();
      } 

       let daysInMonth = this.months[this.currentMonth].numberOfDays;
       let firstWeekday = this.getFirstDayOfMonth(this.currentMonth);
       let isSunday = this.getFirstDayOfMonth(this.currentMonth) == 0;
      
      if (firstWeekday !== null && firstWeekday !== undefined) {
        if (daysInMonth == 28 && this.getFirstDayOfMonth(this.currentMonth) == 1) {
          return 4;
        } else if ((daysInMonth == 31 && (firstWeekday > 5) || isSunday) || (daysInMonth == 30 && (firstWeekday > 6) || isSunday)) {
          return 6;
        } else {
          return 5;
        }
      }
      return 6;
    },
    getFirstDayOfMonth(index: number): number | undefined {
      let date = null;
      let monthIndex = index;

      if (this.year !== null) {
          date = new Date(this.year, monthIndex, 1)
      } 
      return date?.getDay();
    },
    getLastDayOfMonth(index: number): number | undefined {
      let date = null;
      let monthIndex = index;
      let lastDayNumber = null;

      if (this.year !== null) {
        lastDayNumber = this.months[monthIndex].numberOfDays;
        if (lastDayNumber !== null) {
          date = new Date(this.year, monthIndex, lastDayNumber)
        }        
      } 
      return date?.getDay();
    },
    indexOfDayInThisWeek(week: number, index: number): boolean | undefined {
      const week1 = [0, 1, 2, 3, 4, 5, 6];
      const week2 = [7, 8, 9, 10, 11, 12, 13];
      const week3 = [14, 15, 16, 17, 18, 19, 20];
      const week4 = [21, 22, 23, 24, 25, 26, 27];
      const week5 = [28, 29, 30, 31, 32, 33, 34];
      const week6 = [35, 36, 37, 38, 39, 40, 41];

      switch (week) {
        case 1:              
            return week1.includes(index);
            break;
        case 2:            
            return week2.includes(index);
            break;
        case 3:            
            return week3.includes(index);
            break;
        case 4:
            return week4.includes(index);
            break;
        case 5: 
            return week5.includes(index);
            break;
        case 6: 
            return week6.includes(index);
            break;
        default:
          return false;
          break;
      }
    },
    toISOLocal(date: Date): string | undefined {
      let z = (n: number): string => ('0' + n).slice(-2);
      let zz = (n: number): string => ('00' + n).slice(-3);
      let off = date.getTimezoneOffset();
      let sign = off > 0? '-' : '+';
      off = Math.abs(off);

      return date.getFullYear() + '-'
            + z(date.getMonth()+1) + '-' +
            z(date.getDate()) + 'T' +
            z(date.getHours()) + ':'  + 
            z(date.getMinutes()) + ':' +
            z(date.getSeconds()) + '.' +
            zz(date.getMilliseconds()) +
            sign + z(off/60|0) + ':' + z(off%60); 
    },
    createDate(day: number): string | undefined {
      let dateISOString = null;
      if (this.year && this.currentMonth) {
        let dayOfMonth = day;
        // date in ISO format with time if needed later
        let dateTimeISOString = this.toISOLocal(new Date(this.year, this.currentMonth, dayOfMonth));
        dateISOString = dateTimeISOString?.split('T')[0];

        return dateISOString;

      } else {
        return undefined;
      }      
    },
  },  
});
</script>

<style scoped>
/* jos tarvitsee luoda esim. paljon z-indexejä, sen voi tehdä css cutom propertisien avulla */
/* :root {} */

  /*
  .vue-accessible-date-field p {
  } */

   .date-field-section {
     height: 40px;
  }

  .calendar-modal {
    position: absolute;
    background-color: #FFFFFF;
    color: #04291F;
    border: 1px solid #000000;
    max-width: 450px;
  }

  .date-field {
    height: 100%;
    vertical-align: bottom;
    text-align: center;
    border-width: 0 0 1px 0;
    border-color: #323a45;
  }

  .open-calendar-btn {
    height: 100%;
    background-color: #FFFFFF;
    padding-bottom: 4px;
    border-width: 0 0 1px 0;
    border-color: #323a45;
  }

  .open-calendar-icon {
    height: 85%;
  }

/* datepicker header-line */
  .datepicker-header-line {
    display: inline-flex; 
    width: 100%;    
    min-width: 250px;
  }

  .datepicker-header {
    width: 100%;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  thead > tr th {
    width: 20px;
    height: 35px;
  }

  .arrow-button {
      background-color: #FFFFFF;
      color: #04291F;
      border: none;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-right: 10px;
      padding-left: 10px;
  }

  /* datepicker-grid */
  .datepicker-grid {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-bottom: 15px;
  }

  .datepicker-table-row {
    text-align: center;
  }

  /* .datepicker-grid .datepicker-day {

  } */

/* suurenna */
  .datepicker-day {
    display: inline-table;
    width: 27px;
    background-color: #000000;
    color: #FFFFFF;
    padding: 5px;
    margin: 2px;
    border-radius: 3px;
  }

  td:empty {
    display: none;
  }

  .disabled-day {
    background-color: #595959;
    color: #FFFFFF;
  }

  .datepicker-day:hover {
    background-color: #333333;
  }

  .datepicker-day:not(.disabled-day):hover {
    padding: 3px;
    border: 2px solid #F44A87;
  }

  .datepicker-day:focus {    
    padding: 3px;
    border: 2px solid #3B9EC2;
    outline: 0;
  }

  .datepicker-day[tabindex="0"] {
    background-color: #FFD55F;
    color: #000000;
  }

  .buttons {
    float: right;
    margin-right: 10px;
  }

  button.choose-selected-date,
  button.close-calendar-modal {
    border: none;
    border-radius: 3px;
    background-color: #000000;
    color: #FFFFFF;
    margin-bottom: 6px;
    margin-right: 10px;
    padding: 8px;
  }

  button.choose-selected-date:hover {
    background-color: #333333;
  }

  button.close-calendar-modal:hover {
    background-color: #999999;
  }

  button.close-calendar-modal {
    background-color: #595959;
  }

  .backdrop{
        top: 0;
        left: 0;
        position: fixed;
        background: rgba(0,0,0,0.5);
        width: 100%;
        height: 100%;
    }

  /* XXL */
  /* @media (min-width: 1281px) {
  } */
  
  /* XL */
  @media (min-width: 1025px) and (max-width: 1280px){
      
  }
  
  /* L */
  @media (min-width: 768px) and (max-width: 1024px){
    /* .calendar-modal {
      width: 50%;
    } */
  }

  /* M */
  @media (min-width: 481px) and (max-width: 767px) {
    /* .calendar-modal {
      width: 70%;
    } */
  }
  /* S */
  @media (max-width: 480px) {
    /* .calendar-modal {
      width: 95%;
    } */
  }
</style>
