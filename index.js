const video = document.querySelector('#video')
const playButton = document.querySelector('.play')
const prevButton = document.querySelector('.prev')
const nextButton = document.querySelector('.next')
const progress = document.querySelector('.progress')
const currTime = document.querySelector('.current-time')
const duration = document.querySelector('.total-duration')

let updateTimer
let isPlaying = false
let trackIndex = 0

const allVideos = [ 
  {
    path: 'video1.mp4'
  },
  {
    path: 'video2.mp4'
  }
]

function seekUpdate() {
  let seekPosition = 0
  if(!isNaN(video.duration)) {
    seekPosition = video.currentTime * (100 / video.duration)
    progress.value = seekPosition

    let currMinutes = Math.floor(video.currentTime / 60)
    let currSeconds = Math.floor(video.currentTime - (currMinutes * 60))
    let totalMinutes = Math.floor(video.duration / 60)
    let totalSeconds = Math.floor(video.duration - (totalMinutes * 60))  

    if(currMinutes < 10) currMinutes = `0${currMinutes}`
    if(currSeconds < 10) currSeconds = `0${currSeconds}`
    if(totalMinutes < 10) totalMinutes = `0${totalMinutes}`
    if(totalSeconds < 10) totalSeconds = `0${totalSeconds}`

    currTime.innerText = `${currMinutes}:${currSeconds}`
    duration.innerText = `${totalMinutes}:${totalSeconds}`
  }
}

function resetValues() {
  currTime.innerText = '00:00'
  duration.innerText = '00:00'
  progress.value = 0
}

function nextVideo() {
  if(trackIndex < allVideos.length - 1) {
    trackIndex++
  } else {
    trackIndex = 0
  }
  loadVideo(trackIndex)
  playVideo()
}

function prevVideo() {
  if(trackIndex > 0) {
    trackIndex--
  } else {
    trackIndex = allVideos[trackIndex] - 1
  }
  loadVideo(trackIndex)
  playVideo()
}

function loadVideo() {
  resetValues()
  clearInterval(updateTimer)

  video.src=`./videos/${allVideos[trackIndex].path}`
  video.load()
  updateTimer = setInterval(seekUpdate, 1000)

  video.addEventListener('ended', nextVideo)
  resetValues()
}
loadVideo()

function updateIcon(isPlaying) {
  if(isPlaying) {
    playButton.innerHTML = `<i class='fas fa-pause-circle'></i>`
  } else {
    playButton.innerHTML = `<i class='fas fa-play-circle'></i>`
  }
}

function playVideo() {
  video.play()
  isPlaying = true
  updateIcon(isPlaying)
}

function pauseVideo() {
  video.pause()
  isPlaying = false
  updateIcon(isPlaying)
}

function playAndPause() {
  if(isPlaying) {
    pauseVideo()
  } else {
    playVideo()
  }
}

function seekTo() {
  let seek = video.duration * (progress.value / 100)
  video.currentTime = seek
}


video.addEventListener('click', playAndPause)
video.addEventListener('pause', pauseVideo)
video.addEventListener('play', playVideo)
playButton.addEventListener('click', playAndPause)
nextButton.addEventListener('click', nextVideo)
prevButton.addEventListener('click', prevVideo)
progress.addEventListener('change', seekTo)