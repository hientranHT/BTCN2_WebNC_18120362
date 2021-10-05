import Square from './Square.js'

function Board(props) {
    const n=props.numbers;

    let board=[];
    for (let i = 0; i < n; i++) {
        board.push(
        <div className="board-row">
          {element(i,n,props)}
        </div>)
    }
    return (
      <div>
        <div className="board-row">
          {board}
        </div>
      </div>
  );
}

function renderSquare(i,props) {
    return (
      <Square
        isWinning={props.winningSquares.includes(i)}
        key={"square " + i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
}


function element(i,n,props){
    let elements=[];
    for (let j = 0; j < n; j++) {
      elements.push(renderSquare(n*i+j,props));
    }
    return elements
 }

export default Board
