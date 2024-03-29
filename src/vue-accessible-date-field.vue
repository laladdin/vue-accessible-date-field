<template>
  <div class="vue-accessible-date-field" :lang="naturalLanguage">
    <!-- date field -->
    <div class="date-field-section">
      <div class="date-field-inline">
        <div class="input-button">
          <input    
            type="text"
            :id="'dateField-' + uniqueString"
            name="dateInput"
            v-model="selectedDate"
            @change="updateSelectedDate($event)"              
            :class="['date-field', { 'error': errors.length > 0 }]"
            :aria-describedby="'dateFieldDescription' + uniqueString"
            :placeholder="placeholderText" />   
          <button
            type="button"
            id="calendarIcon"
            class="icon open-calendar-btn"
            :aria-label="buttonLabel"
            :aria-description="navInstr"
            @click="handleIconPress($event)"
            @keydown.enter="handleIconPress($event)"
            @keydown.space="handleIconPress($event)">
            <img class="open-calendar-icon" alt="calendar icon" :src="iconSrc" type="image/svg+xml">          
          </button>
        </div>
        <span :id="'dateFieldDescription' + uniqueString">
          <span v-if="errors.length === 0" class="screen-reader-only">{{ possibleDateFormats }}</span>  
          <span v-if="errors.length > 0" role="alert">
            <ul class="error-list">
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </span>           
        </span>             
      </div>         
    </div>
    <!-- date picker -->
    <div v-if="calendarVisible" class="datepicker-section">
      <span :id="'monthYearDescr-' + uniqueString" role="status">
        <span class="screen-reader-only">
          {{ monthYearDescription }}
        </span>           
      </span>     
      <div @click="handleBackdropClick($event)"
        class="backdrop"
        ref="backdrop">
      </div>
      <div
        class="calendar-modal"
        role="dialog"
        aria-modal="true"
        :aria-label="localizationData.buttonLabelChoose">
        <div class="datepicker">
          <div class="datepicker-header-line">
            <button type="button"
              :id="'previousYear-' + uniqueString"
              class="arrow-button previous-year-button"
              @click="riffleYears('backward')"
              :aria-label="localizationData.buttonLabelPreviousYear"
              @keydown.tab="handlePrevYearTab($event)"
              @keydown.esc="closeDatePickerModal($event)"
              @keydown.enter="riffleYears('backward', $event)">
              &laquo;
            </button>
            <button
              type="button"
              class="arrow-button previous-month-button"
              @click="riffleMonths('backward', $event)"
              :aria-label="localizationData.buttonLabelPreviousMonth"
              @keydown.esc="closeDatePickerModal($event)"
              @keydown.enter="riffleMonths('backward', $event)">
              &lsaquo;
            </button>
            <h3
              :id="'datepickerHeader-' + uniqueString"
              class="datepicker-header">
              <span class="datepicker-header-month">{{ pickerHeaderMonth }}</span> <span class="datepicker-header-year">{{ pickerHeaderYear }}</span>
            </h3>
            <button
              type="button"
              class="arrow-button"
              @click="riffleMonths('forward')"
              :aria-label="localizationData.buttonLabelNextMonth"
              @keydown.esc="closeDatePickerModal($event)"
              @keydown.enter="riffleMonths('forward', $event)">
              &rsaquo;
            </button>
            <button
              type="button"
              class="arrow-button"
              @click="riffleYears('forward')"
              :aria-label="localizationData.buttonLabelNextYear"
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
              <thead class="table-head">
                <tr class="datepicker-table-row">
                  <th
                    scope="col"
                    v-for="(day, i) in daysShort"
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
                    :class="['datepicker-day', 
                    { 'selected-date': createDate(dayItem) === selectedISODate }, 
                    { 'disabled-day': checkDisabledDay(dayItem) }]"
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
                    @keydown.page-up="handlePageUp($event, dayItem)">
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
import { monthsData } from "@/months";
import { localizationDefaultDataFi } from "@/localizationdefaultdatafi";
import { localizationDefaultDataSv } from "@/localizationdefaultdatasv";
import { localizationDefaultDataEn } from "@/localizationdefaultdataen";

