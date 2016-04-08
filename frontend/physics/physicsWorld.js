var Physics = require('./PhysicsJS-0.7.0/dist/physicsjs-full.js');
var MainPage = require('../components/mainPage');
var GameStatusStore = require('../stores/gameStatusStore');

var PhysicsWorld = function( world ){
  var renderer = Physics.renderer('canvas', {
    el: 'viewport',
  });

  window.world = world

  renderer.resize(600, 600)
  world.add( renderer );

  var height = renderer.el.height
  var width = renderer.el.width - 400

  var randColors =[
    ['#86B404', '#A5DF00']
    ,['#04B4AE', '#01DFD7']
    ,['#B404AE', '#DF01D7']
    ,['#D7DF01', '#FFFF00']
  ]

  var randCupColors =[
    ['#0101DF', '#0000FF']
    ,['#01DF01', '#2EFE2E']
    ,['#DF0101', '#FF0000']
  ]

  var GAME_OVER = false
  var GAME_START = false
  var BALLS_REMAINING = 100
  var POINTS = 0
  var PENALTY = 0



  function random( min, max ){
    return (Math.random() * (max-min) + min)|0;
  }


  var l = 100;
  var circles = [];
  while( l-- ){
    var pick = random(0,4)
    circles.push(Physics.body('circle', {
      x: width/2 + 200
      ,y: height/2 - 100
      ,context: renderer
      ,vx: 0.1
      ,radius: 5
      ,mass: 1
      ,restitution: 0
      ,cof: 1
      ,styles: {
        strokeStyle: randColors[pick][0]
        ,fillStyle: randColors[pick][1]
        ,lineWidth: 1
      },
      pointCounted: false,
      ballRemoved: false,
      checkPoint: function() {
        if (!this.pointCounted && this.state.pos.y < height/2 - 180 && this.state.pos.x > width/2 + 150){
          this.pointCounted = true
          POINTS ++
          GameStatusStore.adjustPoints(POINTS)
        }
        else if (this.pointCounted && this.state.pos.y > height/2 - 100){
          this.pointCounted = false
        }
      },
      checkRemain: function () {
        if(!this.ballRemoved && this.state.pos.y > height/2 + 200){
          this.ballRemoved = true
          BALLS_REMAINING -= 1
          GameStatusStore.adjustBallsRemain(BALLS_REMAINING)
        }
      },
    }));
  }




  var door = Physics.body('rectangle', {
    x: width/2 + 200
    ,y: height/2 - 40
    ,width: 50
    ,height: 10
    ,mass: 20
    ,treatment: 'kinematic'
    ,restitution: 0.1
    ,styles: {
      fillStyle: "#A4A4A4"
      ,lineWidth: 1
      ,strokeStyle: "#A4A4A4"
    }
    ,open: function() {
      world.removeBody(this)
    }
    ,close: function() {
      world.add(this)
    }
  })





  var container = Physics.body('compound', {
    x: width/2 + 200
    ,y: height/2 - 100
    ,treatment: 'static'
    ,restitution: 0.1
    ,styles: {
      fillStyle: "#A4A4A4"
      ,lineWidth: 1
      ,strokeStyle: "#A4A4A4"
    }
    ,children: [
      Physics.body('rectangle', {
        x: -58
        ,y: -10
        ,angle: -Math.PI / 11
        ,width: 20
        ,height: 90
        ,mass: 20
      })
      ,Physics.body('rectangle', {
        x: 58
        ,y: -10
        ,angle: Math.PI / 11
        ,width: 20
        ,height: 90
        ,mass: 20
      })
      ,Physics.body('rectangle', {
        x: -32
        ,y: 55
        ,angle: Math.PI / 3
        ,width: 60
        ,height: 20
        ,mass: 20
      })
      ,Physics.body('rectangle', {
        x: 32
        ,y: 55
        ,angle: -Math.PI / 3
        ,width: 60
        ,height: 20
        ,mass: 20
      })
    ]
  });




  var cups = []

  function addCup() {

    pick = random(0,3)
    var cup = Physics.body('compound', {
      x: width/2 + 350
      ,y: height/2 - 500
      ,treatment: 'static'
      ,restitution: 0.1
      ,styles: {
        fillStyle: randCupColors[pick][1]
        ,lineWidth: 1
        ,strokeStyle: randCupColors[pick][1]
      },
      cupAdded: false
      ,children: [
        Physics.body('rectangle', {
          x: 0
          ,y: 85
          ,width: 47
          ,height: 8
          ,mass: 20
        })
        ,Physics.body('rectangle', {
          x: -25
          ,y: 52
          ,angle: Math.PI / 2.2
          ,width: 65
          ,height: 8
          ,mass: 20
        })
        ,Physics.body('rectangle', {
          x: 25
          ,y: 52
          ,angle: -Math.PI / 2.2
          ,width: 65
          ,height: 8
          ,mass: 20
        })
      ],
      move: function(speed){
        if(this.state.pos.y < height/2 + 120 && this.state.pos.x >= width/2 + 200){
          this.state.pos.y += speed;
        }
        else if (this.state.pos.x > width/2 + 50 && this.state.pos.y >= height/2 + 1){
          this.state.pos.x -= speed;
        }
        else if (this.state.pos.y > height/2 - 250){
          this.state.pos.y -= speed;
        }
        else {
          this.state.pos.x += speed;
        }


        if (this.state.pos.y >= height/2 - 200  && this.state.pos.x > width/2 ){
          if (!this.cupAdded){
            this.cupAdded = true
            addCup()
          }
        }

        if (this.state.pos.y <= height/2 - 250 && (this.state.pos.x > width/2 + 10 && this.state.pos.x < width/2 + 200)){
          this.state.angular.pos += 0.06
        }
        else if (this.state.angular.pos > 0.07){
          world.removeBody(this)
        }
      }
    })
    cups.unshift(cup)
    world.add( cups[0] );
  }

  Physics.util.ticker.on(function( time, dt ){
    if (BALLS_REMAINING < 10) {
      GAME_OVER = true
      Physics.util.ticker.off()
      GameStatusStore.gameEnd()
    }
    PENALTY ++
    if (POINTS > 0 && PENALTY > 40){
      POINTS --
      PENALTY = 0
    }
    circles.forEach(function(circle){
      circle.checkPoint()
      circle.checkRemain()
    })
    cups.forEach(function(cup){
      cup.move(3)
    })
    world.step( time );
  });


  document.addEventListener('keydown', function( e ){
    if (e.keyCode === 32){
      door.open()
    }
  });

  document.addEventListener('keyup', function( e ){

    if (e.keyCode === 32){
      door.close()
    }
  });



  addCup()
  world.add(circles);
  world.add(container);
  world.add(door)

  world.on('step', function(){
    world.render();
  });

  world.add([
    Physics.behavior('constant-acceleration', {
      acc: { x: 0, y: 0.0008 }
    })
    ,Physics.behavior('body-impulse-response')
    ,Physics.behavior('body-collision-detection')
    ,Physics.behavior('sweep-prune')
    ,Physics.behavior('interactive', { el: renderer.container })
  ]);
};


module.exports = PhysicsWorld;
