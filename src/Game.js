import Board from './Board';
import React, { useState } from 'react';


function Game(){
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
  }]);
  const [stepNumber,setstepNumber] = useState(0);
  const [xIsNext,setxIsNext] = useState(true);
  const [isDescending,setisDescending] = useState(true);
  const [istype10x10,setistype10x10] = useState(true);
  const [numbers,setnumbers] = useState(10);

  function handleClick(i) {
    let locations10x10=[]
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++)
      {
        locations10x10.push([i,j]);
      }
    }
    let locations20x20=[]
    for (let i = 1; i <= 20; i++) {
      for (let j = 1; j <= 20; j++)
      {
        locations20x20.push([i,j]);
      }
    }

    const currenthistory = history.slice(0, stepNumber + 1);
    const current = currenthistory[currenthistory.length - 1];
    const squares = current.squares.slice();


    if (calculateWinner(squares,numbers) || squares[i]) {
      return;
    }
   
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(currenthistory.concat([{
      squares: squares,
      location: istype10x10 ? locations10x10[i] : locations20x20[i],
    }]));
    setstepNumber(currenthistory.length);
    setxIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setstepNumber(step);
    setxIsNext((step % 2) === 0);
  }

  function sortHistory() {
    setisDescending(!isDescending);
  }

  function changType(){
    const temp = istype10x10? 20:10;
    setistype10x10(!istype10x10);
    setnumbers(temp);
  }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares,numbers);
    const moves = history.map((step, move) => {
      const desc = move 
      ? "Go to move Step " + move + " ---- " + history[move].location 
      : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>
            {move === stepNumber ? <b>{desc}</b> : desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner.player;
    }

    else {
      if (CheckDraw(current.squares)) {
        status = 'A Draw Game';
      } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
      }
      
    }

    return (
      <div className="game">
        <div className="game-board">
          {istype10x10 ? 
          <Board
            winningSquares={winner ? winner.line : []}
            squares={current.squares}
            onClick={(i) => handleClick(i)}
            numbers={numbers}
          /> : 
          <Board
            winningSquares={winner ? winner.line : []}
            squares={current.squares}
            onClick={(i) => handleClick(i)}
            numbers={numbers}
          />}
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{isDescending ? moves : moves.reverse()}</ol>
            <button onClick={() => sortHistory()}>
              Sort by: {isDescending ? "Descending" : "Asending"}
            </button>
        </div>
        <ol> <button onClick={() => changType()}>
            Chang Type: {istype10x10 ? "20X20" : "10X10"}
        </button></ol>
      </div>
    );
}

function CheckDraw(squares){
    for (let i = 0; i < squares.length; i++) {
      if(squares[i]==null)
      {
        return false;
      }
    }
    return true;
}

function calculateWinner(squares,n) {
let arr=[];
let pos=[];
for (var i = 1; i <= 25; i++) {
    arr.push(null);
    pos.push(i);
 }

 for (let l = 0; l <=n-5; l++) {
  for (let k = 0; k <= n-5; k++) {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        arr[i*5+j]=squares[n*(i+l)+j+k];
        pos[i*5+j]=n*(i+l)+j+k;
      } 
    }
    
    let result= calculateWinner5x5(arr,pos,l,k,n);
    if(result)
    {
      return result;
    }
   }
 }
 
  return null;
}
 
function calculateWinner5x5(squares,pos,l,k,n) {
  const lines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12,13,14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];
 var lines_diff;
if (n===10) {
    lines_diff = [
    [0, 1, 2, 3, 4],
    [10, 11, 12,13,14],
    [20, 21, 22, 23, 24],
    [30, 31, 32, 33, 34],
    [40, 41, 42, 43, 44],
    [0, 10, 20, 30, 40],
    [1, 11, 21, 31, 41],
    [2, 12, 22, 32, 42],
    [3, 13, 23, 33, 43],
    [4, 14, 24, 34, 44],
    [0, 11, 22, 33, 44],
    [4, 13, 22, 31, 40],
  ];
} else {
    lines_diff = [
    [0, 1, 2, 3, 4],
    [20, 21, 22, 23, 24],
    [40, 41, 42, 43, 44],
    [60, 61, 62, 63, 64],
    [80, 81, 82, 83, 84],
    [0, 20, 40, 60, 80],
    [1, 21, 41, 61, 81],
    [2, 22, 42, 62, 82],
    [3, 23, 43, 63, 83],
    [4, 24, 44, 64, 84],
    [0, 21, 42, 63, 84],
    [4, 23, 42, 61, 80],
  ];
}
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] 
      && squares[a] === squares[d] && squares[a] === squares[e]) {

      let x = lines_diff[i].map(function(index) {
        console.log(index); 
        console.log(n);
        console.log(l);
        console.log(k);
        return index + n*l+k ;
      })
     
      return { player: squares[a], line:  x };
    }
  }
  return null;
}



export default Game