var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher.js');
var GameStatusConstants = require('../constants/gameStatusConstants.js');
var GameStatusActions = require('../actions/gameStatusActions');
var GameStatusStore = new Store(AppDispatcher);

var _gameStart = false;
var _gameEnd = false;
var _points = 0;
var _ballsRemain = 100;

GameStatusStore.__onDispatch = function(payload){
  switch(payload.actionType) {
    case GameStatusConstants.GAME_START:
      ToggleGameStart(payload.gameStart)
      break;
    case GameStatusConstants.GAME_END:
      ToggleGameEnd(payload.gameEnd)
      break;
    case GameStatusConstants.GAME_RESET:
      ToggleGameReset()
      break;
    case GameStatusConstants.ADJUST_POINTS:
      changePoints(payload.newPoints)
      break;
    case GameStatusConstants.ADJUST_BALLS_REMAIN:
      changeBallsRemain(payload.newBalls)
      break;
    case GameStatusConstants.ALL_SCORES:
      updateScores(payload.scores)
      break;
    case GameStatusConstants.REMOVE_SCORE:
      removeScore(payload.score)
      break;
    case GameStatusConstants.NEW_SCORE:
      addScore(payload.score)
      break;
  }
};

GameStatusStore.gameStart = function() {
  GameStatusActions.startGame()
};

GameStatusStore.gameEnd = function() {
  GameStatusActions.endGame()
};

GameStatusStore.gameReset = function() {
  GameStatusActions.resetGame()
};



GameStatusStore.adjustPoints = function(newPoints) {
  GameStatusActions.adjustPoints(newPoints)
};

GameStatusStore.adjustBallsRemain = function(newBalls) {
  GameStatusActions.adjustBallsRemain(newBalls)
};


GameStatusStore.submitScore = function(name) {
  apiUtil.submitScore({
    name: name,
    score: _points
  })
};



GameStatusStore.startStatus = function(){
  return _gameStart
};

GameStatusStore.endStatus = function(){
  return _gameEnd
};



GameStatusStore.pointsStatus = function(){
  return _points
};

GameStatusStore.ballsRemainStatus = function(){
  return _ballsRemain
};



ToggleGameStart = function(data) {
  _gameStart = data
  GameStatusStore.__emitChange()
};

ToggleGameEnd = function(data) {
  _gameEnd = data
  GameStatusStore.__emitChange()
};

ToggleGameReset= function() {
  _gameStart = true;
  _gameEnd = false;
  _points = 0;
  _ballsRemain = 100;
  GameStatusStore.__emitChange()
};



changePoints = function(data) {
  _points = data
  GameStatusStore.__emitChange()
};

changeBallsRemain = function(data) {
  _ballsRemain = data
  GameStatusStore.__emitChange()
};



addScore = function(score){
  _scores.pop()
  scores = []
  for (var i = 0; i < _score.length; i++) {
    if (_score[i].score >= score.score){
      scores.push(_score[i])
      scores.push(score)
    } else {
      scores.push(_score[i])
    }
  }
},

resetScores = function(scores){
  _scores = scores
}

module.exports = GameStatusStore;
