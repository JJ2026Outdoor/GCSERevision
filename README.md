# GCSE Revision

A small, mobile-friendly revision tool for GCSE English, Maths and Science —
5-question sessions per subject with a stopwatch (not a time limit), instant
marking with explanations for anything wrong, a dashboard that tracks
improvement over time, automatic call-outs when a topic needs more practice,
questions that quietly get harder as she improves (colour-coded by grade), a
help button and subject glossary for when a question or word doesn't make
sense, a dyslexia-friendly display mode, a monthly streak calendar, and an
assessor/parent view of full session history.

Built around the **Welsh curriculum (WJEC)**: GCSE Mathematics and Numeracy
(Double Award, Foundation tier), GCSE The Sciences (Double Award), and GCSE
English Language and Literature.

Repo: **JJ2026Outdoor/GCSERevision** — once Pages is enabled (below), the
live link is `https://jj2026outdoor.github.io/GCSERevision/`.

## Quick start

**Just try it now, no setup:** open `index.html` in a browser (double-click
it, or drag it into a browser tab). It works immediately, storing results in
that browser only (see "Cross-device sync" below to share progress between
your phone and your daughter's).

**Put it online (recommended — this is what makes it usable from any phone):**

This folder is already a git repository with one commit. To push it to
`JJ2026Outdoor/GCSERevision`:

```
cd gcse-revision
git remote add origin https://github.com/JJ2026Outdoor/GCSERevision.git
git branch -M main
git push -u origin main
```

(If the repo already has a README or license from being created on GitHub
first, use `git push -u origin main --force` instead, since this local
history is the real starting point — or `git pull --allow-unrelated-histories
origin main` first if you'd rather merge them.)

Then in the repository on GitHub: **Settings → Pages**, set "Source" to the
`main` branch (root folder), and save. After a minute or two,
`https://jj2026outdoor.github.io/GCSERevision/` is the link to bookmark on
both phones.

## How it works day to day

- First visit, it asks who's revising ("Dad" or your daughter's name) — this
  keeps your results and hers separate everywhere in the app.
- Pick a subject. The main button is **"Today's 5 (mixed topics)"** — one
  question from each of that subject's 5 topics, so every topic gets touched
  every day, each drawn at that topic's own current difficulty level (see
  "Adaptive difficulty" below). A stopwatch counts up while you go (no time
  limit, no auto-submit) so you can see how long a session actually took.
- **Today's 5 is mandatory first.** Topic practice is locked (shown as a
  greyed-out "🔒 Topic practice" card) until that subject's mixed 5 is done
  for the day — this is enforced in the app logic too, not just hidden in the
  UI. Once it's done, **pick one topic** (e.g. Algebra, or Biology – Basis of
  Life) for another 5 random questions from just that topic's bank, as many
  times as you like for the rest of the day.
- Straight after finishing, you get a score, the time it took, and every
  wrong answer explained.
- **If a topic has been wrong 3 times in a row** (tracked across all your
  sessions, not just one), the results screen calls it out with a one-tap
  button straight into another 5 questions on exactly that topic.
- The dashboard (📈 button) shows sessions done, average/best score, average
  time per session, a score trend chart per subject, and accuracy by topic.
- The home page also shows a **streak calendar** for the current month — see
  "Streak calendar" below.

## Adaptive difficulty (grades GG–CC)

Questions are labelled with a difficulty grade, using the bottom five bands of
the real grading scale Wales uses for these double-award GCSEs (English
Language and Literature, Mathematics and Numeracy, and The Sciences): from
easiest to hardest, **GG, FF, EE, DD, CC**. The full scale used at grading
time actually runs all the way to A*A*, but this app only ever draws
Foundation-tier-appropriate content, so CC is treated as the practical
ceiling here — there's no point labelling a question "BB" if nothing in the
bank is that hard.

Each topic tracks its own level, per profile, based on your actual answer
history for that topic:

- **Get 3 in a row right** on a topic and it steps up one grade.
- **Get one wrong** and it steps down one grade.
- A brand-new topic starts at the easiest grade, GG, on purpose — the third
  request was specifically "really easy in the beginning."

