let boxes = document.querySelectorAll(".box"); //All boxes

let turnOf_O = true; // flag for player turn;

// All Winning pattern
const winningPatterns = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row

    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column

    [0, 4, 8], // main diagonal
    [2, 4, 6], // anti-diagonal
];

// Function to disable a box after it has been clicked
const disabledBlock = (box) => {
    box.classList.add('disabled');
}

// Variable to hold the confetti interval
let confettiInterval;
const celebrate = (msg) => {

    // Always clear any previous confetti interval before starting a new one
    if (confettiInterval) {
        clearInterval(confettiInterval);
        confettiInterval = null;
    }

    // Show modal
    document.getElementById('msgPopup').classList.add('show');

    // Inject text
    document.getElementById('winnerMessageTxt').innerText = msg;

    // Optional: also trigger immediately on show
    confetti({
        particleCount: 60,
        spread: 100,
        origin: { y: 0.6 }
    });

    // Start repeating confetti every 3 seconds
    confettiInterval = setInterval(() => {
        confetti({
            particleCount: 60,
            spread: 100,
            origin: { y: 0.6 }
        });
    }, 5000);
}


function closePopup() {
    // Hide modal and clear confetti interval
    document.getElementById('msgPopup').classList.remove('show');
    if (confettiInterval) {
        clearInterval(confettiInterval); // Clear the confetti interval if it exists
        confettiInterval = null; // Reset the variable to avoid multiple intervals
    }
    resetGame();
}


// Function to reset the game
function resetGame() {
    boxes.forEach((box) => {
        box.innerHTML = ''; // Clear the content of each box
        box.classList.remove('disabled'); // Remove the disabled class
    });
    turnOf_O = true; // Reset the turn to O
}

// Function to check if there is a winner
const checkWinner = () => {

    let winnerFound = false;

    for (let pattern of winningPatterns) {

        // Extracting the values from the boxes based on the winning pattern
        let pos1_val = boxes[pattern[0]].innerText;
        let pos2_val = boxes[pattern[1]].innerText;
        let pos3_val = boxes[pattern[2]].innerText;

        if (pos1_val !== '' && pos2_val !== '' && pos3_val !== '') {
            if (pos1_val === pos2_val && pos2_val === pos3_val) {
                celebrate(`${pos1_val} Wins the Game! 🎉`);
                winnerFound = true; // Set the flag to true when a winner is found
                return; // Exit the function after finding a winner
            }
        }

        // Check for a draw condition
        if (!winnerFound) {

            let allFilled = true;
            for (let box of boxes) {
                if (box.innerText === '') {
                    allFilled = false;
                    break;
                }
            }

            if (allFilled) {
                celebrate(`🤝 It’s a draw! Fair and square.`);
            }
        }

        // const [a, b, c] = pattern; //Destructuring the pattern array

        // console.log(`Checking pattern: ${a}, ${b}, ${c}`);

        // const val1 = boxes[a].innerText;
        // const val2 = boxes[b].innerText;
        // const val3 = boxes[c].innerText;

        // if(val1 !== '' && val2 !== '' && val3 !== ''){
        //     if(val1 === val2 && val2 === val3){
        //         console.log(`${val1} is winner`);
        //         celebrate((`${val1} is winner`));
        //     }
        // }
    }
}

// Adding click event listener to each box
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnOf_O == true) {
            box.innerHTML = "O";
            turnOf_O = false;
        } else {
            box.innerHTML = "X";
            turnOf_O = true;
        }

        disabledBlock(box); // Disable the box after it has been clicked
        checkWinner(); // Check for a winner after each move
    })

})
