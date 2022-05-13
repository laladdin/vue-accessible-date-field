<template>
   <div class="vue-accessible-date-field" lang="fi">
      <!-- date field -->
      <div class="date-field-section">
         <div class="date-field-inline">
            <input
               type="text"
               :id="'dateField-' + uniqueString"
               name="dateInput"
               v-model="selectedDate"
               @change="updateSelectedDate($event)"              
               :class="['date-field', { 'error': errors.length > 0 }]"
               :aria-describedby="'dateFieldDescription' + uniqueString"
               :placeholder="placeholderText" />   
                <!-- @blur="changeButtonMessage"                    -->
            <button
               type="button"
               id="calendarIcon"
               class="icon open-calendar-btn"
               :aria-label="buttonLabel"
               @click="handleIconPress($event)"
               @keydown.enter="handleIconPress($event)"
               @keydown.space="handleIconPress($event)">
               <!-- <img class="open-calendar-icon" alt="calendar icon" :src="calendarIcon" type="image/svg+xml"> -->
               <svg
                  aria-hidden="true"
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18pt"
                  height="18pt"
                  viewBox="0 0 815.000000 822.000000"
                  preserveAspectRatio="xMidYMid meet">
                  <g transform="translate(0.000000,822.000000) scale(0.100000,-0.100000)"
                    fill="#000000" stroke="none">
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
            </button>
            <span
                :id="'dateFieldDescription' + uniqueString">
                <span v-if="errors.length === 0" class="screen-reader-only">{{ possibleDateFormats }}</span>  
                <span v-if="errors.length > 0" role="alert">
                    <!-- <h3></h3> -->
                    <ul class="error-list">
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </span>           
            </span>             
         </div>         
      </div>
      <!-- date picker -->
      <div v-if="calendarVisible" class="datepicker-section">
         <div
            @click="handleBackdropClick($event)"
            class="backdrop"
            ref="backdrop">
          </div>
         <div
            class="calendar-modal"
            role="dialog"
            aria-modal="true"
            aria-label="buttonName">
            <div class="datepicker">
               <div class="datepicker-header-line">
                  <button
                     type="button"
                     :id="'previousYear-' + uniqueString"
                     class="arrow-button previous-year-button"
                     @click="riffleYears('backward')"
                     aria-label="go to previous year"
                     @keydown.tab="handlePrevYearTab($event)"
                     @keydown.esc="closeDatePickerModal($event)"
                     @keydown.enter="riffleYears('backward', $event)">
                     &laquo;
                  </button>
                  <button
                     type="button"
                     class="arrow-button previous-month-button"
                     @click="riffleMonths('backward', $event)"
                     aria-label="go to previous month"
                     @keydown.esc="closeDatePickerModal($event)"
                     @keydown.enter="riffleMonths('backward', $event)">
                     &lsaquo;
                  </button>
                  <h2
                     :id="'datepickerHeader-' + uniqueString"
                     class="datepicker-header">
                     <span class="datepicker-header-month">{{ pickerHeaderMonth }}</span> <span class="datepicker-header-year">{{ pickerHeaderYear }}</span>
                  </h2>
                  <button
                     type="button"
                     class="arrow-button"
                     @click="riffleMonths('forward')"
                     aria-label="go to next month"
                     @keydown.esc="closeDatePickerModal($event)"
                     @keydown.enter="riffleMonths('forward', $event)">
                     &rsaquo;
                  </button>
                  <button
                     type="button"
                     class="arrow-button"
                     @click="riffleYears('forward')"
                     aria-label="go to next year"
                     @keydown.esc="closeDatePickerModal($event)"
                     @keydown.enter="riffleYears('forward', $event)">
                     &raquo;
                  </button>
               </div>
               <table
                  :id="'datapickerTable-' + uniqueString"
                  class="datepicker-grid"
                  role="grid"
                  :aria-labelledby="'datepickerHeader-' + uniqueString">
                  <thead>
                     <tr>
                        <th
                           scope="col"
                           v-for="(day, i) in localizationData.dayNamesShort"
                           :key="i"
                           :abbr="localizationData.dayNames[i]">
                           {{ day }}
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr
                        v-for="(week, index) in daysVisibleCurrentMonth"
                        :key="index"
                        class="datepicker-table-row">
                        <td
                           v-for="(dayItem, index) in week"
                           :key="index"
                           @click="handleDatePress($event, dayItem, true)"
                           tabindex="-1"
                           :class="['datepicker-day', { 'selected-date': createDate(dayItem) === selectedISODate }, { 'disabled-day': checkDisabledDay(dayItem) }]"
                           :data-date="createDate(dayItem)"
                           role="gridcell"
                           :aria-selected="checkSelected(dayItem)"
                           @keydown.esc="closeDatePickerModal()"
                           @keydown.space="handleDatePress($event, dayItem, false)"
                           @keydown.enter="handleDatePress($event, dayItem, true)"
                           @keydown.up="goToPreviousWeek(dayItem, $event)"
                           @keydown.down="goToNextWeek(dayItem, $event)"
                           @keydown.right="goToNextDay(dayItem, $event)"
                           @keydown.left="goToPreviousDay(dayItem, $event)"
                           @keydown.home="goToFirstDayOfWeek(dayItem, $event)"
                           @keydown.end="goToLastDayOfWeek(dayItem, $event)"
                           @keydown.page-down="handlePageDown($event, dayItem)"
                           @keydown.page-up="handlePageUp($event, dayItem)"
                        >
                           {{ dayItem.day }}
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div class="buttons">
               <button
                  class="close-calendar-modal"
                  @click="closeDatePickerModal($event)"
                  @keydown.esc="closeDatePickerModal($event)">
                  {{ localizationData.cancelButtonLabel }}
               </button>
               <button
                  :id="'OKButton-' + uniqueString"
                  class="choose-selected-date"
                  @click="handleOKButtonClick($event)"
                  @keydown.esc="closeDatePickerModal($event)"
                  @keydown.tab="handleOKButtonTab($event)">
                  {{ localizationData.selectFocusedButtonLabel }}
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { DayOfMonth } from "@/dayofmonth";
import { Localization } from "@/ilocalization";
import { Months } from "@/imonths";
import { monthsData } from "@/months";
import { localizationDefaultDataFi } from "@/localizationdefaultdatafi";
import { localizationDefaultDataSv } from "@/localizationdefaultdatasv";
import { localizationDefaultDataEn } from "@/localizationdefaultdataen";

