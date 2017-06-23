var numPoints = 10;
var points = [];
var order = [];
var bestDistance = null;
var bestPath = null;
var fr = 5;

function setup(){
  frameRate(fr);
  createCanvas(800, 600);
  for(var i=0; i<numPoints; i++){
    var v = createVector(floor(random(width)), floor(random(height)));
    points.push(v);
    order.push(i);
  }

}

function draw(){
  background(0);

  _drawPoints()
  _connect();
  _swap2RandomIndexes();
  _calcDistances();
  _drawBestPathFound();
}

function _drawPoints(){
  for(var i=0; i<numPoints; i++){
    fill(255);
    ellipse(points[i].x, points[i].y, 6, 6);
  }
}

function _connect(){
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for(var i=0; i<numPoints; i++){
    vertex(points[i].x, points[i].y);
  }
  endShape();
}

function _swap2RandomIndexes(){
  var i = floor(random(points.length));
  var j = floor(random(points.length));
  _swap(points, i,j)
}

function _swap(arr, i,j){
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function _calcDistances(){
  var total = null;
  for(var i=0; i<points.length-1; i++){
    total += dist(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
  }

  if (total < bestDistance || bestDistance == null){
    bestDistance = total;
    bestPath = points.slice();
  }
}

function _drawBestPathFound() {
  if (bestPath == null)
    return;

  stroke("red");
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < bestPath.length; i++) {
    vertex(bestPath[i].x, bestPath[i].y);
  }
  endShape();
}
