import React from 'react';
import ReactDOM from 'react-dom/client';
import './dist/index.css';

function Square(props) {
     return (
          <button className="square" onClick={props.onTap}>
               {props.value}
          </button>
     );
}

class Board extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               history: [],
               squares: Array(9).fill(null),
               nextPlayer: 'X',
               winner: null,
               isGameOver: false,
          };
     }

     renderSquare(i) {
          return <Square value={this.state.squares[i]} onTap={() => {
               if (this.state.isGameOver) return;
               let squares = this.state.squares.slice();
               if (squares[i] != null) return;
               let value = this.state.nextPlayer;
               squares[i] = value;
               let winner = calculateWinner(squares);
               let isBoardFilled = squares.every((e) => e != null);
               let history = this.state.history.slice();
               history.push(this.state.squares)
               this.setState({
                    ...this.state,
                    winner: winner,
                    isGameOver: isBoardFilled || winner != null,
                    squares: squares,
                    nextPlayer: value === 'X' ? 'O' : 'X',
                    history: history
               });
          }} />;
     }

     render() {
          const status = `Next player: ${this.state.nextPlayer}`;
          let heading = null;
          if (this.state.isGameOver) {
               if (this.state.winner) {
                    heading = <h1>Winner is {this.state.winner}</h1>
               } else {
                    heading = <h1>Game Drawn</h1>
               }
          }

          return (
               <div>
                    {heading}
                    <div className="status">{status}</div>
                    <div className="board-row">
                         {this.renderSquare(0)}
                         {this.renderSquare(1)}
                         {this.renderSquare(2)}
                    </div>
                    <div className="board-row">
                         {this.renderSquare(3)}
                         {this.renderSquare(4)}
                         {this.renderSquare(5)}
                    </div>
                    <div className="board-row">
                         {this.renderSquare(6)}
                         {this.renderSquare(7)}
                         {this.renderSquare(8)}
                    </div>
                    <div className='undo-button'>
                         <button id='undo' onClick={() => {
                              let history = this.state.history.slice();
                              if (history.length < 1) {
                                   return;
                              }
                              let squares = history.pop();
                              this.setState({
                                   ...this.state,
                                   history: history,
                                   squares: squares,
                                   nextPlayer: this.state.nextPlayer === 'X' ? 'O' : 'X',
                                   isGameOver: false,
                                   winner: null
                              })
                         }}>Undo</button>
                    </div>
               </div>
          );
     }
}

class Game extends React.Component {
     render() {
          return (
               <div className="game">
                    <div className="game-board">
                         <Board />
                    </div>
                    <div className="game-info">
                         <div>{/* status */}</div>
                         <ol>{/* TODO */}</ol>
                    </div>
               </div>
          );
     }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
     const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
     ]
     for (let i in lines) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
               return squares[a];
          }
     }
     return null;
}