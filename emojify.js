var emo = [];

var map = {
  '📈': ['Börse', 'DAX', 'Dax', 'Aktie','Umsatz'],
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
  '⚽': ['Fußball'],
  '🏁': ['Formel 1'],
  '👛': ['Rechnung', 'Belastung'],
  '✈️': ['Airlines', 'Flugzeug', 'Airbus', 'Lufthansa',' Flugreisen','Billigflieger'],
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
  '🍕': ['Pizza'],
  '🏫': ['Schule'],
  '🔫': ['Schießerei','Schüsse'],
  '👔': ['Berater','Steuerberater','Aufsichtsrat','Chefs'],
  '⛳': ['Golf'],
  '🎾': ['Tennis'],
  '🏆': ['Auszeichnung','-Preis'],
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