# vue-accessible-date-field
Vue date field with possibility to use a visual date picker to choose the date. Accessibility is under development. Not recommended to use this component until version 1.0.0 is released. Component is made with Vue 3.

**Date field:**

![alt text](./src/assets/image-for-readme-1.PNG)

**Date picker** showing selected date with dotted border, focused but not selected date with yellow background color and hovered date with light gray background and pink border.

![alt text](./src/assets/image-for-readme-2.PNG)



## Installing component with npm 
```
npm install vue-accessible-date-field
```

## Props
| Property  | Type | Default Value | Good to Know |
| ------------- | ------------- | ------------- | ------------- |
| defaultDate  | String  |  | Format: "yyyy-mm-dd". If not given, datePicker uses current date when first loaded |
| uniqueName  | String |   | used to make id:s inside component unique between multiple vue-accessible-date-pickers on the same page. If not given the string will be replaced with "undefined" in id:s. E.g. id="dateField-undefined"   |
| usedLanguage | String  | "fi" | default language will be changed to English soon. It it possible to use values "en" for English, "sv" for Swedish and "fi" for Finnish |
| localizationEn  | Localization {<br />locale: string,<br />placeholderText: string,<br />dateFormatString: string,<br />wordOrTranslated: string,<br />dateFormatOptions: string[],<br />generalDateFieldError: string,<br />buttonLabelChoose: string,<br />buttonLabelChange: string,<br />dayNames: string[],<br />monthNames: string[],<br />monthNamesForMessage: string[],<br />dayNamesShort: string[],<br />selectFocusedButtonLabel: string,<br />cancelButtonLabel: string<br />} | Localization = {<br />locale: 'en-GB',<br />placeholderText: 'e.g. dd.mm.yyyy',<br />dateFormatString: 'date format: ',<br />wordOrTranslated: 'or',<br />dateFormatOptions: ['dd.mm.yyyy', 'dd-mm-yyyy', 'dd/mm/yyyy'],<br />generalDateFieldError: 'The entered date format is invalid',<br />buttonLabelChoose: 'Choose date',<br />buttonLabelChange: 'Change selected date,',<br />dayNames: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],<br />monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],<br />monthNamesForMessage: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],<br />dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],<br />selectFocusedButtonLabel: 'OK',<br />cancelButtonLabel: 'Cancel'<br />} |   |
| localizationFi  | Localization {<br />locale: string,<br />placeholderText: string,<br />dateFormatString: string,<br />wordOrTranslated: string,<br />dateFormatOptions: string[],<br />generalDateFieldError: string,<br />buttonLabelChoose: string,<br />buttonLabelChange: string,<br />dayNames: string[],<br />monthNames: string[],<br />monthNamesForMessage: string[],<br />dayNamesShort: string[],<br />selectFocusedButtonLabel: string,<br />cancelButtonLabel: string<br />} | Localization = {<br />locale: 'fi-FI',<br />placeholderText: 'esim. pp.kk.vvvv',<br />dateFormatString: 'päivämäärän muoto: ',<br />wordOrTranslated: 'tai',<br />dateFormatOptions: ['pp.kk.vvvv',<br />'pp-kk-vvvv',<br />'pp/kk/vvvv'],<br />generalDateFieldError: 'Syöttämäsi päivämäärän muoto ei kelpaa',<br />buttonLabelChoose: 'Valitse päivämäärä',<br />buttonLabelChange: 'Muuta valittua päivämäärää, ', dayNames: ['maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai', 'sunnuntai'], monthNames: ['tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu'],<br />monthNamesForMessage: ['tammikuuta', 'helmikuuta', 'maaliskuuta', 'huhtikuuta', 'toukokuuta', 'kesäkuuta', 'heinäkuuta', 'elokuuta', 'syyskuuta', 'lokakuuta', 'marraskuuta', 'joulukuuta'],<br />dayNamesShort: ['ma', 'ti', 'ke', 'to', 'pe', 'la', 'su'],<br />selectFocusedButtonLabel: 'OK',<br />cancelButtonLabel: 'Peruuta'<br />}  |   |
| localizationSv  | Localization {<br />locale: string<br />placeholderText: string,<br />dateFormatString: string,<br />wordOrTranslated: string,<br />dateFormatOptions: string[],<br />generalDateFieldError: string,<br />buttonLabelChoose: string,<br />buttonLabelChange: string,<br />dayNames: string[],<br />monthNames: string[],<br />monthNamesForMessage: string[],<br />dayNamesShort: string[],<br />selectFocusedButtonLabel: string,<br />cancelButtonLabel: string<br />} | Localization = {<br />locale: 'sv-SE',<br />placeholderText: 'T.ex. dd.mm.åååå',<br />dateFormatString: 'datumformat: ',<br />wordOrTranslated: 'eller',<br />dateFormatOptions: ['dd.mm.åååå', 'dd-mm-åååå', 'dd/mm/åååå'],<br />generalDateFieldError: 'Datumformatet du angav är ogiltigt',<br />buttonLabelChoose: 'Välj ett datum',<br />buttonLabelChange: 'Ändra det valda datumet, ',<br />dayNames: ['måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag', 'söndag'],<br />monthNames: ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'],<br />monthNamesForMessage: ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'],<br />dayNamesShort: ['må', 'ti', 'on', 'to', 'fr', 'lö', 'sö'],<br />selectFocusedButtonLabel: 'OK',<br />cancelButtonLabel: 'Avbryt'<br />}  |  |

- There will soon be possibility to add localization also to other languages. 

- To promote accessibility please make sure that date field's label you add has the same for-attribute that text field itself has.


## Emits

|  Event  | Good to Know |
| ----------- | ----------- |
| update:selectedISODate  | event occurs every time user selects new date. Parent component receives updated string value in format yyyy-mm-dd  |