# vue-accessible-date-field
Vue date field with possibility to use a visual date picker to choose the date. Accessibility is under development. Not recommended to use this component until version 1.0.0 is released. Component is made with Vue 3.

## Installation

```
npm install vue-accessible-date-field
```

## General information
- Default language is English
- string prop defaultDate in format "yyyy-mm-dd"
- user can feed date in the input field in formats "dd.mm.yyyy", "dd/mm/yyyy" or "dd-mm-yyyy"
- when user changes the selected date, component emits "update:selectedISODate" in format "yyyy-mm-dd"

The W3C documents and the [Date Picker Dialog Example](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html) earlier found on their website have been used to help develop this component. In addition, [Duet Date Picker](https://www.npmjs.com/package/@duetds/date-picker) has influenced in the implementation of localization. The component is not ready yet, but many functionalities are already working.

## WCAG 2.1 success criteria fulfillment
Most of the requirements of the WCAG 2.1 criteria are already met in the component. The goal is for the component to respond to all of them in the best way possible. 

The fulfillment of some criteria requires that the user of date component (developer, etc.) takes them into account when implementing component in his project. For example, a label added to input field of a date component should contain a for attribute that corresponds to the id of the text field.