import buttonIcon from "./assets/calendar-icon-black.svg";

export default /*#__PURE__*/ defineComponent({
   name: "VueAccessibleDateField",
   props: {
      defaultDate: String,
      uniqueName: String,
      usedLanguage: String,
      dayOfMonth: {
         type: Object as PropType<DayOfMonth>,
      },
      months: {
         type: Object as PropType<Months>,
      },
      monthsData: {
         type: Object as PropType<Months>,
      },
      localizationFi: {
         type: Object as PropType<Localization>,
      },
      localizationSv: {
         type: Object as PropType<Localization>,
      },
      localizationEn: {
         type: Object as PropType<Localization>,
      },
   },
   // setup(props, context) { // lisää context, jotta voit emitoida
   // },
   data() {
      const showCalendar: boolean = false;
      const currentMonth: number = new Date().getMonth();
      const year: number = new Date().getFullYear();
      var selectedISODate: string | undefined;
      var selectedDateString: string | undefined;
      var selectedTdCell: HTMLTableCellElement | undefined;
      var uniqueString: string | undefined;
      var errors: string[] = []
      var selectedDateMessage: string = "";
      var componentLanguage: string | undefined;
      var localizationData: Localization = {
         locale: "",
         placeholderText: "",
         dateFormatString: "",
         wordOrTranslated: "",
         dateFormatOptions: [],
         generalDateFieldError: "",
         buttonLabelChoose: "",
         buttonLabelChange: "",
         dayNames: [],
         monthNames: [],
         monthNamesForMessage: [],
         dayNamesShort: [],
         selectFocusedButtonLabel: "",
         cancelButtonLabel: ""
      };

      return {
         showCalendar,
         monthsData,
         localizationDefaultDataFi,
         localizationDefaultDataSv,
         localizationDefaultDataEn,
         localizationData,
         currentMonth,
         year,
         selectedISODate,
         selectedDateString,
         selectedTdCell,
         uniqueString,
         buttonIcon,
         errors,
         selectedDateMessage,
         componentLanguage
      };
   },
   created(): void {
      // kun lisätään lokalisaatio, asetetaan komponentin kieleksi valittu kieli
      // toistaiseksi käytetään suomea      
      const html = document.documentElement;
      const htmlLang = html.getAttribute("lang");
      if (this.usedLanguage) {
        if (this.usedLanguage === "en" || this.usedLanguage === "en-GB") {
          this.componentLanguage = "en"
        } else if (this.usedLanguage === "sv" || this.usedLanguage === "sv-SE") {
          this.componentLanguage = "sv"
        } else if (this.usedLanguage === "fi" || this.usedLanguage === "fi-FI") {
          this.componentLanguage = "fi"
        }  
      } else if (htmlLang) {
         html.setAttribute("lang", htmlLang);
         this.componentLanguage = htmlLang
      } else {
         html.setAttribute("lang", "fi");
         this.componentLanguage = "fi"
      }
   },
   mounted(): void {     
      // tarkistetaan komponentin kieli ja sen mukaan asetetaan data
      // jos propsina on annettu jollekin kielelle kustomoitua dataa, käytetään sitä
      if (this.componentLanguage === "sv") {
        if (this.localizationSv) {
          this.localizationData = this.localizationSv
        } else {
          this.localizationData = this.localizationDefaultDataSv
        }
      } else if (this.componentLanguage === "en") {
        if (this.localizationEn) {
          this.localizationData = this.localizationEn
        } else {
          this.localizationData = this.localizationDefaultDataEn
        }
      } else {
        if (this.localizationFi) {
          this.localizationData = this.localizationFi
        } else {
          this.localizationData = this.localizationDefaultDataFi
        }
      }

      if (this.selectedISODate === undefined && this.defaultDate) {
         this.selectedISODate = this.defaultDate;
         // käyttäjille ei näytetä päivämäärää standardimuodossa
         this.selectedDateString = this.formatISODate(this.defaultDate, ".");
         // this.setCalendarView(this.selectedISODate)
      } else {
         const dateNow = new Date();
         let today = dateNow.getDate();
         let monthNow = dateNow.getMonth();
         let yearNow = dateNow.getFullYear();
         const thisDaySelected: DayOfMonth = {
            day: today,
            month: monthNow,
            year: yearNow,
         };
         this.selectedISODate = this.createDate(thisDaySelected);
      }
      this.uniqueString = this.uniqueName;
   },
   watch: {
       selectedDateISOFormat(newDateValue: string) {
           this.updateButtonMessage(newDateValue)
           this.$emit("update:selectedISODate", newDateValue)
       }
   },
   computed: {
      selectedDateISOFormat(): string | undefined {
         return this.selectedISODate
      },
      selectedDate(): string | undefined {
         return this.selectedDateString
      },
      buttonLabel(): string {
        if (!this.selectedDateString) {
          return this.localizationData.buttonLabelChoose
        } else {
          return this.selectedDateMessage
        }
      },
      calendarVisible(): boolean {
         return this.showCalendar;
      },
      placeholderText(): string {
         return this.localizationData.placeholderText;
      },
      possibleDateFormats(): string {
          let dateFormats = this.localizationData.dateFormatString
          const length = this.localizationData.dateFormatOptions.length
         
          for (let i = 0; i < length; i++) {
            let delimiter = ", "
            if (i === 0) {
              delimiter = " "
            } else if (i === length - 1) {
              delimiter = " " + this.localizationData.wordOrTranslated + " "
            } 
          dateFormats = dateFormats + delimiter + this.localizationData.dateFormatOptions[i];
         }
         return dateFormats;
      },     
      pickerHeaderMonth(): string {
         if (this.checkIfLeapYear(this.year)) {
            this.monthsData.months[1].numberOfDays = 29;
         } else {
            this.monthsData.months[1].numberOfDays = 28;
         }
         let monthString = this.localizationData.monthNames[this.currentMonth];
         return monthString;
      },
      pickerHeaderYear(): number {
         return this.year;
      },
      daysVisibleCurrentMonth(): DayOfMonth[][] {
         let dayItem: DayOfMonth | undefined = undefined;
         let allDaysVisible: DayOfMonth[] = [];
         let lastMothIndex = this.previousMonthIndex(this.currentMonth);
         let lastWeekdayPreviousMonth =
            this.getLastDayOfPreviousMonth(lastMothIndex);
         let lastDayPreviousMonth =
            this.monthsData.months[lastMothIndex]?.numberOfDays;
         let year = this.year;

         // visible last months days
         if (
            lastDayPreviousMonth &&
            lastWeekdayPreviousMonth &&
            lastWeekdayPreviousMonth !== 0
         ) {
            if (lastMothIndex === 11) {
               year = this.year - 1;
            }
            for (let i = lastWeekdayPreviousMonth; i >= 1; i--) {
               dayItem = {
                  day: lastDayPreviousMonth,
                  month: lastMothIndex,
                  year: year,
                  previousMonthDay: true,
               };
               allDaysVisible.push(dayItem);
               lastDayPreviousMonth = lastDayPreviousMonth - 1;
            }
            allDaysVisible.reverse();
         }

         // days of current month
         let daysInMonth = this.monthsData.months[this.currentMonth]!.numberOfDays;
         if (daysInMonth != null) {
            for (let i = 1; i <= daysInMonth; i++) {
               dayItem = { day: i, month: this.currentMonth, year: this.year };
               allDaysVisible.push(dayItem);
            }

            // visible next months days
            if (this.amountOfWeeksInMonth() * 7 - allDaysVisible.length > 0) {
               let daysOfNextMonth =
                  this.amountOfWeeksInMonth() * 7 - allDaysVisible.length;
               for (let i = 1; i <= daysOfNextMonth; i++) {
                  dayItem = { day: i, month: this.currentMonth + 1, year: this.year, nextMonthDay: true };
                  allDaysVisible.push(dayItem);
               }
            }
         }

         const weeksOfMonth: DayOfMonth[][] = this.sliceMonthToWeeks(allDaysVisible, 7);
         return weeksOfMonth;
      },
   },
   methods: {
      updateButtonMessage(newDateValue: string) {
        const newDate = new Date(newDateValue) 
        let dayName = this.localizationData.dayNames[newDate.getDay()]
        let dayNumber = newDate.getDate()
        let monthName = this.localizationData.monthNamesForMessage[newDate.getMonth()]
        let year = newDate.getFullYear()
        this.selectedDateMessage = this.localizationData.buttonLabelChange + dayName + " " + dayNumber + " " + monthName + " " + year
      },
      checkDisabledDay(dayItem: DayOfMonth): boolean | undefined {
         return dayItem.previousMonthDay || dayItem.nextMonthDay;
      },
      closeDatePickerModal(event?: Event): void {
         this.showCalendar = false;
         if (event) {
            event.stopPropagation();
            event.preventDefault();
         }
         if (this.showCalendar === false) {
            this.year = Number(this.selectedISODate?.split("-")[0]);
            this.currentMonth = Number(this.selectedISODate?.split("-")[1]) - 1;
         }
      },
      changeTabIndex(oldTabIndex: number, newTabIndex: number) {
         const oldFocused = document.querySelector(
            'td[tabindex="' + oldTabIndex + '"]'
         ) as HTMLTableCellElement;
         oldFocused.tabIndex = newTabIndex;
      },
      // setNewTabIndex(dateString: string, newIndex: number) {

      // },
      setFocusToCell(): void {
         const currentSelected = this.selectedISODate;
         const tdElement = document.querySelector(
            "[data-date='" + currentSelected + "']"
         ) as HTMLTableCellElement;
         tdElement.focus();
         tdElement.tabIndex = 0;
      },
      checkSelected(item: DayOfMonth): boolean {
         const dayISOString = this.createDate(item);
         if (dayISOString === this.selectedISODate) {
            return true;
         }
         return false;
      },
      getDateNow(): Date {
         return new Date();
      },
      setCalendarView(dateString: string): void {
         this.year = parseInt(dateString.substring(0, 4));
         this.currentMonth = parseInt(dateString.substring(5, 7)) - 1;
      },
      formatISODate(date: string, delimiter: string): string {
         let dateString = date;
         const splittedDate = dateString.split("-");
         const formatted = splittedDate[2] + delimiter + splittedDate[1] + delimiter + splittedDate[0]
         this.selectedDateString = formatted
         return formatted
      },
      handleDateFormat(inputValue: string): boolean {
         const DateStr = inputValue;
         // Regex tarkistaa muodot dd/mm/yyyy, dd-mm-yyyy ja dd.mm.yyyy, tarkistaa myös karkausvuoden (malli: https://stackoverflow.com/questions/15491894/regex-to-validate-date-formats-dd-mm-yyyy-dd-mm-yyyy-dd-mm-yyyy-dd-mmm-yyyy)
         const dateRegex = new RegExp("^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[13-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$");
         if (dateRegex.test(DateStr)) {
            // käyttäjälle näytetään päivämääräkentästä syötetty muoto
            this.selectedDateString = DateStr
            return true
         } else {
           if (!DateStr) {
             this.errors = []             
           } else {
             const error = this.localizationData.generalDateFieldError
             this.errors.push(error)
           }      
           return false
         }
      },
      updateSelectedDate(event: Event): void {
         const selectedValue = (event.target as HTMLInputElement).value;
         this.selectedDateString = selectedValue
         const validDateValue = this.handleDateFormat(selectedValue);
         if (validDateValue) {
            this.errors = []
             // päivämäärä jaetaan osiin joko väliviivan, pisteen tai kauttamerkin kohdalta
            const splitDateByMark = selectedValue.split(/[-./]+/);
            const ISODateString = splitDateByMark[2] + "-" + splitDateByMark[1] + "-" + splitDateByMark[0];
            this.setCalendarView(ISODateString);
            this.selectedISODate = ISODateString;
         }   
      },
      handleIconPress(event?: Event): void {
        this.errors = []
         this.showCalendar = true;
         this.$nextTick(() => {
            this.setFocusToCell();
         });
         if (event) {
            event.stopPropagation();
            event.preventDefault();
         }
      },
      handleBackdropClick(event: Event): void {
         this.closeDatePickerModal();
         event.stopPropagation();
         event.preventDefault();
      },
      handleDatePress(event: Event, item: DayOfMonth, closeModal: boolean): void {
         event.stopPropagation();
         event.preventDefault();
         this.selectedTdCell = event.target as HTMLTableCellElement;
         this.selectedTdCell.ariaSelected = "true";
         this.selectedTdCell.tabIndex = 0;
         let clickedDate = this.createDate(item);
         this.selectedISODate = clickedDate;
         this.selectedDateString = this.formatISODate(clickedDate, ".");         
         if (closeModal === true) {
            this.closeDatePickerModal();
            const icon = document.getElementById("calendarIcon") as HTMLButtonElement;
            icon.focus();
         }
      },
      handleOKButtonClick(event?: Event): void {
         const focusedDate = document.querySelector('td[tabindex="0"]') as HTMLTableCellElement;
         this.selectedISODate = focusedDate.dataset.date;
         const isoString: string = this.selectedISODate!;
         this.selectedDateString = this.formatISODate(isoString, ".");
         focusedDate.ariaSelected = "true";
         this.closeDatePickerModal();
         if (event) {
            event.stopPropagation();
            event.preventDefault();
         }
      },
      handlePrevYearTab(event: KeyboardEvent): void {
         if (event.shiftKey) {
            const newFocused = document.querySelector("#OKButton-" + this.uniqueString) as HTMLButtonElement;
            newFocused.focus();
            // preventDefault, koska focus muuten siirtyisi automaattisesti seuraavaan painikkeeseen
            event.preventDefault();
         }
      },
      handleOKButtonTab(event: KeyboardEvent): void {
         if (!event.shiftKey) {
            const newFocused = document.querySelector("#previousYear-" + this.uniqueString) as HTMLButtonElement;
            newFocused.focus();
            // preventDefault, koska focus muuten siirtyisi automaattisesti seuraavaan painikkeeseen
            event.preventDefault();
         }
      },
      handlePageDown(event: KeyboardEvent, item: DayOfMonth) {
         event.stopPropagation();
         event.preventDefault();
         this.changeTabIndex(0, -1);
         // tarkistetaan, onko painikkeen kanssa painettu samanaikaisesti Shift-painiketta
         // jos kyllä, siirrytään yksi vuosi eteenpäin
         if (event.shiftKey) {
            this.goToNextYear();
         } else {
            // jos ei, siirrytään yksi kuukausi eteenpäin
            this.goToNextMonth();
         }

         const dateToGoTo = this.createDate({
            day: item.day,
            month: this.currentMonth,
            year: this.year,
         });
         this.$nextTick(() => {
            // tänne tarkistus, että minkään painikkeen tabindex ei tällä hetkellä ole 0
            const newFocused = document.querySelector("[data-date='" + dateToGoTo + "']") as HTMLTableCellElement;
            newFocused.tabIndex = 0;
            newFocused.focus();
         });
      },
      handlePageUp(event: KeyboardEvent, item: DayOfMonth) {
         event.stopPropagation();
         event.preventDefault();
         this.changeTabIndex(0, -1);
         // tarkistetaan, onko painikkeen kanssa painettu samanaikaisesti Shift-painiketta
         // jos kyllä, siirrytään yksi vuosi taaksepäin
         if (event.shiftKey) {
            this.goToPreviousYear();
         } else {
            // jos ei, siirrytään yksi kuukausi taaksepäin
            this.goToPreviousMonth();
         }

         const dateToGoTo = this.createDate({
            day: item.day,
            month: this.currentMonth,
            year: this.year,
         });
         this.$nextTick(() => {
            const newFocused = document.querySelector("[data-date='" + dateToGoTo + "']") as HTMLTableCellElement;
            newFocused.tabIndex = 0;
            newFocused.focus();
         });
      },
      riffleMonths(forwardOrBackward: string, event?: Event): void {
         const focusedDate = document.querySelector('td[tabindex="0"]') as HTMLTableCellElement;
         // ei aseteta focusta kalenteriin, pelkkä tabIndex
         // muutetaan ensin vanha tabindex -1:ksi
         this.changeTabIndex(0, -1);
         // vuosi kasvaa tai vähenee yhdellä
         if (forwardOrBackward === "forward") {
            this.goToNextMonth();
         } else if (forwardOrBackward === "backward") {
            this.goToPreviousMonth();
         }

         const dayNextMonth = Number(focusedDate.dataset.date!.split("-")[2]);
         const dateToGoTo = this.createDate({
            day: dayNextMonth,
            month: this.currentMonth,
            year: this.year,
         });
         this.$nextTick(() => {
            const newFocused = document.querySelector("[data-date='" + dateToGoTo + "']") as HTMLTableCellElement;
            newFocused.tabIndex = 0;
         });

         if (event) {
            event.stopPropagation();
            event.preventDefault();
         }
      },
      riffleYears(forwardOrBackward: string, event?: Event): void {
         const focusedDate = document.querySelector(
            'td[tabindex="0"]'
         ) as HTMLTableCellElement;
         // ei aseteta focusta kalenteriin, pelkkä tabIndex
         // muutetaan ensin vanha tabindex -1:ksi
         this.changeTabIndex(0, -1);
         // vuosi kasvaa tai vähenee yhdellä
         if (forwardOrBackward === "forward") {
            this.goToNextYear();
         } else if (forwardOrBackward === "backward") {
            this.goToPreviousYear();
         }

         const dayNextMonth = Number(focusedDate.dataset.date!.split("-")[2]);
         const dateToGoTo = this.createDate({
            day: dayNextMonth,
            month: this.currentMonth,
            year: this.year,
         });
         this.$nextTick(() => {
            const newFocused = document.querySelector("[data-date='" + dateToGoTo + "']") as HTMLTableCellElement;
            newFocused.tabIndex = 0;
         });

         if (event) {
            event.stopPropagation();
            event.preventDefault();
         }
      },
      checkIfLeapYear(year: number): boolean {
         return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
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
      goToFirstDayOfWeek(item: DayOfMonth, event: Event): void {
         event.stopPropagation();
         event.preventDefault();
         this.changeTabIndex(0, -1);
         var firstDayOfWeek = 0;
         const weekdayCurrent = new Date(item.year, item.month, item.day).getDay();

         const lastMothIndex = this.previousMonthIndex(this.currentMonth);
         let daysInPreviousMonth =
            this.monthsData.months[lastMothIndex].numberOfDays!;
         if (weekdayCurrent === 0) {
            firstDayOfWeek = item.day - 6;
         } else {
            firstDayOfWeek = item.day - (weekdayCurrent - 1);
         }
         if (firstDayOfWeek < 1) {
            firstDayOfWeek = daysInPreviousMonth + firstDayOfWeek;
            this.goToPreviousMonth();
         }
         const previousDayISOString = this.createDate({
            day: firstDayOfWeek,
            month: this.currentMonth,
            year: this.year,
         });
         this.$nextTick(() => {
            const newFocused = document.querySelector("[data-date='" + previousDayISOString + "']") as HTMLTableCellElement;
            newFocused.tabIndex = 0;
            newFocused.focus();
         });
      },
      goToLastDayOfWeek(item: DayOfMonth, event: Event): void {
         event.stopPropagation();
         event.preventDefault();
         this.changeTabIndex(0, -1);
         var lastDayOfWeek = item.day;
         const weekdayCurrent = new Date(item.year, item.month, item.day).getDay();

         let daysInMonth =
            this.monthsData.months[this.currentMonth].numberOfDays!;
         if (weekdayCurrent !== 0) {
            lastDayOfWeek = item.day + (7 - weekdayCurrent);
         }
         if (lastDayOfWeek > daysInMonth) {
            lastDayOfWeek = lastDayOfWeek - daysInMonth;
            this.goToNextMonth();
         }
         const previousDayISOString = this.createDate({
            day: lastDayOfWeek,
            month: this.currentMonth,
            year: this.year,
         });
         this.$nextTick(() => {
            // tänne tarkistus, että minkään painikkeen tabindex ei tällä hetkellä ole 0
            const newFocused = document.querySelector("[data-date='" + previousDayISOString + "']") as HTMLTableCellElement;
            newFocused.tabIndex = 0;
            newFocused.focus();
         });
      },
      goToPreviousWeek(item: DayOfMonth, event: Event): void {
         event.stopPropagation();
         event.preventDefault();
         this.changeTabIndex(0, -1);
         var dayInPreviousWeek = 0;

         const lastMothIndex = this.previousMonthIndex(this.currentMonth);
         let daysInPreviousMonth =
            this.monthsData.months[lastMothIndex].numberOfDays!;
         dayInPreviousWeek = item.day - 7;
         if (dayInPreviousWeek < 1) {
            dayInPreviousWeek = daysInPreviousMonth + dayInPreviousWeek;
            this.goToPreviousMonth();
         }
         const previousDayISOString = this.createDate({ day: dayInPreviousWeek, month: this.currentMonth, year: this.year });
         this.$nextTick(() => {
            const newFocused = document.querySelector("[data-date='" + previousDayISOString + "']") as HTMLTableCellElement;
            newFocused.tabIndex = 0;
            newFocused.focus();
         });
      },
      goToNextWeek(item: DayOfMonth, event: Event): void {
         event.stopPropagation();
         event.preventDefault();
         this.changeTabIndex(0, -1);
         let dayInNextWeek = 0;

         dayInNextWeek = item.day + 7;
         let daysInMonth =
            this.monthsData.months[this.currentMonth].numberOfDays!;
         if (dayInNextWeek > daysInMonth) {
            dayInNextWeek = dayInNextWeek - daysInMonth;
            this.goToNextMonth();
         }
         const previousDayISOString = this.createDate({
            day: dayInNextWeek,
            month: this.currentMonth,
            year: this.year,
         });
         this.$nextTick(() => {
            const newFocused = document.querySelector("[data-date='" + previousDayISOString + "']") as HTMLTableCellElement;
            newFocused.tabIndex = 0;
            newFocused.focus();
         });
      },
      goToPreviousDay(item: DayOfMonth, event: Event): void {
         event.stopPropagation();
         event.preventDefault();
         this.changeTabIndex(0, -1);
         let previousDay = 0;

         const lastMothIndex = this.previousMonthIndex(this.currentMonth);
         let daysInPreviousMonth =
            this.monthsData.months[lastMothIndex].numberOfDays!;
         if (item.day === 1) {
            this.goToPreviousMonth();
            previousDay = daysInPreviousMonth;
         } else {
            previousDay = item.day - 1;
         }
         const previousDayISOString = this.createDate({
            day: previousDay,
            month: this.currentMonth,
            year: this.year,
         });
         this.$nextTick(() => {
            const newFocused = document.querySelector("[data-date='" + previousDayISOString + "']") as HTMLTableCellElement;
            newFocused.tabIndex = 0;
            newFocused.focus();
         });
      },
      goToNextDay(item: DayOfMonth, event: Event): void {
         event.stopPropagation();
         event.preventDefault();
         this.changeTabIndex(0, -1);
         let nextDay = 0;

         let daysInMonth =
            this.monthsData.months[this.currentMonth].numberOfDays;
         if (item.day === daysInMonth) {
            this.goToNextMonth();
            nextDay = 1;
         } else {
            nextDay = item.day + 1;
         }
         const nextDayISOString = this.createDate({
            day: nextDay,
            month: this.currentMonth,
            year: this.year,
         });
         this.$nextTick(() => {
            const newFocused = document.querySelector("[data-date='" + nextDayISOString + "']") as HTMLTableCellElement;
            newFocused.tabIndex = 0;
            newFocused.focus();
         });
      },
      getFirstDayOfMonth(index: number): number | undefined {
         let date = null;
         let monthIndex = index;

         if (this.year !== null) {
            date = new Date(this.year, monthIndex, 1);
         }
         return date?.getDay();
      },
      getLastDayOfPreviousMonth(indexOfPreviousMonth: number): number {
         let date = null;
         let monthIndex = indexOfPreviousMonth;
         let lastDayNumber = null;
         let year = this.year;

         if (indexOfPreviousMonth === 11) {
            year = this.year - 1;
         }

         lastDayNumber = this.monthsData.months[monthIndex].numberOfDays;
         date = new Date(year, monthIndex, lastDayNumber);

         return date.getDay();
      },
      amountOfWeeksInMonth(): number {
         let daysInMonth =
            this.monthsData.months[this.currentMonth].numberOfDays;
         let firstWeekday = this.getFirstDayOfMonth(this.currentMonth);
         let isSunday = this.getFirstDayOfMonth(this.currentMonth) === 0;

         if (firstWeekday !== undefined) {
            if (
               daysInMonth == 28 &&
               this.getFirstDayOfMonth(this.currentMonth) == 1
            ) {
               return 4;
            } else if (
               (daysInMonth == 31 && (firstWeekday > 5 || isSunday)) ||
               (daysInMonth == 30 && (firstWeekday > 6 || isSunday))
            ) {
               return 6;
            }
         }
         return 5;
      },
      sliceMonthToWeeks(
         dayArray: DayOfMonth[],
         chunkSize: number
      ): DayOfMonth[][] {
         const res = [];
         for (let i = 0; i < dayArray.length; i += chunkSize) {
            const chunk = dayArray.slice(i, i + chunkSize);
            res.push(chunk);
         }
         return res;
      },
      toISOLocal(date: Date): string {
         let z = (n: number): string => ("0" + n).slice(-2);
         let zz = (n: number): string => ("00" + n).slice(-3);
         let off = date.getTimezoneOffset();
         let sign = off > 0 ? "-" : "+";
         off = Math.abs(off);

         return (
            date.getFullYear() +
            "-" +
            z(date.getMonth() + 1) +
            "-" +
            z(date.getDate()) +
            "T" +
            z(date.getHours()) +
            ":" +
            z(date.getMinutes()) +
            ":" +
            z(date.getSeconds()) +
            "." +
            zz(date.getMilliseconds()) +
            sign +
            z((off / 60) | 0) +
            ":" +
            z(off % 60)
         );
      },
      createDate(item: DayOfMonth): string {
         let dateISOString = null;
         let dayOfMonth = item.day;
         // date in ISO format with time if needed later
         let dateTimeISOString = this.toISOLocal(new Date(item.year, item.month, dayOfMonth));
         dateISOString = dateTimeISOString?.split("T")[0];
         return dateISOString;
      },
   },
});
</script>

<style scoped>
/* jos tarvitsee luoda esim. paljon z-indexejä, sen voi tehdä css custom propertisien avulla */
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
   background-color: #ffffff;
   border-color: #323a45;
}

