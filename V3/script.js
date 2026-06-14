const songs = [
  { src: 'music/aye.mp3', duration: 255 }, // duration in seconds
  { src: 'music/asfana.mp3', duration: 287 }
];

const player = new Audio();

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

function tuneIn() {
//  alert("HERE!");
  const { index, position } = getRadioState();
  const song = songs[index];

  player.src = song.src;
  player.currentTime = position;
  player.play();

  // When song ends, auto-advance to next
  player.onended = () => {
    const next = (index + 1) % songs.length;
    player.src = songs[next].src;
    player.currentTime = 0;
    player.play();
  };
}

// Wire to your radio button
document.querySelector(".js-radio").addEventListener('click', tuneIn);

