// YOUR CODE HERE:

var app = {
  init: function(){
    app.server = 'https://api.parse.com/1/classes/chatterbox';
  },
  send: function(message){
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  fetch: function(){
    $.get(app.server, function(data){
      console.log(data);
    })
  },
  clearMessages: function(){
    $('#chats').children().remove();
  },
  addMessage: function(message){
    $('#chats').append('<div class="messageContainer"><div class="username">' + message.username + '</div> <div class="message">' + message.text + '</div></div>');
  },
  addRoom: function(room){
    $('#roomSelect').append('<div>' + room + '</div>');
  },
  addFriend: function(friend) {
    console.log('clicked a friend');
    //do stuff
  },
  handleSubmit: function(messageString) {
    console.log('handled the message');
    var message = {
      username: 'usernamePlaceholder',
      text: messageString,
      roomname: 'roomPlaceholder'
    };
    app.addMessage(message);
  }
};


$(document).ready(function(){
  app.init();
  $('body').on( "click", '.username', function(event){
    // var friend = $(this).$('.username').val();
    app.addFriend();
    console.log('added friend');
  });

  $('.messageForm').submit(function(event) {
    // get all the inputs into an array.
    var $inputs = $('.messageForm :input');

    var messageString = $inputs[0].value;

    console.log(messageString);

    app.handleSubmit(messageString);
    event.preventDefault();
  });

  console.log(app.fetch());

});




