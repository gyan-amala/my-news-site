module.exports = function(eleventyConfig) {
  
  // 1. GLOBAL DATA
  // This exposes 'site.domain' and 'site.currentYear' to all Nunjucks templates
  eleventyConfig.addGlobalData("site", {
    domain: "https://gyanamala.in",
    currentYear: new Date().getFullYear()
  });

  // 2. STATIC ASSETS
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("logo-icon.png");

  // 3. AUTOMATIC COLLECTIONS
  // The flat PSIR collection (still useful for general loops)
  eleventyConfig.addCollection("psir", function(collectionApi) {
    return collectionApi.getFilteredByGlob("psir/**/*.md");
  });

  // NEW: The Nested PSIR Tree (Paper -> Section -> Topic)
  eleventyConfig.addCollection("psirTree", function(collectionApi) {
    const psirNotes = collectionApi.getFilteredByGlob("psir/**/*.md");
    const tree = {};

    psirNotes.forEach(note => {
      const paper = note.data.paper || "Uncategorized";
      const section = note.data.section || "General";
      const topic = note.data.topic || "Misc";

      // Build the nested object architecture dynamically
      if (!tree[paper]) tree[paper] = {};
      if (!tree[paper][section]) tree[paper][section] = {};
      if (!tree[paper][section][topic]) tree[paper][section][topic] = [];

      tree[paper][section][topic].push(note);
    });
    
    return tree;
  });

  // 4. CUSTOM FILTERS
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  // UPDATED: Formats dates as "7 July 2026" (Indian/British locale)
  eleventyConfig.addFilter("readableDate", function(dateVal) {
    if (!dateVal) return "";
    const dateObj = typeof dateVal === "string" ? new Date(dateVal) : dateVal;
    return dateObj.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  });

  // NEW: Read Time Calculator
  eleventyConfig.addFilter("readingTime", function(text) {
    if (!text) return "1 Min Read";
    const wordsPerMinute = 200;
    // Strip HTML tags to only count actual words
    const plainText = text.replace(/<[^>]*>?/gm, ''); 
    const noOfWords = plainText.split(/\s+/).length;
    const minutes = Math.ceil(noOfWords / wordsPerMinute);
    return `${minutes} Min Read`;
  });

  // 5. CORE DIRECTORY SETTINGS
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
