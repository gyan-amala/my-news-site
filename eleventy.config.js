module.exports = function(eleventyConfig) {
  
  // Tell Eleventy to copy these files to your final live site
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("logo-icon.png");

  // This defines the "limit" function for your article grids
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  return {
    dir: {
      input: ".",
      output: "_site"
    },
    htmlTemplateEngine: "njk"
  };
};
