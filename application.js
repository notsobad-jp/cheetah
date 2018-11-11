function logCreator(type) {
  return function(e) {
    console.log(type, e);
  }
}

var r = new webkitSpeechRecognition();

var eventTypes = [
  'audioend',
  'audiostart',
  'end',
  'error',
  'nomatch',
  'result',
  'soundend',
  'soundstart',
  'speechend',
  'speechstart',
  'start',
];

for(var i = 0; i < eventTypes.length; i++) {
  r.addEventListener(eventTypes[i], logCreator(eventTypes[i]));
}

r.lang = 'ja-JP';
r.continuous = true;
r.interimResults = true;
r.start();
