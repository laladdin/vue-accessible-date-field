# vue-accessible-date-field
Vue date field with possibility to use a visual date picker to choose the date. Accessibility is under development. Not recommended to use this component until version 1.0.0 is released. Component is made with Vue 3.

## Installation

```
npm install vue-accessible-date-field
```

## General information
- default language is English
- string prop defaultDate in format "yyyy-mm-dd"
- user can feed date in the input field in formats "dd.mm.yyyy", "dd/mm/yyyy" or "dd-mm-yyyy"
- when user changes the selected date, component emits "update:selectedISODate" in format "yyyy-mm-dd"
- in case of multiple datefields on same page, you can use uniqueName string prop to make component id:s unique also between components. This contributes to accessibility.

**Date field:**\
![alt text](https://github.com/laladdin/vue-accessible-date-field/blob/main/src/assets/image-for-readme-1.PNG)

**Date picker** showing selected date with dotted border, focused but not selected date with yellow background color and hovered date with light gray background and pink border.

![alt text](https://github.com/laladdin/vue-accessible-date-field/blob/main/src/assets/image-for-readme-2.PNG)


The W3C documents and the [Date Picker Dialog Example](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html) earlier found on their website have been used to help develop this component. In addition, [Duet Date Picker](https://www.npmjs.com/package/@duetds/date-picker) has influenced in the implementation of localization. The component is not ready yet, but many functionalities are already working.
