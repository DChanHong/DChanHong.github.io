export default {
 layout:'post.njk',
 eleventyComputed:{
  permalink:data => data.draft && process.env.ELEVENTY_ENV !== 'development' ? false : `/posts/${data.page.fileSlug}/`,
  eleventyExcludeFromCollections:data => !!data.draft && process.env.ELEVENTY_ENV !== 'development'
 }
};
