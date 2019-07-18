import {SVG_NS} from '../settings.js'

export default class Ball {
    constructor(radius, boardWidth, boardHeight){
        this.radius = radius
        this.boardWidth = boardWidth
        this.boardHeight = boardHeight
        this.direction = 1

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

    render(svg) {

        this.x += this.vx
        this.y += this.vy

        let circle = document.createElementNS(SVG_NS, 'circle')

        circle.setAttributeNS(null, 'fill','black')
        circle.setAttributeNS(null, 'cx', this.x)
        circle.setAttributeNS(null, 'cy', this.y)
        circle.setAttributeNS(null, 'r', '8')
        circle.setAttributeNS(null, 'stroke', 'orange')
        circle.setAttributeNS(null, 'stroke-width', '2')


        svg.appendChild(circle);
    }

}