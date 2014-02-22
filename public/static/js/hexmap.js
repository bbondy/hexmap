/**
 * @jsx React.DOM
 */

 "use strict";


define(['react'], function(React) {

  console.log('loaded react...');
  var x = 0, y = 0;
  var count = 0;
  var offset = false;
  var HexMapUnicode = React.createClass({
    render: function() {
      console.log('rendering hexmap');

      var hexNodes = [];
      for (var r = 0; r < this.props.rows; r++) {
        for (var c = 0; c < this.props.columns; c++) {
          var hexStyle = {
            fontSize: this.props.size + 'px',
            position: 'absolute',
            transform: 'translate(' + (c * this.props.distX + (r%2 == 0 ? 0 : this.props.size / 2 - 2)) + 'px, ' + r * this.props.distY + 'px)'
          };

          console.log('r: ' + r + ', c: ' + c);
          hexNodes.push(
            <div style={hexStyle}>&#x2B22;</div>
          );

        }
      }

    return (
           <div className='commentList'>
             {hexNodes}
           </div>
            );
    } 
        
  });

  var HexMapDiv = React.createClass({
    render: function() {
      console.log('rendering hexmap');

      var hexNodes = [];
      for (var r = 0; r < this.props.rows; r++) {
        for (var c = 0; c < this.props.columns; c++) {


          var divOne = {
            float: 'left',
            borderRight: '30px solid #6C6',
            borderTop: '52px solid transparent',
            borderBottom: '52px solid transparent'
          }

          var divTwo = {
            float: 'left',
            width: '60px',
            height: '104px',
            backgroundColor: '#6C6'
          }

          var divThree = {
            float: 'left',
            borderLeft: '30px solid #6C6',
            borderTop: '52px solid transparent',
            borderBottom: '52px solid transparent'
          }

          var hexStyle = {
            fontSize: this.props.size + 'px',
            position: 'absolute',
            transform: 'translate(' + (c * this.props.distX + (r%2 == 0 ? 0 : 28)) + 'px, ' + r * this.props.distY + 'px)'
          };
        
          hexNodes.push(
            <div style={hexStyle}>
            <div style={divOne}></div>
            <div style={divTwo}></div>
            <div style={divThree}></div>
            </div>
          );

        }
      }

    return (
           <div className='commentList'>
             {hexNodes}
           </div>
            );
    } 
        
  });


  React.renderComponent(
      //<HexMapUnicode rows='5' columns='10' distX='55' distY='50' size='70'/>,
      <HexMapUnicode rows='15' columns='10' distX='16' distY='14' size='20'/>,
    document.getElementById('hexmap')
  );

  return HexMap;
});
