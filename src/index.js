document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.project-link');
  const iframeContainer = document.getElementById('iframe');
  const iframe = document.getElementById('iframe-content');
  const externalLink = document.getElementById('external-link');
  const favicon = document.querySelector("link[rel='icon']");
  const projectInfo = document.getElementById('project-info');

  const faviconMap = {
    "SFPC musical web showcase": "src/assets/favicons/musical-web-summer24.png",
    "random drums": "src/assets/favicons/musicalweb2024.png",
    "quack": "src/assets/favicons/quack.png",
    "weather song": "src/assets/favicons/weather-song.png",
    "UFO dog": "src/assets/favicons/ufo-dog.png",
    "mini random drums": "src/assets/favicons/random-drums.svg",
    "rima's choir": "src/assets/favicons/rimas-choir.png",
    "space DJ": "src/assets/favicons/space-dj.png"
  };

  function updateFavicon(projectName) {
    const faviconPath = faviconMap[projectName]; 
    favicon.href = faviconPath;
    favicon.type = "img/gif";
  }

  function handleLinkClick(link, url) {
    document.querySelectorAll('.project-link').forEach(l => l.classList.remove('selected'));

    link.classList.add('selected');

    const projectName = link.textContent.trim();
    updateFavicon(projectName);

    if (url) {
      iframe.src = url;
      externalLink.href = url;
      externalLink.style.display = (projectName === 'quack') ? 'none' : 'block';
      iframeContainer.classList.remove('hidden');

      if (projectName === 'random drums') {
        projectInfo.classList.remove('hidden');
      } else {
        projectInfo.classList.add('hidden');
      }
    }
  }

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const url = link.getAttribute('data-url');
      handleLinkClick(link, url);
    });
  });

  function openRandomProject() {
    const randomIndex = Math.floor(Math.random() * links.length);
    const randomLink = links[randomIndex];
    randomLink.click();
  }

  // openRandomProject();
  links[0].click();
});
