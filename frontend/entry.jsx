var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');


var MainPage = require('./components/mainPage');

var Entry = React.createClass({
  render: function () {
    return(
      <div>
        <MainPage/>
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var container = document.getElementById('root')
  Modal.setAppElement(container);
  ReactDOM.render(<Entry />, container);
});
