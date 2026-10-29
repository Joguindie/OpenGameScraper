# Open Game Scraper

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

A privacy-first, client-side toolkit to scrape user game libraries from closed ecosystems (Nintendo, PlayStation, Steam) without requiring passwords, API tokens, or compromised credentials.

Built with love by the [Joguindie](https://github.com/joguindie).

## Why this exists?

Getting a list of games a user owns across different platforms is surprisingly hard. Some platforms have closed APIs, others require complex OAuth flows, and asking users for their passwords is a massive security red flag.

**The solution:** client-side assisted scraping (via Bookmarklets).
This project provides safe, minified JavaScript snippets that users can run directly in their browsers while logged into their official gaming accounts. The script reads the publicly/privately rendered DOM, structures the data, and copies a clean JSON payload to the user's clipboard.

## Supported platforms

| Platform        |   Status   | Method      | Extraction Target                                               |
| :-------------- | :--------: | :---------- | :-------------------------------------------------------------- |
| **Nintendo**    | 🟢 Active  | Bookmarklet | [Virtual Game Cards](https://accounts.nintendo.com/portal/vgcs) |
| **PlayStation** | 🟢 Active  | Bookmarklet | [Library](https://library.playstation.com)                      |
| **Steam**       | 🟡 Planned | TBD         |                                                                 |

---

## Users: How to Use

You can extract your game libraries using our Bookmarklets.

### Nintendo

1. **Create the Bookmarklet:** create a new bookmark in your browser (usually `Ctrl+D` or `Cmd+D`). Name it something like "Extract Nintendo Games".
2. **Edit the URL:** edit the bookmark you just created and paste the minified code (found in `/src/nintendo_game_scraper_script.js`) into the **URL** field.
3. **Go to Nintendo:** log in to your Nintendo Account and navigate to the [Virtual Game Cards page](https://accounts.nintendo.com/portal/vgcs).
4. **Extract:** click the bookmark you created. A feedback overlay will appear, and your game list (in JSON format) will be copied to your clipboard!

### PlayStation

1. **Create the Bookmarklet:** create a new bookmark in your browser. Name it something like "Extract PlayStation Games".
2. **Edit the URL:** edit the bookmark you just created and paste the minified code (found in `/src/playstation_game_scraper_script.js`) into the **URL** field.
3. **Go to PlayStation:** log in to your account and navigate to the [Library page](https://library.playstation.com).
4. **Extract:** click the bookmark you created. The script will automatically paginate through your purchased games, and once finished, you can copy the JSON payload to your clipboard!

---

## Developers: How to Integrate

If you want to use these extractors in your own React/Vue/Vanilla app, you don't need to install any heavy npm packages.

### 1. The Output Format

All scripts in this repository output a standardized JSON array. Example:

```json
[
  {
    "title": "Mario Wonder",
    "platform": "Nintendo Switch"
  },
  {
    "title": "God of War: Laufey",
    "platform": "PS5"
  }
]
```

### 2. Implementation example (React)

You can provide the bookmarklet directly to your users via a draggable `<a>` tag:

```jsx
const BookmarkletButton = () => {
  const code = `javascript:(function(){ ... })();`; // Paste minified code here

  return (
    <div>
      <p>Drag this button to your bookmarks bar:</p>
      <a href={code} onClick={(e) => e.preventDefault()}>
        Extract Games
      </a>
    </div>
  );
};
```

Once the user extracts the data on the target platform, you simply provide a text area or a clipboard paste button in your app to receive the JSON array.

## Contributing

We want to expand this to support Steam, Xbox, and GOG!
If you want to contribute:

1. Fork the project.
2. Check the `/src` folder for the unminified, documented scripts.
3. Write your extractor targeting the specific platform's DOM or frontend state.
4. Submit a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.
