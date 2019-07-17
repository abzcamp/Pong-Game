import {SVG_NS} from '../settings.js'

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

		this.gameElement = document.getElementById(this.element)
  }

  render() {
    //clear board
    this.gameElement.innerHTML = ''
    //create SVG element for the board
    let svg = document.createElementNS(SVG_NS, 'svg')

    svg.setAttributeNS(null, 'width', this.width)
    svg.setAttributeNS(null, 'width', this.height)
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`)
    this.gameElement.appendChild(svg)
    

  }
}
