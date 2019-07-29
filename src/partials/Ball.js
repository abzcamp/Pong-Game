import {SVG_NS} from '../settings.js'

import pingSound from '../../public/sounds/pong-01.wav'
export default class Ball {
    constructor(radius, boardWidth, boardHeight){
        this.radius = radius
        this.boardWidth = boardWidth
        this.boardHeight = boardHeight
        this.direction = 1.3
        this.ping = new Audio(pingSound)

        this.reset();

    }

    reset() {
        this.x = this.boardWidth/2
        this.y = this.boardHeight/2

        this.vy = 0
        while(this.vy === 0) {
        this.vy = Math.floor(Math.random() * 10 -5)
    }
        this.vx = this.direction * (6 - Math.abs(this.vy))

    }


    paddleCollision(player1, player2){
        if(this.vx>0){
            let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height)
            let [leftX, rightX, topY, bottomY] = paddle
            if (
                (this.x + this.radius >= leftX)
                &&(this.x + this.radius <= rightX)
                &&(this.y >= topY && this.y <= bottomY)
               

                
            ){
                this.vx = -this.vx - 0.7;
                 this.ping.play()
                

            }

         } else{
                let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height)
                let [leftX, rightX, topY, bottomY] = paddle

             if(
                (this.x - this.radius <= rightX)
                &&(this.x - this.radius >= leftX)
                &&(this.y >= topY && this.y <= bottomY)
            ){
                this.vx = -this.vx + 0.7;
                this.ping.play()
                


            }
        
    }
    }

    wallCollision() {

        const hitTop = this.y - this.radius <= 0
        const hitBottom = this.y + this.radius >= this.boardHeight

        const hitLeft = this.x - this.radius <= 0
        const hitRight = this.x + this.radius >= this.boardWidth

        if(hitTop || hitBottom) {
            this.vy = -this.vy
        }
        if(hitLeft || hitRight){
            this.vx = -this.vx
        }

         

    }

    goal(player) {
        player.score++
        this.reset();
        // return player.score;
    }

    endGame(player1, player2) {
        if (player1.score >= 10 || player2.score >= 10) {
            this.reset()
            alert('Winner')


        }
    }

   
    

    render(svg, player1, player2) {

        this.x += this.vx
        this.y += this.vy
        

        this.wallCollision();
        this.paddleCollision(player1, player2)

        this.endGame(player1, player2)



        let circle = document.createElementNS(SVG_NS, 'circle')

        circle.setAttributeNS(null, 'fill','black')
        circle.setAttributeNS(null, 'cx', this.x)
        circle.setAttributeNS(null, 'cy', this.y)
        circle.setAttributeNS(null, 'r', '8')
        circle.setAttributeNS(null, 'stroke', 'orange')
        circle.setAttributeNS(null, 'stroke-width', '2')


        svg.appendChild(circle);

        
        const rightGoal = this.x + this.radius >= this.boardWidth
        const leftGoal = this.x - this.radius <= 0


        // let winningGoal;
        if (rightGoal) {
            this.goal(player1) 
            this.direction = 1
        }else if (leftGoal) {
            this.goal(player2)
            this.direction = -1
        }

        // if (this.player1.score > 2 || this.player2.score > 2) {

        //     console.log(this.score)
        
        //     this.player1.score = 0
        //     this.player2.score = 0
        //     ball.reset()
        // }


    }

}