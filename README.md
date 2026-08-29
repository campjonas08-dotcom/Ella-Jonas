# Who's More Likely? 💕

A little game night webpage for two players, with three modes: **Who's More
Likely** (pick Jonas/Ella/Both/Neither), **Fill in the Blank**, and **Open
Ended** (free-text conversation prompts). Each of you opens it on your own
phone, picks your name once, and you both answer the same question — the
current question, your answers, the reveal, and the scoreboard all sync live
between your phones via Firebase. Switch modes any time with the tabs at the
top — it's shared, so switching on one phone switches it for both of you.

## Editing the questions

Open **`questions.js`**. There are three lists to edit, one per mode:
`QUESTION_GROUPS` (for Who's More Likely, grouped into labeled lists just to
keep things tidy — the group names don't show up on the site), plus
`FILL_BLANK_QUESTIONS` and `OPEN_ENDED_QUESTIONS` (flat lists).

- **Add a question:** add a new line in the right list, in quotes, ending with a comma:
  ```js
  "forget where they parked the car",
  ```
- **Remove a question:** delete its line.
- **Edit a question:** change the text between the quotes.
- **Add a whole new "Likely" category:** copy an existing group in
  `QUESTION_GROUPS` and give it a new key, e.g.:
  ```js
  holidays: [
    "forget to buy a gift",
    "overdo the decorations",
  ],
  ```

**Who's More Likely** questions are written **without** a question mark and
lowercase (e.g. `"forget their keys"`) — the site automatically capitalizes
and adds the `?` for you.

**Fill in the Blank** questions use `___` for the blank, e.g. `"My favorite
thing about you is ___"`.

**Open Ended** questions are written as full prompts/questions, shown exactly
as typed — no auto-formatting.

To rename the two players, edit the top of `questions.js`:
```js
export const NAMES = {
  a: "Jonas",
  b: "Ella",
};
```

That's it — no other files need to change. Just save `questions.js` and push
(see below) for it to go live.

## How the live sync works

`firebase-config.js` holds the (public, non-secret) connection details for a
free Firebase project. `app.js` keeps one shared "session" document in that
project's Firestore database — it stores the current question, both players'
answers, and the running scoreboard, and every phone viewing the page gets
live updates the instant either of you taps an answer.

Each phone remembers which of you is playing (Jonas or Ella) via a "switch"
link in the header — tap it to change who this device is playing as.

### Securing the database (do this once)

Firestore's "test mode" (which you may have chosen when setting it up) opens
the database to anyone for 30 days, then locks it and the site stops working.
To make it permanent and slightly safer, go to the
[Firebase console](https://console.firebase.google.com) → your project →
**Firestore Database → Rules**, and replace the contents with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sessions/shared {
      allow read, write: if true;
    }
  }
}
```

Click **Publish**. This only opens up the one shared quiz document (nothing
else in your Firebase project), and the project ID isn't discoverable by
random visitors — good enough for a private couple's game.

## Running it locally

Because `app.js` and `questions.js` use ES modules (`import`/`export`),
opening `index.html` directly by double-clicking it won't work — browsers
block module imports over `file://`. Instead, run a tiny local server from
this folder, e.g.:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`. Or just push your changes and test on the
live GitHub Pages URL.

## Publishing it with GitHub Pages

This repo is already set up to auto-deploy: `.github/workflows/deploy-pages.yml`
runs on every push to `main` and publishes the site via GitHub Actions. Once
Settings → Pages → Source is set to **GitHub Actions**, any push to `main`
(including editing `questions.js`) goes live within a minute or two at
`https://<username>.github.io/<repo>/` — no other steps needed.
