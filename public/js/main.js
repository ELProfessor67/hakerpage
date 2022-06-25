const socket = io('https://my-socket-server-io.herokuapp.com/');

const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const container = document.getElementById('container');

const ding = new Audio('../ding.mp3');

const append = (message,position) => {
    const creteMessage = document.createElement('div');
    creteMessage.innerText = message;
    creteMessage.classList.add('message');
    creteMessage.classList.add(position);
    container.append(creteMessage);
    if(position == 'left'){
        ding.play();
    }
}

const name = 'anonymous';
socket.emit('new-user-joined', name);


socket.on('user-joined',(data)=>{
    append(`${data} join the chat`,'left');
});

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInp.value = '';
});

socket.on('receive',(data)=>{
    append(`${data.name}: ${data.message}`,'left')
});

socket.on('left',(data)=>{
    append(`${data}: left the chat`,'left');
});