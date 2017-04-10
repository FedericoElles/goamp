var emo = [];

var map = {
  '📈': ['Börse', 'DAX'],
  '🏭': ['Industrie'],
  '💥': ['Anschlag', 'Bombe'],
  '💰': ['Finanzen'],
  '🗽': ['US-', 'USA'],
  '🗻': ['Japan'],
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