When building a session, the app tries to draw questions at your current
level for that topic first, and only reaches into neighbouring grades if
there isn't enough content exactly at that level (so a session is never
short just because one grade band is thin). In **Today's 5**, this happens
independently per topic, since each of the 5 questions comes from a
different topic at that topic's own level.

Every question shows its grade as a small coloured badge (both while
answering and in the results review), so you can see at a glance whether a
mistake was on an easy or a hard one — and if a topic's level goes up after a
session, the results screen calls it out with a "levelled up" banner.

## Help button and glossary

Two things for when a question — or the wording of it — is the obstacle,
not the maths/science/English itself:

- **"❓ Need help?"** on the question screen reveals a hint — a nudge on
  *how to approach* the question, never the answer itself (e.g. "start by
  finding a common denominator," not "the answer is 3/8"). Hand-written
  questions and past-paper questions have a hint written specifically for
  them; anything without one falls back to a sensible generic hint for its
  question type.
- **"📖 Key words"**, available both on the subject screen and from within a
  question, opens a searchable glossary of that subject's common terminology
  in plain English — e.g. "Product = the answer when you multiply two or
  more numbers together." It's a lookup panel rather than clickable words
  inside the question text itself, which kept it simpler and less visually
  busy (a deliberate choice — inline word-by-word linking was considered and
  dropped). The word lists live in `data/glossary.js` if you want to add
  more terms.

## Dyslexia-friendly mode

The **"Aa"** button in the top-right corner toggles a dyslexia-friendly
display, on or off per device, for anyone using that device:

- Switches body text to **Lexend**, a font designed for reading proficiency
  (falls back to the existing system font if it can't load).
- Wider letter and word spacing, and more generous line height.
- A softened, lower-contrast off-white/cream colour scheme instead of stark
  white-on-black, which is easier on the eyes for a lot of dyslexic readers.

The setting is remembered (in that browser) so it doesn't need re-enabling
every visit.

## Streak calendar

The home page shows the current month as a grid, with each day marked as
**done** (a session was completed that day), **missed** (a day in the past
with no session), today, or a future day. It's a quick visual nudge —
missed days are visible at a glance rather than buried in the dashboard.

## Assessor / parent view

A **"🔍 Assessor / parent view"** link on the home page opens a view of
**every profile's** full session history — every question asked, the answer
given, whether it was right, and the explanation, exactly as it appeared at
the time (see "How your data is stored," below, for why that matters).

The first time it's opened it asks you to set a 4-digit PIN; after that, the
same PIN is needed to get back in. **Be clear-eyed about what this is and
isn't:** it's a light deterrent against a curious glance, not real security.
This is a static site with no server, no accounts and no passwords — the PIN
lives in that browser's storage, anyone with the browser's developer tools
open could bypass it in seconds, and (per the next section) the underlying
data isn't access-controlled between profiles regardless. Don't rely on it
to keep anything genuinely private.

## How your data is stored

There's no separate account system — "profiles" (e.g. "Dad" and your
daughter's name) are just a name typed in once and remembered on that
device, used to tag and filter results. Concretely:

- **With no Firebase setup** (the default), everything lives in that
  browser's `localStorage` — on that device only, all profiles mixed
  together in one place, filtered by name when displayed. Clearing that
  browser's site data deletes it.
- **With Firebase wired up** (see "Cross-device sync" above), results sync
  to one shared Firestore database for the whole app, again with every
  profile's results in the same collection and filtered by name when
  displayed — not split into separate per-user accounts with their own
  logins or access rules. The Firestore rules in this README allow anyone
  signed in (even anonymously) through your app to read and write any
  result, which is fine for a private family tool on an unlisted link, but
  worth knowing plainly: there's no technical barrier stopping one profile
  from seeing another's data, and the assessor PIN above is a UI nicety, not
  a real permissions system.

If you ever wanted proper separate logins with real access control, that
would mean adding real authentication (e.g. Firebase email/password or
Google sign-in per person) and Firestore security rules scoped to each
signed-in user — a bigger change than this app currently makes, and
probably overkill for two people sharing a revision tool.

## Cross-device sync (so you both see the same dashboard)

Without any setup, results are saved only in the browser that took the test —
your phone and hers won't see each other's progress. To fix that, wire up a
**free** Firebase project (Google's app backend — no credit card needed for
this level of use):

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
   and create a project (any name).
2. In the project, click the `</>` (web app) icon to register a web app.
   Firebase shows you a `firebaseConfig` object — copy it.
3. Open `firebase-config.js` in this project and paste your values in,
   replacing the placeholders (`YOUR_API_KEY` etc). These values are not
   secret — they're meant to be visible in client-side code.
4. In the Firebase console, go to **Build → Authentication → Sign-in method**
   and enable **Anonymous** sign-in. (This lets the app quietly sign each
   device in without anyone creating a password — you and your daughter never
   see a login screen.)
5. Go to **Build → Firestore Database → Create database** (start in
   production mode, pick any region close to you).
6. Once created, go to the **Rules** tab and replace the rules with:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /results/{resultId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

   This means: anyone signed in (even anonymously) through *your* app can read
   and write results — good enough for a private family tool, but be aware
   the URL isn't otherwise locked down, so don't share the link publicly.
7. Save, then reload the site (or re-upload `firebase-config.js` if it's
   already on GitHub Pages). The profile pill in the top corner will change
   from "This device" to "Synced" once it's working.

If you skip all of this, the app still works fine — it just stays
per-device. You can add Firebase later at any point without losing anything;
existing on-device results just won't retroactively appear on other devices.

## Where questions come from (and why they won't get repetitive)

Each subject draws from up to three sources, merged into one pool per topic:

1. **Hand-written questions** — `data/maths.js`, `data/science.js`,
   `data/english.js`. Each file has 5 topics; Maths has 8 hand-written
   questions per topic, Science and English have 15 each (Science/English
   can't be templated the way Maths can — see next point — so they lean on a
   bigger fixed bank instead).
2. **Maths-only "generators"** — `data/maths-generators.js`. Instead of a
   fixed question, a generator is a small function that produces a *fresh*
   question with new random numbers every single time it's used (e.g. "solve
   5x − 8 = 27" becomes different numbers on every draw, forever). This is
   what stops Maths ever feeling like the same 40 questions on rotation —
   there are 15 generators (3 per topic) on top of the hand-written bank, and
   each one has effectively unlimited variety. Science and English don't have
   generators, because "what's the powerhouse of the cell" doesn't template
   the same way a linear equation does — their variety comes from the larger
   hand-written banks instead, and from real past-paper questions (below).
3. **Real past-paper questions** — `data/past-papers.js`. See the next
   section.

Every session (daily mixed, or a single topic) randomly draws 5 from
whichever of these apply to that topic, and — where the pool's big enough —
avoids repeating the exact set from your last matching session.

Two question types, used by both the hand-written bank and past papers (the
generators build these same shapes in code):

- `type: "mcq"` — multiple choice. Set `options` (array of strings) and
  `correctIndex` (0 = first option, 1 = second, etc).
- `type: "short"` — typed answer. Set `accept` (array of acceptable typed
  answers — include a few variants, e.g. `["3/8"]` or `["1085", "1085m"]`).
  Answers are matched ignoring case, spaces and commas, so `accept: ["67,134,201"]`
  also matches `"67 134 201"` or `"67, 134, 201"`.

Every question needs an `explanation` — shown whenever the answer given is
wrong, never just for correct ones, so a mistake always comes with the
working, not just the right number.

## Adding real past exam papers

`data/past-papers.js` is a growing archive of real questions transcribed
from official exam papers and their mark schemes, each tagged with a
`source` object:

```js
source: { code: "S25", label: "Summer 2025 past paper", paper: "Unit 1 (Non-Calculator)" }
```

That's what puts the small **"S25 paper"** stamp next to a question on the
quiz screen and in the results review — just enough to flag "this one's a
real exam question," without making a big deal of it. Hover/long-press the
stamp for the full paper name.

It currently holds 43 Maths questions from the Summer 2025 Foundation-tier
papers (Unit 1 non-calculator and Unit 2 calculator-allowed) you supplied,
spread across all 5 Maths topics. A few notes on how they were chosen:

- Only questions answerable with a single typed or picked answer made the
  cut. Anything that needed drawing an angle, shading a shape, marking a
  probability scale, or measuring a printed diagram was left out — it
  doesn't fit this app's format, and guessing at a diagram's contents would
  risk baking a wrong answer into a "real" past-paper question.
- A couple (e.g. "put these three values in order") were reshaped into a
  multiple-choice question testing the same underlying maths, since the
  original asked for a full ordered list rather than one answer.
- These particular papers (code 3300U) are from WJEC's older, separate
  "Mathematics" qualification rather than the newer combined "Mathematics
  and Numeracy" this app is otherwise built around — flagged at the time
  they were added, but included anyway since Foundation-tier content
  (number, algebra, geometry, ratio, probability & stats) overlaps heavily
  between the two.

**To add more papers later** (any subject, any series — just send them
over): each question becomes one object appended to the `PAST_PAPER_QUESTIONS`
array in `data/past-papers.js`, with a `topicId` matching one of that
subject's existing topics (e.g. `"maths-2"` for Algebra, `"science-3"` for
Physics), the question itself, an `explanation`, and a `source` tag with
whatever series code makes sense (e.g. `"W24"` for Winter 2024, `"S26"` for
Summer 2026). Sending the mark scheme alongside the paper makes this much
faster and more accurate than the paper alone.

## A few things to know about the content

This was built from a starting question bank checked against the WJEC specs
you provided, but it's a **starting point, not exam-board material** — treat
it as a base to correct and expand, not a finished bank:

- **Maths and Science** questions are standard Foundation-tier / Combined
  Science topics, cross-checked against the actual unit structure in your
  spec PDFs (Science is mapped directly to the spec's 6 units; Maths splits
  the spec's "Number" strand into two tests for a cleaner 5-test set).
- **English is different.** The WJEC English Language and Literature GCSE is
  a brand-new, single combined qualification (not separate Language and
  Literature GCSEs), and 3 of its 6 units are coursework-style
  non-exam-assessment tied to texts your daughter's school will choose: a
  prose novel (Unit 2, "Belonging"), a Shakespeare play plus poetry anthology
  (Unit 5, "Continuity and Change"), and a non-fiction anthology theme (Unit
  3, "Influence and Power"). **A quiz app can't meaningfully test those until
  you know her actual set texts** — ask her teacher which prose text,
  Shakespeare play and anthology themes she's been given, and the Literary
  Devices / Poetry tests can be rebuilt around them. The 5 tests here instead
  build the general reading, SPaG and analysis-technique skills that underpin
  the two written-exam units (Context and Meaning; Connections).

## Files in this project

```
index.html           the app shell
style.css             all styling
firebase-config.js    your Firebase settings (or leave as placeholder)
data/
  maths.js             Maths hand-written question bank
  science.js           Science hand-written question bank
  english.js           English hand-written question bank
  maths-generators.js  Maths-only templated questions (fresh numbers every draw)
  past-papers.js       Real past-paper questions, tagged with their source paper
  glossary.js          Plain-English subject terminology for the "Key words" panel
js/
  app.js               screens, navigation, session-taking logic, weak-topic detection,
                        help/glossary/dyslexia-mode/calendar/assessor-view UI
  storage.js            saving/loading results (local or Firebase)
  dashboard.js          the progress dashboard and charts
  subjects.js            question pools, session-building, adaptive difficulty, daily-done check
  marking.js             answer-checking logic
  timer.js               the stopwatch
```

## A note on the design choices in this rework

A couple of judgment calls worth knowing about, in case you want them
different:

- **"3 wrong in a row" is tracked per topic, across every session** (daily
  mixed and topic practice combined) — not per exact question. So three
  different Algebra questions missed back-to-back triggers it, same as the
  same one three times.
- **Today's 5 unlocks topic practice, but doesn't lock itself.** Once done
  for the day it can still be repeated any number of times (useful if she
  wants another mixed round) — it's only topic-picking that's gated behind
  it, checked once by the UI and again inside the session-starting code
  itself, so it can't be bypassed by, say, a bookmarked link.
