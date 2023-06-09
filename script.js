let audio = Array.from(document.getElementsByClassName('audio'));
let audioElement = new Audio('');

// const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];
const numBalls = 50;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = `#${Math.floor(Math.random()*16777215).toString(16)}`;
//   ball.style.background = colors[Math.floor(Math.random()*colors.length-1)]
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;
  balls.push(ball);
  document.body.append(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12
  };

  let anim = el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
    {
      duration: (Math.random() + 1) * 2000, // random duration
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
});

let sounds = [
    { name: 'Bass', filePath: 'Sounds/bass.wav', imgPath: 'Icons/bass.png', key: '97', keyIcon: 'Icons/key_A.png' },
    { name: 'Hi-Hat', filePath: 'Sounds/hi-hat.wav', imgPath: "Icons/hi-hat.png", key: '115', keyIcon: 'Icons/key_S.png' },
    { name: 'Clarinet', filePath: 'Sounds/clarinet.wav', imgPath: "Icons/clarinet.png", key: '100', keyIcon: 'Icons/key_D.png' },
    { name: 'Tom', filePath: 'Sounds/tom_1.wav', imgPath: "Icons/snare.png", key: '102', keyIcon: 'Icons/key_F.png' },
    { name: 'Tom Echo', filePath: 'Sounds/tom_2.wav', imgPath: "Icons/snare.png", key: '106', keyIcon: 'Icons/key_J.png' },
    { name: 'Brass', filePath: 'Sounds/brass.wav', imgPath: "Icons/brass.png", key: '107', keyIcon: 'Icons/key_K.png' },
    { name: 'Clap', filePath: 'Sounds/clap.wav', imgPath: "Icons/clap.png", key: '108', keyIcon: 'Icons/key_L.png' }
]
// Data Insertion in HTML
let instrument = Array.from(document.getElementsByClassName('instrument'));
instrument.forEach((element, i) => {
    element.getElementsByClassName('audio')[0].src = sounds[i].filePath;
    element.getElementsByTagName('img')[0].src = sounds[i].imgPath;
    element.getElementsByTagName('img')[1].src = sounds[i].keyIcon;
    element.getElementsByClassName('name')[0].innerHTML = sounds[i].name;
    element.getElementsByClassName('audio')[0].id = sounds[i].key;
});

let bgSounds = [
    { sound: 'loopSound/1.mp3' }, { sound: 'loopSound/2.wav' }, { sound: 'loopSound/3.wav' },
    { sound: 'loopSound/4.wav' }, { sound: 'loopSound/5.wav' }, { sound: 'loopSound/6.wav' },
    { sound: 'loopSound/7.wav' }, { sound: 'loopSound/8.wav' }, { sound: 'loopSound/9.wav' },
    { sound: 'loopSound/10.wav' }, { sound: 'loopSound/11.wav' }, { sound: 'loopSound/12.wav' },
    { sound: 'loopSound/13.wav' }, { sound: 'loopSound/14.wav' }, { sound: 'loopSound/15.wav' },
    { sound: 'loopSound/16.wav' }, { sound: 'loopSound/17.wav' }, { sound: 'loopSound/18.wav' },
]


// playing with mouse
instrument.forEach((element, i) => {
    element.addEventListener('click', () => {
        audio[i].currentTime = 0;
        audio[i].play();
        if (repeat.classList.contains('on')) {
            audio[i].loop = true;
        }
        else {
            audio[i].loop = false;
        }
    })
})

// Repeat onclick
let repeat = document.getElementById('repeat');

let repeatOff = () => {
    repeat.classList = 'off';
    repeat.style.left = '-1px';
    repeat.style.backgroundColor = '#ff5c5c';
}
let repeatOn = () => {
    repeat.classList = 'on';
    repeat.style.left = '23px';
    repeat.style.backgroundColor = '#2f752f';
}

// handling buttons
let handleRepeat = () => {
    if (repeat.classList.contains('on')) {
        repeatOff();
    }
    else {
        repeatOn();
    }
}
let stop = document.getElementById('stop');
let shuffle = document.getElementById('shuffle');
let handleShuffle = () => {
    i = Math.floor(Math.random() * 17 + 1);
    // console.log(i)
    audioElement.src = bgSounds[i].sound;
    audioElement.play();
    audioElement.loop = true;
    shuffle.style.backgroundColor = '#2f752f';
    stop.src = 'Icons/stop.png';
    stop.style.backgroundColor = '#2f752f';
    stop.classList = 'on';
}
let handleStop = () => {
    audioElement.loop = false;
    audioElement.currentTime = 0;
    shuffle.style.backgroundColor = '#ff5c5c';
    stop.src = 'Icons/play.png';
    if (stop.classList.contains('off')) {
        audioElement.play();
        audioElement.loop = true;
        stop.src = 'Icons/stop.png';
        stop.style.backgroundColor = '#2f752f';
        stop.classList = 'on';
    }
    else {
        audioElement.currentTime = 0;
        audioElement.pause();
        stop.src = 'Icons/play.png';
        stop.classList = 'off';
        stop.style.backgroundColor = '#ff5c5c';
    }
}




// playing with keyboard
document.addEventListener('keypress', () => {
    audio.forEach((value, i) => {
        if (window.event.keyCode == audio[i].id) {
            audio[i].currentTime = 0;
            audio[i].play();
            if (repeat.classList.contains('on')) {
                audio[i].loop = true;
            }
            else {
                audio[i].loop = false;
            }
        }
    })
    if (window.event.keyCode == '114') {
        repeatOn();
    }
    if (window.event.keyCode == '101') {
        repeatOff();
    }
})

let list = document.getElementById('list');
let buttons = document.getElementById('buttons')
list.addEventListener('click', ()=>{
    // console.log(list.classList);
    if(list.classList != ('on')){
        list.classList = 'on';
        list.style.backgroundColor ='#2f752f';
        buttons.style.height = '200px';
    }
    else{
        list.classList = 'off';
        list.style.backgroundColor ='#ff5c5c';
        buttons.style.height = '47px';
        }
})


