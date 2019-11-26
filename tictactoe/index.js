'use strict'

  //Agrego un "constructor a la clase para inicializar el "estado"*/
  /*Se eliminó el constructor porque Square ya no llega en segimiento del estado del juego

  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  */

  //render()
  function Square(props) {
    return (
      //Al clikear cualquier botón, me salta una alerta
      <button
        className="square"
        onClick={props.onClick}>
          {props.value}

      </button>
    );
  }


//{this.state.value}
//Cambiamos this.state, por this.props --> Tuvimos que bajar esta anotación.

/* onClick={() => this.setState({value: "X"})}>
onClick={() => this.props.onClick()}
>
{this.props.value}

Cambiamos los this.props por props

Se elimino para hacer una funcion Square
class Square extends React.Component
*/

class Board extends React.Component {

/*Agregamos un constructor al elemento Board
y establecemos un estado inicial que contenga
un array de 9 nulls, que corresponden a los 9 cuadrados vacíos*/

// Borramos el constructor cuando le damos todo el poder a Game
/*
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
/*

  /*Agregamos handle.Click para no tener errores y poder guardar los valores*/

  /*handleClick(i) {
    const squares = this.state.squares.slice();
    //Haremos que se ignoren los cuadros ya rellenados o que el juego llegue a su término
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O' ;
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  */

  renderSquare(i) {
    //Hago que cada boton, cuadrado tenga un valor
    //return <Square value={i}/>;

    return (
      <Square
        //Hago que cada cuadrado tenga la propiedad "X" "O" o "Null"
        //Cambiamos this por props
        value={this.props.squares[i]}
        //Hacemos que al clikear un cuadrado, se llame el estado del Board.
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    //Vamos a determinar que jugador sigue y declarr un ganador
    /* History: También borramos esta sección
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = 'Siguiente Jugador: ' + (this.state.xIsNext ? 'X' : 'O');
  }
    */

    return (
      <div>
        //Esto podemos borrarlo
        //<div className="status">{status}</div>
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
      </div>
    );
  }
}

class Game extends React.Component {

  //Creo un constructor para darle a Game todo el poder sobre Board
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }];
      xIsNext: true;
    };
  }

  //Agregamos esta sección por history
  handleClick(i) {
     const history = this.state.history;
     const current = history[history.length - 1];
     const squares = current.squares.slice();
     if (calculateWinner(squares) || squares[i]) {
       return;
     }
     squares[i] = this.state.xIsNext ? 'X' : 'O';
     this.setState({
       history: history.concat([{
         squares: squares
       }]),
       xIsNext: !this.state.xIsNext,
     });
   }

  render() {
    //to use the most recent history entry to determine and display the game’s status
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

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
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
