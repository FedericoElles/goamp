var emo = [];

var map = {
  '📈': ['Börse', 'DAX', 'Dax', 'Aktie'],
  '🏭': ['Industrie'],
  '💥': ['Anschlag', 'Anschlägen','Bombe'],
  '🏦': ['Bank','Notenbank','Zentralbank'],
  '💰': ['Finanzen','Sparprogramm'],
  '⚖️': ['Gericht'],
  '🗽': ['US-', 'USA'],
  '🗻': ['Japan'],
  '🐉': ['China','chinesischen'],
  '❤️': ['Erotik'],
  '📺': ['TV-','Fernsehen'],
  '😓': ['Problem'],
  '⚽': ['Fußball'],
  '🏁': ['Formel 1'],
  '👛': ['Rechnung'],
  '✈️': ['Airlines', 'Flugzeug', 'Airbus', 'Lufthansa',' Flugreisen'],
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