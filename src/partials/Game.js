import {SVG_NS, KEYS} from '../settings.js'

import Board from './Board.js';

import Paddle from './Paddle.js'

import Ball from './Ball.js'

import Score from './Score.js'

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(this.element)
    this.board = new Board(this.width, this.height)

    this.paddleWidth = 8
    this.paddleHeight = 70
    this.boardGap = 10

    this.board = new Board(this.width, this.height)
    this.Ball = new Ball(8, this.width, this.height)

    //player one
    this.player1 = new Paddle(
      'yellow',
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      ((this.height - this.paddleHeight) / 2),
      KEYS.a,
      KEYS.z

      )

    //player two
    this.player2 = new Paddle(
      'blue',
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      (this.width - this.boardGap - this.paddleWidth),
      ((this.height - this.paddleHeight) / 2),
      KEYS.up,
      KEYS.down
      

    )


    this.gameElement = document.getElementById(this.element)
    this.score1 = new Score(this.width / 2 - 50, 30, 30)
    this.score2 = new Score(this.width / 2 + 25, 30, 30)


document.addEventListener('keydown', event => {

  switch(event.key) {
    case KEYS.spaceBar:
      this.pause = !this.pause
      this.player1.speed = 20
      this.player2.speed = 20
      
   

}



 })

  


  }
  render() {

    if(this.pause){
      this.player1.speed = 0
      this.player2.speed = 0
      return
  }


 
    //clear board
    this.gameElement.innerHTML = ''
    
    //create SVG element for the board
    let svg = document.createElementNS(SVG_NS, 'svg')

    svg.setAttributeNS(null, 'width', this.width)
    svg.setAttributeNS(null, 'height', this.height)
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`)
    this.gameElement.appendChild(svg)

    this.board.render(svg)
    this.player1.render(svg)
    this.player2.render(svg)
    this.Ball.render(svg, this.player1, this.player2)
    this.score1.render(svg, this.player1.score)
    this.score2.render(svg, this.player2.score)




  
}
}
