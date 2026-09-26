(() => {
  const project = window.PROJECT || {};
  const setText = (id, value) => { if (value) document.getElementById(id).textContent = value; };
  const safeURL = value => {
    if (typeof value !== 'string' || !value.trim()) return '';
    try { const url = new URL(value, location.href); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; }
    catch { return ''; }
  };
  setText('project-title', project.title);
  setText('project-subtitle', project.subtitle);
  setText('abstract', project.abstract);
  document.title = `${project.title || 'HEIR'} | Anonymous Project Page`;
  for (const name of ['dataset', 'code']) {
    const resource = project[name] || {};
    setText(`${name}-description`, resource.description);
    const url = safeURL(resource.url);
    if (url) {
      const link = document.getElementById(`${name}-link`);
      link.href = url;
      link.rel = 'noreferrer noopener';
      link.hidden = false;
      document.getElementById(`${name}-pending`).hidden = true;
      setText(`${name}-status`, 'Available');
    }
  }
  const hero = document.getElementById('hero-video');
  const heroURL = safeURL(project.heroVideo);
  if (heroURL) {
    hero.src = heroURL;
    hero.hidden = false;
    document.querySelector('.hero-note').hidden = true;
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) hero.play().catch(() => {});
    hero.addEventListener('error', () => { hero.hidden = true; document.querySelector('.hero-note').hidden = false; });
  }
  for (const item of project.videos || []) {
    const src = safeURL(item.src);
    if (!src) continue;
    const figure = document.createElement('figure');
    const video = document.createElement('video');
    video.controls = true; video.playsInline = true; video.preload = 'metadata'; video.src = src;
    video.setAttribute('aria-label', item.title || 'Project demonstration');
    const poster = safeURL(item.poster); if (poster) video.poster = poster;
    const captions = safeURL(item.captions);
    if (captions) { const track = document.createElement('track'); track.kind = 'captions'; track.src = captions; track.srclang = 'en'; track.label = 'English'; video.append(track); }
    const caption = document.createElement('figcaption'); caption.textContent = item.title || 'Project demonstration';
    figure.append(video, caption); document.getElementById('video-grid').append(figure);
    document.getElementById('video-placeholder').hidden = true;
  }
})();
