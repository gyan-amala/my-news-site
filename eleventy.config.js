module.exports = function(eleventyConfig) {
  
  // ADD THIS EXACT LINE to tell Cloudflare to use your CSS
  eleventyConfig.addPassthroughCopy("style.css");

  // This line defines the missing "limit" function for your grids
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
