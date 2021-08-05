var scoreList = document.querySelector("#scores");
var clearHighscoresBtn = document.querySelector("#clearHighscores")

function loadScores(){
    var scores = localStorage.getItem('scores');
    var scoresList = JSON.parse(scores);
    if(scoresList !== null){
        for(let i = 0; i < scoresList.length; i++){
            let currentScore = scoresList[i];
            let tempListItem = document.createElement('li');
            tempListItem.innerHTML = ("Initials: "+ currentScore.initials + " score: " + currentScore.score)
            scoreList.appendChild(tempListItem);
        
        }
    }
}

function removeScores(){
     scoreList.innerHTML = ''
     localStorage.setItem('scores', null);
}
loadScores();
clearHighscoresBtn.addEventListener("click", removeScores);