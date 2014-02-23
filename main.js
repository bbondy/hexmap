"use strict";

var width, height, canvas, context, segmentSize = 20;


var HexagonState = {
  Pending: 0,
  Completed: 1
}

function Hexagon(data, x, y) {
  this.x = x;
  this.y = y;
  this.data = data;
  this.hit = false;
  this.state = HexagonState.Pending;
}

Hexagon.prototype = {
  draw: function() {
    //console.log(this.x + ', ' + this.y);
    context.save();
    context.translate(this.x, this.y);
    context.rotate(90 * Math.PI / 180);
    if (this.hit) {
      context.scale(1.1, 1.1);
    }
    context.beginPath();
    for (var i = 0; i < 7; i++) {
      context.rotate(60 * Math.PI / 180);
      if (i == 0)
        context.moveTo(segmentSize, 0);
      else
        context.lineTo(segmentSize, 0);
    }
    if (this.state == HexagonState.Completed && this.hit) {
      context.fillStyle = '#dfd';
    } else if (this.state == HexagonState.Completed) {
      context.fillStyle = '#dfd';
      context.strokeStyle = '#777';
    } else if (this.hit) {
      context.fillStyle = '#ddf';
    } else {
      context.strokeStyle = '#777';
      context.fillStyle = '#ddd';
    }
    context.stroke();
    context.fill();
    context.restore();
  },
  hitTest: function(x, y) {
    this.hit = false;
    if (x > this.x - segmentSize && x < this.x + segmentSize && 
        y > this.y - segmentSize && y < this.y + segmentSize) {
      //check if hit
      this.hit = true;
    }
  }
};

var GridManager = {
  cols: 45,
  spacingX: 6,
  spacingY: 1,
  initX: segmentSize,
  lastX: segmentSize,
  lastY: segmentSize,
  apothem: (Math.sqrt(3) / 2) * segmentSize,
  countX: 0,
  countY: 0,
  hexagonList: [],

  addHexagon: function(data) {
    this.count ++;
    if (this.count < this.cols) {
      this.lastX += this.apothem * 2 + this.spacingX; 
    } else {
      this.countY++
      this.lastY += this.apothem * 2 + this.spacingY;
      this.lastX = this.initX + ((this.countY % 2) == 0 ? segmentSize : 0) ;
      this.count = 0;
    }

    var hexagon = new Hexagon(data, this.lastX, this.lastY);
    this.hexagonList.push(hexagon);
    return hexagon;
  },

  draw: function(x, y) {
    this.hexagonList.forEach(function(hexagon) {
      hexagon.draw();
    });
  },

  hitTest: function(x, y) {
    var o = {};
    this.hexagonList.forEach(function(hexagon) {
      if (!o.hitItem) 
        hexagon.hitTest(x, y);
      else
        hexagon.hit = false;

      if (hexagon.hit) {
        o.hitItem = hexagon;
      }
    }, this);
    return o.hitItem;
  }
};

window.onload = function() {
  document.addEventListener("mousemove", function(evt) {
    GridManager.hitTest(evt.clientX, evt.clientY);
    requestAnimationFrame(render);
  }, false);
  document.addEventListener("mousedown", function(evt) {
    var hex = GridManager.hitTest(evt.clientX, evt.clientY);
    if (hex)
      alert(hex.data);

  });
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  canvas = document.getElementById("canvas");

  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  var centerX = width / 2,
    centerY = height /2,
    hexCount = 1000;

  function initGrid() {
    for (var i = 0; i < hexCount; i++) {
      var hexagon = GridManager.addHexagon(i);
      if (i % 7 == 0) {
        hexagon.state = HexagonState.Completed;  
      }
    }
  }
  initGrid();

  function render() {
    context.clearRect(0, 0, width, height);
    GridManager.draw();
  }
  render();
};

