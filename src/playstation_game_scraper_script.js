/**
 * Open Game Scraper - PlayStation
 *
 * Target URL: https://library.playstation.com
 * Method: Asynchronous DOM Scraping with Auto-Pagination & UI Overlay
 *
 * This script is designed to be minified and used as a Bookmarklet. It reads game titles directly from the rendered HTML, navigating through pages automatically.
 */

(function () {
  // CONFIGURATION FLAG: Change to true if you want to include cover image URLs
  const includeCover = false;

  // 1. Setup UI Overlay with transparent black background
  const overlay = document.createElement('div');
  overlay.style.cssText =
    'position:fixed !important;top:0 !important;left:0 !important;width:100vw !important;height:100vh !important;background:rgba(0,0,0,0.85) !important;z-index:9999999 !important;display:flex !important;justify-content:center !important;align-items:center !important;color:white !important;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif !important;text-align:center !important;flex-direction:column !important;box-sizing:border-box !important;';
  document.body.appendChild(overlay);

  const title = document.createElement('h2');
  title.innerText = 'Open Game Scraper (PlayStation)';
  title.style.cssText =
    'margin:0 0 10px 0 !important;font-size:22px !important;color:#fff !important;';
  overlay.appendChild(title);

  const statusText = document.createElement('p');
  statusText.innerText = 'Starting extraction...';
  statusText.style.cssText =
    'margin:0 !important;font-size:16px !important;color:#aaa !important;';
  overlay.appendChild(statusText);

  // Wrap scraping logic in async IIFE
  (async function () {
    // 2. Setup data structures and helper functions
    const games = [];
    const seen = new Set();
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    let hasNext = true;
    let pageCount = 1;

    // 3. Iterate through pagination and extract data based on the flag
    while (hasNext) {
      statusText.innerText = `Reading page ${pageCount}... (${games.length} games found)`;

      const items = document.querySelectorAll(
        'ul[data-qa="collection-game-list-collection"] > li',
      );

      items.forEach((li) => {
        const titleEl = li.querySelector(
          '[data-qa="collection-game-list-product#title"] span',
        );
        const imgEl = li.querySelector(
          'img[data-qa="collection-game-list-product#game-art#image#image"]',
        );
        const platformEl = li.querySelector(
          '[data-qa="collection-game-list-product#platform-tags#tag0"]',
        );

        if (titleEl) {
          const gameTitle = titleEl.innerText.trim();
          const coverUrl =
            includeCover && imgEl ? imgEl.getAttribute('src') : null;
          const platform = platformEl
            ? platformEl.innerText.trim().toUpperCase()
            : 'PlayStation';

          // Create a unique ID to prevent duplicates during pagination overlap
          const uniqueId = `${gameTitle}-${platform}`;

          if (!seen.has(uniqueId)) {
            seen.add(uniqueId);
            const gameData = {
              title: gameTitle,
              platform: platform,
            };

            if (includeCover && coverUrl) {
              gameData.coverUrl = coverUrl;
            }

            games.push(gameData);
          }
        }
      });

      const nextBtn = document.querySelector(
        'button[data-qa="pagination#next"]',
      );
      const currentPageBtn = document.querySelector(
        'button[aria-current="page"]',
      );
      const currentPageValue = currentPageBtn ? currentPageBtn.value : null;

      if (nextBtn && !nextBtn.disabled && !nextBtn.hasAttribute('disabled')) {
        nextBtn.click();

        let retries = 30; // Max 15 seconds
        let pageChanged = false;

        while (retries > 0) {
          await sleep(500);
          const newPageBtn = document.querySelector(
            'button[aria-current="page"]',
          );
          const newPageValue = newPageBtn ? newPageBtn.value : null;

          if (newPageValue !== currentPageValue) {
            pageChanged = true;
            await sleep(1000); // Buffer for rendering
            break;
          }
          retries--;
        }

        if (pageChanged) {
          pageCount++;
        } else {
          hasNext = false;
        }
      } else {
        hasNext = false;
      }
    }

    // 4. Validation
    if (games.length === 0) {
      statusText.innerText =
        'No games found. Are you sure you are on the PlayStation "Purchased" library page?';
      const closeBtn = document.createElement('button');
      closeBtn.innerText = 'Close';
      closeBtn.style.cssText =
        'margin-top:20px !important;padding:10px 20px !important;font-size:14px !important;background:#2f70d2 !important;color:white !important;border:none !important;border-radius:4px !important;cursor:pointer !important;outline:none !important;box-shadow:none !important;';
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
      'margin-top:20px !important;padding:12px 24px !important;font-size:14px !important;background:#2f70d2 !important;color:white !important;border:none !important;border-radius:4px !important;cursor:pointer !important;font-weight:500 !important;outline:none !important;box-shadow:none !important;-webkit-appearance:none !important;';

    copyBtn.onclick = () => {
      navigator.clipboard
        .writeText(payload)
        .then(() => {
          alert(
            `Success! Captured ${games.length} PlayStation games.\n\nThey have been copied to your clipboard.`,
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
  })().catch((err) => {
    statusText.innerText = 'An unexpected error occurred: ' + err.message;
  });
})();

/**
 * ==========================================
 * MINIFIED BOOKMARKLET VERSION
 * ==========================================
 * Copy the block below and paste it into the URL field of a bookmark.
 *
 * javascript:(function(){const c=!1,o=document.createElement("div");o.style.cssText="position:fixed !important;top:0 !important;left:0 !important;width:100vw !important;height:100vh !important;background:rgba(0,0,0,0.85) !important;z-index:9999999 !important;display:flex !important;justify-content:center !important;align-items:center !important;color:white !important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif !important;text-align:center !important;flex-direction:column !important;box-sizing:border-box !important;",document.body.appendChild(o);const t=document.createElement("h2");t.innerText="Open Game Scraper (PlayStation)",t.style.cssText="margin:0 0 10px 0 !important;font-size:22px !important;color:#fff !important;",o.appendChild(t);const s=document.createElement("p");s.innerText="Starting extraction...",s.style.cssText="margin:0 !important;font-size:16px !important;color:#aaa !important;",o.appendChild(s),(async function(){const g=[],v=new Set,d=ms=>new Promise(r=>setTimeout(r,ms));let h=!0,p=1;while(h){s.innerText=`Reading page ${p}... (${g.length} games found)`;document.querySelectorAll('ul[data-qa="collection-game-list-collection"] > li').forEach(li=>{const el=li.querySelector('[data-qa="collection-game-list-product#title"] span'),im=li.querySelector('img[data-qa="collection-game-list-product#game-art#image#image"]'),pl=li.querySelector('[data-qa="collection-game-list-product#platform-tags#tag0"]');if(el){const tt=el.innerText.trim(),cu=c&&im?im.getAttribute("src"):null,pf=pl?pl.innerText.trim().toUpperCase():"PlayStation",id=`${tt}-${pf}`;if(!v.has(id)){v.add(id);const obj={title:tt,platform:pf};c&&cu&&(obj.coverUrl=cu),g.push(obj)}}});const nx=document.querySelector('button[data-qa="pagination#next"]'),cp=document.querySelector('button[aria-current="page"]'),cv=cp?cp.value:null;if(nx&&!nx.disabled&&!nx.hasAttribute("disabled")){nx.click();let rt=30,ch=!1;while(rt>0){await d(500);const np=document.querySelector('button[aria-current="page"]'),nv=np?np.value:null;if(nv!==cv){ch=!0;await d(1000);break}rt--}if(ch){p++}else{h=!1}}else{h=!1}}if(g.length===0){s.innerText='No games found. Are you sure you are on the PlayStation "Purchased" library page?';const cBtn=document.createElement("button");cBtn.innerText="Close";cBtn.style.cssText="margin-top:20px !important;padding:10px 20px !important;font-size:14px !important;background:#2f70d2 !important;color:white !important;border:none !important;border-radius:4px !important;cursor:pointer !important;outline:none !important;box-shadow:none !important;";cBtn.onclick=()=>o.remove();o.appendChild(cBtn);return}s.innerText=`Success! Extracted ${g.length} games.`;const pl=JSON.stringify(g),cpBtn=document.createElement("button");cpBtn.innerText="Copy to Clipboard";cpBtn.style.cssText="margin-top:20px !important;padding:12px 24px !important;font-size:14px !important;background:#2f70d2 !important;color:white !important;border:none !important;border-radius:4px !important;cursor:pointer !important;font-weight:500 !important;outline:none !important;box-shadow:none !important;-webkit-appearance:none !important;";cpBtn.onclick=()=>{navigator.clipboard.writeText(pl).then(()=>{alert(`Success! Captured ${g.length} PlayStation games.\n\nThey have been copied to your clipboard.`)}).catch(err=>{alert("Failed to copy data. Please allow clipboard permissions.");console.error(err)})};o.appendChild(cpBtn)})().catch(err=>{s.innerText="An unexpected error occurred: "+err.message})})();
 */
