module.exports = function(eleventyConfig) {
  
  // 1. STATIC ASSETS
  // Tell Eleventy to copy your stylesheet and logo directly to the live site
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("logo-icon.png");

  // 2. AUTOMATIC FOLDER COLLECTIONS
  // This automatically grabs any markdown file dropped into your 'psir' folder 
  // and groups it into 'collections.psir' for your study dashboard, no manual tags required!
  eleventyConfig.addCollection("psir", function(collectionApi) {
    return collectionApi.getFilteredByGlob("psir/**/*.md");
  });

  // Note: Eleventy automatically builds 'collections.news' and 'collections.daily' 
  // because we added 'tags: news' and 'tags: daily' inside those specific markdown files.

  // 3. CUSTOM FILTERS
  // The limit function for your homepage article grids
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  // Converts raw dates (2026-07-06) into readable layouts (July 6, 2026)
  eleventyConfig.addFilter("readableDate", function(dateVal) {
    if (!dateVal) return "";
    const dateObj = typeof dateVal === "string" ? new Date(dateVal) : dateVal;
    return dateObj.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  });

  // 4. CORE DIRECTORY SETTINGS
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes" // Explicitly tells Eleventy to look here for base.html and layouts
    },
    templateFormats: ["html", "njk", "md"], // Ensures it reads all your file types
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk" // Ensures Nunjucks logic works inside your Markdown files
  };
};
