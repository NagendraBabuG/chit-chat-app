const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('messageSection')
const messageForm = document.getElementById('sendMsg')
const messageInput = document.getElementById('messageInput')

let name = prompt('Enter your name?')
if(name == "") name = "Unknown"
if(typeof name == null) name = "Unknown"
if(typeof name == undefined) name = "Unknown"
appendMessage('You Joined', 'right')
// const name = "name";
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.msg}`, 'left')
})

socket.on('user-connected', name => {
  appendMessage(`${name} Joined`, 'left')
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} Left`, 'left')
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const msgInput = document.getElementById('messageInput')
  if(msgInput) {
    const message = messageInput.value
    if(message == "") return;
    appendMessage(`You: ${message}`, 'right')
    socket.emit('send-chat-message', message)
    msgInput.value = ''
  }
})
document.addEventListener('DOMContentLoaded', e=> {
  messageInput.addEventListener('submit',e);

})

function appendMessage(message, position) {
  const messageElement = document.createElement('div')
  if(messageElement) {
    messageElement.innerText = message
    //  messageElement.classList.add('message')
     messageElement.classList.add('message');
    messageElement.classList.add(position);
    // if(position == 'left') messageElement.style.left = auto;
    // else messageElement.style.right = auto;
    // messageElement.style.alignItems = position
    // messageElement.style.alignSelf = position
    //messageElement.classList.add(position)
    console.log(messageElement)
    //message.classList.add(position)
    messageContainer.append(messageElement)
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
}