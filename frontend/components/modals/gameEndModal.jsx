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



var GameEndModal = React.createClass({

  getInitialState: function (){
    return({
      modalIsOpen: false,
      name: ''
    })
  },

  componentDidMount: function(){
    this.listenser = GameStatusStore.addListener(this._handleChange)
  },

  componentWillUnmount: function(){
    this.listenser.remove()
  },

  _handleChange: function(){
    if (GameStatusStore.endStatus()){
      this.openModal()
    }
  },

  _nameChange: function(event){
    event.preventDefault()
    this.setState({name: event.target.value})
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
    GameStatusStore.submitScore(this.state.name)
    GameStatusStore.gameReset()
  },

  display: function(){
    return <Modal
      isOpen={this.state.modalIsOpen}
      onRequestClose={this.closeModal}
      style={customStyles}>
      <div className="instructionwrapper">
        <div className="instructionheader">
          <h1>YOU LOSE</h1>
        </div>
        <div className="rulewrapper">
          <p className="rules" >You final score is{this.props.points}</p>
          <p className="rules" >submit your score</p>
          <p className="rules" >enter your name</p>

          <input
            className="entername"
            onChange={this._nameChange}
            />

        </div>
        <a className="click button"onClick={this.closeModal}>SUBMIT</a>
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

module.exports = GameEndModal;
