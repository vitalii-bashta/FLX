let userWinning = 0;
let maxPrizeOnAttempt = 0;
let confirmedPlaying = true;
let prizeMax = 10;
let maxRange = 5;

if (confirm('Do you want to play a game?')) {
    let randomNumber;
    let userNumber;

    while (confirmedPlaying) {
        randomNumber = Math.floor(Math.random() * maxRange);
        for (let i = 1; i <= 3; i++) {
            switch (i) {                   
                case 2:
                    maxPrizeOnAttempt = prizeMax / 2;
                    break;
                case 3:
                    maxPrizeOnAttempt = prizeMax / 5;
                    break;
                default:
                    maxPrizeOnAttempt = prizeMax;
                    break;
            }
            const message =
                `Enter a number from 0 to ${maxRange}\n` +
                `Attempts left: ${4 - i}\n` +
                `Total prize: ${userWinning}\n` +
                `Possible prize on current attempt: ${maxPrizeOnAttempt}`

            userNumber = prompt(message, 0);
            if (userNumber === null) {
                confirmedPlaying = false;
                break;
            }

            if (parseFloat(userNumber) === randomNumber) {
                userWinning += maxPrizeOnAttempt
                alert('Congratulation! Your prize is: ' + userWinning);
                prizeMax *= 3;
                maxRange *= 2;
                confirmedPlaying = confirm('Do you want to continue?');
                break;
            } else if (parseFloat(userNumber) !== randomNumber && i === 3) {
                alert('Thank you for a game. Your prize is: ' + userWinning);
                prizeMax = 10;
                maxRange = 5;
                userWinning = 0;
                confirmedPlaying = confirm('Do you want to play a game?');
            }
        }
    }
}
if (userWinning === 0) {
    alert('You did not become a millionaire, but can.');
}
