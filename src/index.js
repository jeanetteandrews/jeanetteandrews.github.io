document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.project-link');
  const iframeContainer = document.getElementById('iframe');
  const iframe = document.getElementById('iframe-content');
  const favicon = document.querySelector("link[rel='icon']");

  const faviconMap = {
    "SFPC Musical Web": "src/assets/favicons/musical-web-summer24.png",
    "Drum Randomizer 2": "src/assets/favicons/musicalweb2024.png",
    "WebBudots": "src/assets/favicons/webbudots.png",
    "Weather Song": "src/assets/favicons/weather-song.png",
    "UFO Dog": "src/assets/favicons/ufo-dog.png",
    "Drum Randomizer 1": "src/assets/favicons/random-drums.svg",
    "Rima's Choir": "src/assets/favicons/rimas-choir.png",
    "Cavity": "src/assets/favicons/cavity.png"
  };

  const projectDescriptions = {
    "Drum Randomizer 2": "Using: Pts.js, Max RNBO. View <a href='https://jeanetteandre.ws/musicalweb2024/'>full site ↗</a>. Presented at the <a href='https://youtu.be/dBErFlHfc8w?si=2tlsK0L85oog4LGN&t=1094' target='_blank'>Internet Archive ↗</a> with <a href='https://tiat.place/' target='_blank'>tiat place ↗</a>.",
    "Cavity": "Using: p5.js. View <a href='https://thehtml.review/04/cavity/' target='_blank'>full site ↗</a>. Featured in <a href='https://thehtml.review/04/' target='_blank'>The HTML Review ↗</a>.",
    "UFO Dog": "Using: Three.js, Max RNBO. View <a href='https://jeanetteandre.ws/ufo-dog/'>full site ↗</a>.",
    "SFPC Musical Web": "Using: Woscope.js. View <a href='https://projects.sfpc.study/musical-web-summer24/' target='_blank'>full site ↗</a>. Showcase for the <a href='https://sfpc.study/' target='_blank'>School for Poetic Computation ↗</a> The Musical Web.",
    "Sound Paint": "Using: p5.js, View <a href='https://sound-paint.onrender.com/'>full site ↗</a>.",
    "Python is my DAW": "Using: Python, Max RNBO. View <a href='https://jeanetteandre.ws/pythonismydaw/'>full site ↗</a>."
  };

  function updateFavicon(projectName) {
    const faviconPath = faviconMap[projectName]; 
    favicon.href = faviconPath;
  }

  function handleLinkClick(link, url) {
    document.querySelectorAll('.project-link').forEach(l => l.classList.remove('selected'));

    link.classList.add('selected');

    const projectName = link.textContent.trim();
    updateFavicon(projectName);

    if (url) {
      iframe.src = url;
      iframeContainer.classList.remove('hidden');

      const description = projectDescriptions[projectName] || "";
      document.getElementById('project-description').innerHTML = description;
    }
  }

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const url = link.getAttribute('data-url'); 
      handleLinkClick(link, url);
    });
  });

  links[0].click();
});