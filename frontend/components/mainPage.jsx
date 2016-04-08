var React = require('react');
var GameBeginModal = require('./modals/gameBeginModal');
var GameEndModal = require('./modals/gameEndModal');
var Physics = require('../physics/PhysicsJS-0.7.0/dist/physicsjs-full.js');
var PhysicsWorld = require('../physics/physicsWorld.js');
var GameStatusStore = require('../stores/gameStatusStore');

var MainPage = React.createClass({
  getInitialState: function(){
    return {
      gameEnd: false,
      game: null,
      ballsRemain: 0,
      points: 0
    }
  },


  componentDidMount: function(){
    this.listenser = GameStatusStore.addListener(this.gameUpdate)
  },

  componentWillUnmount: function(){
    this.listenser.remove()
  },

  gameUpdate: function(){
    if (GameStatusStore.startStatus() && this.state.game === null){
      var game = Physics(PhysicsWorld)
      window.game = game
      this.setState({
        game: game
      })
    }
    if (GameStatusStore.endStatus()){
      this.setState({
        gameEnd: true,
        game: null,
      })
      window.world.destroy()
      this._resetCanvas()
    }

    this.setState({
      ballsRemain: GameStatusStore.ballsRemainStatus(),
      points: GameStatusStore.pointsStatus()
    })
  },

  _resetCanvas: function() {
    var canvas = document.getElementById('viewport')
    var context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.width)
  },


  render: function() {
    return (
      <div className="mainpagewrapper">
        <GameBeginModal />
        <GameEndModal points={this.state.points}/>

        <div className="leftpagewrapper">
          {'Balls: ' + this.state.ballsRemain}
          <div className="instructionwrapper">
            <div className="instructionheader">
              <h1>Instructions</h1>
            </div>
            <div className="rulewrapper">
              <p className="rules" >Press Spacebar to drop balls</p>
              <p className="rules" >Points are earned by making balls in the cups</p>
              <p className="rules" >If your ball count falls under 10 you lose</p>
            </div>
          </div>
        </div>

        <div className="centerpagewrapper">
          <div className="centertopwrapper">
            <span>Cup Game</span>
          </div>
          <div className="background"></div>
          <div className="booth"></div>
          <canvas id="viewport"></canvas>
          <script src="../physics/PhysicsJS-0.7.0/dist/physicsjs-full.js"></script>
        </div>

        <div className="rightpagewrapper">
          <span>{'Points: ' + this.state.points}</span>
        </div>

      </div>
    );
  }

});

module.exports = MainPage;
