window.onload = function () {
  window.playTransition = function () {
    const landing = document.getElementById('landing');
    const videoContainer = document.getElementById('video-container');
    const video = document.getElementById('transitionVideo');

    // Hide landing and show video container
    landing.style.display = 'none';
    videoContainer.style.display = 'block';
    videoContainer.classList.add('fade-in');

    // Attempt to play the video with promise
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Wait for 12.5s total, fade out before redirect
          const boltURL = "https://golden-pie-0455a8.netlify.app";
          const delay = 12500;

          setTimeout(() => {
            videoContainer.classList.remove('fade-in');
            videoContainer.classList.add('fade-out');
          }, delay - 1250);

          setTimeout(() => {
            window.location.href = boltURL;
          }, delay);
        })
        .catch(error => {
          console.error("Video playback failed:", error);
          // Fallback if autoplay fails
          window.location.href = "https://google.com";
        });
    }
  };
};
