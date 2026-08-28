# Who's More Likely? 💕

A tiny "Who's More Likely To…" quiz webpage for two players, with a live scoreboard
(Jonas / Ella / Both / Neither) saved in the browser.

## Editing the questions

Open **`questions.js`**. Questions are grouped into labeled lists just to keep
things tidy — the groups don't show up on the site, they're just for you.

- **Add a question:** add a new line inside any group, in quotes, ending with a comma:
  ```js
  "forget where they parked the car",
  ```
- **Remove a question:** delete its line.
- **Edit a question:** change the text between the quotes.
- **Add a whole new category:** copy an existing group and give it a new key, e.g.:
  ```js
  holidays: [
    "forget to buy a gift",
    "overdo the decorations",
  ],
  ```

Questions are written **without** a question mark and lowercase (e.g. `"forget
their keys"`) — the site automatically capitalizes and adds the `?` for you.

To rename the two players, edit the top of `questions.js`:
```js
const NAMES = {
  a: "Jonas",
  b: "Ella",
};
```

That's it — no other files need to change. Just save `questions.js` and refresh
the page (or push the change, see below).

## Running it locally

Just open `index.html` in a browser — no build step, no server required.

## Publishing it with GitHub Pages

1. Push this repo to GitHub (already done if you're reading this on GitHub).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`.
4. Pick the branch you want live (e.g. `main`) and folder `/ (root)`.
5. Save. GitHub will give you a URL like `https://<username>.github.io/<repo>/`
   within a minute or two.

After that, any time you edit `questions.js` and push to that branch, the live
site updates automatically — no rebuild needed.
