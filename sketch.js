let vs = []
function setup (){
  createCanvas( 400,400);
  v =new Vehicle (200,200);
}

function draw (){
   background(245,245,223);
  
  v.display()
  v.edges()
  v.update();
  v.wander();

}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(1,0);
    this.acceleration = createVector(0,0);
    this.l = 30;
    this.maxspeed = 1;
    this.maxforce = 0.01;
    this.wanderTheta = PI/2;
  }
  
  wander(){
    let projVector = this.velocity.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.location);
    
    let wanderRadius = 50;
    let theta = this.wanderTheta + this.velocity.heading();
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);
    
    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar, yBar));
    
    let debug = true;
    
    if (debug){  
      push()
      fill(127,255,1);
      stroke('0')
      line(this.location.x, this.location.y, projPoint.x, projPoint.y)
      stroke('0');
      circle(projPoint.x, projPoint.y, 8);
      noFill();
      stroke('0');
      circle(projPoint.x, projPoint.y, wanderRadius*2);
      
      line(this.location.x, this.location.y, wanderPoint.x, wanderPoint.y)
      stroke('rgb(220,20,60)')
      fill('rgb(220,20,60)')
      circle(wanderPoint.x, wanderPoint.y, 16);
      pop()
    }
    
    let steeringForce = wanderPoint.sub(this.location);
    steeringForce.setMag(this.maxforce);
    this.applyForce(steeringForce);
    
    this.wanderTheta += random(-0.5, 0.5);
  }
  
  seek(vektorTarget){
    // percieve target location 
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    noStroke();
    translate(this.location.x, this.location.y)
    rotate(theta)
  //badan 
  strokeWeight()
  fill(255,255,0)
  rect(50,60,83,80, radians(350), radians(350))
  fill(150,75,0)
  rect(48,130,88,38, radians(200), radians(100))

  //mata
  strokeWeight()
  fill(255,255,255)
  ellipse(80,90,20,25)
  ellipse(100,90,20,25)
  fill(0,255,255)
  ellipse(80,90,10,15)
  ellipse(100,90,10,15)
  strokeWeight(5)
  point(82,90)
  point(98,90)


  //mulut
  strokeWeight()
  fill(255,255,255)
  rect(78,110,25,15)
  strokeWeight(1)
  fill(255,255,255)
  rect(85,110,5,5)
  fill(255,255,255)
  rect(90,110,5,5)

  //tangan
  strokeWeight()
  line(50,130,30,165)
  line(135,130,150,165)
  
    
  //baju
  fill(255,0,0)
  rect(48,140,20,10)
  fill(128,128,0)
  rect(58,140,15,10)
  fill(255,255,255)
  rect(68,140,15,10)
  fill(252,280,99)
  rect(78,140,15,10)
  fill(300,40,2)
  rect(88,140,15,10)
  fill(191,0,255)
  rect(98,140,20,10)
  fill(0,0,0)
  rect(108,140,18,10)
  fill(255,127,0)
  rect(118,140,15,10)
  fill(0,255,0)
  rect(118,140,18,10)

  }

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }
}