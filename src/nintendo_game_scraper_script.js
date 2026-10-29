/**
 * Open Game Scraper Script - Nintendo
 *
 * Target URL: https://accounts.nintendo.com/portal/vgcs
 * Method: DOM Scraping with UI Overlay
 *
 * This script is designed to be minified and used as a Bookmarklet. It reads game titles directly from the rendered HTML.
 */

(function () {
  // CONFIGURATION FLAG: Change to true if you want to include cover image URLs
  const includeCover = false;

  // 1. Setup UI Overlay (Required for feedback and clean user interaction)
  const overlay = document.createElement('div');
  overlay.style.cssText =
    'position:fixed !important;top:0 !important;left:0 !important;width:100vw !important;height:100vh !important;background:rgba(0,0,0,0.85) !important;z-index:9999999 !important;display:flex !important;justify-content:center !important;align-items:center !important;color:white !important;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif !important;text-align:center !important;flex-direction:column !important;box-sizing:border-box !important;';
  document.body.appendChild(overlay);

  const title = document.createElement('h2');
  title.innerText = 'Open Game Scraper (Nintendo)';
  title.style.cssText =
    'margin:0 0 10px 0 !important;font-size:22px !important;color:#fff !important;';
  overlay.appendChild(title);

  const statusText = document.createElement('p');
  statusText.innerText = 'Extracting games...';
  statusText.style.cssText =
    'margin:0 !important;font-size:16px !important;color:#aaa !important;';
  overlay.appendChild(statusText);

  // 2. Target the specific image class used by Nintendo's Virtual Game Cards
  const thumbnails = document.querySelectorAll('img.virtualGameCard_thumb');
  const games = [];

  // 3. Iterate through the NodeList and extract data based on the flag
  thumbnails.forEach((img) => {
    const title = img.getAttribute('alt');
    const coverUrl = includeCover ? img.getAttribute('src') : null;

    // Only push if a valid title exists
    if (title) {
      const gameData = {
        title: title.trim(),
        platform: 'Nintendo Switch',
      };

      if (includeCover && coverUrl) {
        gameData.coverUrl = coverUrl;
      }

      games.push(gameData);
    }
  });

  // 4. Validation
  if (games.length === 0) {
    statusText.innerText =
      'No games found. Are you sure you are on the Virtual Game Cards page?';
    const closeBtn = document.createElement('button');
    closeBtn.innerText = 'Close';
    closeBtn.style.cssText =
      'margin-top:20px !important;padding:10px 20px !important;font-size:14px !important;background:#444 !important;color:white !important;border:none !important;border-radius:4px !important;cursor:pointer !important;outline:none !important;box-shadow:none !important;';
    closeBtn.onclick = () => overlay.remove();
    overlay.appendChild(closeBtn);
    return;
  }

  // 5. Serialize and wait for user gesture to copy (Using Nintendo Red: #dc1715)
  statusText.innerText = `Success! Extracted ${games.length} games.`;
  const payload = JSON.stringify(games);

  const copyBtn = document.createElement('button');
  copyBtn.innerText = 'Copy to Clipboard';
  copyBtn.style.cssText =
    'margin-top:20px !important;padding:12px 24px !important;font-size:14px !important;background:#dc1715 !important;color:white !important;border:none !important;border-radius:4px !important;cursor:pointer !important;font-weight:500 !important;outline:none !important;box-shadow:none !important;-webkit-appearance:none !important;';

  copyBtn.onclick = () => {
    navigator.clipboard
      .writeText(payload)
      .then(() => {
        alert(
          `Success! Captured ${games.length} Nintendo games.\n\nThey have been copied to your clipboard.`,
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
})();

/**
 * ==========================================
 * MINIFIED BOOKMARKLET VERSION
 * ==========================================
 * Copy the block below and paste it into the URL field of a bookmark.
 *
 * javascript:(function(){const c=!1,o=document.createElement("div");o.style.cssText="position:fixed !important;top:0 !important;left:0 !important;width:100vw !important;height:100vh !important;background:rgba(0,0,0,0.85) !important;z-index:9999999 !important;display:flex !important;justify-content:center !important;align-items:center !important;color:white !important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif !important;text-align:center !important;flex-direction:column !important;box-sizing:border-box !important;",document.body.appendChild(o);const t=document.createElement("h2");t.innerText="Open Game Scraper (Nintendo)",t.style.cssText="margin:0 0 10px 0 !important;font-size:22px !important;color:#fff !important;",o.appendChild(t);const s=document.createElement("p");s.innerText="Extracting games...",s.style.cssText="margin:0 !important;font-size:16px !important;color:#aaa !important;",o.appendChild(s);const e=document.querySelectorAll("img.virtualGameCard_thumb"),g=[];e.forEach(e=>{const t=e.getAttribute("alt"),r=c?e.getAttribute("src"):null;if(t){const e={title:t.trim(),platform:"Nintendo Switch"};c&&r&&(e.coverUrl=r),g.push(e)}});if(g.length===0){s.innerText="No games found. Are you sure you are on the Virtual Game Cards page?";const cBtn=document.createElement("button");cBtn.innerText="Close";cBtn.style.cssText="margin-top:20px !important;padding:10px 20px !important;font-size:14px !important;background:#444 !important;color:white !important;border:none !important;border-radius:4px !important;cursor:pointer !important;outline:none !important;box-shadow:none !important;";cBtn.onclick=()=>o.remove();o.appendChild(cBtn);return}s.innerText=`Success! Extracted ${g.length} games.`;const pl=JSON.stringify(g),cpBtn=document.createElement("button");cpBtn.innerText="Copy to Clipboard";cpBtn.style.cssText="margin-top:20px !important;padding:12px 24px !important;font-size:14px !important;background:#dc1715 !important;color:white !important;border:none !important;border-radius:4px !important;cursor:pointer !important;font-weight:500 !important;outline:none !important;box-shadow:none !important;-webkit-appearance:none !important;";cpBtn.onclick=()=>{navigator.clipboard.writeText(pl).then(()=>{alert(`Success! Captured ${g.length} Nintendo games.\n\nThey have been copied to your clipboard.`)}).catch(err=>{alert("Failed to copy data. Please allow clipboard permissions.");console.error(err)})};o.appendChild(cpBtn)})();
 */
