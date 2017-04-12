var emo = [];

var map = {
  '📈': ['Börse', 'DAX', 'Dax', 'Aktie','Umsatz','Jahresbilanz','Aufschwung', 'Konjunktur'],
  '🏭': ['Industrie'],
  '💥': ['Anschlag', 'Anschlägen','Bombe','Terroranschlag','Explosion'],
  '🏦': ['Bank','Notenbank','Zentralbank'],
  '💰': ['Finanzen','Sparprogramm','EZB','Verkauf'],
  '⚖️': ['Gericht'],
  '🗽': ['US-', 'USA'],
  '🗻': ['Japan'],
  '🐉': ['China','chinesischen','Chinesischer'],
  '🏰': ['England'],
  '❤️': ['Erotik'],
  '📺': ['TV-','Fernsehen'],
  '😓': ['Problem'],
  '🚨': ['Polizei'],
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
  '⚕️': ['Medizin'],
  '⛳': ['Golf'],
  '🎾': ['Tennis'],
  '🏆': ['Auszeichnung','-Preis','Sieger'],
  '🚂': ['Zuggeschäft'],
  '🌞': ['Sonnensystem'],
  '💥': ['Crash'],
  '🔥': ['Brandanschlag'],
  '👑': ['Patriarch','Präsident'],
  '👓': ['Schneller schlau'],
  '📄': ['Studie','bericht'],
  '📃': ['Blog','Live-Blog'],
  '💩': ['Shitstorm'],
  '📉': ['Verlust'],
  '🚫': ['Diesel'],
  '🐣': ['Ostern']
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