export default /*#__PURE__*/ defineComponent({
  name: "VueAccessibleDateField",
  props: {
    defaultDate: String,
    uniqueName: String,
    usedLanguage: String,
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
  data() {
    const showCalendar: boolean = false
    const currentMonth: number = new Date().getMonth()
    const year: number = new Date().getFullYear()
    var selectedISODate: string | undefined
    var selectedDateString: string | undefined
    var selectedTdCell: HTMLTableCellElement | undefined
    var uniqueString: string | undefined
    var errors: string[] = []
    var selectedDateMessage: string = ""
    var componentLanguage: string | undefined
    var localizationData: Localization = {
      locale: "",
      placeholderText: "",
      dateFormatString: "",
      wordOrTranslated: "",
      dateFormatOptions: [],
      generalDateFieldError: "",
      keyboardNavInstructions: "",
      buttonLabelChoose: "",
      buttonLabelChange: "",
      buttonLabelPreviousMonth: "",
      buttonLabelPreviousYear: "",
      buttonLabelNextMonth: "",
      buttonLabelNextYear: "",
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
      errors,
      selectedDateMessage,
      componentLanguage
    };
  },
  created(): void {
    // check if usedLanguage is given. If not, checks HTML lang-attribute
    // default language is english    
    const html = document.documentElement
    const htmlLang = html.getAttribute("lang")
    if (this.usedLanguage) {
      if (this.usedLanguage === "en" || this.usedLanguage === "en-GB") {
        this.componentLanguage = "en"
      } else if (this.usedLanguage === "sv" || this.usedLanguage === "sv-SE") {
        this.componentLanguage = "sv"
      } else if (this.usedLanguage === "fi" || this.usedLanguage === "fi-FI") {
        this.componentLanguage = "fi"
      }  
    } else if (htmlLang) {
      this.componentLanguage = htmlLang
    } else {
      this.componentLanguage = "en"
    }
   },
  mounted(): void {     
    // localization data by used language
    // if custom localization data is found it overrides the default localization
    // component language
    // 
    if (this.componentLanguage === "fi") {        
      if (this.localizationFi) {
        this.localizationData = this.localizationFi
      } else {
        this.localizationData = this.localizationDefaultDataFi
      }
    } else if (this.componentLanguage === "sv") {
      if (this.localizationSv) {
        this.localizationData = this.localizationSv
      } else {
        this.localizationData = this.localizationDefaultDataSv
      }
    } else {
      if (this.localizationEn) {
        this.localizationData = this.localizationEn
      } else {
        this.localizationData = this.localizationDefaultDataEn
      }
    }
    if (this.selectedISODate === undefined && this.defaultDate) {
      this.selectedISODate = this.defaultDate
      this.setCalendarView(this.selectedISODate)
      // standard format of date not visible for user 
      this.selectedDateString = this.formatISODate(this.defaultDate, ".")
    }
    this.uniqueString = this.uniqueName
  },
  watch: {
    selectedDateISOFormat(newDateValue: string) {
      this.updateButtonMessage(newDateValue)
      this.$emit("update:selectedISODate", newDateValue)
    }
  },
  computed: {
    naturalLanguage(): string | undefined {
      return this.componentLanguage
    },
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
    iconSrc(): string | undefined {
      return "https://raw.githubusercontent.com/laladdin/vue-accessible-date-field/main/src/assets/calendar-icon-black.svg"
    },
    navInstr(): string {
      return this.localizationData.keyboardNavInstructions
    },
    calendarVisible(): boolean {
      return this.showCalendar
    },
    daysShort(): string[] {
      return this.localizationData.dayNamesShort
    },
    placeholderText(): string {
        return this.localizationData.placeholderText
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
      dateFormats = dateFormats + delimiter + this.localizationData.dateFormatOptions[i]
      }
      return dateFormats
    },
    monthYearDescription(): string {        
      return this.localizationData.monthNames[this.currentMonth] + this.year.toString()
    }, 
    pickerHeaderMonth(): string {
      if (this.checkIfLeapYear(this.year)) {
        this.monthsData.months[1].numberOfDays = 29
      } else {
        this.monthsData.months[1].numberOfDays = 28
      }
      let monthString = this.localizationData.monthNames[this.currentMonth]
      return monthString
    },
    pickerHeaderYear(): number {
        return this.year
    },
    daysVisibleCurrentMonth(): DayOfMonth[][] {
      let dayItem: DayOfMonth | undefined = undefined
      let allDaysVisible: DayOfMonth[] = []
      let lastMothIndex = this.previousMonthIndex(this.currentMonth)
      let lastWeekdayPreviousMonth = this.getLastDayOfPreviousMonth(lastMothIndex)
      let lastDayPreviousMonth = this.monthsData.months[lastMothIndex]?.numberOfDays
      let year = this.year

      // visible last months days
      if (lastDayPreviousMonth && lastWeekdayPreviousMonth && lastWeekdayPreviousMonth !== 0) {
        if (lastMothIndex === 11) {
            year = this.year - 1
        }
        for (let i = lastWeekdayPreviousMonth; i >= 1; i--) {
          dayItem = {
            day: lastDayPreviousMonth,
            month: lastMothIndex,
            year: year,
            previousMonthDay: true,
          }
          allDaysVisible.push(dayItem)
          lastDayPreviousMonth = lastDayPreviousMonth - 1
        }
        allDaysVisible.reverse()
      }

      // days of current month
      let daysInMonth = this.monthsData.months[this.currentMonth]!.numberOfDays
      if (daysInMonth != null) {
        for (let i = 1; i <= daysInMonth; i++) {
            dayItem = { day: i, month: this.currentMonth, year: this.year }
            allDaysVisible.push(dayItem)
        }

        // visible next months days
        if (this.amountOfWeeksInMonth() * 7 - allDaysVisible.length > 0) {
          let daysOfNextMonth =
          this.amountOfWeeksInMonth() * 7 - allDaysVisible.length
          for (let i = 1; i <= daysOfNextMonth; i++) {
            dayItem = { day: i, month: this.currentMonth + 1, year: this.year, nextMonthDay: true }
            allDaysVisible.push(dayItem)
          }
        }
      }

      const weeksOfMonth: DayOfMonth[][] = this.sliceMonthToWeeks(allDaysVisible, 7)
      return weeksOfMonth
    },
  },
  methods: {
    updateButtonMessage(date: string) {
      const newDate = new Date(date) 
      let dayName = this.localizationData.dayNames[newDate.getDay()]
      let dayNumber = newDate.getDate()
      let monthName = this.localizationData.monthNamesForMessage[newDate.getMonth()]
      let year = newDate.getFullYear()
      this.selectedDateMessage = this.localizationData.buttonLabelChange + dayName + " " + dayNumber + " " + monthName + " " + year
    },
    checkDisabledDay(dayItem: DayOfMonth): boolean | undefined {
      return dayItem.previousMonthDay || dayItem.nextMonthDay
    },
    eventPrev(event: Event) {
      event.stopPropagation()
      event.preventDefault()
    },
    closeDatePickerModal(event?: Event): void {
      this.showCalendar = false      
      if (event) {
        this.eventPrev(event)
      }
      if (this.showCalendar === false) {
        this.year = Number(this.selectedISODate?.split("-")[0])
        this.currentMonth = Number(this.selectedISODate?.split("-")[1]) - 1
      }
    },      
    changeTabIndex(oldTabIndex: number, newTabIndex: number) {
      const oldFocused = document.querySelector('td[tabindex="' + oldTabIndex + '"]') as HTMLTableCellElement
      oldFocused.tabIndex = newTabIndex
    },
    setFocusToCell(dateString?: string, setFocus?: boolean): void {
      this.$nextTick(() => {
        const tdElement = document.querySelector("[data-date='" + dateString + "']") as HTMLTableCellElement        
        tdElement.tabIndex = 0  
        if (setFocus === true) {
          tdElement.focus()
        }
      })                   
    },
    checkSelected(item: DayOfMonth): boolean {
      const dayISOString = this.createDate(item)
      if (dayISOString === this.selectedISODate) {
        return true
      }
      return false
    },
    setCalendarView(dateString: string): void {
      this.year = Number(dateString.split("-")[0])
      this.currentMonth = Number(dateString.split("-")[1]) - 1
    },
    formatISODate(date: string, delimiter: string): string {
      let dateString = date
      const splittedDate = dateString.split("-")
      const formatted = splittedDate[2] + delimiter + splittedDate[1] + delimiter + splittedDate[0]
      this.selectedDateString = formatted
      return formatted
    },
    handleDateFormat(inputValue: string): boolean {
      const DateStr = inputValue
      // Regex checks date formats dd/mm/yyyy, dd-mm-yyyy and dd.mm.yyyy, leap year taken into account (malli: https://stackoverflow.com/questions/15491894/regex-to-validate-date-formats-dd-mm-yyyy-dd-mm-yyyy-dd-mm-yyyy-dd-mmm-yyyy)
      const dateRegex = new RegExp(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)
      if (dateRegex.test(DateStr)) {
        // user sees the date in the format in which it was given
        this.selectedDateString = DateStr
        return true
      } 
      else {
        this.errors = []
        if (!DateStr) {
          // todo: add required hanling                    
        } else {
          this.selectedDateString = undefined
          const error = this.localizationData.generalDateFieldError.replace("{0}", DateStr) + this.localizationData.dateFormatOptions;
          this.errors.push(error)
        } 
        return false
      }
    },
    updateSelectedDate(event: Event): void {
      const selectedValue = (event.target as HTMLInputElement).value
      this.selectedDateString = selectedValue
      const validDateValue = this.handleDateFormat(selectedValue)
      if (validDateValue) {
        this.errors = []
        // date splitted by delimiter -, . or /
        let [day1, month1, year1] = selectedValue.split(/[-./]+/)
        // adds a zero if < 10 day or month has been entered without the first zero
        day1 = Number(day1).toString().padStart(2, '0');
        month1 = Number(month1).toString().padStart(2, '0');
        const ISODateString = `${year1}-${month1}-${day1}`
        this.setCalendarView(ISODateString)
        this.selectedISODate = ISODateString
      }   
    },
    createDayOfMonth(dayNumb: number): string {
      const newDay = this.createDate({
        day: dayNumb,
        month: this.currentMonth,
        year: this.year
      })
      return newDay
    },
    handleIconPress(event: Event): void {
      this.errors = []
      this.showCalendar = true
      if (!this.selectedISODate) {          
        const dateNow = new Date()
        let today = dateNow.getDate()
        this.currentMonth = dateNow.getMonth()
        this.year = dateNow.getFullYear()
        const selected = this.createDayOfMonth(today)
        this.setFocusToCell(selected, true)        
      } else {
        this.setFocusToCell(this.selectedISODate, true)
      }        
      this.eventPrev(event)
    },
    handleBackdropClick(event: Event): void {
      this.closeDatePickerModal()
      this.eventPrev(event)
    },
    handleDatePress(event: Event, item: DayOfMonth, closeModal: boolean): void {
      this.selectedTdCell = event.target as HTMLTableCellElement
      this.selectedTdCell.ariaSelected = "true"
      this.selectedTdCell.tabIndex = 0
      let clickedDate = this.createDate(item)
      this.selectedISODate = clickedDate
      this.selectedDateString = this.formatISODate(clickedDate, ".")     
      if (closeModal === true) {
        this.closeDatePickerModal()
        const icon = document.getElementById("calendarIcon") as HTMLButtonElement
        icon.focus()
      }
      this.eventPrev(event)
    },
    handleOKButtonClick(event: Event): void {
      const focusedDate = document.querySelector('td[tabindex="0"]') as HTMLTableCellElement
      this.selectedISODate = focusedDate.dataset.date
      const isoString: string = this.selectedISODate!
      this.selectedDateString = this.formatISODate(isoString, ".")
      focusedDate.ariaSelected = "true"
      this.closeDatePickerModal()
      this.eventPrev(event)
    },
    handlePrevYearTab(event: KeyboardEvent): void {
      if (event.shiftKey) {
        const newFocused = document.querySelector("#OKButton-" + this.uniqueString) as HTMLButtonElement
        newFocused.focus()
        event.preventDefault()
      }
    },
    handleOKButtonTab(event: KeyboardEvent): void {
      if (!event.shiftKey) {
        const newFocused = document.querySelector("#previousYear-" + this.uniqueString) as HTMLButtonElement
        newFocused.focus()
        event.preventDefault()
      }
    },
    handlePageDown(event: KeyboardEvent, item: DayOfMonth) {    
      this.eventPrev(event)        
      this.changeTabIndex(0, -1)
      if (event.shiftKey) {
        this.goToPreviousYear()
      } else {
        this.goToPreviousMonth()
      }
      const goTo = this.createDayOfMonth(item.day)
      this.setFocusToCell(goTo, true)     
    },
    handlePageUp(event: KeyboardEvent, item: DayOfMonth) {
      this.eventPrev(event)
      this.changeTabIndex(0, -1)
      // if also Shift key pressed, picker moves to next year
      if (event.shiftKey) {
        this.goToNextYear()
      } else {
        // if not, moves to next month
        this.goToNextMonth()
      }
      const goTo = this.createDayOfMonth(item.day)
      this.setFocusToCell(goTo, true)
    },
    riffleMonths(forwardOrBackward: string, event?: Event): void {
      const focusedDate = document.querySelector('td[tabindex="0"]') as HTMLTableCellElement
      // only tabIndex changes, not focus
      // previous tabIndex 0 changes to -1
      this.changeTabIndex(0, -1)
      // year increases or decreases by one
      if (forwardOrBackward === "forward") {
        this.goToNextMonth()
      } else if (forwardOrBackward === "backward") {
        this.goToPreviousMonth()
      }
      const dayNextMonth = Number(focusedDate.dataset.date!.split("-")[2])
      const goTo = this.createDayOfMonth(dayNextMonth)
      this.setFocusToCell(goTo, false) 
      if (event) {
        this.eventPrev(event)
      }
    },
    riffleYears(forwardOrBackward: string, event?: Event): void {
      const focusedDate = document.querySelector('td[tabindex="0"]') as HTMLTableCellElement
      // only tabIndex changes, not focus
      // previous tabIndex 0 changes to -1
      this.changeTabIndex(0, -1)
      // year increases or decreases by one
      if (forwardOrBackward === "forward") {
        this.goToNextYear()
      } else if (forwardOrBackward === "backward") {
        this.goToPreviousYear()
      }
      const dayNextMonth = Number(focusedDate.dataset.date!.split("-")[2])
      const goTo = this.createDayOfMonth(dayNextMonth)
      this.setFocusToCell(goTo, false)
      if (event) {
        this.eventPrev(event)
      }
    },
    checkIfLeapYear(year: number): boolean {
      return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
    },
    goToPreviousYear(): void {
      if (this.year) {
        this.year = this.year - 1
      }
    },
    goToNextYear(): void {
      if (this.year) {
        this.year = this.year + 1
      }
    },
    previousMonthIndex(currentIndex: number): number {
      let index = currentIndex
      if (index == 0) {
        return 11
      } else {
        return index - 1
      }
    },
    goToPreviousMonth(): void {
      if (this.currentMonth || this.currentMonth == 0) {
        if (this.currentMonth == 0) {
          this.currentMonth = 11
          if (this.year) {
            this.year = this.year - 1
          }
        } else {
          this.currentMonth = this.currentMonth - 1
        }
      }
    },
    goToNextMonth(): void {
      if (this.currentMonth == 11) {
        this.currentMonth = 0
        if (this.year) {
          this.year = this.year + 1
        }
      } else {
        this.currentMonth = this.currentMonth + 1
      }
    },
    goToFirstDayOfWeek(item: DayOfMonth, event: Event): void {
      this.eventPrev(event)
      this.changeTabIndex(0, -1)
      var firstDayOfWeek = 0
      const weekdayCurrent = new Date(item.year, item.month, item.day).getDay()

      const lastMothIndex = this.previousMonthIndex(this.currentMonth)
      let daysInPreviousMonth =
        this.monthsData.months[lastMothIndex].numberOfDays!
      if (weekdayCurrent === 0) {
        firstDayOfWeek = item.day - 6
      } else {
        firstDayOfWeek = item.day - (weekdayCurrent - 1)
      }
      if (firstDayOfWeek < 1) {
        firstDayOfWeek = daysInPreviousMonth + firstDayOfWeek
        this.goToPreviousMonth()
      }
      const goTo = this.createDayOfMonth(firstDayOfWeek)
      this.setFocusToCell(goTo, true) 
    },
    goToLastDayOfWeek(item: DayOfMonth, event: Event): void {
      this.eventPrev(event)
      this.changeTabIndex(0, -1)
      var lastDayOfWeek = item.day
      const weekdayCurrent = new Date(item.year, item.month, item.day).getDay()

      let daysInMonth =
        this.monthsData.months[this.currentMonth].numberOfDays!
      if (weekdayCurrent !== 0) {
        lastDayOfWeek = item.day + (7 - weekdayCurrent)
      }
      if (lastDayOfWeek > daysInMonth) {
        lastDayOfWeek = lastDayOfWeek - daysInMonth
        this.goToNextMonth()
      }
      const goTo = this.createDayOfMonth(lastDayOfWeek)
      this.setFocusToCell(goTo, true) 
    },
    goToPreviousWeek(item: DayOfMonth, event: Event): void {
      this.eventPrev(event)
      this.changeTabIndex(0, -1)
      var dayInPreviousWeek = 0

      const lastMothIndex = this.previousMonthIndex(this.currentMonth)
      let daysInPreviousMonth =
        this.monthsData.months[lastMothIndex].numberOfDays!
      dayInPreviousWeek = item.day - 7
      if (dayInPreviousWeek < 1) {
        dayInPreviousWeek = daysInPreviousMonth + dayInPreviousWeek
        this.goToPreviousMonth()
      }
      const goTo = this.createDayOfMonth(dayInPreviousWeek)
      this.setFocusToCell(goTo, true) 
    },
    goToNextWeek(item: DayOfMonth, event: Event): void {
      this.eventPrev(event)
      this.changeTabIndex(0, -1)
      let dayInNextWeek = 0

      dayInNextWeek = item.day + 7
      let daysInMonth =
        this.monthsData.months[this.currentMonth].numberOfDays!
      if (dayInNextWeek > daysInMonth) {
        dayInNextWeek = dayInNextWeek - daysInMonth
        this.goToNextMonth()
      }
      const goTo = this.createDayOfMonth(dayInNextWeek)
      this.setFocusToCell(goTo, true) 
    },
    goToPreviousDay(item: DayOfMonth, event: Event): void {
      this.eventPrev(event)
      this.changeTabIndex(0, -1)
      let previousDay = 0

      const lastMothIndex = this.previousMonthIndex(this.currentMonth)
      let daysInPreviousMonth =
        this.monthsData.months[lastMothIndex].numberOfDays!
      if (item.day === 1) {
        this.goToPreviousMonth()
        previousDay = daysInPreviousMonth
      } else {
        previousDay = item.day - 1
      }
      const goTo = this.createDayOfMonth(previousDay)
      this.setFocusToCell(goTo, true) 
    },
    goToNextDay(item: DayOfMonth, event: Event): void {
      this.eventPrev(event)
      this.changeTabIndex(0, -1)
      let nextDay = 0

      let daysInMonth =
        this.monthsData.months[this.currentMonth].numberOfDays
      if (item.day === daysInMonth) {
        this.goToNextMonth()
        nextDay = 1
      } else {
        nextDay = item.day + 1
      }
      const goTo = this.createDayOfMonth(nextDay)
      this.setFocusToCell(goTo, true) 
    },
    getFirstDayOfMonth(index: number): number | undefined {
      let date = null
      let monthIndex = index

      if (this.year !== null) {
        date = new Date(this.year, monthIndex, 1)
      }
      return date?.getDay()
    },
    getLastDayOfPreviousMonth(indexOfPreviousMonth: number): number {
      let date = null
      let monthIndex = indexOfPreviousMonth
      let lastDayNumber = null
      let year = this.year

      if (indexOfPreviousMonth === 11) {
        year = this.year - 1
      }

      lastDayNumber = this.monthsData.months[monthIndex].numberOfDays
      date = new Date(year, monthIndex, lastDayNumber)

      return date.getDay()
    },
    amountOfWeeksInMonth(): number {
      let daysInMonth = this.monthsData.months[this.currentMonth].numberOfDays
      let firstWeekday = this.getFirstDayOfMonth(this.currentMonth)
      let isSunday = this.getFirstDayOfMonth(this.currentMonth) === 0

      if (firstWeekday !== undefined) {
        if (
          daysInMonth == 28 &&
          this.getFirstDayOfMonth(this.currentMonth) == 1
        ) {
          return 4
        } else if (
          (daysInMonth == 31 && (firstWeekday > 5 || isSunday)) ||
          (daysInMonth == 30 && (firstWeekday > 6 || isSunday))
        ) {
          return 6
        }
      }
      return 5
    },
    sliceMonthToWeeks( dayArray: DayOfMonth[], chunkSize: number ): DayOfMonth[][] {
      const res = []
      for (let i = 0; i < dayArray.length; i += chunkSize) {
        const chunk = dayArray.slice(i, i + chunkSize)
        res.push(chunk)
      }
      return res
    },
    toISOLocal(date: Date): string {
      let z = (n: number): string => ("0" + n).slice(-2)
      let zz = (n: number): string => ("00" + n).slice(-3)
      let off = date.getTimezoneOffset()
      let sign = off > 0 ? "-" : "+"
      off = Math.abs(off)

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
      )
    },
    createDate(item: DayOfMonth): string {
      let dateISOString = null
      let dayOfMonth = item.day
      // date in ISO format with time if needed later
      let dateTimeISOString = this.toISOLocal(new Date(item.year, item.month, dayOfMonth))
      dateISOString = dateTimeISOString?.split("T")[0]
      return dateISOString
    },
  },
})
</script>

