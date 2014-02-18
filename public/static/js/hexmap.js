/**
 * @jsx React.DOM
 */

 "use strict";


var hexStyle = {
  color: '#6C6',
  fontSize: '100px',
  marginLeft: '-10px',
  marginTop: '-50px',
};
 

define(['react'], function(React) {

  console.log('loaded react...');
  var HexMap = React.createClass({
    render: function() {
      console.log('rendering hexmap');
      return (
        <div style={hexStyle}>&#x2B23;</div>
      );
    }
  }); 

  React.renderComponent(
      <HexMap/>,
    document.getElementById('hexmap')
  );

  return HexMap;
});
