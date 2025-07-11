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
    "Cavity": "src/assets/favicons/cavity.png",
    "Strudel": "https://www.pikpng.com/pngl/b/35-351375_free-ball-and-moon-emoji-blue-swirl-emoji.png"
  };

  const projectDescriptions = {
    "Drum Randomizer 2": "Using: Pts.js, Max RNBO. View <a href='https://jeanetteandre.ws/musicalweb2024/'>full site ↗</a>. Presented at the <a href='https://youtu.be/dBErFlHfc8w?si=2tlsK0L85oog4LGN&t=1094' target='_blank'>Internet Archive ↗</a> with <a href='https://tiat.place/' target='_blank'>tiat place ↗</a>.",
    "WebBudots": "Using: Tone.js, Hydra. View <a href='https://jeanetteandre.ws/webbudots/'>full site ↗</a>. Showcased at <a href='https://grayarea.org/event/gray-area-creative-code-showcase-spring-2025/' target='_blank'>Gray Area ↗</a>.",
    "Cavity": "Using: p5.js. View <a href='https://thehtml.review/04/cavity/' target='_blank'>full site ↗</a>. Featured in <a href='https://thehtml.review/04/' target='_blank'>The HTML Review ↗</a>.",
    "UFO Dog": "Using: Three.js, Max RNBO. View <a href='https://jeanetteandre.ws/ufo-dog/'>full site ↗</a>.",
    "SFPC Musical Web": "Using: Woscope.js. View <a href='https://projects.sfpc.study/musical-web-summer24/' target='_blank'>full site ↗</a>. Showcase for the <a href='https://sfpc.study/' target='_blank'>School for Poetic Computation ↗</a> The Musical Web.",
    "Sound Paint": "Using: p5.js, View <a href='https://jeanetteandre.ws/sound-paint/'>full site ↗</a>.",
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

  const keyboard = document.getElementById('keyboard');
  const h3 = document.getElementById('animated-text');
  const text = "is a creative coder and musical artist based in the Bay Area, CA.";
  let index = 0;
  let isTyping = true;

  keyboard.addEventListener('click', () => {
    if (isTyping) {
      h3.textContent = ''; // Clear any existing text
      index = 0;
      typeText();
    } else {
      backspaceText();
    }
    isTyping = !isTyping;
  });

  function typeText() {
    if (index < text.length) {
      h3.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeText, 20); // Adjust typing speed here
    }
  }

  function backspaceText() {
    if (index > 0) {
      h3.textContent = h3.textContent.slice(0, -1);
      index--;
      setTimeout(backspaceText, 20); // Adjust backspacing speed here
    }
  }
});