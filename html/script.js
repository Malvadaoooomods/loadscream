// Referências da interface e configuração pública.
const cfg = window.LOAD_CONFIG;
const video = document.getElementById('video');
const music = document.getElementById('music');
const toggle = document.getElementById('toggle');
const volume = document.getElementById('volume');
const mediaStatus = document.getElementById('mediaStatus');
// Usa o evento nativo do FiveM, sem simular progresso.
window.addEventListener('message', ({data}) => {
  if (!data || data.eventName !== 'loadProgress' || !Number.isFinite(data.loadFraction)) return;
  const percent = Math.round(Math.max(0, Math.min(1, data.loadFraction)) * 100);
  document.getElementById('progress').value = percent;
  document.getElementById('percent').textContent = percent + '%';
  document.getElementById('status').textContent = percent === 100 ? 'Aguardando entrada na cidade...' : 'Carregando recursos da cidade...';
});
// Configura mídia remota e mantém a interface em caso de erro.
video.addEventListener('error', () => { video.style.display = 'none'; });
music.addEventListener('error', () => { mediaStatus.textContent = 'Música indisponível. Confira o link.'; });
video.src = cfg.video;
music.src = cfg.music;
music.volume = Math.max(0, Math.min(1, Number(cfg.volume) || 0));
volume.value = music.volume;
// Atualiza o botão conforme o estado real da reprodução.
music.addEventListener('play', () => { toggle.textContent = 'Pausar música'; mediaStatus.textContent = ''; });
music.addEventListener('pause', () => { toggle.textContent = 'Reproduzir música'; });
function playMusic() { music.play().catch(() => { mediaStatus.textContent = 'Clique em reproduzir para ouvir a música.'; }); }
toggle.addEventListener('click', () => { if (music.paused) playMusic(); else music.pause(); });
volume.addEventListener('input', () => { music.volume = Number(volume.value); });
// Alguns navegadores bloqueiam áudio automático; o botão permite iniciar manualmente.
playMusic();
