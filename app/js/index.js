var socket = io("http://localhost:3001");
// socket.on("connect", function(){
//          alert("connected!")
//          });
// Sets the client's username
function setUsername () {
// If the username is valid
    username ="hello"
    socket.emit('add user', username);
}
$.clearInput = function () {
      $('form').find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
    };

function addWord () {
    word = "bag"
    socket.emit('add word', word)
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    t = setTimeout(function () {
        startTime()
    }, 500);
}
window.onload = function () {
    startTime();

    const ipc = require('electron').ipcRenderer;

    var closeEl = document.querySelector('#close');
    closeEl.addEventListener('click', function () {
        ipc.send('close-main-window');
    });

    var settingsEl = document.querySelector('#settings');
    settingsEl.addEventListener('click', function () {
      ipc.send('open-settings-window');
    });

    //  hide modal after submit
    $('#add_word_form').submit(function() {
      $('#add_word').modal('hide');
    });

    // reset the contensts of form after submit/close
    $('#add_word').on('hidden.bs.modal', function () {
      $('.modal-body').find('input').val('')
    });

}
// setUsername()
