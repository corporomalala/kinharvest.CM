/*** DATA ***/
var tagRadioBtn = document.querySelector(".js-radio");

const songs = [
  { src: 'music/aye.mp3', duration: 255 }, // duration in seconds
  { src: 'music/afsana.mp3', duration: 287 }
];

const player = new Audio();
/*** END DATA ***/
 
/*** EVENTS ***/
tagRadioBtn.addEventListener('click', doRadio);
/*** END EVENTS ***/

/*** FUNCTIONS ***/
function doRadio() {
  		if(!tagRadioBtn.classList.contains("is-playing")) {
  		  		tagRadioBtn.classList.add("is-playing");
  		  		tuneIn();
  		} else {
  		  		tagRadioBtn.classList.remove("is-playing");
  		  		tuneOff();
  		}
}

function tuneIn() {
  const { index, position } = getRadioState();
  const song = songs[index];

  player.src = song.src;
  player.currentTime = position;
  player.play();
  
 // alert(index + ": " + player.src);

  // When song ends, auto-advance to next
  player.onended = () => {
//    if (index == (songs.length - 1)) { index = -1; }
    
    const next = (index + 1) % songs.length;
    player.src = songs[next].src;
    player.currentTime = 0;
    player.play();
    
//    alert(index + ": " + player.src);
  };
}
function tuneOff() { player.pause(); }

function getTotalDuration() {
  return songs.reduce((sum, s) => sum + s.duration, 0);
}

function getRadioState() {
  const now = Math.floor(Date.now() / 1000); // unix time in seconds
  const total = getTotalDuration();
  let offset = now % total; // where we are in the full playlist cycle

  for (let i = 0; i < songs.length; i++) {
    if (offset < songs[i].duration) {
      return { index: i, position: offset }; // which song + how far in
    }
    offset -= songs[i].duration;
  }
}
/*** END FUNCTIONS ***/



