<template>
    <div class="vue-accessible-date-field">
      <!-- date field -->
      <div class="date-field-section">
        <div class="date-field-inline">
          <input type="text" :id="'dateField-' + uniqueString" 
            name="dateInput" 
            v-model="selectedDateSynced" 
            @change="updateSelectedDate($event)"
            class="date-field"
            :aria-describedby="'dateFieldDescription' + uniqueString" >
            <button type="button" id="calendarIcon" class="icon open-calendar-btn" aria-label="buttonLabel" @click="showCalendar = true">        
            <!-- <img class="open-calendar-icon" alt="calendar icon" :src="calendarIcon" type="image/svg+xml"> -->
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="18pt" height="18pt" viewBox="0 0 815.000000 822.000000"
              preserveAspectRatio="xMidYMid meet">

              <g transform="translate(0.000000,822.000000) scale(0.100000,-0.100000)"
              fill="#242323" stroke="none">
              <path d="M2382 8200 c-18 -11 -41 -34 -52 -52 -19 -31 -20 -51 -20 -380 l0
              -348 -1022 -2 -1023 -3 -56 -26 c-79 -37 -133 -90 -171 -167 l-33 -67 0 -3445
              0 -3445 33 -67 c38 -77 92 -130 171 -167 l56 -26 1766 -3 1767 -2 953 250
              c1139 300 2795 732 3144 821 l250 64 0 3010 0 3010 -33 67 c-38 77 -92 130
              -171 167 l-56 26 -1032 3 -1033 2 0 348 c0 329 -1 349 -20 380 -40 65 -65 72
              -255 72 -190 0 -215 -7 -255 -72 -19 -31 -20 -51 -20 -380 l0 -348 -1205 0
              -1205 0 0 348 c0 329 -1 349 -20 380 -40 65 -65 72 -255 72 -152 0 -173 -2
              -203 -20z m-72 -1672 c0 -375 1 -395 20 -426 40 -65 65 -72 255 -72 190 0 215
              7 255 72 19 31 20 51 20 426 l0 392 1205 0 1205 0 0 -392 c0 -375 1 -395 20
              -426 40 -65 65 -72 255 -72 190 0 215 7 255 72 19 31 20 51 20 426 l0 392 915
              0 915 0 0 -790 0 -790 -3575 0 -3575 0 0 790 0 790 905 0 905 0 0 -392z m5340
              -3180 c0 -848 -4 -1478 -9 -1473 -5 6 -73 107 -151 225 -78 118 -146 219 -150
              223 -4 5 -627 -404 -1384 -907 l-1378 -916 -2039 0 -2039 0 0 2165 0 2165
              3575 0 3575 0 0 -1482z"/>
              <path d="M1336 3914 c-14 -14 -16 -75 -16 -519 0 -444 2 -505 16 -519 14 -14
              79 -16 569 -16 490 0 555 2 569 16 14 14 16 75 16 519 0 444 -2 505 -16 519
              -14 14 -79 16 -569 16 -490 0 -555 -2 -569 -16z"/>
              <path d="M3526 3914 c-14 -14 -16 -75 -16 -519 0 -444 2 -505 16 -519 14 -14
              79 -16 569 -16 490 0 555 2 569 16 14 14 16 75 16 519 0 444 -2 505 -16 519
              -14 14 -79 16 -569 16 -490 0 -555 -2 -569 -16z"/>
              <path d="M5636 3914 c-14 -14 -16 -75 -16 -519 0 -444 2 -505 16 -519 14 -14
              79 -16 569 -16 490 0 555 2 569 16 14 14 16 75 16 519 0 444 -2 505 -16 519
              -14 14 -79 16 -569 16 -490 0 -555 -2 -569 -16z"/>
              <path d="M1336 2374 c-14 -14 -16 -75 -16 -519 0 -444 2 -505 16 -519 14 -14
              79 -16 569 -16 490 0 555 2 569 16 14 14 16 75 16 519 0 444 -2 505 -16 519
              -14 14 -79 16 -569 16 -490 0 -555 -2 -569 -16z"/>
              <path d="M3546 2374 c-14 -14 -16 -75 -16 -519 0 -444 2 -505 16 -519 14 -14
              79 -16 569 -16 490 0 555 2 569 16 14 14 16 75 16 519 0 444 -2 505 -16 519
              -14 14 -79 16 -569 16 -490 0 -555 -2 -569 -16z"/>
              </g>
            </svg>
            <!-- <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="18pt" height="18pt" viewBox="0 0 815.000000 822.000000"
              preserveAspectRatio="xMidYMid meet">

              <g transform="translate(0.000000,822.000000) scale(0.100000,-0.100000)"
              fill="#E8E7E7" stroke="none">
              <path d="M2382 8200 c-18 -11 -41 -34 -52 -52 -19 -31 -20 -51 -20 -380 l0
              -348 -1022 -2 -1023 -3 -56 -26 c-79 -37 -133 -90 -171 -167 l-33 -67 0 -3445
              0 -3445 33 -67 c38 -77 92 -130 171 -167 l56 -26 1766 -3 1767 -2 953 250
              c1139 300 2795 732 3144 821 l250 64 0 3010 0 3010 -33 67 c-38 77 -92 130
              -171 167 l-56 26 -1032 3 -1033 2 0 348 c0 329 -1 349 -20 380 -40 65 -65 72
              -255 72 -190 0 -215 -7 -255 -72 -19 -31 -20 -51 -20 -380 l0 -348 -1205 0
              -1205 0 0 348 c0 329 -1 349 -20 380 -40 65 -65 72 -255 72 -152 0 -173 -2
              -203 -20z m-72 -1672 c0 -375 1 -395 20 -426 40 -65 65 -72 255 -72 190 0 215
              7 255 72 19 31 20 51 20 426 l0 392 1205 0 1205 0 0 -392 c0 -375 1 -395 20
              -426 40 -65 65 -72 255 -72 190 0 215 7 255 72 19 31 20 51 20 426 l0 392 915
              0 915 0 0 -790 0 -790 -3575 0 -3575 0 0 790 0 790 905 0 905 0 0 -392z m5340
              -3180 c0 -848 -4 -1478 -9 -1473 -5 6 -73 107 -151 225 -78 118 -146 219 -150
              223 -4 5 -627 -404 -1384 -907 l-1378 -916 -2039 0 -2039 0 0 2165 0 2165
              3575 0 3575 0 0 -1482z"/>
              <path d="M1336 3914 c-14 -14 -16 -75 -16 -519 0 -444 2 -505 16 -519 14 -14
              79 -16 569 -16 490 0 555 2 569 16 14 14 16 75 16 519 0 444 -2 505 -16 519
              -14 14 -79 16 -569 16 -490 0 -555 -2 -569 -16z"/>
              <path d="M3526 3914 c-14 -14 -16 -75 -16 -519 0 -444 2 -505 16 -519 14 -14
              79 -16 569 -16 490 0 555 2 569 16 14 14 16 75 16 519 0 444 -2 505 -16 519
              -14 14 -79 16 -569 16 -490 0 -555 -2 -569 -16z"/>
              <path d="M5636 3914 c-14 -14 -16 -75 -16 -519 0 -444 2 -505 16 -519 14 -14
              79 -16 569 -16 490 0 555 2 569 16 14 14 16 75 16 519 0 444 -2 505 -16 519
              -14 14 -79 16 -569 16 -490 0 -555 -2 -569 -16z"/>
              <path d="M1336 2374 c-14 -14 -16 -75 -16 -519 0 -444 2 -505 16 -519 14 -14
              79 -16 569 -16 490 0 555 2 569 16 14 14 16 75 16 519 0 444 -2 505 -16 519
              -14 14 -79 16 -569 16 -490 0 -555 -2 -569 -16z"/>
              <path d="M3546 2374 c-14 -14 -16 -75 -16 -519 0 -444 2 -505 16 -519 14 -14
              79 -16 569 -16 490 0 555 2 569 16 14 14 16 75 16 519 0 444 -2 505 -16 519
              -14 14 -79 16 -569 16 -490 0 -555 -2 -569 -16z"/>
              </g>
            </svg> -->
          </button>
        </div>
        <span class="field-description" :id="'dateFieldDescription' + uniqueString">
          (<span class="screen-reader-only">{{ dateFormatString }} </span>{{ dateFormatOptions }}
        </span>
      </div>
      <!-- date picker -->
      <div v-if="showCalendar" class="datepicker-section">
        <div @click="handleBackdropClick" class="backdrop" ref="backdrop"></div> 
        <div class="calendar-modal" role="dialog" aria-modal="true" aria-label="buttonName">    
          <div class="datepicker">
              <div class="datepicker-header-line">
                  <button type="button" class="arrow-button" @click="goToPreviousYear" aria-label="go to previous year">&laquo;</button>
                  <button type="button" class="arrow-button" @click="goToPreviousMonth" aria-label="go to previous month">&lsaquo;</button>
                  <h2 :id="'datepickerHeader-' + uniqueString" class="datepicker-header">{{ pickerHeaderMonthAndYear }}</h2>
                  <button type="button" class="arrow-button" @click="goToNextMonth" aria-label="go to next month">&rsaquo;</button>
                  <button type="button" class="arrow-button" @click="goToNextYear" aria-label="go to next year">&raquo;</button>
              </div>
              <table :id="'datapickerTable-' + uniqueString" class="datepicker-grid" role="grid" :aria-labelledby="'datepickerHeader-' + uniqueString">
                  <thead>
                    <tr>
                      <th scope="col" v-for="day in dayNamesShort" :key="day" abbr=""> {{ day }} </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(week, index) in daysVisibleCurrentMonth" :key="index" class="datepicker-table-row">
                      <td v-for="(dayItem, index) in week" 
                        :key="index" 
                        @click="handleDateClick($event, dayItem)"
                        :tabindex="checkTabindex(dayItem)" 
                        role="gridcell" 
                        :class="['datepicker-day', {'disabled-day': dayItem.previousMonthDay || dayItem.nextMonthDay}]">
                          {{ dayItem.day }}
                      </td>
                    </tr>
                  </tbody>
              </table>
            </div>    
          <div class="buttons">          
            <button class="close-calendar-modal" @click="showCalendar = false">Peruuta</button>
            <button class="choose-selected-date" @click="showCalendar = false">OK</button>          
          </div>
        </div>    
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import calendarIcon from "./assets/calendar-icon-black.svg";

interface DateData {
  showCalendar: boolean;
  locale: string;
  dateFormatString: string;
  dateFormatOptions: string;
  buttonLabel: string;
  dayNames: string[];
  dayNamesShort: string[];
  months: { name: string, numberOfDays: number | undefined }[];
  currentMonth: number;
  year: number;
  selectedDate: string | undefined;
  selectedTdCell: HTMLTableCellElement | undefined;
  uniqueString: string | undefined;
}

interface DayOfMonth {
  day: number,
  month: number,
  year: number,
  previousMonthDay?: boolean,
  nextMonthDay?: boolean
}

export default /*#__PURE__*/defineComponent({
  name: 'VueAccessibleDateField', // vue component name
  data(): DateData {
    return {
      showCalendar: false,
      locale: 'fi-FI',
      dateFormatString: "päivämäärän muoto: ",
      dateFormatOptions: "pp.kk.vvvv, pp/kk/vvvv tai pp-kk-vvvv)",
      buttonLabel: 'Valitse päivämäärä',
      dayNames: ['maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai', 'sunnuntai'],
      dayNamesShort: ['ma', 'ti', 'ke', 'to', 'pe', 'la', 'su'],
      months: [{ name: 'tammikuu', numberOfDays: 31 }, 
        { name: 'helmikuu', numberOfDays: undefined }, 
        { name: 'maaliskuu', numberOfDays: 31 },  
        { name: 'huhtikuu', numberOfDays: 30 },  
        { name: 'toukokuu', numberOfDays: 31 },  
        { name: 'kesäkuu', numberOfDays: 30 },  
        { name: 'heinäkuu', numberOfDays: 31 },  
        { name: 'elokuu', numberOfDays: 31 },  
        { name: 'syyskuu', numberOfDays: 30 },  
        { name: 'lokakuu', numberOfDays: 31 },  
        { name: 'marraskuu', numberOfDays: 30 }, 
        { name: 'joulukuu', numberOfDays: 31 }], 
      currentMonth: new Date().getMonth(),
      year: new Date().getFullYear(),
      selectedDate: undefined,
      selectedTdCell: undefined,
      uniqueString: undefined,
    };
  },
  props: {
    defaultDate: String,
    uniqueName: String,
  },
  mounted(): void {
    // TODO lisää validointi defaultDatelle
    if (this.selectedDate === undefined && this.defaultDate !== null) {           
      this.selectedDate = this.defaultDate;
    }
    // TODO tee uniqueName-stringistä pakollinen prop
    this.uniqueString = this.uniqueName
  },
  computed: {
    buttonLabel(): string {
      if (this.selectedDate !== undefined) {
        return this.buttonLabel + ' ' + this.selectedDate
      }
      return this.buttonLabel
    },
    selectedDateSynced(): string | undefined { 
      console.log("this.selectedDate: ", this.selectedDate)
      this.$emit('update:selectedDate', this.selectedDate)    
      return this.selectedDate
    },    
    pickerHeaderMonthAndYear(): string {
      if (this.checkIfLeapYear(this.year)) {
        this.months[1].numberOfDays = 29;
      } else {
        this.months[1].numberOfDays = 28;
      }

      let monthIndex = this.currentMonth;
      let monthString = this.months[monthIndex].name;
      return monthString + ' ' + this.year;
    },
    daysVisibleCurrentMonth(): DayOfMonth[][] {
      let dayItem: DayOfMonth | undefined = undefined;
      let allDaysVisible: DayOfMonth[]  = [];
      let lastMothIndex = this.previousMonthIndex(this.currentMonth);
      let lastWeekdayPreviousMonth = this.getLastDayOfMonth(lastMothIndex);
      let lastDayPreviousMonth = this.months[lastMothIndex]?.numberOfDays;
      
      // visible last months days
      if (lastDayPreviousMonth && lastWeekdayPreviousMonth && lastWeekdayPreviousMonth !== 0) {                    
        for (let i = lastWeekdayPreviousMonth; i >= 1; i--) { 
          dayItem = { day: lastDayPreviousMonth, month: lastMothIndex, year: this.year, previousMonthDay: true }  
          allDaysVisible.push(dayItem);
          lastDayPreviousMonth = lastDayPreviousMonth - 1;            
          }
          allDaysVisible.reverse();
      }

      // days of current month
      let daysInMonth = this.months[this.currentMonth]!.numberOfDays;                          
      if (daysInMonth != null) {
        for (let i = 1; i <= daysInMonth; i++) {
          dayItem = { day: i, month: this.currentMonth, year: this.year }
          allDaysVisible.push(dayItem);
        }

        // visible next months days
        if ((this.amountOfWeeksInMonth() * 7 - allDaysVisible.length) > 0) {  
          let daysOfNextMonth = this.amountOfWeeksInMonth() * 7 - allDaysVisible.length;
          for (let i = 1; i <= daysOfNextMonth; i++) {
            dayItem = { day: i, month: this.currentMonth + 1, year: this.year, nextMonthDay: true }
            allDaysVisible.push(dayItem);
          }
        }                
      } 
      
      const weeksOfMonth: DayOfMonth[][] = this.sliceMonthToWeeks(allDaysVisible, 7)
      return weeksOfMonth
    },
    isDayDisabled(): boolean {
      return false
    }
  },
  methods: {    
    getDateNow(): Date {
      return new Date();
    },
    updateSelectedDate(event: Event): void {
      const selectedValue = (event.target as HTMLInputElement).value
      // Regex tarkistaa myös karkauvuoden
      const dateRegex = new RegExp('^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[13-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$');
      if (dateRegex.test(selectedValue)) {
        // TODO korjaa siten, että selectedDate on aina muotoa yyyy-mm-dd, mutta käyttäjälle näkyy esim. mm.dd.yyyy
        this.selectedDate = selectedValue
      }      
    },
    handleBackdropClick(): void {       
      this.showCalendar = false;                    
    },
    handleDateClick(event: Event, item: DayOfMonth): void {
      this.selectedTdCell = (event.target as HTMLTableCellElement)
      this.selectedTdCell.ariaSelected = "true"
      let newDate = this.createDate(item)
      this.selectedDate = newDate
      this.showCalendar = false;
      (document.getElementById("calendarIcon") as HTMLButtonElement).focus();                 
    },
    checkTabindex(item: DayOfMonth): number {
      if (this.selectedDate == this.createDate(item)) {
        return 0
      } 
      return -1
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
      if (this.currentMonth == 11) {
        this.currentMonth = 0;
        if (this.year) {
          this.year = this.year + 1;
        } 
      } else {
        this.currentMonth = this.currentMonth + 1;  
      }
    },
    // voisiko tänne pistää parametrina daten?
    getFirstDayOfMonth(index: number): number | undefined {
      let date = null;
      let monthIndex = index;

      if (this.year !== null) {
          date = new Date(this.year, monthIndex, 1)
      } 
      return date?.getDay();
    },
    // voisiko tänne pistää parametrina daten?
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
    amountOfWeeksInMonth(): number {    
       let daysInMonth = this.months[this.currentMonth].numberOfDays;
       let firstWeekday = this.getFirstDayOfMonth(this.currentMonth);
       let isSunday = this.getFirstDayOfMonth(this.currentMonth) == 0;
      
      if (firstWeekday !== null && firstWeekday !== undefined) {
        if (daysInMonth == 28 && this.getFirstDayOfMonth(this.currentMonth) == 1) {
          return 4;
        } else if ((daysInMonth == 31 && (firstWeekday > 5 || isSunday)) || (daysInMonth == 30 && (firstWeekday > 6 || isSunday))) {
          return 6;
        } else {
          return 5;
        }
      }
      return 6;
    },
    sliceMonthToWeeks(dayArray: DayOfMonth[], chunkSize: number): DayOfMonth[][] {
      const res = [];
      for (let i = 0; i < dayArray.length; i += chunkSize) {
          const chunk = dayArray.slice(i, i + chunkSize);
          res.push(chunk);
      }
      return res;
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
    createDate(item: DayOfMonth): string | undefined {
      let dateISOString = null;
      let dayOfMonth = item.day;
      // date in ISO format with time if needed later
      let dateTimeISOString = this.toISOLocal(new Date(item.year, item.month, dayOfMonth));
      dateISOString = dateTimeISOString?.split('T')[0];
      return dateISOString;
    }
  },  
});
</script>

<style scoped>
/* jos tarvitsee luoda esim. paljon z-indexejä, sen voi tehdä css cutom propertisien avulla */
/* :root {} */

  /* datefield */
  
  /* .vue-accessible-date-field {
    text-align: center;
  } */

  /* button::before {
     content: url("./assets/calendar-icon.svg");
  } */

  .date-field-section .date-field {
    max-width: 120px;
    height: 27px;
    padding-left: 5px;
    vertical-align: bottom;
    border-width: 0 0 1px 0;
    border-color: #323a45;        
  }

  .date-field-section .date-field:focus {
    outline: 3px solid #d71ef7;
    outline-offset: -3px;
  }

  .date-field-inline {
    white-space: nowrap;
  }

  .date-field-section .field-description {
    display: block;
    font-size: 0.625rem;
    left: 0;
    top: 3.5em;
  }

  .screen-reader-only {
    top: -2000em;
    left: -3000em;
    border: 0;
    clip: rect(0,0,0,0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  button:focus {
    outline: 3px solid #d71ef7;
    outline-offset: -3px;
  }

  /* datepicker-modal */
  .calendar-modal {
    position: absolute;
    background-color: #FFFFFF;
    border: 1px solid #000000;
    max-width: 450px;
  }

  .open-calendar-btn {
    height: 30px;
    background-color: #FFFFFF;
    padding-bottom: 0px;
    border-width: 0 0 1px 0;
    border-color: #323a45;
  }

  .open-calendar-btn svg {
    margin-top: 1px;
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

/* suurenna */
  .datepicker-day {
    width: 27px;
    color: #000000;
    padding: 5px;
    margin: 2px;
    border-radius: 3px;
  }

  .disabled-day {
    color: #595959;
  }

  .datepicker-day:hover {
    background-color: #E8E7E7;
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
