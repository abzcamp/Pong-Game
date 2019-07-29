import {SVG_NS} from '../settings.js'

export default class Paddle {

    constructor(color, boardHeight, width, height, x, y, up, down){
        this.boardHeight = boardHeight
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.speed = 40
        this.score = 0
        this.color = color
        let that = this

        document.addEventListener('keydown', function(event){
            switch(event.key) {
                case up:
                    that.y = Math.max(0, that.y - that.speed)
                break;
                case down:
                    that.y = Math.min(that.boardHeight - that.height, that.y + that.speed)
                break
            }
        })
    }


    coordinates(x,y,width,height) {
        let leftX = x
        let rightX = x + width
        let topY = y
        let bottomY = y + height
        return [leftX, rightX, topY, bottomY]

    }

    render(svg) {
        let rect = document.createElementNS(SVG_NS, 'rect')
        rect.setAttributeNS(null, 'fill', this.color)
        rect.setAttributeNS(null, 'width', this.width)
        rect.setAttributeNS(null, 'height', this.height)
        rect.setAttributeNS(null, 'rx', '5')
        rect.setAttributeNS(null, 'x', this.x)
        rect.setAttributeNS(null, 'y', this.y)

        svg.appendChild(rect);
    }

}