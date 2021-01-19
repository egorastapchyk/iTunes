import { addZero } from './supScript.js';

export const videoPlayerInit = () => {
  // video-player;
  // video-button__play;
  // video-button__stop;
  // video-time__passed;
  // video-progress;
  // video-time__total;

  //Получили элементы с файла index.html
  const videoPlayer = document.querySelector('.video-player');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoTimeTotal = document.querySelector('.video-time__total');
  const videoVolume = document.querySelector('.video-volume');
  const videoFullscreen = document.querySelector('.video-fullscreen');
  const videoMute = document.querySelector('.video-mute');

  const audio = new Audio();
  // audio.type = 'mp4';
  // const prevVolume = audio.volume;

  videoFullscreen.addEventListener('click', () => {
    console.log(videoPlayer);
    videoPlayer.requestFullscreen();
    videoPlayer.controls = true;
  });
  videoPlayer.addEventListener('onfullscreenchange', () => {
    if (document.fullscreen) {
      videoPlayer.controls = true;
    } else {
      videoPlayer.controls = false;
    }
  });

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-pause');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-pause');
    }
  };

  const togglePlay = (event) => {
    event.preventDefault();
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
    // toggleIcon();
  };

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };

  const changeValue = () => {
    const valueVolume = videoVolume.value;
    videoPlayer.volume = valueVolume / 100;
    console.dir(videoPlayer);
    videoPlayer.muted = false;
  };

  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);

  // videoPlayer.addEventListener('fullscreenchange', (event) => {
  //   if (videoFullscreen) {
  //     videoPlayer.removeEventListener('click', togglePlay);
  //   } else {
  //     videoPlayer.addEventListener('click', togglePlay);
  //   }
  // });

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  videoButtonStop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(
      secondsPassed
    )}`;

    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(
      secondsTotal
    )}`;
  });

  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;
  });

  videoVolume.addEventListener('input', changeValue);

  videoPlayer.addEventListener('volumechange', () => {
    videoVolume.value = Math.round(videoPlayer.volume * 100);
  });
  changeValue();

  videoPlayerInit.stop = () => {
    videoPlayer.pause();
    toggleIcon();
  };

  // videoVolume.addEventListener('input', () => {
  //   audio.volume = videoVolume.value / 100;
  //   audio.muted = false;
  // });

  videoMute.addEventListener('click', () => {
    videoPlayer.muted = !videoPlayer.muted;
    console.log('sdgwefg');
    console.dir(audio);
  });

  // videoVolume.addEventListener('input', () => {
  //   audio.volume = videoVolume.value / 100;
  //   audio.muted = false;
  // });

  // videoMute.addEventListener('click', () => {
  //   audio.muted = !audio.muted;
  // });

  // videoVolume.value = audio.volume * 100;
};
