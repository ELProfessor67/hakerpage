//input box handle
const input = document.querySelector("#pass");
const error = document.querySelector('#error');
const button = document.querySelector('#btn');
const roompage = document.querySelector('.roompage');
const mainpage = document.querySelector('.boxcontainer');


//play naat
const naat = new Audio('../naat.mp3');
window.addEventListener('click',() => naat.play());
//handle click event
const roomPass = "1234567890";
button.addEventListener("click",() => {
  const Inputpass = input.value;
  if(Inputpass == '' || Inputpass == ' ' ){
    return error.innerText = "please enter password";
  }else if(Inputpass !== roomPass){
    return error.innerText = "incorrect password";
  }else if(Inputpass == roomPass){
    mainpage.classList.add('hidden');
    roompage.classList.remove('hidden');
    naat.pause();
  }
});

  

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