//clears HighScore
let clearHighscores = document.querySelector("#clear");

//Sort the scores descending order
let highscores = JSON.parse(localStorage.getItem("Initials")) || [];
highscores.sort(function (x, y) {
    return y.Score - x.Score;
});
let olEl = document.getElementById("highscores");

//Sort the scores into a list
for (let i = 0; i < highscores.length; i++){
    let liEl = document.createElement("li");
    liEl.textContent = highscores[i].Initials + " - " + highscores[i].Score;
    olEl.appendChild(liEl);
}

//local storage clearing
clearHighscores.addEventListener("click", function (event) {
    if (event.target === clearHighscores) {
        localStorage.clear();
        window.location.reload(true);
    }
    return
});
