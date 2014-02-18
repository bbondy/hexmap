/**
 * @jsx React.DOM
 */

 "use strict";


define(['react'], function(React) {

  console.log('loaded react...');
  var x = 0, y = 0;
  var count = 0;
  var offset = false;
  var HexMap = React.createClass({
    render: function() {
      console.log('rendering hexmap');

      var hexNodes = [];
      for (var r = 0; r < this.props.rows; r++) {
        for (var c = 0; c < this.props.columns; c++) {
          var hexStyle = {
            fontSize: this.props.size + 'px',
            position: 'absolute',
            transform: 'translate(' + (c * this.props.distX + (r%2 == 0 ? 0 : 28)) + 'px, ' + r * this.props.distY + 'px)'
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

  React.renderComponent(
      <HexMap rows='5' columns='10' distX='55' distY='50' size='70'/>,
    document.getElementById('hexmap')
  );

  return HexMap;
});