<style scoped>
.vue-accessible-date-field {
  --main-color: #222222;

  /* date field section (text fields) */
  --date-field-section-outline-color: #d71ef7;
  --calendar-icon-focus-color: #d71ef7;
  --open-calendar-button-background-color: #ffffff;
  --error-text-color: #BB1331;

  /* date picker (modal) section */
  --day-hover-background-color: #e8e7e7;
  --day-not-disabled-hover-border-color: #f44a87;
  --day-focus-border: #3182a0;
  --day-tabindex-0-background-color: #ffd55f;
  --day-selected-border-color: #3182a0;
  --chooce-selected-button-background-color: #39306b;
  --chooce-selected-button-background-color-hover: #5c73bc;
  --close-modal-button-background-color: #272525;
  --close-modal-button-hover-background-color: #677983;

  --modal-backdrop-z-index: 1000;
  --date-picker-z-index: 1001;
}

.input-button {
  display: flex;
  align-items: center;
  max-width: 230px;
  border: 1px solid black;
}

.date-field-section input.date-field {
  height: 100%;
  padding-left: 1rem;
  border: none;
  height: 40px;
  background-color: #ffffff;
}

.date-field-section .date-field:focus {
  outline: 3px solid var(--date-field-section-outline-color);
  outline-offset: -3px;
}

