var draw = (function(){
//Get the height and the width of the main element
var mWidth = document.querySelector('main').offsetWidth,
 mHeight = document.querySelector('main').offsetHeight,

//create the canvas
canvas = document.createElement('canvas'),

//create a drawing context
ctx = canvas.getContext('2d'),

//Create the initial bounding box
rect = canvas.getBoundingClientRect(),

//Create a triangle
triangle = document.getElementById('canvas');
if (canvas.getContext) {
  ctx = canvas.getContext('2d');
}

//Curent x,y cords
x=0,
y=0,

//Starting X,Y cords
x1=0,
y1=0,

//Ending x,y cords
x2=0,
y2=0,

lx=0,
ly=0,

//what shape are we drawing
shape='',

//Have we started Drawing yet
isDrawing=false;


  return{

setIsDrawing: function(bool) {
  isDrawing = bool;
  },

getIsDrawing:function() {
  return isDrawing;
  },

    getShape: function() {
      return shape;
    },

    randColor: function() {
      return '#' + Math.floor(Math.random()*16777215).toString(16);
    },

//Sets the shape to be draw
setShape(shp) {
  shape = shp;
},
    //Set the x,y cords
setXY: function(evt) {

lx = x;
ly = y;

  x = (evt.clientX - rect.left) - canvas.offsetLeft;
  y = (evt.clientY - rect.top);
  console.log({'x':x, 'y':y, 'lx': lx, 'ly':ly});
},

setStart: function() {
  x1=x;
  y1=y;
},

setEnd: function() {
  x2=x;
  y2=y;
},

//Write the cords back to the UI
writeXY: function() {
  document.getElementById('trackX').innerHTML = 'X: ' + x;
  document.getElementById('trackY').innerHTML = 'Y: ' + y;
},

//Draws a retangle
drawRect: function(x,y,h,w) {
  ctx.fillStyle = this.randColor();
  ctx.strokeStyle =this.randColor();

  ctx.fillRect(x1, y1, (x2-x1), (y2-y1));
  ctx.strokeRect(x1, y1, (x2-x1), (y2-y1));
},

//Draws a line beginning to end
drawLine: function() {
ctx.strokeStyle = this.randColor();
ctx.beginPath();
ctx.moveTo(x1,y1);
ctx.lineTo(x2,y2);
ctx.stroke();
},

drawCircle: function() {
  ctx.fillStyle = this.randColor();
  ctx.strokeStyle = this.randColor();

//Calculate the radius using Pythagoreams theorem
    let a = (x1-x2);
    let b = (y1-y2);
    let radius = Math.sqrt(a*a + b*b);

  ctx.beginPath();
  ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  },

  drawPath: function(){
  ctx.strokeStyle = this.randColor();
  ctx.beginPath();
  ctx.moveTo(lx,ly);
  ctx.lineTo(x,y);
  ctx.stroke();
},

  ctx.beginPath();
  ctx.moveTo(75,50);
  ctx.lineTo(100,75);
  ctx.lineTo(100,25);
  ctx.fill();
 }
}

//draws a selected Shape
  draw: function(){

    ctx.restore();
    if( shape==='rectangle' ){
    this.drawRect();
  }else if( shape==='line' ){
    this.drawLine();
  }else if( shape==='circle' ){
    this.drawCircle();
  }else if( shape==='path' ){
    this.drawPath();
  }else if( shape==='triangle' ){
      this.drawTriangle();
    }else{

    alert('Please choose a shape');
  }
  ctx.save();
},

//Returns the canvas object
    getCanvas: function(){
      return canvas;
},
    init: function() {
      canvas.height = mHeight;
      canvas.width = mWidth;
      document.querySelector('main').appendChild(canvas);
    }
  };
})();

draw.init();

//Choose to draw a rectangle
document.getElementById('btnRect').addEventListener('click', function(){
  draw.setShape('rectangle');
});

//Choose to draw a line
document.getElementById('btnLine').addEventListener('click', function(){
  draw.setShape('line');
});

//Choose to draw a circle
document.getElementById('btnCircle').addEventListener('click', function(){
  draw.setShape('circle');
});

//Choose to draw a triangle
document.getElementById('btnTriangle').addEventListener('click', function(){
  draw.setShape('triangle');
});

//Choose to draw a circle
document.getElementById('btnPath').addEventListener('click', function(){
  draw.setShape('path');
});

//Track the x,y position
draw.getCanvas().addEventListener('mousemove', function(evt){
  draw.setXY(evt);
  draw.writeXY();

    if(draw.getShape()==='path' && draw.getIsDrawing()===true){
      draw.draw();

  if(draw.getShape()==='triangle' && draw.getIsDrawing()===true){
    draw.draw();
  }
});

//Set starting the x,y position
draw.getCanvas().addEventListener('mousedown', function(){
  draw.setStart();
  draw.setIsDrawing(true);
});

//Set ending the x,y position
draw.getCanvas().addEventListener('mouseup', function(){
  draw.setEnd();
  draw.draw();
  draw.setIsDrawing(false);
});
