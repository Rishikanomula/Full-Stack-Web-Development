const socket = io();

// Prompt for username
let username = localStorage.getItem('username');
if (!username) {
  username = prompt("Enter your username:");
  localStorage.setItem('username', username);
}

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const roomSelector = document.getElementById('room');

// Emit selected room to server when selected
roomSelector.addEventListener('change', () => {
  socket.emit('join room', roomSelector.value);
});

// Join default room on load
socket.emit('join room', roomSelector.value);

// Handle message submission
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const message = input.value.trim();
  const room = roomSelector.value;

  if (message) {
    socket.emit('chat message', {
      message,
      username,
      room
    });
    input.value = '';
  }
});

// Display incoming messages
socket.on('chat message', function(msg) {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
