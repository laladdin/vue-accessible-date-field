import { Localization } from '@/ilocalization'

export const localizationDefaultDataSv: Localization = {
  locale: 'sv-SE',
  placeholderText: 'T.ex. dd.mm.åååå',
  dateFormatString: 'datumformat: ',
  wordOrTranslated: 'eller',
  dateFormatOptions: ['dd.mm.åååå', 'dd-mm-åååå', 'dd/mm/åååå'],
  generalDateFieldError: 'Datumformatet du angav är ogiltigt',
  keyboardNavInstructions: 'Du kan bläddra igenom kalenderinnehållet med följande knappar:' +  
  'Tab-knapp: Flytta fokus mellan pilknapparna, måldatumet och knapparna OK och Avbryt, ' +
  'vänsterpil: gå till föregående dag, ' +
  'högerpil: Gå till nästa dag, ' +
  'uppåtpil: gå till samma veckodag förra veckan, ' +
  'nedåtpil: gå till samma veckodag nästa vecka, ' +
  'HEM-knapp: gå till den första dagen i samma vecka, ' +
  'END-tangent: gå till den sista dagen i samma vecka, ' +
  'PAGE DOWN-tangent: gå till föregående månad ,' +
  'SHIFT + PAGE DOWN-tangent: gå till föregående år, ' +
  'PAGE UP-tangent: gå till nästa månad, ' +
  'SHIFT + PAGE UP-tangent: gå till nästa år, ' +
  'ENTER: välj den inriktade dagen och stäng kalendern, ' +
  'UTRYMME: välj en inriktad dag, kalendern förblir öppen, ' +
  'ESC: stäng kalender',
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