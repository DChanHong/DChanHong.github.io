const toggle = document.querySelector('.mode');
function updateThemeLabel() {
  const dark = document.documentElement.dataset.theme === 'dark';
  toggle?.setAttribute('aria-label', dark ? '라이트 모드로 전환' : '다크 모드로 전환');
  toggle?.setAttribute('aria-pressed', String(dark));
}
updateThemeLabel();
toggle?.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('hong-theme', theme); } catch {}
  updateThemeLabel();
});
const filters = document.querySelectorAll('[data-filter]');
const articles = [...document.querySelectorAll('[data-topic]')];
filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  articles.forEach(article => { article.hidden = category !== 'all' && article.dataset.topic !== category; });
  const empty = document.querySelector('#empty-posts');
  if (empty) empty.hidden = articles.some(article => !article.hidden);
}));
