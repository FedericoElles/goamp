var emo = [];

var map = {
  '📈': ['Börse', 'DAX', 'Aktie'],
  '🏭': ['Industrie'],
  '💥': ['Anschlag', 'Bombe'],
  '🏦': ['Bank'],
  '💰': ['Finanzen'],
  '🗽': ['US-', 'USA'],
  '🗻': ['Japan'],
  '🐉': ['China'],
  '❤️': ['Erotik']
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