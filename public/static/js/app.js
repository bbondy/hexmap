require.config({
  baseUrl: '/static/js',
  paths: {
    'jquery': 'http://code.jquery.com/jquery-1.11.0.min',
    'underscore': '/static/js/underscore-min',
    'react': 'http://fb.me/react-0.8.0',
    'backbone': 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min',
    'hexmap': '/static/js/hexmap',
  }
});


console.log('loading hexmap: ');
require(['jsx!hexmap'], function(hexmap) {
console.log('loaded hexmap: ' + hexmap);
});
 
