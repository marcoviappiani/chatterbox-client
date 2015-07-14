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
    var results;

    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log(data.results);
        results = data['results'];

        for(var i=0; i<results.length; i++){
          app.addMessage(results[i]);
        }
      },
    });

    // $.get(app.server, function(data){
    //   console.log(data);
    //   // debugger;
    //   // results = data.results;
    // });

    // return results;
  },
  clearMessages: function(){
    $('#chats').children().remove();
  },
  addMessage: function(message){
    var currentMessage = $('<div class="chat"><div class="username"> </div> <div class="message"> </div></div>');
    currentMessage.find('.username').text(message.username);
    currentMessage.find('.message').text(message.text);
    $('#chats').prepend(currentMessage);
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

  // debugger;
  app.fetch();
  // console.log(chats);
  // console.log(typeof chats);
  // for(var i=0; i<chats.length; i++){
  //   app.addMessage(chats[i]);
  // }


});

