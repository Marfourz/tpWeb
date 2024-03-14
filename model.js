// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

function Drawing(){
    this.shapeArray = new Map()
}


function Shape(startX, startY, thickness, color){
    this.color = color
    this.thickness = thickness
    this.startX = startX
    this.startY = startY
}


function Line(startX, startY, thickness, color, startX, startY){
    Line.call(this,startX, startY, thickness, color)
    this.startX = startX
    this.startY = startY
}


function Rectangle(startX, startY, thickness, color, height, width){
    Line.call(this,startX, startY, thickness, color)
    this.height = height
    this.width = width
    
}
