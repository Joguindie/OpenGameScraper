/**
 * Open Game Scraper - Nintendo Switch
 *
 * Target URL: https://accounts.nintendo.com/portal/vgcs
 * Method: DOM Scraping (Virtual Game Cards)
 *
 * This script is designed to be minified and used as a Bookmarklet.
 * It reads the game titles and cover image URLs directly from the rendered HTML.
 */

(function () {
  // 1. Target the specific image class used by Nintendo's Virtual Game Cards
  const thumbnails = document.querySelectorAll('img.virtualGameCard_thumb');
  const games = [];

  // 2. Iterate through the NodeList and extract data
  thumbnails.forEach((img) => {
    const title = img.getAttribute('alt');
    const coverUrl = img.getAttribute('src');

    // Only push if a valid title exists
    if (title) {
      games.push({
        title: title.trim(),
        coverUrl: coverUrl,
        platform: 'Nintendo Switch',
      });
    }
  });

  // 3. Validation
  if (games.length === 0) {
    alert(
      'No games found. Are you sure you are on the Virtual Game Cards page?',
    );
    return;
  }

  // 4. Serialize the payload
  const payload = JSON.stringify(games);

  // 5. Copy to clipboard and alert the user
  navigator.clipboard
    .writeText(payload)
    .then(() => {
      alert(
        `Success! Captured ${games.length} Nintendo Switch games.\n\nThey have been copied to your clipboard. You can now paste them into your favorite app.`,
      );

      // Note for developers: if you are building a custom integration,
      // you can append a redirect here:
      // window.location.href = "https://your-app.com/import";
    })
    .catch((err) => {
      alert('Failed to copy data. Please allow clipboard permissions.');
      console.error(err);
    });
})();

/**
 * ==========================================
 * MINIFIED BOOKMARKLET VERSION
 * ==========================================
 * Copy the block below and paste it into the URL field of a bookmark.
 *
 * javascript:(function(){const e=document.querySelectorAll("img.virtualGameCard_thumb"),t=[];e.forEach((e=>{const o=e.getAttribute("alt"),r=e.getAttribute("src");o&&t.push({title:o.trim(),coverUrl:r,platform:"Nintendo Switch"})})),0===t.length?alert("No games found. Are you sure you are on the Virtual Game Cards page?"):navigator.clipboard.writeText(JSON.stringify(t)).then((()=>{alert(`Success! Captured ${t.length} Nintendo Switch games.\n\nThey have been copied to your clipboard. You can now paste them into your favorite app.`)})).catch((e=>{alert("Failed to copy data. Please allow clipboard permissions."),console.error(e)}))})();
 */
