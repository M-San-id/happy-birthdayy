import React, { useState, useEffect } from "react";
import "./MiniGame.css";

// Main App component for the Tic-Tac-Toe game
const MiniGame = () => {
  // State variables for the game
  const [board, setBoard] = useState(Array(9).fill("")); // Game board representation
  const playerSymbol = "🍩"; // Player's symbol (Donut)
  const botSymbol = "🍌"; // Bot's symbol (Banana)
  const [currentPlayer, setCurrentPlayer] = useState(playerSymbol); // Current player, starts with player
  const [gameActive, setGameActive] = useState(true); // Game active status

  // State variables for the modal
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [modalTitle, setModalTitle] = useState(""); // Modal title
  const [modalMessage, setModalMessage] = useState(""); // Modal message

  // Winning patterns (indices of cells that form a winning line)
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  /**
   * Checks if there is a winner on the board.
   * @param {string} symbol - The symbol to check (playerSymbol or botSymbol).
   * @param {Array<string>} currentBoard - The board state to check against.
   * @returns {boolean} - True if there's a winner, false otherwise.
   */
  const checkWin = (symbol, currentBoard) => {
    return winPatterns.some((pattern) => {
      return pattern.every((index) => {
        return currentBoard[index] === symbol;
      });
    });
  };

  /**
   * Checks if the game is a draw.
   * @param {Array<string>} currentBoard - The board state to check against.
   * @returns {boolean} - True if it's a draw, false otherwise.
   */
  const checkDraw = (currentBoard) => {
    return currentBoard.every((cell) => cell !== "");
  };

  /**
   * Displays the game result modal.
   * @param {string} title - Title for the modal.
   * @param {string} message - Message for the modal.
   */
  const showResultModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  /**
   * Handles a click on a game cell.
   * @param {number} index - The index of the clicked cell.
   */
  const handleCellClick = (index) => {
    // Ensure game is active, cell is empty, and it's the player's turn
    if (!gameActive || board[index] !== "" || currentPlayer !== playerSymbol) {
      return;
    }

    // Update the board and UI
    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);

    // Check for win or draw after player's turn
    if (checkWin(playerSymbol, newBoard)) {
      setGameActive(false);
      showResultModal("Swlamat!", `Menang cuy, gacor kangg!!`);
      return;
    }

    if (checkDraw(newBoard)) {
      setGameActive(false);
      showResultModal("Huhuhu", `Seri 😔, ayo coba lagi sayang! 🤝`);
      return;
    }

    // Switch turn to bot
    setCurrentPlayer(botSymbol);
  };

  /**
   * Bot's move logic (designed to lose).
   */
  const botMove = () => {
    if (!gameActive) return;

    const emptyCells = board
      .map((cell, index) => (cell === "" ? index : null))
      .filter((index) => index !== null);

    // If no empty cells, it's a draw (should have been handled earlier)
    if (emptyCells.length === 0) {
      showResultModal("Huhuhu", `Seri 😔, ayo coba lagi sayang! 🤝`);
      setGameActive(false);
      return;
    }

    let chosenMove = -1;

    // Filter out moves that would make the bot win
    const movesThatDontMakeBotWin = emptyCells.filter((index) => {
      const tempBoard = [...board];
      tempBoard[index] = botSymbol;
      // Check if this move would lead to a bot win
      return !checkWin(botSymbol, tempBoard);
    });

    if (movesThatDontMakeBotWin.length > 0) {
      // Pick a random move from those that don't make the bot win
      chosenMove =
        movesThatDontMakeBotWin[
          Math.floor(Math.random() * movesThatDontMakeBotWin.length)
        ];
    } else {
      // This scenario should ideally not be reached if the bot is truly designed to lose.
      // It means ALL available moves would result in the bot winning.
      // In this edge case, the bot is forced to win.
      // We'll still pick a random empty cell as a fallback, but the modal message will reflect this.
      chosenMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    // Perform the chosen move
    if (chosenMove !== -1) {
      const newBoard = [...board];
      newBoard[chosenMove] = botSymbol;
      setBoard(newBoard);

      // Check for win or draw after bot's turn
      if (checkWin(botSymbol, newBoard)) {
        setGameActive(false);
        showResultModal("Yaahhh", `Ayo coba lagi!!, semangat sayang!!💖💝`); // Surprise message if bot wins
        return;
      }

      if (checkDraw(newBoard)) {
        setGameActive(false);
        showResultModal("Huhuhu", `Seri 😔, ayo coba lagi sayang! 🤝`);
        return;
      }

      // Switch turn back to player
      setCurrentPlayer(playerSymbol);
    }
  };

  // UseEffect to trigger bot's move when it's bot's turn
  useEffect(() => {
    // Only trigger bot's move if it's bot's turn and the game is active
    if (currentPlayer === botSymbol && gameActive) {
      const timer = setTimeout(botMove, 700); // Small delay for bot move
      return () => clearTimeout(timer); // Cleanup timer if component unmounts or state changes
    }
  }, [currentPlayer, gameActive, board]); // Dependencies for useEffect

  /**
   * Resets the game to its initial state.
   */
  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer(playerSymbol);
    setGameActive(true);
    setModalVisible(false); // Hide the modal
  };

  return (
    <>
      <div className="miniGame-container">
        <div className="game-container">
          <h1 className="game-title">Tic-Tac-Toe</h1>
          <div id="gameMessage" className="game-message">
            Giliran{" "}
            {currentPlayer === playerSymbol
              ? `kamu (${playerSymbol})`
              : `Bot (${botSymbol})`}
          </div>
          <div className="game-board" id="gameBoard">
            {board.map((cell, index) => (
              <div
                key={index}
                className={`cell ${cell !== "" ? "occupied" : ""}`}
                onClick={() => handleCellClick(index)}
              >
                {cell}
              </div>
            ))}
          </div>
        </div>

        {/* Modal for game results */}
        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <h2 id="modalTitle">{modalTitle}</h2>
              <p id="modalMessage">{modalMessage}</p>
              <button onClick={resetGame}>Main Lagi</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MiniGame;
