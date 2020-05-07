window.app = (function App (window) {
  const video = document.querySelector('.player')
  const canvas = document.querySelector('.photo')
  const ctx = canvas.getContext('2d')
  const strip = document.querySelector('.strip')
  const snap = document.querySelector('.snap')
  const photoButton = document.querySelector('button')

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(localMediaStream => {
        console.log(localMediaStream)
        video.srcObject = localMediaStream
        video.play()
      })
      .catch(error => {
        console.error('Woops', err)
      })
  }

  const paintToCanvas = () => {
    const width = video.videoWidth
    const height = video.videoHeight
    canvas.width = width
    canvas.height = height

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height)
    }, 16)
  }

  const takePhoto = () => {
    snap.currentTime = 0
    snap.play()

    const data = canvas.toDataURL('image/jpeg')

    const img = document.createElement('img')
    img.src = data
    img.alt = 'Handsome Photo'

    const anchor = document.createElement('a')
    anchor.href = data
    anchor.setAttribute('download', 'handsome')
    anchor.appendChild(img)
    strip.insertBefore(anchor, strip.firstChild)
  }

  const init = () => {
    getVideo()
    video.addEventListener('canplay', paintToCanvas)

    photoButton.addEventListener('click', takePhoto)
  }

  init()
})(window)