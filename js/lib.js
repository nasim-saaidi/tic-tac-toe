function updateArray(element, index) {
    if (element.classList.contains("x-filled")) {
        arr[index] = 1;
    } else if (element.classList.contains("o-filled")) {
        arr[index] = -1;
    }
}

function xWinConfirm() {
    pointsPlayerX = parseInt(localStorage.getItem("Xpoints"));
    pointsPlayerX++;
    localStorage.setItem("Xpoints", pointsPlayerX);
    pointsX.textContent = pointsPlayerX;
    if (window.localStorage.getItem('playerOneName') == '') {
        alert("player X won")
    }
    else {
        alert(window.localStorage.getItem('playerOneName') + ' won')
    }
    gameOver = true;
}

function yWinConfirm() {
    pointsPlayerO = parseInt(localStorage.getItem("Opoints"));
    pointsPlayerO++;
    localStorage.setItem("Opoints", pointsPlayerO);
    pointsY.textContent = pointsPlayerO;
    if (window.localStorage.getItem('playerTwoName') == '') {
        alert("player O won")
    }
    else {
        alert(window.localStorage.getItem('playerTwoName') + ' won')
    };
    gameOver = true;
}

const save = document.querySelector('.save-name');

save.addEventListener('click', myFunction);

function myFunction() {
    window.localStorage.setItem('playerOneName', input.value);
    window.localStorage.setItem('playerTwoName', input2.value);
}

function generateRandomNumber() {
    return Math.round(Math.random() * 9);
}

function botPressO() {
    if (!arr.includes(0)) {
        return
    }
    let randomMove = -1;
    while (arr[randomMove] != 0 && arr.includes(0)) {
        randomMove = generateRandomNumber();
    }
    arr[randomMove] = -1;
    buttons[randomMove].classList.add("o-filled");
}

const bot = document.querySelector('.pve');

bot.addEventListener('click', activatePve);

function activatePve() {
    pvp = false;
    movementCheck();
}

const regular = document.querySelector('.pvp');

regular.addEventListener('click', activatePvp);

function activatePvp() {
    pvp = true;
    movementCheck();
}

function tieChecker() {
    if (tie != false && !arr.includes(0)) {
        alert("you tied");
    }
}

function winCheck() {
    if (arr[0] + arr[3] + arr[6] == 3) {
        xWinConfirm();
        tie = false;
    }
    else if (arr[0] + arr[3] + arr[6] == -3) {
        yWinConfirm();
        tie = false;
    }
    else if (arr[1] + arr[4] + arr[7] == 3) {
        xWinConfirm();
        tie = false;
    }
    else if (arr[1] + arr[4] + arr[7] == -3) {
        yWinConfirm();
        tie = false;
    }
    else if (arr[2] + arr[5] + arr[8] == 3) {
        xWinConfirm();
        tie = false;
    }
    else if (arr[2] + arr[5] + arr[8] == -3) {
        yWinConfirm();
        tie = false;
    }
    else if (arr[0] + arr[1] + arr[2] == 3) {
        xWinConfirm();
        tie = false;
    }
    else if (arr[0] + arr[1] + arr[2] == -3) {
        yWinConfirm();
        tie = false;
    }
    else if (arr[3] + arr[4] + arr[5] == 3) {
        xWinConfirm();
        tie = false;
    }
    else if (arr[3] + arr[4] + arr[5] == -3) {
        yWinConfirm();
        tie = false;
    }
    else if (arr[6] + arr[7] + arr[8] == 3) {
        xWinConfirm();
        tie = false;
    }
    else if (arr[6] + arr[7] + arr[8] == -3) {
        yWinConfirm();
        tie = false;
    }
    else if (arr[0] + arr[4] + arr[8] == 3) {
        xWinConfirm()
        tie = false;
    }
    else if (arr[0] + arr[4] + arr[8] == -3) {
        yWinConfirm();
        tie = false;
    }
    else if (arr[6] + arr[4] + arr[2] == 3) {
        xWinConfirm();
        tie = false;
    }
    else if (arr[6] + arr[4] + arr[2] == -3) {
        yWinConfirm();
        tie = false;
    }
}

function movementCheck() {
    if (pvp == true) {
        buttons.forEach((element, index) => {
            buttons[index].addEventListener("click", () => {
                if (arr[index] == 0) {
                    if (gameOver == false) {
                        switch (turn) {
                            case "x":
                                element.classList.add('x-filled');
                                updateArray(element, index);
                                winCheck();
                                tieChecker();
                                turn = 'y';
                                break;
                            case "y":
                                element.classList.add('o-filled')
                                updateArray(element, index);
                                winCheck();
                                tieChecker();
                                turn = 'x';
                                break;
                        }
                    }
                }
            })
        })
    }
    else if (pvp == false) {
        buttons.forEach((element, index) => {
            buttons[index].addEventListener("click", () => {
                if (arr[index] == 0) {
                    if (gameOver == false) {
                        element.classList.add('x-filled');
                        updateArray(element, index);
                        botPressO();
                        updateArray(element, index);
                        winCheck();
                        tieChecker();
                    }
                }
            })
        });
    }
}