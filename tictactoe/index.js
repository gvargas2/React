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
un array de 9 nulls, que corresponden a los 9 cuadrados vacíos

Bonus 2: eliminar constructor en board

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  Agregamos handle.Click para no tener errores y poder guardar los valores*/
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
  }*/
  renderSquare(i) {
    //Hago que cada boton, cuadrado tenga un valor
    //return <Square value={i}/>;
    return (
      <Square
        //Hago que cada cuadrado tenga la propiedad "X" "O" o "Null" - Bonus 3, cambio state por props
        value={this.props.squares[i]}
        //Hacemos que al clikear un cuadrado, se llame el estado del Board.
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    //Vamos a determinar que jugador sigue y declarr un ganador
     /*const winner = calculateWinner(this.state.squares);
     let status;
     if (winner) {
       status = "Winner: " + winner;
     } else {
       status = 'Siguiente Jugador: ' + (this.state.xIsNext ? 'X' : 'O');
   }*/

     return (
       <div>
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
       </div>
     );
   }
 }

 class Game extends React.Component {

   //Bonus 1
   constructor(props) {
     super(props);
     this.state = {
       history: [{
         squares: Array(9).fill(null),
       }],
       stepNumber: 0,
       xIsNext: true,
     };
   }

   //Bonus 7
   handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
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
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    //Implementando saltador de tiempo
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

   render() {
     //Bonus 4
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {

        //Bonus 8
        const desc = move ?
          'Vamos al movimiento #' + move :
          'Vamos al comienzo del juego';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = 'Ganador: ' + winner;
      } else {
        status = 'Siguente jugador: ' + (this.state.xIsNext ? 'X' : 'O');
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
           <ol>{moves}</ol>
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
