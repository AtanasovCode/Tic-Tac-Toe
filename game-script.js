const gameBoard = (function(){
    //Create Players
    const playerFactory = (name, symbol, turn) => {
        return {
            name,
            symbol,
            turn
        };
    };

    const player1 = playerFactory("Player1", "X", true);
    const player2 = playerFactory("Player2", "O", false);

    let p1 = document.querySelector("#p1");
    let p2 = document.querySelector("#p2");


    let winner = null;
    let turns = 0;

    let board = [];
    
    //Function when making a move
    const playerTurn = (function() {
        const board = document.querySelectorAll(".item");
        board.forEach(item => {
            item.addEventListener("click", e => {
                //X moves if conditions are met
                if(player1.turn === true && winner === null && e.target.textContent === "") {
                    board[e.target.id] = player1.symbol;
                    item.textContent = player1.symbol;
                    item.classList.add("x");
                    p2.classList.add("turn");
                    p1.classList.remove("turn");

                    player1.turn = false;
                    player2.turn = true;
                    winCheck();
                    printWinner();
                } 
                //O moves if conditions are met
                else if(player2.turn === true && winner === null && e.target.textContent === "") {
                    board[e.target.id] = player2.symbol;
                    item.textContent = player2.symbol;
                    item.classList.add("o");
                    p1.classList.add("turn");
                    p2.classList.remove("turn");

                    player1.turn = true;
                    player2.turn = false;
                    winCheck();
                    printWinner();
                }
                else {
                    return;
                }
            })
        })

        const winCheck = () => {
            turns++;

            if(turns === 9) {
                if(winner === null) {
                    winner = "Tie";
                }
            }

            for(let i = 0; i < board.length; i++) {
                if(i === 1 || i === 4 || i === 7) {
                    if(board[i].innerText !== "" && board[i].innerText === board[i - 1].innerText && board[i].innerText === board[i + 1].innerText) {
                        winner = board[i].innerText;
                    }
                }
                if(i === 4) {
                    if(board[i].innerText !== "" && board[i].innerText === board[i + 4].innerText && board[i].innerText === board[i - 4].innerText) {
                        winner = board[i].innerText;

                    }
                    if(board[i].innerText !== "" && board[i].innerText === board[i + 2].innerText && board[i].innerText === board[i - 2].innerText) {
                        winner = board[i].innerText;
                    }
                }
                if(i === 0 || i === 1 || i === 2) {
                    if(board[i].innerText !== "" && board[i].innerText === board[i + 3].innerText && board[i].innerText === board[i + 6].innerText) {
                        winner = board[i].innerText;
                    }
                }
            }
            if(winner !== null) {
                for(let y = 0; y < board.length; y++) {
                    if(board[y].textContent === "") {
                        board[y].classList.add("disabled");
                    }
                }
            }
            return winner;
        }

        const printWinner = () => {
            if(winner !== null) {
                p1.classList.remove("turn");
                p2.classList.remove("turn");
                document.querySelector(".winner").textContent = winner;
            }
        }

        const gameReset = () => {
            document.querySelector(".winner").textContent = "";
            winner = null;
            turns = 0;
            p1.classList.add("turn");
            p2.classList.remove("turn");
            player1.turn = true;
            player2.turn = false;
            board.forEach(key => {
                key.textContent = "";
                key.classList.remove("x");
                key.classList.remove("o");
                key.classList.remove("disabled");
            })
        }

        let resetBtn = document.querySelector(".button-reset");
        resetBtn.addEventListener("click", gameReset);

    })();
})();