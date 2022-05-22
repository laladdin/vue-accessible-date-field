import { Localization } from '@/ilocalization'

export const localizationDefaultDataEn: Localization = {
  locale: 'en-GB',
  placeholderText: 'e.g. dd.mm.yyyy',
  dateFormatString: 'date format: ',
  wordOrTranslated: 'or',
  dateFormatOptions: ['dd.mm.yyyy', 'dd-mm-yyyy', 'dd/mm/yyyy'],
  generalDateFieldError: 'The entered date format is invalid',
  keyboardNavInstructions: 'You can navigate through the date picker contents with the following keys: ' +
  'TAB: Move focus between the arrow buttons, the targeted date, and the OK and Cancel buttons, ' +
  'left arrow: go to the previous day, ' +
  'right arrow: Go to the next day, ' +
  'up arrow: go to the same day of the week, ' +
  'down arrow: go to the same day of the week next week, ' +
  'HOME key: go to the first day of the same week, ' +
  'END key: go to the last day of the same week, ' +
  'PAGE DOWN key: go to the previous month, ' +
  'SHIFT + PAGE DOWN key: go to the previous year, ' +
  'PAGE UP key: go to the next month, ' +
  'SHIFT + PAGE UP key: go to the next year, ' +
  'ENTER: select the focused day and close the date picker, ' +
  'SPACE: select the focused day, date picker will remain open, ' +
  'ESC: close date picker',
  buttonLabelChoose: 'Choose date',
  buttonLabelChange: 'Change selected date, ',
  buttonLabelPreviousMonth: 'Move to previous month',
  buttonLabelPreviousYear: 'Move to previous year',
  buttonLabelNextMonth: 'Move to next month',
  buttonLabelNextYear: 'Move to next year',
  dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], 
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesForMessage: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],  
  selectFocusedButtonLabel: 'OK',
  cancelButtonLabel: 'Cancel'
}