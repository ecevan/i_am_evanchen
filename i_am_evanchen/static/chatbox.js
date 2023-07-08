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

    chatMessagesContainer.innerHTML += '<div class="container overflow-hidden">' + '<div class="bg-primary text-light bubble right cornered"><span class="message" style="opacity: 1;"> ' + message + '</span></div></div>';
    chatMessagesContainer.innerHTML += '<div class="bubble left"><span class="message" style="opacity: 1;"> Loading... </span></div>';

    $.ajax({
        url: '/send',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({message: message, chatHistData: chatHistData}),
        success: function(response) {
            // Fetch updated chat messages after sending the user message
            console.log("ajax send");
            chatMessagesContainer.removeChild(chatMessagesContainer.lastChild);
            chatMessagesContainer.innerHTML += '<div class="bubble left cornered"><span class="message" style="opacity: 1;">' + response + '</span></div>';
        },
    })
};