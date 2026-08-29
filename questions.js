// ============================================================
//  QUESTIONS — this is the only file you need to touch.
//
//  To add a question: add a new line with your question in quotes,
//  followed by a comma. To remove one, delete its line.
//  To edit one, just change the text between the quotes.
//
//  You can organize them into as many/few groups as you want —
//  the group names (the comments and the object keys below) are
//  just for your own organization, they don't show up on the site.
//  Everything gets shuffled together automatically.
// ============================================================

// Change these two names if you ever want the site to use
// different names instead of Jonas / Ella.
export const NAMES = {
  a: "Jonas",
  b: "Ella",
};

const QUESTION_GROUPS = {
  everyday: [
    "forget where they put their phone",
    "be late for something important",
    "fall asleep during a movie",
    "burn food while cooking",
    "lose their keys",
    "hit snooze five times",
    "leave the fridge open",
    "text the wrong person",
    "forget an anniversary",
    "cry during a commercial",
    "sing in the shower",
    "talk to themselves out loud",
    "trip over nothing",
    "leave dishes in the sink overnight",
    "procrastinate on something important",
    "over-plan a trip",
    "under-pack for a trip",
    "get lost using GPS",
    "spend an hour picking a Netflix show",
    "fall asleep on the couch before 9pm",
  ],
  spending: [
    "impulse-buy something online at 2am",
    "spend their whole paycheck in one day",
    "haggle over a price",
    "buy something just because it's on sale",
    "forget to cancel a free trial",
    "splurge on a fancy dinner",
    "save every receipt",
    "buy a lottery ticket on a whim",
    "return something they bought",
    "spend too much on a gift for the other",
  ],
  relationship: [
    "start a random dance party in the kitchen",
    "plan a surprise date",
    "cry at the other's favorite song",
    "steal the covers at night",
    "fall asleep first on movie night",
    "win an argument",
    "apologize first after a fight",
    "remember how you two met, in more detail",
    "say 'I love you' first next time",
    "get jealous over something silly",
    "post a cheesy anniversary photo",
    "plan the next vacation",
    "be the little spoon",
    "hog the blanket",
    "start a pillow fight",
    "give the better foot massage",
    "actually follow through on 'let's redecorate'",
    "propose first if given the chance",
    "cry at the wedding",
    "want more kids",
  ],
  food: [
    "eat the last slice without asking",
    "order dessert first",
    "finish their plate before the other starts",
    "try a weird food on a dare",
    "add hot sauce to everything",
    "actually stick to a diet",
    "eat cereal for dinner",
    "burn popcorn in the microwave",
    "order the same thing every time at a restaurant",
    "become a decent cook someday",
    "eat food off the floor (5-second rule)",
    "finish a whole pizza alone",
  ],
  random: [
    "win an argument with logic instead of volume",
    "become famous for something ridiculous",
    "survive a horror movie situation",
    "get recognized by a stranger in public",
    "cry happy tears at good news",
    "start a business on a whim",
    "get a tattoo on impulse",
    "become the 'cool aunt/uncle'",
    "adopt a random stray animal",
    "get scared by a jump scare in a movie",
    "know all the words to a cheesy pop song",
    "win a trivia night",
    "get competitive over a board game",
    "flip a table over a board game loss",
    "become a plant parent who forgets to water them",
    "talk their way out of a speeding ticket",
    "cry at a Pixar movie",
    "become an influencer",
    "go skydiving if given the chance",
    "chicken out of a rollercoaster",
  ],
  future: [
    "move to a different city",
    "become the stricter parent someday",
    "still be doing the same job in 10 years",
    "learn a new language",
    "run a marathon",
    "get really into a random hobby out of nowhere",
    "become a morning person",
    "retire early",
    "start a podcast",
    "write a book",
  ],
};

// Flatten everything above into one big list — don't touch this part.
const LIKELY_QUESTIONS = Object.values(QUESTION_GROUPS).flat();

// ============================================================
//  FILL IN THE BLANK — same rules as above: add/edit/remove lines.
//  Use "___" wherever the blank goes.
// ============================================================
const FILL_BLANK_QUESTIONS = [
  "If we had a theme song, it would be ___",
  "My favorite thing about lazy days with you is ___",
  "The weirdest dream I've had about you was ___",
  "If we got a pet together, I'd want a ___",
  "You know I love you when I ___",
  "The most 'us' inside joke is ___",
  "In 10 years, I picture us ___",
  "If I could give you a superpower, it'd be ___",
  "The one food I'd never share with you is ___",
  "My secret talent you probably don't know about is ___",
  "If we were a couple in a movie, the genre would be ___",
  "The best nickname for you that I've never used is ___",
  "If we swapped lives for a day, the first thing I'd do is ___",
  "The most ridiculous thing I've done to impress you is ___",
  "Our next adventure together should be ___",
  "If you were a snack, you'd be ___",
  "The weirdest habit I secretly love about you is ___",
  "If we started a business together, it would be ___",
  "The song that always reminds me of us is ___",
  "If I had to describe our relationship in one word, it's ___",
];

// ============================================================
//  OPEN ENDED — same rules: add/edit/remove lines. No blank needed,
//  these are just conversation-starter prompts you each answer in
//  your own words.
// ============================================================
const OPEN_ENDED_QUESTIONS = [
  "What's your favorite memory of us so far?",
  "What's something you're proud of me for?",
  "If you could relive one day with me, which would it be?",
  "What's a small thing I do that makes you smile?",
  "What's one goal you want us to work on together?",
  "What's something you've never told me but want to?",
  "If we could teleport anywhere for a date night, where would we go?",
  "What's a habit of mine you secretly love?",
  "What's something you're looking forward to with me?",
  "What's the most 'you and me' way to spend a Saturday?",
  "What's a fear you have that only I know about?",
  "What's one thing you'd change about how we argue?",
  "What made you realize you were falling for me?",
  "What's a tradition you want us to start?",
  "What's something I do that you didn't expect to love?",
  "If we wrote a book about us, what would the title be?",
  "What's the best advice you'd give past-you about me?",
  "What's something small I could do more of that would mean a lot?",
];

// GAME_MODES ties each mode together — this powers the tabs on the
// site. "type: likely" gets the four buttons (Jonas/Ella/Both/
// Neither); "type: text" gets a free-text box instead.
export const GAME_MODES = {
  likely: {
    label: "Who's More Likely",
    emoji: "🤔",
    type: "likely",
    questions: LIKELY_QUESTIONS,
  },
  fillblank: {
    label: "Fill in the Blank",
    emoji: "✏️",
    type: "text",
    questions: FILL_BLANK_QUESTIONS,
  },
  openended: {
    label: "Open Ended",
    emoji: "💬",
    type: "text",
    questions: OPEN_ENDED_QUESTIONS,
  },
};
