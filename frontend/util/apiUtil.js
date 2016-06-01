var GameStatusActions = require('../actions/gameStatusActions');

module.exports = {
  submitScore: function(scores) {
    $.ajax({
      type: "POST",
      url: "api/scores",
      data: {scores: scores},
      success: function (score) {
        GameStatusActions.receiveScore(score);
      }
    })
  },

  fetchScores: function() {
    $.ajax({
      url: "api/scores",
      success: function () {
        GameStatusActions.receiveScores();
      }
    })
  },

  deleteScore: function(params) {
    $.ajax({
      type: "DELETE",
      url: "api/scores",
      scores: params,
      success: function (score) {
        GameStatusActions.removeScore(score);
      }
    })
  },
}
