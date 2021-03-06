// @Dsc web development for 30 Days - Firebase Final Project By Pranav Agarwal-DSC MRIIRS 


var firebaseConfig = {  // your details go here
    apiKey: "#",
    authDomain: "#",
    projectId: "#",
    storageBucket: "#",
    messagingSenderId: "#",
    appId: "#",
    measurementId: "#"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

firebase.database().ref('/chats').once('value').then(function(snapshot) {
  $.each(snapshot.val(), function(idx, obj) {
      $('#messages').append($('<li>').html('<div class="row msg_container"><div class="col-xs-12 col-md-12"><div class="messages base_sent"><p>'+obj.user+" : "+obj.message+'</p></div></div></div>'));
  });
   var chatwindow=$('#messages');
         chatwindow.scrollTop(chatwindow[0].scrollHeight);
});

firebase.database().ref('/chats').on("child_added", function(snap) {
  $('#messages').append($('<li>').html('<div class="row msg_container"><div class="col-xs-12 col-md-12"><div class="messages base_sent"><p>'+snap.val().user+" : "+snap.val().message+'</p></div></div></div>'));
     var chatwindow=$('#messages');
         chatwindow.scrollTop(chatwindow[0].scrollHeight);
});


function sendMessage() {
      if($('#m').val()) {
          // Send Message 
            var date = new Date();
            var postData = {
              user: $.cookie("username"),
              message: $('#m').val(),
              datetime : date
            };

             // Get a key for a new Post.
              var newPostKey = firebase.database().ref().child('chats').push().key;

              // Write the new post's data simultaneously in the posts list and the user's post list.
              var updates = {};
              updates['/chats/' + newPostKey] = postData;
              firebase.database().ref().update(updates);

              $('#m').val('');
              return false;
        } else {
          alert("Please enter message");
          return false;
        }
}
