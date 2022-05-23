import { Localization } from '@/ilocalization'

export const localizationDefaultDataSv: Localization = {
  locale: 'sv-SE',
  placeholderText: 'T.ex. dd.mm.åååå',
  dateFormatString: 'datumformat: ',
  wordOrTranslated: 'eller',
  dateFormatOptions: ['dd.mm.åååå', 'dd-mm-åååå', 'dd/mm/åååå'],
  generalDateFieldError: 'Datumformatet du angav är ogiltigt',
  keyboardNavInstructions: 'Du kan bläddra igenom kalenderinnehållet med följande tangenter:' +  
  'TAB-tangent: Flytta fokus mellan piltangenter, måldatum samt OK och Avbryt på skärmen, ' +
  'vänsterpil: gå till föregående dag, ' +
  'högerpil: Gå till nästa dag, ' +
  'uppåtpil: gå till samma veckodag förra veckan, ' +
  'nedåtpil: gå till samma veckodag nästa vecka, ' +
  'HOME: gå till den första dagen i samma vecka, ' +
  'END: gå till den sista dagen i samma vecka, ' +
  'PAGE DOWN: gå till föregående månad ,' +
  'SHIFT + PAGE DOWN: gå till föregående år, ' +
  'PAGE UP: gå till nästa månad, ' +
  'SHIFT + PAGE UP: gå till nästa år, ' +
  'ENTER: välj den inriktade dagen och stäng kalendern, ' +
  'SPACE: välj en inriktad dag, kalendern förblir öppen, ' +
  'ESC: stäng kalendern',
  buttonLabelChoose: 'Välj ett datum',
  buttonLabelChange: 'Ändra det valda datumet, ',
  buttonLabelPreviousMonth: 'Gå till föregående månad',
  buttonLabelPreviousYear: 'Gå till föregående år',
  buttonLabelNextMonth: 'Gå till nästa månad',
  buttonLabelNextYear: 'Gå till nästa år',
  dayNames: ['måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag', 'söndag'],
  dayNamesShort: ['må', 'ti', 'on', 'to', 'fr', 'lö', 'sö'], 
  monthNames: ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'],
  monthNamesForMessage: ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'],  
  selectFocusedButtonLabel: 'OK',
  cancelButtonLabel: 'Avbryt'
}