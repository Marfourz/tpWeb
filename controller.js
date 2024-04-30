
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currentEditingMode = editingMode.line;
	this.currentLineWidth = 5;
	this.currentColor = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

	document.getElementById("butRect").onclick = (_) => this.editingMode = editingMode.rect 
	document.getElementById("butLine").onclick = (_) => this.editingMode = editingMode.line 
	document.getElementById("spinnerWidth").onchange = (e) => this.currentLineWidth = e.target.value
	document.getElementById("color").onchange = (e) => this.currentColor = e.target.value


	new DnD(canvas, this);


	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd

	this.onInteractionStart = function(dnd){
		console.log("start")
	}.bind(this)

	this.onInteractionUpdate = function(dnd){
		if(this.editingMode == editingMode.rect){
			this.currentShape = new Rectangle(dnd.initX, dnd.initY, 
				this.currentLineWidth,
				this.currentColor,
				dnd.finalY - dnd.initY,
				dnd.finalX - dnd.initX)
		}
		else{
			this.currentShape = new Line(
				dnd.initX,
				dnd.initY,
				this.currentLineWidth,
				this.currentColor,
				dnd.finalX,
				dnd.finalY
			)
		}
		console.log(this)
		
		
		drawing.paint(ctx, canvas)
		this.currentShape.paint(ctx)
	}.bind(this)

	this.onInteractionEnd = function(dnd){
		console.log("Interaction end")
		var uuid = generateUUID()
		console.log("uuid : ", uuid)
		drawing.shapeArray.set(uuid,this.currentShape)
		drawing.paint(ctx, canvas)
		updateShapeList(uuid, this.currentShape)
		document.getElementById("remove" + uuid).onclick = (event) => remove(drawing, event.currentTarget.id.substring(6), ctx, canvas)
		this.currentShape.paint(ctx)

	}.bind(this)
};


function remove(drawing, index, ctx, canvas){
	console.log(index)
	drawing.shapeArray.delete(index)
	document.getElementById('liRemove' + index).remove()
	drawing.paint(ctx, canvas)
}



function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}