.date-field-inline {
  white-space: nowrap;
}

.date-field-inline input.error {
  outline: 3px solid var(--error-text-color);
  outline-offset: -3px;
}

.date-field {
  color: var(--main-color);
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
  color: var(--error-text-color);
  list-style-type: none;
  padding: 0;
  margin: 0;
}

button:focus {
  outline: 3px solid var(--calendar-icon-focus-color);
  outline-offset: -3px;
}

/* datepicker-modal */
div.calendar-modal {
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #000000;
  max-width: 450px;
  z-index: var(--date-picker-z-index);
}

.open-calendar-btn {
  min-height: 42px;
  min-width: 43px;
  height: 100%;
  background-color: var(--open-calendar-button-background-color);
  border: none;
}

.open-calendar-btn svg {
  margin-top: 1px;
}

.open-calendar-icon {
  height: 75%;
}

/* datepicker header-line */
.datepicker-header-line {  
  display: inline-flex;
  width: 100%;
  min-width: 250px;
}

.datepicker-header {
  font-size: 1.5rem;
  white-space: nowrap;
  width: 180px;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 10px;
}

.datepicker-header-month {
  display: inline-block;
  color: var(--main-color);
}

.datepicker-header-year {
  display: inline-block;
  color: var(--main-color);
}

table.datepicker-grid {
  border-collapse: separate;
}

