import { Localization } from '@/ilocalization'

export const localizationDefaultDataFi: Localization = {
  locale: 'fi-FI',
  placeholderText: 'esim. pp.kk.vvvv',
  dateFormatString: 'päivämäärän muoto: ',
  wordOrTranslated: 'tai',
  dateFormatOptions: ['pp.kk.vvvv', 'pp-kk-vvvv', 'pp/kk/vvvv'],
  generalDateFieldError: 'Syöttämäsi päivämäärän muoto "{0}" ei kelpaa. Syötä päivämäärä jossakin seuraavista muodoista: ',
  keyboardNavInstructions: 'Kalenterin sisältöä voi selata näppäimistöltä seuraavilla painikkeilla: ' +
  'sarkainpainike: siirrä kohdistusta nuolipainikkeiden, kohdistetun päivämäärän sekä OK- ja Peruuta -painikkeiden välillä, ' +
  'nuoli vasemmalle: siirry edelliseen päivään, ' +
  'nuoli oikealle: Siirry seuraavaan päivään, ' +  
  'nuoli ylös: siirry edellisen viikon samaan viikonpäivään, ' +
  'nuoli alas: siirry seuraavan viikon samaan viikonpäivään, ' +
  'HOME-näppäin: siirry saman viikon ensimmäiseen päivään, ' +
  'END-näppäin: siirry saman viikon viimeiseen päivään, ' +
  'PAGE DOWN -näppäin: siirry edelliseen kuukauteen, ' +
  'SHIFT + PAGE DOWN -näppäin: siirry edelliseen vuoteen, ' +
  'PAGE UP -näppäin: siirry seuraavaan kuukauteen, ' +
  'SHIFT + PAGE UP -näppäin: siirry seuraavaan vuoteen, ' +
  'ENTER: valitse kohdistettu päivä ja sulje kalenteri, ' +
  'SPACE: valitse kohdistettu päivä, kalenteri pysyy auki, ' +
  'ESC: sulje kalenteri',
  buttonLabelChoose: 'Valitse päivämäärä',
  buttonLabelChange: 'Muuta valittua päivämäärää, ',
  buttonLabelPreviousMonth: 'Siirry edelliseen kuukauteen',
  buttonLabelPreviousYear: 'Siirry edelliseen vuoteen',
  buttonLabelNextMonth: 'Siirry seuraavaan kuukauteen',
  buttonLabelNextYear: 'Siirry seuraavaan vuoteen',
  dayNames: ['maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai', 'sunnuntai'],
  dayNamesShort: ['ma', 'ti', 'ke', 'to', 'pe', 'la', 'su'], 
  monthNames: ['tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu'],
  monthNamesForMessage: ['tammikuuta', 'helmikuuta', 'maaliskuuta', 'huhtikuuta', 'toukokuuta', 'kesäkuuta', 'heinäkuuta', 'elokuuta', 'syyskuuta', 'lokakuuta', 'marraskuuta', 'joulukuuta'],  
  selectFocusedButtonLabel: 'OK',
  cancelButtonLabel: 'Peruuta'
}