const natural = require('natural');
module.exports = {
    userTypes :{
        customer : 'Customer',
        admin  : 'Admin'
    },
    status : {
        Active : 'Active',
        Deactive : 'Deactive'
    },
    registerWith :{
        Email : 'Email',
        google : 'Google',
        facebook : 'Facebook'
    },
    arrayConverterName : (arr) => {
        let playListName = [];
        arr.forEach(el => {
            playListName.push(el.name);
        })
        return playListName
    },
    mapConverter : (map) => {
       let mostPlayedSong = [];
       map.forEach((value,key)=> {
        mostPlayedSong.push(key);
       })
       return mostPlayedSong
    },
    calculateWordAlignmentAccuracy : (recognizedLyrics, originalLyrics)=> {
  const recognizerWords = recognizedLyrics.map(item => item.text.toLowerCase());
  const originalWords = originalLyrics.map(item => item.text.toLowerCase());

  const totalWords = Math.max(recognizerWords.length, originalWords.length);
  let correctWords = 0;

  for (let i = 0; i < Math.min(recognizerWords.length, originalWords.length); i++) {
    const distance = natural.LevenshteinDistance(recognizerWords[i], originalWords[i]);

    // Words are considered aligned if the Levenshtein distance is 0
    if (distance === 0) {
      correctWords++;
    }
  }

  const wordAlignmentAccuracy = (correctWords / totalWords) * 100;
  return wordAlignmentAccuracy;
},
calculateTimingAccuracy :(recognizedLyrics, originalLyrics) =>{
    const totalWords = originalLyrics.length;
   let timingDifference = 0;

  for (let i = 0; i < totalWords; i++) {
    const recognizedTime = recognizedLyrics[i].time;
    const originalTime = originalLyrics[i].time;

    // Compute the absolute timing difference
    timingDifference += Math.abs(recognizedTime - originalTime);
  }

  // Compute average timing difference
  const averageTimingDifference = timingDifference / totalWords;
  const timingAccuracy = 100 - (averageTimingDifference / originalLyrics[totalWords - 1].time) * 100;

  return timingAccuracy;
}
}