module.exports = function(eleventyConfig) {
  
  // Tell Eleventy to copy these static files directly to your final live site
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("logo-icon.png");

  // 🤖 AUTOMATIC PSIR COLLECTION BUILDER
  // This automatically tracks any markdown file landing inside your new 'psir' folder
  // and aggregates them all cleanly into 'collections.psir' for your dashboard.
  eleventyConfig.addCollection("psir", function(collectionApi) {
    return collectionApi.getFilteredByGlob("psir/**/*.md");
  });

  // This defines the "limit" function for your article grids
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  // Converts raw dates (2026-07-06) into readable clean layout dates (July 6, 2026)
  eleventyConfig.addFilter("readableDate", function(dateVal) {
    if (!dateVal) return "";
    const dateObj = typeof dateVal === "string" ? new Date(dateVal) : dateVal;
    return dateObj.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  });

  return {
    dir: {
      input: ".",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk" // Ensures Nunjucks works perfectly inside your Markdown data fields
  };
};
