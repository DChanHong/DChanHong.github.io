export default function (config) {
  config.addPassthroughCopy('src/assets');
  config.addFilter('dateLabel', value => new Intl.DateTimeFormat('ko-KR', {year:'numeric',month:'2-digit',day:'2-digit',timeZone:'Asia/Seoul'}).format(new Date(value)));
  config.addFilter('isoDate', value => new Date(value).toISOString());
  config.addCollection('articles', api => api.getFilteredByGlob('src/posts/*.md').filter(p => !p.data.draft || process.env.ELEVENTY_ENV === 'development').sort((a,b) => b.date-a.date));
  return {dir:{input:'src',includes:'_includes',data:'_data',output:'_site'},markdownTemplateEngine:false,htmlTemplateEngine:'njk'};
}
