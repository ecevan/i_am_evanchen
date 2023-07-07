window.onload = function() {
  console.log("string loop");
  var introMessageIndex = 0;
  var intro_message_element = document.querySelector('.intro_message_loop');
  var intro_message_loop = [
     "Evan Chen",
     "a data engineer",
     "a python developer",
     "a machine learning engineer",
     "do data visualization",
     "built this website",
  ];
  var updateIntroMessage = function(message) {
    anime({
    targets: intro_message_element,
    innerHTML: message,
    easing: 'linear',
    duration: 500,
    });
  }

  var updateIntroMessages = function() {
    var message = intro_message_loop[introMessageIndex];
    if (!message) return;
    updateIntroMessage(message);
    ++introMessageIndex;
    setTimeout(updateIntroMessages, 5000);
  }
  updateIntroMessages()
  }