thead.table-head > tr th {
  width: 20px;
  height: 35px;
}

.arrow-button {
  min-width: 30px;
  background-color: #ffffff;
  border: none;
  font-size: 1.5rem;
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
  display: table-row;
  text-align: center;
}

.datepicker-table-row th {
  color: var(--main-color);
}

/* suurenna */
.datepicker-day {
  width: 24px;
  color: var(--main-color);
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
  background-color: var(--day-hover-background-color);
}

.datepicker-day:not(.disabled-day):hover {
  padding: 3px;
  border: 2px solid var(--day-not-disabled-hover-border-color);
}

td.datepicker-day:focus {
  padding: 3px;
  border: 2px solid var(--day-focus-border);
  outline: 0;
}

.datepicker-day[tabindex="0"] {
  background-color: var(--day-tabindex-0-background-color);
  color: #000000;
}

.datepicker-day.selected-date {
  padding: 3px;
  border: 2px dotted var(--day-selected-border-color);
  outline: 0;
}

.buttons {
  float: right;
  margin-right: 10px;
}


button.choose-selected-date {
  border: none;
  border-radius: 3px;
  background-color: var(--chooce-selected-button-background-color);
  color: #ffffff;
  margin-bottom: 6px;
  margin-right: 10px;
  padding: 8px;
}

button.choose-selected-date:hover {
  background-color: var(--chooce-selected-button-background-color-hover);
}

button.close-calendar-modal {
  border: none;
  border-radius: 3px;
  background-color: var(--close-modal-button-background-color);
  color: #ffffff;
  margin-bottom: 6px;
  margin-right: 10px;
  padding: 8px;
}

button.close-calendar-modal:hover {
  background-color: var(--close-modal-button-hover-background-color);
}

div.backdrop {
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: var(--modal-backdrop-z-index);
}

/* XXL */
@media (min-width: 1281px) {
}

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