.date-field-section .date-field:focus {
   outline: 3px solid #d71ef7;
   outline-offset: -3px;
}

.date-field-inline {
   white-space: nowrap;
}

.date-field-inline input.error {
  outline: 3px solid #BB1331;
  outline-offset: -3px;
}

.date-field {
   color: #222222;
}

::placeholder {
   color: #767676;
   opacity: 1;
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
   clip: rect(0, 0, 0, 0);
   height: 1px;
   margin: -1px;
   overflow: hidden;
   padding: 0;
   position: absolute;
   width: 1px;
}

ul.error-list {
  color: #BB1331;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

button:focus {
   outline: 3px solid #d71ef7;
   outline-offset: -3px;
}

/* datepicker-modal */
.calendar-modal {
   position: absolute;
   background-color: #ffffff;
   border: 1px solid #000000;
   max-width: 450px;
}

.open-calendar-btn {
   height: 30px;
   background-color: #ffffff;
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
   width: 180px;
   text-align: center;
   margin-top: 15px;
   margin-bottom: 10px;
}

.datepicker-header-month {
   color: #222222;
}

.datepicker-header-year {
   color: #222222;
}

thead > tr th {
   width: 20px;
   height: 35px;
}

.arrow-button {
   background-color: #ffffff;
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
   min-height: 225px;
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
   width: 24px;
   color: #222222;
   padding: 5px;
   margin: 2px;
   border-radius: 3px;
}

.datepicker-day:not(.disabled-day) {
   font-weight: 600;
}

.disabled-day {
   color: #595959;
}

.datepicker-day:hover {
   background-color: #e8e7e7;
}

.datepicker-day:not(.disabled-day):hover {
   padding: 3px;
   border: 2px solid #f44a87;
}

td.datepicker-day:focus {
   padding: 3px;
   border: 2px solid #3182a0;
   outline: 0;
}

.datepicker-day[tabindex="0"] {
   background-color: #ffd55f;
   color: #000000;
}

.datepicker-day.selected-date {
   padding: 3px;
   border: 2px dotted #3182a0;
   outline: 0;
}

.buttons {
   float: right;
   margin-right: 10px;
}

button.choose-selected-date,
button.close-calendar-modal {
   border: none;
   border-radius: 3px;
   background-color: #39306b;
   color: #ffffff;
   margin-bottom: 6px;
   margin-right: 10px;
   padding: 8px;
}

button.choose-selected-date:hover {
   background-color: #5c73bc;
}

button.close-calendar-modal:hover {
   background-color: #677983;
}

button.close-calendar-modal {
   background-color: #272525;
}

.backdrop {
   top: 0;
   left: 0;
   position: fixed;
   background: rgba(0, 0, 0, 0.5);
   width: 100%;
   height: 100%;
}

/* XXL */
/* @media (min-width: 1281px) {
  } */

/* XL */
@media (min-width: 1025px) and (max-width: 1280px) {
}

/* L */
@media (min-width: 768px) and (max-width: 1024px) {
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
