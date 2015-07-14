// YOUR CODE HERE:

var app = {
  init: function(){
    app.server = 'https://api.parse.com/1/classes/chatterbox';
    app.rooms = ['Lobby'];
    app.friends = [];
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
    var currentRoom = $('select :selected').text();
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('fetching');
        results = data['results'];
        // console.log(results);
        app.clearMessages();
        for(var i=0; i<results.length; i++){
          if(results[i]['roomname'] === currentRoom) {
            app.addMessage(results[i]);
          }

          if(app.rooms.indexOf(results[i]['roomname']) === -1) {
            app.addRoom(results[i]['roomname']);
            app.rooms.push(results[i]['roomname']);
          }
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
    if(app.friends.indexOf(message.username) !== -1){
      currentMessage.find('.message').addClass('friend');
    }
    $('#chats').append(currentMessage);
  },
  addRoom: function(room){
    var roomNode = $('<option></option>');
    roomNode.text(room);
    $('#roomSelect select').append(roomNode);
  },
  addFriend: function(friend) {
    console.log(friend);
    if(app.friends.indexOf(friend) === -1){
      app.friends.push(friend);
    }
    console.log(app.friends);
  },
  handleSubmit: function(messageString) {
    var message = {
      username: app.username,
      text: messageString,
      roomname: $('.messageForm :input')[1].value || $('select :selected').text()
    };
    console.log(message);
    // console.log(message);
    app.send(message);
  }
};


$(document).ready(function(){
  app.init();
  // app.username = prompt('Choose a username: ', 'Captain Planet') || 'anonymous';
  app.username = 'Ant Man';
  console.log(app.username);
  $('body').on( "click", '.username', function(event){
    app.addFriend($(this).text());
    // console.log('added friend');
  });

  $('.messageForm').submit(function(event) {
    var $inputs = $('.messageForm :input');
    var messageString = $inputs[0].value;
    app.handleSubmit(messageString);
    //To Do maybe something to reset field
    event.preventDefault();
  });
  app.fetch();
  setInterval(app.fetch, 2000);
  // app.fetch();
});



