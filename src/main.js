import './style.css';

const base = import.meta.env.BASE_URL;
const posters = [
  ['Le manifeste', 'اكتشف عبقرية التنسيق', 'Produire avec l’IA sous contrôle humain : une vision qui place l’intention, le jugement et la responsabilité au cœur du travail.', 'الإنتاج بالذكاء الاصطناعي تحت إشراف الإنسان: رؤية تضع الهدف والحكم والمسؤولية في صميم العمل.'],
  ['De l’exécutant à l’orchestrateur', 'من التنفيذ إلى التنسيق', 'Donner une direction, organiser les systèmes et valider les résultats. Le rôle professionnel évolue vers la conception et la coordination.', 'تحديد الاتجاه، وتنظيم الأنظمة، والتحقّق من النتائج. يتحوّل الدور المهني نحو التصميم والتنسيق.'],
  ['Un parcours en cinq parties', 'مسار من خمسة أجزاء', 'Le plan du livre comprend 25 chapitres : comprendre la bascule, poser les fondements, explorer les systèmes augmentés, découvrir la méthode LN-IA et l’économie de l’orchestration.', 'تضمّ خطة الكتاب خمسةً وعشرين فصلاً، من فهم التحوّل وأسس التنسيق إلى الأنظمة المعزّزة ومنهجية LN-IA واقتصاد التنسيق.'],
  ['La méthode LN-IA', 'من الفكرة إلى التحسين', 'Intention, conscience, architecture, production, contrôle, capitalisation, amélioration : sept étapes reliées pour transformer une idée en valeur durable.', 'النية والوعي والهندسة والإنتاج والتحقّق وحفظ المعرفة والتحسين: مراحل مترابطة لتحويل الفكرة إلى قيمة مستدامة.'],
  ['Humains, IA et systèmes', 'الإنسان والذكاء الاصطناعي والأنظمة', 'Assistants, agents, mémoire et automatisation se coordonnent autour d’une direction humaine. Déléguer les tâches suppose de garder la maîtrise des décisions.', 'تتكامل المساعدات والوكلاء والذاكرة والأتمتة تحت توجيه بشري. تفويض المهام يقترن بالحفاظ على مسؤولية القرار.'],
  ['Une vision portée par l’auteur', 'رؤية ومنهج ومسؤولية', 'M. Abderrahman EL HISSE propose une réflexion sur la production augmentée, la transmission du savoir et la responsabilité humaine.', 'يقدّم الأستاذ عبد الرحمن الحيس رؤية حول الإنتاج المعزّز، ونقل المعرفة، والمسؤولية البشرية.'],
  ['L’économie de l’orchestration', 'نحو اقتصاد التنسيق', 'Vision, architecture, coordination, validation et transmission dessinent une nouvelle manière de créer de la valeur à partir des connaissances.', 'ترسم الرؤية والهندسة والتنسيق والتحقّق ونقل المعرفة مساراً جديداً لخلق القيمة انطلاقاً من المعرفة.'],
];

document.querySelector('#poster-gallery').innerHTML = posters.map(([title, ar, description, arDescription], i) => {
  const number = String(i + 1).padStart(2, '0');
  return `<article class="poster-card">
    <button class="poster-image-button" data-poster="${i}" aria-label="Agrandir l’affiche ${number} : ${title}">
      <img src="${base}media/segment-${number}.webp" width="1086" height="1448" loading="lazy" decoding="async" alt="${title} — ${ar}" />
      <span class="enlarge-label">Voir l’affiche <span aria-hidden="true">↗</span></span>
    </button>
    <div class="poster-copy"><span class="poster-number">${number} / 07</span><h3>${title}</h3><p class="poster-ar" lang="ar" dir="rtl">${ar}</p><p>${description}</p><p class="arabic-description" lang="ar" dir="rtl">${arDescription}</p></div>
  </article>`;
}).join('');

const video = document.querySelector('#presentation-video');
const play = document.querySelector('#play-film');
const durationLabel = document.querySelector('#film-duration');
const formatTime = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
video.addEventListener('loadedmetadata', () => {
  if (Number.isFinite(video.duration)) durationLabel.textContent = `${formatTime(video.duration)} · FR / العربية`;
});
video.addEventListener('play', () => { play.hidden = true; });
video.addEventListener('ended', () => { play.hidden = false; });
video.addEventListener('error', () => { play.hidden = true; });
async function playFilm() {
  try { await video.play(); }
  catch { play.hidden = false; video.focus(); }
}
play.addEventListener('click', playFilm);
document.querySelector('#watch-film').addEventListener('click', () => { playFilm(); });

const dialog = document.querySelector('#poster-dialog');
const dialogImage = document.querySelector('#dialog-image');
const download = document.querySelector('#dialog-download');
document.querySelector('#poster-gallery').addEventListener('click', event => {
  const button = event.target.closest('[data-poster]');
  if (!button) return;
  const index = Number(button.dataset.poster);
  const number = String(index + 1).padStart(2, '0');
  document.querySelector('#dialog-title').textContent = `${number} — ${posters[index][0]}`;
  dialogImage.src = `${base}media/segment-${number}.webp`;
  dialogImage.alt = `${posters[index][0]} — ${posters[index][1]}`;
  download.href = dialogImage.src;
  dialog.showModal();
  document.body.classList.add('modal-open');
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); });
