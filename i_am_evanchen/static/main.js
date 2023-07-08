window.onload = function() {
  console.log("test");
  var greetingMessageEL = document.querySelector('#greeting-messages');
  var chatBoxContainer = document.querySelector('#chat-box');
  var chatBoxForm = document.querySelector('#chat-box-form');
  var introMessageContainer = document.querySelector('#introContainer');
  var typingSpeed = 20;
  var loadingText = '<b>•</b><b>•</b><b>•</b>';
  var messageIndex = 0;
  var introMessageIndex = 0;
  var intro_message_element = document.querySelector('.intro_message_loop');
  var intro_message_loop = [
     "am Evan Chen",
     "am a data engineer",
     "am a python developer",
     "am a machine learning engineer",
     "do data visualization",
     "built this website",
  ];

  var getCurrentTime = function() {
    var date = new Date();
    var hours =  date.getHours();
    var minutes =  date.getMinutes();
    var current = hours + (minutes * .01);
    if (current >= 5 && current < 19) return 'Have a nice day';
    if (current >= 19 && current < 22) return 'Have a nice evening';
    if (current >= 22 || current < 5) return 'Have a good night';
  }

  var messages = [
    'Hi!',
    'Evan Chen here',
    'I\'m a data engineer with machine learning background',
    'I\'m actively looking for a job.<br> You can contact me at <a href="mailto:ec.evan1994@gmail.com">ec.evan1994@gmail.com</a>',
    'Feel free to ask me any question in the text input below'
  ]

  var createBubbleElements = function(message, position) {
    var bubbleEl = document.createElement('div');
    var messageEl = document.createElement('span');
    var loadingEl = document.createElement('span');
    bubbleEl.classList.add('bubble');
    bubbleEl.classList.add(position === 'right' ? 'right' : 'left');
    bubbleEl.classList.add('cornered');
    messageEl.classList.add('message');
    loadingEl.classList.add('loading');
    messageEl.innerHTML = message;
    loadingEl.innerHTML = loadingText;
    bubbleEl.appendChild(loadingEl);
    bubbleEl.appendChild(messageEl);
    bubbleEl.style.opacity = 0;
    return {
      bubble: bubbleEl,
      message: messageEl,
      loading: loadingEl
    }
  }

  var sendMessage = function(message, position) {
    var elements = createBubbleElements(message, position);
    greetingMessageEL.appendChild(elements.bubble);
    anime({
              targets: elements.message,
              opacity: [0, 1],
              duration: 300,
    });
    anime({
              targets: elements.bubble,
              opacity: [0, 1],
              duration: 300,
    });
    anime({
              targets: elements.loading,
              opacity: [1, 0],
              duration: 300,
    });
    greetingMessageEL.appendChild(document.createElement('br'));
  }

  var sendMessages = function() {
    var message = messages[messageIndex];
    if (!message) return;
    sendMessage(message);
    ++messageIndex;
//    await sleep(500)
    setTimeout(sendMessages, (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + anime.random(900, 1200));
  }

  var updateIntroMessage = function(message) {
    anime({
    targets: intro_message_element,
    innerHTML: `<h1>&nbsp${message}</h1>`,
    });
  }

  var updateIntroMessages = function() {
    var message = intro_message_loop[introMessageIndex];
    if (!message) {
        introMessageIndex = 0;
        message = intro_message_loop[0];
    };
    updateIntroMessage(message);
    ++introMessageIndex;
    setTimeout(updateIntroMessages, 3000);
  }

  var shrinkIntroContainer = function() {
    anime({
        targets: introMessageContainer,
        height: ["500px", "150px"],
        easing: 'easeInOutQuad',
        duration: 5000,
    })
    setTimeout(
        anime({
            targets: chatBoxContainer,
            background: ["#212529", "#F8F9FA"],
            height: '400px',
            borderRadius: ['0%', '.35rem'],
            easing: 'easeInOutQuad',
            duration: 3000,
            complete: function() {
                // Apply overflow-y: hidden after the animation is complete
                chatBoxContainer.style.overflowY = 'hidden';
                chatBoxContainer.style.minHeight = '400px';
                chatBoxContainer.style.removeProperty('height')
            }
        }), 3000);
  }

  var showMessageForm = function() {
    anime({
        targets: chatBoxForm,
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 10000,
    })
  }

  setTimeout(updateIntroMessages, 5000);
  setTimeout(sendMessages, 2000);
  showMessageForm();
  shrinkIntroContainer();
  }