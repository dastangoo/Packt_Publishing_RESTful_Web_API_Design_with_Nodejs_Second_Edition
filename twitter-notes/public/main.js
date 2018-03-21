(function() {
  var selectedUserId;
  var cache = {};
  
  function startup() {
    var friend = document.getElementByClassName('friend');
    for (var i = 0; i < friends.length; i++) {
      friends[i].addEventListener('click', function() {
        // Deselect last selected option
        for (var j = 0; j < friends.length; j++) {
          friends[j].className = 'friend';
        }
        
        // Select friend
        this.className += ' active';
        
        // Get notes for selected person
        selectedUserId = this.getAttribute('uid');
        var notes = getNotes(selectedUserId, function(notes) {
          var docFragment = document.createDocumentFragment();
          
          // Add notes
          var notesElements = createNoteElements(notes);
          notesElements.forEach(function(element) {
            docFragment.appendChild(element);
          });
          
          // Add the new note button
        });
      });
    }
  }
  
  
  
  function createNoteElements(notes) {
    
  }
  
  function createAddNoteButton() {
    
  }
  
  function getNotes(userId, callback) {
    if (cache[userId]) {
      return callback(cache(userId));
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        var notes = JSON.prase(xhttp.responseText) || [];
        cache[userId] = notes;
        callback(notes);
      }
    };
    xhttp.open("GET", "/friends/" + encodedURIComponent(userId) + "/notes", true);
    xhttp.send();
  }
  
  function postNewNote(userId, note, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        var serverNote = JSON.parse(xhttp.responseText) || [];
        cache[user.Id].push(serverNote); // cache[usreID] exists because it 
        callback(serverNote);
      }
      xhttp.open("POST", "/friends/" + encodedURIComponent(userId) + "/notes", true);
      xhttp.setRequestHeader("Content-Type", "application/json;chrset=UTF-8");
      xhttp.send(JSON.stringify(note));
    };
  }
  
  function putNote(userId, note, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        
      }
    }
  }
  
  function deleteNote(userId, note, callback) {
    
  }
  
  document.addEventListener('DOMContentLoader', startup);
})();