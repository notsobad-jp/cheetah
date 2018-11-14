var data = null;
var url = 'https://gist.githubusercontent.com/wakaba/8363dc27f4c54f76b4a7/raw/hyakunin.json';
fetch(url).then(function(response) {
  return response.json();
}).then(function(json) {
  data = json;
});


document.addEventListener('DOMContentLoaded', function(){
  var result = document.getElementById('result');
  var suggestion = document.getElementById('suggestion');
  var r = new webkitSpeechRecognition();
  r.lang = 'ja-JP';
  r.continuous = true;
  r.interimResults = true;

  r.onresult = function(e) {
    for (var i = e.resultIndex; i < e.results.length; ++i) {
      var str = e.results[i][0].transcript;
      result.innerText = str;

      if(str.length > 4) {
        var filteredData = getNearest(str);
        suggestion.textContent = null;
        for(var j=0; j<1; j++) {
          var li = document.createElement("li");
          var textNode = document.createTextNode(filteredData[j].bodyKanji);
          li.appendChild(textNode);
          suggestion.appendChild(li);
        }
      }
    }
  }

  document.getElementById('start').addEventListener('click', function(){
    r.start();
  });
  document.getElementById('stop').addEventListener('click', function(){
    r.stop();
  });
}, false);


function getNearest(text) {
  var filteredData = data.sort(function(a,b){
    var scoreA = 0;
    var scoreB = 0;
    for(var i=0; i <= text.length; i++) {
      if(a.bodyKanji.indexOf(text[i]) > -1) { scoreA++; }
      if(b.bodyKanji.indexOf(text[i]) > -1) { scoreB++; }
    }
    if(scoreA > scoreB) return -1;
    if(scoreA < scoreB) return 1;
    return 0;
  });
  return filteredData;
}
