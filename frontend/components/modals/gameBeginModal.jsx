var React = require('react');
var Modal = require('react-modal');
var GameStatusStore = require('../../stores/gameStatusStore');

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.7)',
    zIndex            : 10
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    background            : "#fff",
    transform             : 'translate(-50%, -50%)',
    padding               : 10,
    border                : 0
  }
};



var GameBeginModal = React.createClass({
  getInitialState: function (){
    return({
      modalIsOpen: true
    })
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
    GameStatusStore.gameStart()
  },

  display: function(){
    return <Modal
      isOpen={this.state.modalIsOpen}
      onRequestClose={this.closeModal}
      style={customStyles}>
      <div className="instructionwrapper">
        <div className="instructionheader">
          <h1>Instructions</h1>
        </div>
        <div className="rulewrapper">
          <p className="rules" >Press Spacebar to drop balls</p>
          <p className="rules" >Points are earned by making balls in the cups</p>
          <p className="rules" >If your ball count falls under 10 you lose</p>
        </div>
        <a className="click button" onClick={this.closeModal}>BEGIN</a>
      </div>
    </Modal>;
  },

  render: function() {
    return (
      <div>
        {this.display()}
      </div>
    );
  }

});

module.exports = GameBeginModal;
