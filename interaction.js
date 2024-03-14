
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {

	// Définir ici les attributs de la 'classe'
  this.initX = 0
  this.initY = 0
  this.finalX = 0
  this.finalY = 0
  this.clicked = false

	// Developper les 3 fonctions gérant les événements
  this.onClick =  function(event){
    this.clicked = true
    var pos = getMousePosition(canvas, event)
    this.initX = pos.x
    this.initY = pos.y

    console.log("Click détecté : ")
    console.log("Position de la souris : " , {
      "x" : this.initX,
      "y" : this.initY
    } )

  }.bind(this)

  this.onMouseMove = function(event){
    if(this.clicked){
      this.clicked = true
      var pos = getMousePosition(canvas, event)
      this.finalX = pos.x
      this.finalY = pos.y
      console.log("Position de la souris : " , {
        "x" : this.finalX,
        "y" : this.finalY
      } )
    }
    
  }.bind(this)

  this.onMouseRelease = function(event){
    this.clicked = false
    console.log("Souris relachée : ", event)
  }.bind(this)

	// Associer les fonctions précédentes aux évènements du canvas.
  canvas.addEventListener("mousedown", this.onClick)
  canvas.addEventListener("mouseup", this.onMouseRelease)
  canvas.addEventListener("mousemove", this.onMouseMove)

};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



