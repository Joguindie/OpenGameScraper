/**
 * Open Game Scraper Script - Steam
 *
 * Target URL: https://steamcommunity.com/my/games/?tab=all
 * Method: DOM Scraping with UI Overlay & Controlled Auto-Scroll
 *
 * This script is designed to be minified and used as a Bookmarklet. It reads game titles directly from the rendered HTML, navigating through pages automatically.
 */

(function () {
  // CONFIGURATION FLAG: Change to true if you want to include cover image URLs
  const includeCover = false;

  // 1. Setup UI Overlay
  const overlay = document.createElement('div');
  overlay.style.cssText =
    'position:fixed !important;top:0 !important;left:0 !important;width:100vw !important;height:100vh !important;background:rgba(0,0,0,0.85) !important;z-index:9999999 !important;display:flex !important;justify-content:center !important;align-items:center !important;color:white !important;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif !important;text-align:center !important;flex-direction:column !important;box-sizing:border-box !important;';
  document.body.appendChild(overlay);

  const title = document.createElement('h2');
  title.innerText = 'Open Game Scraper (Steam)';
  title.style.cssText =
    'margin:0 0 10px 0 !important;font-size:22px !important;color:#fff !important;';
  overlay.appendChild(title);

  const statusText = document.createElement('p');
  statusText.innerText = 'Starting extraction...';
  statusText.style.cssText =
    'margin:0 !important;font-size:16px !important;color:#aaa !important;';
  overlay.appendChild(statusText);

  // Use a Map to prevent duplicates during scrolling
  const gamesMap = new Map();
  let targetScrollY = 0;
  let retries = 0;

  // Scroll to top to ensure we start from the beginning
  window.scrollTo(0, 0);

  // 2. Setup interval to scroll and scrape virtualized items
  const scrapeInterval = setInterval(() => {
    const thumbnails = document.querySelectorAll(
      'a[href^="https://store.steampowered.com/app/"] img[alt]',
    );

    thumbnails.forEach((img) => {
      const gameTitle = img.getAttribute('alt');
      const coverUrl = includeCover ? img.getAttribute('src') : null;

      if (gameTitle && !gamesMap.has(gameTitle)) {
        const gameData = {
          title: gameTitle.trim(),
          platform: 'PC (Microsoft Windows)',
        };

        if (includeCover && coverUrl) {
          gameData.coverUrl = coverUrl;
        }

        gamesMap.set(gameTitle, gameData);
      }
    });

    statusText.innerText = `Scrolling and extracting... (${gamesMap.size} games found)`;

    // 3. Force controlled scroll
    targetScrollY += 800;
    window.scrollTo(0, targetScrollY);

    // 4. Check if we reached the bottom (actual scroll is less than target)
    if (window.scrollY < targetScrollY - 50) {
      retries++;
      // Wait 15 ticks (15 * 200ms = 3 seconds) for network/render
      if (retries > 15) {
        clearInterval(scrapeInterval);
        finishScraping();
      }
      // Reset target to actual so it doesn't grow infinitely
      targetScrollY = window.scrollY;
    } else {
      retries = 0;
    }
  }, 200);

  function finishScraping() {
    const games = Array.from(gamesMap.values());

    // Validation
    if (games.length === 0) {
      statusText.innerText =
        'No games found. Are you sure you are on the Steam Games page?';
      const closeBtn = document.createElement('button');
      closeBtn.innerText = 'Close';
      closeBtn.style.cssText =
        'margin-top:20px !important;padding:10px 20px !important;font-size:14px !important;background:#444 !important;color:white !important;border:none !important;border-radius:4px !important;cursor:pointer !important;outline:none !important;box-shadow:none !important;';
      closeBtn.onclick = () => overlay.remove();
      overlay.appendChild(closeBtn);
      return;
    }

    // 5. Serialize and wait for user gesture to copy
    statusText.innerText = `Success! Extracted ${games.length} games.`;
    const payload = JSON.stringify(games);

    const copyBtn = document.createElement('button');
    copyBtn.innerText = 'Copy to Clipboard';
    copyBtn.style.cssText =
      'margin-top:20px !important;padding:12px 24px !important;font-size:14px !important;background:#c5c3c0 !important;color:#171a21 !important;border:none !important;border-radius:4px !important;cursor:pointer !important;font-weight:700 !important;outline:none !important;box-shadow:none !important;-webkit-appearance:none !important;';

    copyBtn.onclick = () => {
      navigator.clipboard
        .writeText(payload)
        .then(() => {
          alert(
            `Success! Captured ${games.length} Steam games.\n\nThey have been copied to your clipboard.`,
          );
          // Note for developers: if you are building a custom integration,
          // you can append a redirect here:
          // window.location.href = "https://your-app.com/import";
        })
        .catch((err) => {
          alert('Failed to copy data. Please allow clipboard permissions.');
          console.error(err);
        });
    };

    overlay.appendChild(copyBtn);
  }
})();

