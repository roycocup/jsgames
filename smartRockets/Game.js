var _population;
var _lifeSpan = 200;
var _frame = 0;
var _target;

function setup(){
  createCanvas( displayWidth / 2 , displayHeight / 2);
  _population = new Population();
  _target = new Target();
}

function draw(){
  background(0);
  frameCounter();
  _target.draw();

  if (_frame == _lifeSpan){
    _population = new Population();
  }
  _population.update();

  //debug("Rockets: " +_population.rockets.length);
  //debug("Frame: " + _frame);
}

function frameCounter(){
  _frame++;
  if (_frame > _lifeSpan){
    _frame = 0;
  }
}

function Target(){

  this.draw = function(){
    push();
    fill("red");
    ellipse(width/2, 50, 20);
    fill("white");
    ellipse(width/2, 50, 10);
    pop();
  }
}

function Population(){
  this.numRockets = 10;
  this.rockets = [];

  for(var i=0; i<this.numRockets; i++){
    this.rockets.push(new Rocket());
  }
  this.update = function(){
    this.rockets.map(function(r){
      r.update();
      r.draw();
    });
  }
}

function DNA(){
  this.genes = [];
  for(var i=0; i<_lifeSpan; i++){
    this.genes[i] = p5.Vector.random2D();
  }
}

function Rocket(){
  this.height = 5;
  this.width = 20;
  this.pos = createVector(width/2, height);
  this.vel = createVector(); // mps
  this.acc = createVector(); // mps/s
  this.dna = new DNA();

  this.update = function(){
    if (_frame % 10){
        this.applyForce(this.dna.genes[_frame]);
    }

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); // clear the accelaration
  }

  this.applyForce = function (force){
    this.acc.add(force);
  }

  this.draw = function(){
    push(); // stop it from affecting other elements on canvas
    noStroke();
    translate(this.pos.x, this.pos.y)//this will reset the origin to a new point
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0,0, this.width, this.height);
    pop(); // stop it from affecting other elements on canvas
  }
}

function debug(s){
  textSize(32);
  fill(255);
  text(s, 0, 30);
  //console.log(_population.rockets.length);
}
