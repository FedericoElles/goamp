var emo = [];

var map = {
  '📈': ['Börse', 'DAX', 'Dax', 'Aktie','Umsatz','Jahresbilanz'],
  '🏭': ['Industrie'],
  '💥': ['Anschlag', 'Anschlägen','Bombe','Terroranschlag'],
  '🏦': ['Bank','Notenbank','Zentralbank'],
  '💰': ['Finanzen','Sparprogramm','EZB','Verkauf'],
  '⚖️': ['Gericht'],
  '🗽': ['US-', 'USA'],
  '🗻': ['Japan'],
  '🐉': ['China','chinesischen'],
  '❤️': ['Erotik'],
  '📺': ['TV-','Fernsehen'],
  '😓': ['Problem'],
  '⚽': ['Fußball','Champions League'],
  '🏁': ['Formel 1'],
  '👛': ['Rechnung', 'Belastung'],
  '✈️': ['Airlines', 'Flugzeug', 'Airbus', 'Lufthansa',' Flugreisen','Billigflieger','Eurowings'],
  '🌍': ['Welt'],
  '📱': ['Smartphone'],
  '🎮': ['Nintendo'],
  '⚛️': ['Atomkraftwerk'],
  '👀': ['Google'],
  '👨': ['Facebook'],
  '👴': ['Rente'],
  '🍎': ['Apple'],
  '🚘': ['Autos'],
  '🏠': ['Immobilien','Hausverwaltung'],
  '🍕': ['Pizza','Italien'],
  '🏫': ['Schule'],
  '🔫': ['Schießerei','Schüsse'],
  '👔': ['Berater','Steuerberater','Aufsichtsrat','Chefs','Vorstandchef'],
  '🕒': ['Auszeit','Arbeitszeit'],
  '⛳': ['Golf'],
  '🎾': ['Tennis'],
  '🏆': ['Auszeichnung','-Preis','Sieger'],
  '🚂': ['Zuggeschäft'],
  '🌞': ['Sonnensystem'],
  '👑': ['Patriarch','Präsident'],
  '👓': ['Schneller schlau'],
  '📄': ['Studie'],
  '💩': ['Shitstorm'],
  '📉': ['Verlust'],
  '🚫': ['Diesel']
  //'': [''],

};

var dict = [];

for (var x in map){
  map[x].forEach(function(keyword){
      dict.push({'key': keyword, 'emoji': x });
  });
}

emo.analyse = function(text){
  var r = '';
  for (var x in dict){
    if (text.indexOf(dict[x].key) > -1){
      r = dict[x].emoji;
      break;
    }
  }
  return r;
}


module.exports = emo;