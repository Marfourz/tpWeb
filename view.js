
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.

Rectangle.prototype.paint = function(ctx) {
    
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.thickness
    ctx.beginPath();
    ctx.rect(this.startX, this.startY, this.width, this.height);
    ctx.stroke();
};
  
Line.prototype.paint = function(ctx) {
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.thickness
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.finalX, this.finalY);
    ctx.stroke();
};
  
Drawing.prototype.paint = function(ctx, canvas) {
    //console.log(this.getForms());
    ctx.fillStyle = canvas.color; // set canvas' background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.shapeArray.values().forEach(function (eltDuTableau) {
        // now fill the canvas
        eltDuTableau.paint(ctx);
    });
};



updateShapeList = function(index, shape){
    console.log("shape element : ", toDom(shape,index))
    document.getElementById("shapeList").insertAdjacentElement('beforeend', toDom(shape,index))
}
  

toDom = function(shape, index){
    
    innerHtml = ""
    if(shape && typeof(shape) == "object"){
      
        innerHtml = `<li id='liRemove${index}'>`
        if(shape.constructor == Rectangle){
            innerHtml += `<span style='color : ${shape.color}' >Rectangle</span>`
        } 
        else if(shape.constructor == Line){
            innerHtml += `<span style='color : ${shape.color}' >Ligne</span>`
        }
        innerHtml += `<button type='button' class='btn btn-default remove' id='remove${index}'></button>`
    }

    
    element = document.createElement("div")

    element.innerHTML = innerHtml

    console.log(element)

    return element
}

