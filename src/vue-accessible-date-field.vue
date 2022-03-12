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
            <table class="datepicker-grid" role="grid" aria-labelledby="datepickerHeader">
                <thead>
                  <tr>
                    <th scope="col" v-for="day in dayNamesShort" :key="day" abbr=""> {{ day }} </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td v-for="(day, index) in daysOfCurrentMonth" :key="day" :class="{'last-in-row': (index + 1) % 7 == 0}" tabindex="-1" class="datepicker-day">
                     {{ index + 1 }}
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
  month: number | null;
  previousMonth: number | null;
  currentMonth: number | null;
  nextMonth: number | null;
  year: number | null;
  daysOfMonth: number[];
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
      month: null,
      year: null, 
      daysOfMonth: [],
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

      if (this.month == null) {
        this.month = this.getDateNow().getMonth();
      }   
      var monthIndex: number = this.month;
      var monthString = this.months[monthIndex].name;
      return monthString + ' ' + this.year;
    },
    daysOfCurrentMonth(): number[] | undefined {
      var daysInMonth = null;
      if (this.month !== null) {
        daysInMonth = this.months[this.month]?.numberOfDays;
      }
      if (daysInMonth != null) {
        return this.daysInMonthArray(daysInMonth);
      }      
    },
    isDayDisabled(): boolean {
      return false
    }
  },
  methods: {
    getDateNow(): Date {
      return new Date();
    },
    plusOne(p: number | null): number | null {
        return p? p + 1 : null;
    },
    minusOne(p: number | null): number | null {
        return p? p - 1 : null;
    },
    handleBackdropClick(): void {
      this.showCalendar = false;                    
    },
    getMonthStringByIndex(i: number): string {
      return this.months[i].name
    },
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
    goToPreviousMonth(): void {
      if (this.month || this.month == 0) {
        if (this.month == 0) {
          this.month = 11; 
          if (this.year) {
            this.year = this.year - 1;
          }          
        } else {
          this.month = this.month - 1;
        }        
      }
    },
    goToNextMonth(): void {
      if (this.month || this.month == 0) {
        if (this.month == 11) {
          this.month = 9;
          if (this.year) {
            this.year = this.year + 1;
          } 
        } else {
          this.month = this.month + 1;  
        }
      }
    },
    amountOfWeeksInMonth(): number {
      if (this.month == null) {
          this.month = this.getDateNow().getMonth();
      } 

      var daysInMonth = this.months[this.month].numberOfDays;
      var firstWeekday = this.getFirstDayOfMonth();
      var isSunday = this.getFirstDayOfMonth() == 0;
  
      if (daysInMonth == 28 && this.getFirstDayOfMonth() == 1) {
          return 4;
      } else if ((daysInMonth == 31 && (firstWeekday > 5) || isSunday) || (daysInMonth == 30 && (firstWeekday > 6) || isSunday)) {
        return 6;
      } else {
        return 5;
      }
    },
    daysInMonthArray(size: number): number[] {
      var monthArray = [];
      for (var i = 0; i<size; i++) {
        monthArray[i] = i;
      }
      return monthArray;
    },
    getFirstDayOfMonth(): number {
      var date = this.getDateNow();
      if (this.year && this.month) {
          date = new Date(this.year, this.month, 1)
      } 
      return date.getDay();
    },
    isTheLastInRow(index: number): boolean {
      if (index + 1 % 7 == 0) {
        return true;
      } else {
        return false;
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
  }

  .arrow-button {
      background-color: #FFFFFF;
      border: none;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      padding: 10px;
  }

  /* datepicker-grid */
  .datepicker-day {
    height: 40px;
    width: 40px;
    position: relative;
    text-align: center;
    font-size: 0.625rem;
    border: solid;
    border-width: 1px;
  }

  .last-in-row {
    white-space: pre-wrap;
    background-color: black;
  }

  .buttons {
    float: right;
    margin-right: 10px;
  }

  button.choose-selected-date,
  button.close-calendar-modal {
    border: none;
    background-color: #FFFFFF;
    margin-bottom: 6px;
  }

  .backdrop{
        top: 0;
        left: 0;
        position: fixed;
        background: rgba(0,0,0,0.5);
        width: 100%;
        height: 100%;
        /* display: flex;
        z-index: 100;
        top: 0;
        left: 0;
        position: fixed;
        background: rgba(0,0,0,0.5);
        width: 100%;
        height: 100%; */
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