/**
 * ==========================================
 * MINIFIED BOOKMARKLET VERSION
 * ==========================================
 * Copy the block below and paste it into the URL field of a bookmark.
 *
 * javascript:(function(){const e=!1,t=document.createElement("div");t.style.cssText="position:fixed !important;top:0 !important;left:0 !important;width:100vw !important;height:100vh !important;background:rgba(0,0,0,0.85) !important;z-index:9999999 !important;display:flex !important;justify-content:center !important;align-items:center !important;color:white !important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif !important;text-align:center !important;flex-direction:column !important;box-sizing:border-box !important;",document.body.appendChild(t);const o=document.createElement("h2");o.innerText="Open Game Scraper (Steam)",o.style.cssText="margin:0 0 10px 0 !important;font-size:22px !important;color:#fff !important;",t.appendChild(o);const n=document.createElement("p");n.innerText="Starting extraction...",n.style.cssText="margin:0 !important;font-size:16px !important;color:#aaa !important;",t.appendChild(n);const a=new Map;let r=0,i=0;window.scrollTo(0,0);const s=setInterval(()=>{document.querySelectorAll('a[href^="https://store.steampowered.com/app/"] img[alt]').forEach(t=>{const o=t.getAttribute("alt"),n=e?t.getAttribute("src"):null;if(o&&!a.has(o)){const t={title:o.trim(),platform:"PC (Microsoft Windows)"};e&&n&&(t.coverUrl=n),a.set(o,t)}}),n.innerText=`Scrolling and extracting... (${a.size} games found)`,r+=800,window.scrollTo(0,r),window.scrollY<r-50?(++i>15&&(clearInterval(s),c()),r=window.scrollY):i=0},200);function c(){const e=Array.from(a.values());if(0===e.length){n.innerText="No games found. Are you sure you are on the Steam Games page?";const e=document.createElement("button");return e.innerText="Close",e.style.cssText="margin-top:20px !important;padding:10px 20px !important;font-size:14px !important;background:#444 !important;color:white !important;border:none !important;border-radius:4px !important;cursor:pointer !important;outline:none !important;box-shadow:none !important;",e.onclick=()=>t.remove(),void t.appendChild(e)}n.innerText=`Success! Extracted ${e.length} games.`;const o=JSON.stringify(e),c=document.createElement("button");c.innerText="Copy to Clipboard",c.style.cssText="margin-top:20px !important;padding:12px 24px !important;font-size:14px !important;background:#c5c3c0 !important;color:#171a21 !important;border:none !important;border-radius:4px !important;cursor:pointer !important;font-weight:700 !important;outline:none !important;box-shadow:none !important;-webkit-appearance:none !important;",c.onclick=()=>{navigator.clipboard.writeText(o).then(()=>{alert(`Success! Captured ${e.length} Steam games.\n\nThey have been copied to your clipboard.`)}).catch(e=>{alert("Failed to copy data. Please allow clipboard permissions."),console.error(e)})},t.appendChild(c)}})();
 */
