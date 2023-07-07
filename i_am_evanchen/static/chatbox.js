console.log("chatbox logged")

function readChatHist() {
    var chatMessagesContainer = document.getElementById('chat-messages');
    var chatHistData = []
    for (var i=0, max=chatMessagesContainer.children.length; i < max; i++){
        message = chatMessagesContainer.children[i].innerText;
        var index = message.indexOf(':');
        var role = message.substring(0, index);
        var message_info = message.substring(index + 1);
        chatHistData.push({'role': role, 'msg': message_info})
    };
    return chatHistData;
};

function sendMessage() {
    event.preventDefault();
    var messageInput = $('#message-input');
    var message = messageInput.val();
    var chatMessagesContainer = document.getElementById('chat-messages');
    messageInput.val('');
    var chatHistData = [
            { role: 'you', msg: 'testing' },
            { role: 'chatbot', msg: 'hi' }
        ];

    chatMessagesContainer.innerHTML += '<div class="bubble right"><strong>You:</strong><span class="message"> ' + message + '</span></div>';

    $.ajax({
        url: '/send',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({message: message, chatHistData: chatHistData}),
        success: function(response) {
            // Fetch updated chat messages after sending the user message
            console.log("ajax send");
            chatMessagesContainer.innerHTML += '<p><strong>Chatbot:</strong> ' + response + '</p>';
        },
    })
};