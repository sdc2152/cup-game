var Dispatcher = require('../dispatcher.js');
var GameStatusConstants = require('../constants/gameStatusConstants.js');


module.exports = {

  startGame: function () {
    Dispatcher.dispatch({
      actionType: GameStatusConstants.GAME_START,
      gameStart: true
    });
  },

  endGame: function () {
    Dispatcher.dispatch({
      actionType: GameStatusConstants.GAME_END,
      gameEnd: true
    });
  },

  resetGame: function () {
    Dispatcher.dispatch({
      actionType: GameStatusConstants.GAME_RESET
    });
  },

  adjustBallsRemain: function (newBalls) {
    Dispatcher.dispatch({
      actionType: GameStatusConstants.ADJUST_BALLS_REMAIN,
      newBalls: newBalls
    });
  },

  adjustPoints: function (newPoints) {
    Dispatcher.dispatch({
      actionType: GameStatusConstants.ADJUST_POINTS,
      newPoints: newPoints
    });
  },


  receiveScore: function (score) {
    Dispatcher.dispatch({
      actionType: GameStatusConstants.NEW_SCORE,
      score: score
    });
  },

  removeScore: function (score) {
    Dispatcher.dispatch({
      actionType: GameStatusConstants.REMOVE_SCORE,
      score: score
    });
  },

  receiveAllScores: function (score) {
    Dispatcher.dispatch({
      actionType: GameStatusConstants.ALL_SCORES,
      scores: scores
    });
  },




}
