import p5 from 'p5';

export default class Star {
  
  
  //constructor(p,scheduleTitle,scheduleDate,scheduleNote,scheduleType)
  constructor(p,size,brightness,date){
    this.p = p;
    this.r = 70;
    this.theta = 0;
    this.position = p.createVector(0,0);
    this.velocity = p.createVector(0,0);
    this.accerlation = p.createVector(0,0); 
            
    
    
    this.size = size;
    this.date = date;
    this.brightness = 20;
    
    
    //Todo
    this.scheduleTitle = "GoToMeeting";
    this.scheduleDate = new Date("06/30/2021");
    this.scheduleNote = "this is Note";
    this.scheduleType = "Blue";
    }
    
    drawStar() {
        this.p.fill(255,204,222);
        this.p.ellipse(this.position.x,this.position.y,this.size, this.size);
        this.p.ellipse(0,0,this.size, this.size);      
        console.log(this.position.x);
    };
    
  applyGravity(){
      //calculateGravity
       let v1 = this.p.createVector(1,1,1)
       let gravity = p5.Vector.mult(this.position,-1);
      gravity.normalize();
      
      //Apply gravity 
      //strength of gravity will be calculated based on shedule's time left
      this.position.add( gravity.mult(0.1));
      
      //update new Radius
      this.r = this.position.mag()
    }
    
    applyRotating(){
      this.position.set(this.  r* this.p.cos(this.theta),
                                 this.r * this.p.sin(this.theta) );
      this.theta = this.theta + 0.1    
  
    }
    
//    updateTime(){
//      
//    }
//    
    
    updateStar() {
      //updateTime
      
      this.applyRotating()
      this.applyGravity()      
      this.drawStar();
      console.log(this.r)
      
    };
 
 //Update시해야할일
 //현재시간과 시작 시간 비교하고 brightness조절
 //시작시간 N분전에 움직임
 
};

