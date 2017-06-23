
window.onload = function(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var frameRate = 15;
  setInterval(update, 1000/frameRate);
  var frame = 0;
  
  
  var debug = false;
  
  var snake = new Snake(canvas, ctx);
  var fruit = new Fruit(canvas, ctx);
  
  function countFrame (){
    frame++; 
    if (frame > frameRate){
      frame = 0;
    }
  }
  
  function update() {
    console.log(snake);
    snake.update();
    fruit.update();
    countFrame();
    draw();
  }
  
  function draw() {
    snake.draw();
    fruit.draw();
    ctx.clearRect(0,0,canvas.width, canvas.height);
    if (debug){
      drawDebug();
    }
      
  }
  
  function drawDebug(){
    ctx.font = '48 serif';
    ctx.fillText('Frame:'+frame, 10, 10);
  }

}


var Snake = function (canvas, ctx){
  
  this.minElements = 5;
  this.elements = [];
  this.elementSize = 10;;
  this.direction = "down"; 
  this.speed = 5; 
  this.sp.x = 100; 
  this.sp.y = 100; 
  
  // build the snake
  for(var i = 1; i <= this.minElements; i++){
    this.elements.push = new Element();
  }
  
  document.addEventListener('keydown', keyPush);
  function keyPush(e){
    switch(e.code){
      case 'ArrowUp':
        break;
      case 'ArrowDown':
        break;
      case 'ArrowLeft':
        break;
      case 'ArrowRight':
        break;
    }
  }
  
  
  this.move = function(dir){
    
  }
  
  this.draw = function(){
    for(var i=1; i < this.elements.length; i++){
      //this.elements[i].draw(this.elementSize*i, this.elementSize*i)
    }
  }
  
  this.update = function(){
      
  }
}


function Element (){
  this.x = 0; 
  this.y = 0;
  this.size = 10;
  this.color = "black";
  this.draw = function(){
    ctx.rect(this.x, this.y, this.size, this.size);
  }
  return this; 
}

var Fruit = function (canvas, ctx){
  this.x = 0; 
  this.y = 0; 
  this.draw = function(){}
  this.update = function(){}
}
