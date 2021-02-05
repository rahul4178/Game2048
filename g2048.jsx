import React from "react"
import "./g2048.css"
import Swipe from "react-easy-swipe"
export default class g2048 extends React.Component{
    
constructor(props){
    super(props);
   
   
 this.state = {

    data : [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
    score : 0,
    gameover : false
 };

}
initBoard(){

    let data = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
     data = this.getRandom(this.getRandom(data))
    console.log("in init data is "+data)
    //   this.state.data = data;
    this.setState({data:data,score:0})


}
getRandom(data){
    const blankCoordinates = this.getBlankCoordinates(data);
    const randomcoordinate = blankCoordinates[Math.floor(Math.random() *blankCoordinates.length)]
    const randomnumber = this.getrandomNumber()
    data[randomcoordinate[0]][randomcoordinate[1]] = randomnumber
    return data

}
getrandomNumber(){
const startingNumbers = [2,4]
const randnumb = Math.floor(Math.random() * 2)
return startingNumbers[randnumb]

}
getBlankCoordinates(data){
    const blankCoordinates= [];
    console.log("In getblankcord")
    console.log(data)
    for(let i=0;i<data.length;i++)
        for(let j=0;j<data[i].length;j++){
            if(data[i][j] == 0)
                blankCoordinates.push([i,j])
        }
        return blankCoordinates
}

 swipeLeft = () =>{

    console.log("In swipeLeft ")
}


componentDidMount(){

this.initBoard()
const body = document.querySelector('body');
body.addEventListener('keydown', this.handleKeyDown.bind(this));

}

handleKeyDown(e){

    const up = 38;
    const right = 39;
    const down = 40;
    const left = 37
    const n = 78;
    
    if (e.keyCode === up) {
        console.log("up")
       this.move('up');
    } else if (e.keyCode === right) {
        console.log("right")
        this.move('right');
    } else if (e.keyCode === down) {
          this.move('down');
    } else if (e.keyCode === left) {
          this.move('left');
    } else if (e.keyCode === n) {
          this.initBoard();
    }
}
move(direction){
    if(!this.state.gameover){
            if(direction == 'up'){
                    const moveUp = this.moveUp(this.state.data)
                    console.log("Hereeeeeeeeeeeeeeeeee "+moveUp.tempboard)
                    if (this.boardMoved(this.state.data, moveUp.tempboard)) {
                        console.log("here")
                        const upWithRandom = this.getRandom(moveUp.tempboard);
                        console.log("Random is ")
                        console.log(upWithRandom)
                        if (this.checkForGameOver(upWithRandom)) {
                          this.setState({data: upWithRandom, gameOver: true, message: 'Game over!'});
                        } else {
                          this.setState({data: upWithRandom, score: this.state.score += moveUp.score});  
                        }
                      }
            }


    }

}
checkForGameOver(board) {
    let moves = [
      this.boardMoved(board, this.moveUp(board).board),
    //   this.boardMoved(board, this.moveRight(board).board),
    //   this.boardMoved(board, this.moveDown(board).board),
    //   this.boardMoved(board, this.moveLeft(board).board)
    ];
    
    return (moves.includes(true)) ? false : true;
  }
boardMoved(original, updated) {
    return (JSON.stringify(updated) !== JSON.stringify(original)) ? true : false;
  }

moveUp(inputBoard){

    let rotatedRight = this.rotateRight(inputBoard);
    let tempboard=[]
    let score=0
    console.log("after roatateright")
    console.log(rotatedRight)
    for(let i=0;i<rotatedRight.length;i++){
        let row =[]
        for(let j=0;j<rotatedRight[i].length;j++){
        
            if(rotatedRight[i][j] != 0){
                row.push(rotatedRight[i][j])
            }
            else
                row.unshift(rotatedRight[i][j])
                }
                console.log("printing row before push")
                console.log(row)
                tempboard.push(row)
    }
    console.log("after pushing zeros")
    console.log(tempboard)
    for (let r = 0; r < tempboard.length; r++) {
        for (let c = tempboard[r].length - 1; c >= 0; c--) {
          if (tempboard[r][c] > 0 && tempboard[r][c] === tempboard[r][c - 1]) {
            tempboard[r][c] = tempboard[r][c] * 2;
            tempboard[r][c - 1] = 0;
            score += tempboard[r][c];
          } else if (tempboard[r][c] === 0 && tempboard[r][c - 1] > 0) {
            tempboard[r][c] = tempboard[r][c - 1];
            tempboard[r][c - 1] = 0;
          }
        }
      }
      console.log("before rotate left")
      console.log(tempboard)
      tempboard = this.rotateLeft(tempboard)
      console.log("after moving up : ")
      console.log(tempboard)
      return {tempboard,score};
}
rotateLeft(matrix) {
    let result = [];

  for (let c = matrix.length - 1; c >= 0; c--) {
    let row = [];
    for (let r = matrix.length - 1; r >= 0; r--) {
      row.unshift(matrix[r][c]);
    }
    result.push(row);
  }
  console.log("result")
  console.log(result)

  return result;
}
rotateRight(matrix) {
    let result = [];
	
  	for (let c = 0; c < matrix.length; c++) {
	  	let row = [];
	  	for (let r = matrix.length - 1; r >= 0; r--) {
			  row.push(matrix[r][c]);
		  }
      result.push(row);
	  }
	
	  return result;
  }


    render(){

        return(
            <div>
                <h1>boo</h1>
                <div className = "Box" >
                   
                            <div>
                            {this.state.data.map((row1) =>{
                            return(
                                <Block  rowdata = {row1}>
                                   
                                    </Block>
                            )

                    })

                    }
                    </div>
                    
                    
                </div>
            </div>

        )
    }
}

export const Block = (props) =>{

    let rowdata = props.rowdata

    return(
        <div className="row">
            {rowdata.map((rowvalue) => {
                return(
                <div className="eachBlock">
                        {rowvalue}
                    </div>
                            )
                                    }

          
            )
                                }
        </div>
    )

}