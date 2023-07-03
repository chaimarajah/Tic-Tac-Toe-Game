console.log('Hello from main.js')

let cellsEl = document.querySelectorAll('.cell');
let msgEl = document.querySelector(('#msg'));

let playersStick= ['X' , 'O'];
let playersName = ['Player 1' , 'Player 2'];
let playersScore = [
    localStorage.getItem('player0') && !isNaN(localStorage.getItem('player0')) ? localStorage.getItem('player0') : 0,
    localStorage.getItem('player1') && !isNaN(localStorage.getItem('player1')) ? localStorage.getItem('player1') : 0
]; //array of int (start of game)

console.log(playersScore);

let currentPlayer = 0;
let end = false;
let winner = false;

// To show the default players name
let namePlayer1El = document.querySelectorAll("#player1 .name");
let namePlayer2El = document.querySelectorAll("#player2 .name");
namePlayer1El.forEach(el => el.innerHTML = playersName[0]);
namePlayer2El.forEach(el => el.innerHTML = playersName[1]);

// To show the default players score
let scorePlayer1El = document.querySelectorAll("#player1 .score");
let scorePlayer2El = document.querySelectorAll("#player2 .score");
scorePlayer1El.forEach(el => el.innerHTML = playersScore[0]);
scorePlayer2El.forEach(el => el.innerHTML = playersScore[1]);

// Show the msg div, when we add text inside
function showMsg(msg) {
    msgEl.innerHTML = msg;
    msgEl.style.display = 'block';
};

// Hide the msg div, when it's finished
const hideMsg = () => {
    msgEl.innerHTML = '';
    msgEl.style.display = 'none';
};

// Function that verifies if there is a winner
const verify = () => {
    let found = false;
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    winningCombinations.forEach(combination => {
        if (
            cellsEl[combination[0]].innerHTML == playersStick[currentPlayer] &&
            cellsEl[combination[1]].innerHTML == playersStick[currentPlayer] &&
            cellsEl[combination[2]].innerHTML == playersStick[currentPlayer]
        ) {
            winner = currentPlayer;
            console.log(currentPlayer + "win !");
            //alert(currentPlayer + "WIN" )
        }
    });

    // If no winner found, check if all the cells have been played
    if (winner === false) {
        console.log('Enter no winner !')
        cellsEl.forEach(cellEl => {
            if (cellEl.innerHTML == '') {
                found = true;
            }
        });
    }

    console.log(found, winner);

    if (!found || winner !== false) {
        end = true;
    }
};

cellsEl.forEach(cellEl => {
    cellEl.addEventListener('click', function(event) {
        hideMsg();

        if (!end) {

            if (event.target.innerHTML == '') {
                event.target.innerHTML = playersStick[currentPlayer];

                //verify here
                //console.log(end);
                verify();
                //console.log(end);

                if (!end) {

                    if (currentPlayer == 0) {
                        currentPlayer = 1;
                    } else {
                        currentPlayer = 0;
                    }
                } else {
                    if (winner === false) {
                        showMsg('Game ended - No winner !');
                    } else {
                        if (currentPlayer == 0) {
                            scorePlayer1El.forEach(el => el.innerHTML = ++playersScore[currentPlayer]);
                        } else {
                            scorePlayer2El.forEach(el => el.innerHTML = ++playersScore[currentPlayer]);
                        }

                        //Storing score in DB
                        localStorage.setItem('player' + currentPlayer, playersScore[currentPlayer]);

                        showMsg('Game ended - ' + playersName[winner] + ' win! <a href="">Play Again </a>');
                    }
                }

            } else {
                //alert('Already played ! ');
                showMsg('Already played !');
            }

        } else {
            showMsg('Game already ended ! <a href="">Play Again </a>');
        }
    });
});
