//Game based on https://www.youtube.com/watch?v=bGz7mv2vD6g

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
  this.x = width/2;
  this.y = 50;

  this.draw = function(){
    push();
    fill("red");
    ellipse(this.x, this.y, 20);
    fill("white");
    ellipse(this.x, this.y, 10);
    pop();
  }
}

function Population(){
  this.numRockets = 10;
  this.rockets = [];
  this.bestPerformer = width * height;

  for(var i=0; i<this.numRockets; i++){
    this.rockets.push(new Rocket());
  }

  this.update = function(){
    this.rockets.map(function(r){
      r.update();
      r.draw();
    });

    if(_frame == _lifeSpan){
      for (var i = 0; i < this.rockets.length; i++) {
        this.rockets[i].calcPerformance();
        if(this.rockets[i].performance < this.bestPerformer){
          this.bestPerformer = this.rockets[i].performance;
        }
      }
      //console.log(this.bestPerformer);
    }

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
  this.performance = -1;

  this.update = function(){
    if (_frame % 10){
        this.applyForce(this.dna.genes[_frame]);
    }

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); // clear the accelaration
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

  this.applyForce = function (force){
    this.acc.add(force);
  }

  // this is not going ok. Check after 18:15
  this.calcPerformance = function(){
    this.performance = 1 / dist(this.pos.x, this.pos.y, _target.x, _target.y);
  }

}

function debug(s){
  textSize(32);
  fill(255);
  text(s, 0, 30);
  //console.log(_population.rockets.length);
}
