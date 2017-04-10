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
  '🐉': ['China'],
  '❤️': ['Erotik'],
  '📺': ['TV-'],
  '😓': ['Problem'],
  '⚽': ['Fußball'],
  '🏁': ['Formel 1'],
  '👛': ['Rechnung'],
  '✈️': ['Airlines', 'Flugzeug'],
  '🌍': ['Welt'],
  '📱': ['Smartphone'],
  '🎮': ['Nintendo'],
  '⚛️': ['Atomkraftwerk'],
  '👀': ['Google'],
  '👨': ['Facebook'],
  '🍎': ['Apple'],
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