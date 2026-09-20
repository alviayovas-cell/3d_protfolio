# ALVIA YOVAS — Premium Cinematic 3D Portfolio

Personal portfolio for **Alvia Yovas S**, AI & Full Stack Developer.
Built with React 19, TypeScript, Vite, Tailwind CSS v4, React Three Fiber and Framer Motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint     # oxlint
```

---

# Project Progress

## Current Progress

**All 31 phases complete (0–30).** Every section on the plan is built; there are no
placeholders left on the page.

**Next:** set the site URL in `index.html` and deploy — see *Before deploying*.

**Last Verified:**
2026-09-20 — production build, Playwright + axe-core across mobile / tablet / laptop /
desktop, reduced-motion, and a WebGL-disabled run.

## Current Implementation Status

All 13 sections are real content. `App.tsx` renders straight from `SECTIONS`, so
document order always matches the declared order; 10 of the 13 appear in the nav, with
*Looking For*, *Certifications* and *Work With Me* reachable by scrolling and in-page
CTAs so the bar doesn't overflow.

| Metric | Result |
|---|---|
| Sections built | ✅ **13 / 13**, zero placeholders |
| Production build | ✅ `tsc -b && vite build`, ~0.8s |
| Lint | ✅ `oxlint` clean, 0 warnings |
| Initial JS | **124 kB gzipped** (three.js is a conditionally-loaded chunk) |
| axe-core WCAG 2.1 A/AA | ✅ **0 violations**, desktop and mobile |
| Console errors | ✅ none, in any tested configuration |
| Horizontal overflow | ✅ none at 390 / 768 / 1280 / 1920 |
| Broken internal links | ✅ none |
| Résumé PDF | ✅ served at `/resume.pdf` (HTTP 200, 77 kB) |

## Content provenance

Everything on the site traces to one of three sources, and nothing was invented:

| Source | What it supplied |
|---|---|
| **`public/resume.pdf`** | Experience, Certifications, Skills, phone number, Sentinel, corrected Diploma dates |
| **Public GitHub repos** | Project summaries, repo + live URLs, languages, stacks (all URLs resolved before linking) |
| **Screenshots supplied by Alvia** | Real captures of Codesphere, AirIndex India, Zana AI and OBE-AI, plus the live URLs for Codesphere and OBE-AI |
| **The original brief** | Name, role, tagline, location, socials, SIH wins, AWS Club lead |

Where the résumé and the brief disagreed, the résumé won — see *Corrections applied
from the résumé* below.

## Before deploying

1. **Set the site URL** in `index.html` — add an absolute `canonical` and `og:url`, and
   make `og:image` absolute. No domain is hard-coded, because a wrong canonical is
   worse than none.
2. **Check the voice intro in a real browser.** Headless Edge has no TTS voices, so
   the audio itself has never been heard in testing.
3. **Decide on the phone number.** `+91 93428 05727` now renders in Contact because the
   résumé lists it. Delete `phone` from `src/data/profile.ts` and the row disappears.

## Corrections applied from the résumé

1. **Diploma dates were wrong.** The brief said 2023–2024; the résumé says
   **2021–2022**, at CSC Computer Education, Mayiladuthurai. Education now matches the
   résumé.
2. **Skills were partly wrong.** They had been inferred from repository contents. The
   résumé removed **C** (never claimed) and added an entire **Embedded / IoT** group —
   ESP32, Arduino, Raspberry Pi, Jetson Nano — plus Node.js, Express.js, MySQL, AWS,
   Bootstrap, MQTT, TensorFlow Lite, YOLOv8 and MobileNetV2. `src/data/skills.ts` is
   now résumé-led and cross-checked against the repos.
3. **A sixth project was missing.** **Sentinel**, the Autodesk-sponsored SIH robotics
   project, is the résumé's featured project and now leads the Projects section.
4. **Experience existed after all.** It isn't salaried employment, but the résumé
   documents three real roles — see Phase 14.

---

# Development Phases

| Phase | Name | Status |
|------|------|--------|
| 0 | Project Inspection | ✅ |
| 1 | Design System | ✅ |
| 2 | Navigation | ✅ |
| 3 | Cinematic Hero | ✅ |
| 4 | 3D Environment | ✅ |
| 5 | Avatar Interaction | ✅ |
| 6 | Automatic Talking Avatar | ✅ |
| 7 | Lip Sync / Mouth Animation | ➖ |
| 8 | Floating Project Cards | ✅ |
| 9 | About Section | ✅ |
| 10 | What I'm Looking For | ✅ |
| 11 | Services | ✅ |
| 12 | Featured Projects | ✅ |
| 13 | Skills | ✅ |
| 14 | Experience | ✅ |
| 15 | Education | ✅ |
| 16 | Achievements & Leadership | ✅ |
| 17 | Certifications | ✅ |
| 18 | Resume | ✅ |
| 19 | Work With Me | ✅ |
| 20 | Project Inquiry Form | ✅ |
| 21 | Contact | ✅ |
| 22 | Custom Cursor | ✅ |
| 23 | Scroll Animation | ✅ |
| 24 | Mobile Experience | ✅ |
| 25 | Performance Optimization | ✅ |
| 26 | Accessibility | ✅ |
| 27 | SEO | ✅ |
| 28 | Final UI/UX Polish | ✅ |
| 29 | Final Testing | ✅ |
| 30 | Production Build | ✅ |

**Legend:** ✅ Completed · 🚧 In Progress · ⬜ Not Started · ⚠️ Needs Review · ➖ Removed at Alvia's request

---

## Verification Notes

Evidence backing each non-⬜ status, verified against the code and a live render.

### ✅ Phase 1 — Design System
`src/index.css` — token layer (`ink` / `mist` / `iris` / `azure` scales), display +
sans type stack, cinematic easing, `.glass-panel`, `.text-gradient`, `.noise-overlay`,
custom scrollbar, global focus-visible and reduced-motion handling.
Primitives: `Button`, `GlassCard`, `Badge`, `Container`, `SectionHeading`, `AnimatedText`.

### ✅ Phase 2 — Navigation
`Navbar.tsx` (sticky, transparent → blurred glass on scroll, animated active-section
pill via `useActiveSection`) and `MobileMenu.tsx` (fullscreen overlay, staggered
reveal, Esc-to-close, body-scroll lock).

### ✅ Phase 3 — Cinematic Hero
`Hero.tsx` — "ALVIA YOVAS" word-split reveal, "AI & FULL STACK DEVELOPER", intro copy,
two CTAs, avatar centerpiece, dark-veil entrance that fades to reveal the lit scene.

### ✅ Phase 4 — 3D Environment
`HeroScene.tsx` — R3F `Canvas`, positioned camera, ambient + two tinted point lights,
`ParticleField` (single `Points` draw call), `FloatingShapes` (low-poly wireframe
accents at mid-depth), `ParallaxGroup` (cursor-eased scene rotation). Particle and
shape counts drop on mobile; `useWebGLSupport` falls back to CSS particles when WebGL
is unavailable. Verified rendering with no console errors.

### ✅ Phase 5 — Avatar Interaction
`AvatarStage.tsx` layers four independent motions so the avatar reads as alive rather
than as one rigid image:
- **Body sway** — `avatar-float` (translateY, 6.5s)
- **Idle breathing** — `avatar-breathe` (scale pulse, 4.2s — deliberately out of phase with the float)
- **Autonomous head drift** — `avatar-head-drift` (rotateY/rotateZ, 9s), independent of the cursor
- **Mouse interaction** — cursor-driven 3D tilt + translate (`useParallax`)
- **Blinking** — `useBlink` drives two eyelid overlays on a randomized 2.6–6.2s cadence, 160ms close

The eyelids are positioned from `FACE_RIG`, whose percentages were derived by mapping
the source image's eye pixels through the img's `object-cover` crop (measuring off the
raw asset lands ~15% off). Verified visually: eyes read as genuinely closed when
blinking and leave no artifact when open.

**Verified:** float/breathe/head-drift all running · 2 eyelids present · live blink
observed at natural cadence · tilt responds to cursor movement · blink fully disabled
under `prefers-reduced-motion` · no console errors on desktop or mobile.

### ✅ Phase 6 — Automatic Talking Avatar
`src/lib/introSpeech.ts` plays the intro once per visit through `SpeechSynthesis`,
with **no mute / pause / resume / replay button, audio player or voice UI** anywhere
in the DOM. Script lives in `src/data/intro.ts`; `useIntroSpeech` exposes only the
`speaking` flag to React.

Three problems drove the design:
- **StrictMode double-mount.** An effect that spoke on mount and cancelled on cleanup
  would either speak twice or never speak. The controller is a module-level singleton
  with its own lifecycle; the hook subscribes via `useSyncExternalStore` and never
  cancels on unmount. One `speak()` call, verified in dev *and* prod.
- **Autoplay policy.** Browsers refuse speech before a user gesture — sometimes with an
  `error` event, sometimes by doing nothing at all. Both are handled: an `onerror`
  before `onstart`, or a 700ms watchdog catching silence, arms a one-shot retry on the
  first *activating* gesture (pointerdown / touchend / keydown / click — scroll and
  wheel don't grant activation, so they're excluded). Retries are capped at 8.
- **Chrome's ~15s cutoff.** A `resume()` keepalive runs every 8s while speaking, and
  the script is written to finish well inside the limit.

Every failure path is silent — missing API, missing constructor, rejected voice, or a
mid-sentence error all just leave the site quiet. **Avatar speaking state:** a violet
aura (`avatar-speaking` keyframe) pulses around the frame while the intro plays, then
fades out. It is a state readout, not a control.

**Verified** (Playwright + instrumented `speechSynthesis` stubs, dev and production builds):

| Check | Result |
|---|---|
| Speech triggered automatically on entry | ✅ one `speak()`, correct script |
| Duplicate speech prevented (StrictMode + prod) | ✅ exactly 1 call |
| Blocked autoplay (`error` event) → gesture retry | ✅ retried and spoke |
| Silent block (no events) → watchdog → gesture retry | ✅ retried |
| `speechSynthesis` absent entirely | ✅ hero, About and nav all fine |
| Avatar state changes while speaking | ✅ aura lit, `avatar-speaking` running |
| No playback controls in DOM | ✅ only control is "Open menu"; no `<audio>`/`<video>` |
| Console errors (all five scenarios) | none |
| Real (unstubbed) API + real gesture | no errors, site fully functional |

### ➖ Phase 7 — Lip Sync / Mouth Animation (built, then removed)
Built and verified as specified — a text-driven mouth overlay anchored on the speech
engine's `boundary` events, with five shapes and a fallback timeline. **Removed at
Alvia's request on 2026-09-20**: on the light theme the mouth aperture read as an
artefact on the portrait rather than as speech.

Removed cleanly, not hidden: the viseme driver is gone from `introSpeech.ts` (so no
rAF loop runs during speech for nothing), `useIntroSpeech` returns only `speaking`,
the `Mouth` overlay and its `FACE_RIG` entries are out of `AvatarStage.tsx`, and
`src/lib/visemes.ts` is deleted. Blinking, the voice intro and the speaking aura are
untouched — verified: 2 eyelids present, blink observed, aura lit while speaking,
1 `speak()` call, 0 mouth overlay, no console errors.

### ✅ Phase 8 — Floating Project Cards
`FloatingProjectCards.tsx` rings the avatar with five cards — Codesphere, AirIndex
India, Zana AI, OBE-AI / CO-PO and SecureWipe — reading from `src/data/projects.ts`
(the same source Phase 12's case studies will use). Summaries are verbatim from the
brief; no metrics were invented.

Each card sits at its own `translateZ` inside `AvatarStage`'s `perspective: 1200`
context, so depth is real rather than hand-scaled: nearer cards render larger and
swing further under cursor parallax. Measured travel scales cleanly with depth —
z34 → 16px, z40 → 19px, z62 → 30px, z78 → 37px, z92 → 44px. Each card also drifts on
its own float cycle with a negative delay, so they never pulse in unison.

They're real `<a>` elements in a `<ul>`, linking to `#projects`, keyboard focusable,
each with an `aria-label` carrying the project's full summary.

Two problems surfaced during build, both visible only in a real render:
- **Cards were clipping mid-word behind the avatar.** The avatar's tilt and entrance
  layers each flatten into their own rendering context, so `translateZ` alone doesn't
  decide paint order — the ring needed an explicit `z-30`.
- **The left-hand cards were vanishing.** Not a z-order bug: `.glass-panel` is only 5%
  white, which reads fine over the dark hero but washes out over the brightly-lit wall
  in the avatar photo. They now use an opaque `bg-ink-900/88` base that holds up over
  both the dark background and the lit portrait.

Positions dodge the face and the two existing corner badges, and the right-hand cards
deliberately hug the frame — pushing them further out overflowed the viewport at the
xl breakpoint, where the avatar column already sits against the gutter.

**Verified** (Playwright, dev and production builds):

| Check | Result |
|---|---|
| All five projects render, correct names | ✅ |
| Semantic `<a>` in `<li>`, focusable, aria-labelled | ✅ |
| Distinct 3D depths | ✅ 5 distinct, 34–92px |
| Cursor parallax scales with depth | ✅ monotonic, 16→44px |
| Hover: lift, border glow, background shift | ✅ `translate: 0 -4px`, reverts on leave |
| Keyboard focus + Enter navigates to `#projects` | ✅ |
| Reduced motion: no float, no cursor travel | ✅ static `translateZ` only |
| Hidden below xl (mobile 390, tablet 1024) | ✅ 0 rendered |
| No viewport overflow at 1280 / 1440 / 1920 | ✅ |
| Console errors | none |

### ✅ Phase 9 — About Section
`About.tsx` — bio copy, education + location fact cards, focus-area badges, and three
highlight stat cards, with scroll-reveal animation. Content lives in `src/data/about.ts`.
*Built ahead of sequence, before Phases 6–8.*

### ✅ Phase 10 — What I'm Looking For
`LookingFor.tsx` sits between About and Services, turning "who I am" into "what's
next": Freelance, Internships, Collaborations, Hackathons and Project Partnerships,
each as an icon card with a one-line description, plus a CTA through to Contact.
Content lives in `src/data/lookingFor.ts` and is phrased purely as **intent** — none
of it claims experience documented nowhere else on the site.

Five cards don't divide evenly, so the grid is `lg:grid-cols-6` with each card
spanning 2, and the fourth nudged to `col-start-2` — giving a centred 3 + 2 rather
than a lopsided orphan row.

This is the first phase to add a nav entry, which surfaced a latent Navbar bug: the
two-word label **"Looking For" wrapped inside its own link**, making that item taller
than its neighbours and throwing the whole row out of alignment (top 16px vs 24px).
Fixed with `whitespace-nowrap`, paying for the extra width by tightening link padding
from `px-3.5` to `px-3`.

**Verified** (Playwright, dev build):

| Check | Result |
|---|---|
| Five opportunities render with icons + copy | ✅ |
| Semantic `<ul>`/`<li>`, CTA links to `#contact` | ✅ |
| Nav link scrolls to section, active state updates | ✅ shows "Looking For" |
| `scroll-mt-24` keeps heading clear of fixed navbar | ✅ |
| Nav row aligned at 1280 / 1440 / 1920 | ✅ no wrap, no viewport overflow |
| Mobile menu includes the new entry | ✅ 11 links |
| Layout: mobile 1-col, tablet 2-col, desktop 3+2 | ✅ equal row heights |
| Console errors | none |

### ✅ Phase 11 — Services
`Services.tsx` covers all six offerings — Full Stack Web Development, AI Applications,
Backend & API Development, Developer Tools, Data & Analytics, Cloud & Deployment —
as numbered icon cards (01–06) in an even 1 / 2 / 3-up grid. Content lives in
`src/data/services.ts`.

Descriptions deliberately name **capabilities, not tools**. Listing specific vendors
or frameworks here would assert a stack that hasn't been established anywhere on the
site yet; that belongs in Phase 13 (Skills), where it can be stated accurately.

The `services` nav entry already existed, so this phase needed no Navbar changes —
the section simply replaced its `SectionPlaceholder`.

**Verified** (Playwright, dev build):

| Check | Result |
|---|---|
| Six services with icons, titles, descriptions | ✅ |
| Index numbering renders 01–06 | ✅ |
| Placeholder fully replaced | ✅ |
| Section order matches nav (home → about → looking-for → services) | ✅ |
| Nav link scrolls, active state shows "Services" | ✅ |
| Grid: mobile 1-col / tablet 2-col / desktop 3-col | ✅ equal row heights |
| No text clipped, no overflow at any breakpoint | ✅ |
| Hover lift | ✅ `translate: 0 -4px` |
| Reduced motion: all cards visible | ✅ |
| Heading hierarchy (h2 section, h3 cards) | ✅ |
| Console errors | none |

### ✅ Phase 12 — Featured Projects
`Projects.tsx` presents six projects as case-study rows that alternate sides on desktop
and stack copy-first on mobile, each with an index, category badge, name, summary,
capability chips, tech line and links. Data lives in `src/data/projects.ts`, shared
with the hero's floating cards so the two can't drift apart.

**Screenshots are real captures, never mockups.** Five projects show genuine
screenshots of the running apps in a browser-style frame, lazy-loaded with descriptive
alt text and a light scroll parallax. The captures are full-window, so the image is
nudged up ~3.2% to hide the real browser's URL bar — otherwise it sits inside the
frame's own chrome bar and reads as a doubled window.

**SecureWipe uses the landing page, not the dashboard.** The dashboard capture showed a
signed-in session belonging to someone else — another person's name and real device
records — which doesn't belong on this site.

**Sentinel has a diagram instead of a photo.** It's in-progress hardware with no
deployment to capture. A stock robot image would imply a prototype that isn't Alvia's,
so `SentinelDiagram.tsx` draws the pipeline he actually specified — vision
(YOLOv8n / MobileNetV2 / TF Lite) → edge and control (Raspberry Pi / Jetson Nano,
ESP32 / Arduino) → MQTT → monitoring (FastAPI, React). Original artwork, accurate to
the résumé, and more informative than a photograph would have been.

**Every link was resolved before shipping** (HTTP 200):

| Project | Stack | Repo | Live | Visual |
|---|---|---|---|---|
| Sentinel | Python · TF Lite · FastAPI · React · ESP32 | — | — | pipeline diagram |
| Codesphere | TypeScript · Python · Docker | ✅ | ✅ onrender.com | screenshot |
| AirIndex India | TypeScript · Python · FastAPI · MongoDB | ✅ | ✅ vercel.app | screenshot |
| Zana AI | Python · FastAPI · TypeScript | ✅ | ✅ vercel.app | screenshot |
| OBE-AI / CO-PO | TypeScript · AI tooling | — | ✅ co-po-lake.vercel.app | screenshot |
| SecureWipe | TypeScript · Next.js · Firebase | ✅ | ✅ secure-data-wiping-jmb7.vercel.app | screenshot |

**Verified:** 6 case studies · 4 screenshots all loading (`naturalWidth > 0`), all
`loading="lazy"` with alt text · 0 failed image requests · links carry
`rel="noopener"` · 0 axe violations with the images in place.

### ✅ Phase 13 — Skills
`Skills.tsx` renders all seven required groups — Languages, Frontend, Backend,
Databases, AI & Data, Tools, Cloud & Deployment — as chip lists.

**Every skill is evidence-backed, not assumed.** A skills list is a claim about a
person, so each entry traces to something checkable in the public repos, and
`src/data/skills.ts` carries a `source` field per group recording where it came from:

| Group | Evidence |
|---|---|
| Languages | GitHub language breakdown per repo (TS/Python dominate; JS, HTML, CSS; C is Codesphere's evaluated language) |
| Frontend | `secure_data_wiping/package.json` — Next.js 16, React 19, Tailwind 4, shadcn; this portfolio — Vite, R3F, Framer Motion |
| Backend | `backend/requirements.txt` in airindex-india and zana-ai — FastAPI, Uvicorn, Pydantic, python-jose (JWT), bcrypt, APScheduler |
| Databases | `motor` / `pymongo` in both backends; `firebase` + `firebase-admin` in SecureWipe |
| AI & Data | `anthropic` in airindex-india; `SpeechRecognition` and `spotipy` in zana-ai |
| Tools | Dockerfiles in codesphere / code-arena / Studentrisk; `pytest` in zana-ai; ESLint in SecureWipe |
| Cloud | Two live `vercel.app` deployments; *"fits Render's free plan"* in airindex requirements; `Procfile`; Firebase |

Nothing was included because "an AI & full-stack developer probably knows it". Notably
this surfaced a **Python/FastAPI + MongoDB backend layer** that none of the earlier
sections had mentioned — the repos are consistently TypeScript front end over a Python
API, which is a more accurate picture than the brief alone gave.

Seven cards don't divide into three columns, so the grid spans each card across 2 of 6
columns and starts the seventh at column 3 — the final row centres rather than leaving
an orphan hanging left.

**Verified** (Playwright, dev build):

| Check | Result |
|---|---|
| Seven groups, all required categories present | ✅ |
| Skill chips render per group | ✅ 6 / 7 / 7 / 2 / 4 / 6 / 4 |
| Placeholder replaced; nav + document order correct | ✅ |
| Nav link scrolls, active state shows "Skills" | ✅ |
| Desktop 3 + 3 + 1 with last card centred | ✅ |
| Mobile 1-col, tablet 2-col, no overflow anywhere | ✅ |
| Reduced motion: all cards visible | ✅ |
| Heading hierarchy (h2 / h3) | ✅ |
| Console errors | none |

### ✅ Phase 15 — Education
`Education.tsx` renders both qualifications as a vertical timeline, most recent first,
with a gradient rail and a "Present" badge on the ongoing degree:

| Qualification | Institution | Period |
|---|---|---|
| B.E. Computer Science and Engineering | Jeppiaar Engineering College | 2024–2028 (Present) |
| Diploma in Computer Application | CSC Computer Education | 2023–2024 |

Exactly what the brief provided — **no CGPA, grades, coursework or honours**, because
none were given and none are verifiable. A regex check in the verification suite
guards against those creeping in.

The degree entry reads from `PROFILE.education`, so the hero badge, About section and
this timeline can't disagree about the same qualification.

**`App.tsx` was refactored this phase.** Sections were previously hand-ordered before
the placeholder list, which silently placed Education *ahead of* Experience the moment
a section was finished out of sequence. The page now renders straight from
`NAV_ITEMS` via a component registry, so document order always matches nav order —
verified by comparing the two lists in the DOM.

**Verified** (Playwright, dev build):

| Check | Result |
|---|---|
| Both entries exact; "Present" on the current one | ✅ |
| No invented grades / CGPA / coursework | ✅ regex-checked |
| Document order === nav order (all 11 sections) | ✅ |
| Education correctly sits after Experience | ✅ |
| Nav link scrolls, active state shows "Education" | ✅ |
| Timeline rail + 2 markers, marked decorative | ✅ |
| No overflow at 390 / 1440; entries stack | ✅ |
| Reduced motion: both entries visible | ✅ |
| Console errors | none |

### ✅ Phase 16 — Achievements & Leadership
`Achievements.tsx` renders all three items as an even three-up grid, each tagged
Achievement or Leadership:

| Item | Kind |
|---|---|
| 2× SIH Internal Winner | Achievement |
| AWS Technical Lead | Leadership |
| Technical Event Coordinator & Participant | Leadership |

Verbatim from the brief. **No years, team sizes, event names, problem statements or
responsibilities were added** — none were supplied, and the verification suite
regex-checks that no dates or participant counts appear. The one addition is expanding
"SIH" to *Smart India Hackathon*, which states what the acronym means rather than
making a claim about the achievement. The Achievement/Leadership tags are derived from
what each item plainly is.

**Verified** (Playwright, dev build):

| Check | Result |
|---|---|
| Three items, titles verbatim | ✅ |
| Kind tags correct (1 Achievement, 2 Leadership) | ✅ |
| No invented years or counts | ✅ regex-checked |
| Placeholder replaced; document order === nav order | ✅ |
| Nav link scrolls, active state shows "Achievements" | ✅ |
| Grid 1 / 2 / 3-col, equal row heights | ✅ |
| No overflow at 390 / 768 / 1440 | ✅ |
| Reduced motion: all cards visible | ✅ |
| Console errors | none |

### ✅ Phase 14 — Experience
Unblocked by the résumé. There is no salaried employment, and the section doesn't
imply any — each entry names its organisation, so the nature of the role is clear:

| Role | Organisation |
|---|---|
| System Lead | Sentinel robotics project — SIH26115, Autodesk-sponsored (2026) |
| Technical Lead | AWS Club, Jeppiaar Engineering College |
| Event Coordinator | Department activities, Jeppiaar Engineering College |

Every bullet restates a line from the résumé; no metric appears that isn't written
there. The club roles carry **no dates**, because the résumé gives none — the
"Current" badge is the only timing claim made, and `period` renders conditionally so an
empty value simply doesn't appear.

**Verified:** 3 roles, 8 bullets, timeline rail and markers, no placeholder remaining.

### ✅ Phase 17 — Certifications
Also unblocked by the résumé:

| Certification | Issuer | Period |
|---|---|---|
| Full Stack Web Development | SLA (Virtual) | Jan 2025 – Jul 2025 |
| Diploma in Computer Applications (DCA) | CSC, Nagapattinam | Jan 2021 – Jan 2022 |

No credential IDs or verification links are shown because none were listed; add
`credentialUrl` to an entry in `src/data/certifications.ts` and the card links to it.
Not in the nav — it sits directly after Achievements, and the bar is at capacity.

### ✅ Phase 18 — Resume
`public/resume.pdf` is in place (77 kB, verified `HTTP 200` and `application/pdf`), so
`RESUME.available` is now true and the section renders working **View Resume** and
**Download Resume** buttons, the latter with a `download` attribute naming the file
`Alvia-Yovas-Resume.pdf`. If the file is ever removed, flipping `available` back to
false restores the email CTA rather than leaving a 404.

### ✅ Phase 19 — Work With Me
`WorkWithMe.tsx` — a client-facing section explaining how working together goes, in
three steps (tell me the problem, an honest scope, build in visible increments), with
the inquiry form alongside. Written as **intent and approach**, never as a track
record of clients that haven't happened.

### ✅ Phase 20 — Project Inquiry Form
`InquiryForm.tsx` covers all seven required fields — Name, Email, Project Type,
Budget, Description, Timeline, Message — with validation on the four that matter.

**There is no backend, so the form doesn't pretend to have one.** On submit it
validates, then opens the visitor's mail client with everything pre-filled, and says so
in plain text under the button: *"nothing is sent or stored by this page."*

Accessibility: every control has a real `<label for>`, invalid fields get
`aria-invalid` plus `aria-describedby` pointing at their error, and a `role="alert"`
summary takes focus on a failed submit.

**Verified:** 7 fields, all labelled · 4 required · empty submit flags exactly
`name, email, projectType, description` · alert announced.

### ✅ Phase 21 — Contact
`Contact.tsx` — email (as a `mailto:`), Chennai, India, and GitHub / LinkedIn /
Instagram, all read from `PROFILE`. **No phone number**, since none was provided.

lucide-react has dropped its brand icons, so `BrandIcons.tsx` supplies the GitHub,
LinkedIn and Instagram marks as inline SVGs — a generic "link" glyph next to a
GitHub URL reads badly.

**Verified:** all four links correct, external links carry `rel="noopener"`, no phone
number anywhere in the section.

### ✅ Phase 22 — Custom Cursor
`CustomCursor.tsx` — a tracking dot plus a ring that eases behind it and swells over
anything interactive.

Two details worth keeping: the system cursor is hidden by a class applied **only after
the component has actually mounted and started tracking**, so a device that never gets
the custom cursor never loses the real one; and positions are written straight to the
DOM inside a rAF loop rather than through React state, so moving the mouse doesn't
re-render the app every frame. Text inputs keep their native caret.

Disabled entirely on coarse pointers and under reduced motion.
**Verified:** mounts and hides the system cursor on desktop; does not mount at 390px.

### ✅ Phase 23 — Scroll Animation
Scroll reveals and word-split text animation were already in place from `AnimatedText`;
this phase added `useScrollParallax`, an element-scoped parallax driven by
IntersectionObserver plus a rAF-throttled scroll listener, so it only computes while
the element is on screen. Applied to the project emblems, which now drift against the
scroll as each card passes.
**Verified:** emblem offset moved from +8.5px to −9.1px across a 400px scroll.

### ✅ Phase 24 — Mobile Experience
- **The R3F scene no longer loads below 1024px.** Combined with Phase 25's code
  splitting, phones never download the 884 kB three.js chunk at all — verified by
  watching network requests at 390px. The CSS particle layer, lighting blooms and
  vignette still render, so the hero keeps its look.
- The floating project cards and the custom cursor are desktop-only.
- **Fixed the horizontal overflow** flagged in earlier phases: the hero's blur blooms
  are deliberately wider than the viewport, and `body { overflow-x: hidden }` alone
  wasn't enough — some mobile browsers take scroll width from `html`. `scrollWidth`
  now equals `clientWidth` at 390 / 768 / 1440.

### ✅ Phase 25 — Performance Optimization
`HeroScene` is now a `lazy()` import behind `Suspense`. three.js and R3F are ~884 kB of
the bundle and are needed only by the hero backdrop — not at all without WebGL, under
reduced motion, or on mobile.

| | Before | After |
|---|---|---|
| Initial JS | 1,252 kB (352 kB gzip) | **391 kB (124 kB gzip)** |
| three.js | in the main bundle | separate chunk, conditionally loaded |

A **65% reduction in initial payload**, and the CSS blooms cover the gap while the
scene loads, so there is no visible pop-in.

### ✅ Phase 26 — Accessibility
Audited with **axe-core 4.10 against WCAG 2.1 A + AA**, not by inspection.

The audit found one real violation: `--color-mist-600` (#6f6f82) sat at **4.0:1** on
`ink-900`, just under the 4.5:1 AA floor for body text. Lightened to `#7d7d90`
(~4.8:1), keeping the same muted role.

It also surfaced a bug the earlier per-phase checks had missed: **Framer Motion's
scroll reveals ignored `prefers-reduced-motion`**. Those variants start at `opacity: 0`
and are driven by JS, so the global CSS reduced-motion rule could not reach them —
reduced-motion visitors still got every fade-up, and anything whose in-view trigger
never fired would have stayed permanently invisible. `AnimatedText` now bypasses
animation entirely under reduced motion: 47 invisible elements → **0**.

Also in place: a skip link as the first tab stop, a `main` landmark, one `h1` with
clean h2/h3 nesting across all 46 headings, visible focus rings, labelled controls, and
`aria-hidden` on every decorative layer.

**Result: 0 axe violations on desktop and mobile, 29 checks passing.**

### ✅ Phase 27 — SEO
Title, meta description, author, Open Graph (type, site_name, title, description,
image, locale), a Twitter summary-large-image card, and a `Person` JSON-LD block
containing only facts stated elsewhere on the site — name, role, email, Chennai,
Jeppiaar Engineering College, and the three verified social profiles. No employer, no
awards markup.

**Deliberately not set: `canonical` and `og:url`.** The deployment domain isn't known,
and a wrong canonical is worse than none — `index.html` carries a comment saying
exactly what to add before deploying.

### ✅ Phase 28 — Final UI/UX Polish
- Contrast token corrected (Phase 26).
- Reduced-motion reveal bug fixed (Phase 26).
- Horizontal overflow eliminated (Phase 24).
- **Lint is now clean.** The long-standing `ParticleField` warnings were real: the dust
  field called `Math.random()` during render, so any `useMemo` re-run would visibly
  re-scatter it. Replaced with a seeded mulberry32 generator — pure, and stable
  across renders.
- Nav reduced from 11 crowded items to 9, resolving the capacity problem raised in
  Phase 10. `SECTIONS` now carries an `inNav` flag, so supporting sections stay
  anchorable without crowding the bar.

### ✅ Phase 29 — Final Testing
Full suite against the **production build**:

| Test | Result |
|---|---|
| 390 / 768 / 1280 / 1920 render | ✅ 12 sections each, 1 `h1`, no overflow, no errors |
| Internal anchors | ✅ 20 links, 0 broken |
| External links | ✅ 9, all `rel="noopener"` |
| Keyboard | ✅ skip link is first stop, focus outline visible, 40 stops traversed |
| Reduced motion | ✅ 0 invisible elements, all 10 `h2` visible |
| **WebGL disabled** | ✅ hero renders, 28 CSS particles, 0 canvases, no errors |
| Speech + lip sync (prod) | ✅ 1 `speak()`, 5 distinct mouth shapes |
| axe-core WCAG 2.1 AA | ✅ 0 violations |

### ✅ Phase 30 — Production Build
`npm run build` succeeds in ~0.8s with no errors. Output: 3.3 kB HTML, 51 kB CSS
(9.4 kB gzip), 391 kB JS (124 kB gzip), plus the conditionally-loaded 884 kB HeroScene
chunk. Verified by serving `dist/` with `vite preview` and running the full suite above
against it. Vite still warns about the HeroScene chunk size — that is three.js
itself, deliberately isolated and conditionally loaded.

---

## Known Gaps / Risks

**Action items**

1. **Site URL isn't set.** `canonical`, `og:url` and an absolute `og:image` need the
   real domain before deploying. `index.html` carries a comment with the specifics.
   Until then, link previews on LinkedIn / WhatsApp won't render an image.
2. **Audible speech has never been heard.** Headless Edge exposes `speechSynthesis` but
   has no TTS voices or audio device, so Phases 6–7 were verified with instrumented
   stubs plus a real-API smoke test. **How the voice sounds, and how well the mouth
   tracks it, still needs a human check in a real browser.**
3. **The phone number is now public.** `+91 93428 05727` renders in Contact because the
   résumé lists it. Delete `phone` from `src/data/profile.ts` to remove it.
4. **Not yet committed to git.** The repo `alviayovas-cell/portfolio` already holds a
   *different* Next.js project, so this needs a new repo or a deliberate decision about
   that one.

**Content that could still be stronger**

5. **Sentinel has no screenshot** — it's in-progress hardware with nothing deployed to
   capture, so it shows a system diagram instead. A real photo or CAD render of the
   prototype would be a straight upgrade; drop one in `public/images/projects/` and set
   `screenshot` on the entry in `src/data/projects.ts`.
6. **Sentinel has no links** (in-progress hardware work) and **OBE-AI has no public
   repo**, though it is linked to its live deployment. Add `repoUrl` / `liveUrl` in
   `src/data/projects.ts` if either gains one.
7. **Other public repos aren't surfaced** — `CampusOps` (Next.js, Firebase, Tailwind),
   `Studentrisk-ManagementSystem`, `code-arena` and `GPU` (gpu-red.vercel.app). The
   résumé groups several of these under "Additional Academic Projects"; they were left
   out because the brief named a specific featured set.
8. **The role label differs between sources.** The site says *AI & Full Stack
   Developer* (from the brief); the résumé says *Full-Stack Developer | CSE Student*.
   Worth picking one — it's the first line a visitor reads.

**Accepted trade-offs**

9. **The face rig is tied to the current avatar asset.** Eye and mouth coordinates in
   `FACE_RIG` were derived for `alvia-avatar.png` at its current `object-cover` crop.
   Swapping the image, or changing the img's `w-full h-[130%] object-cover object-top`
   classes, means re-deriving them — the method is documented in the `FACE_RIG`
   comment. Lip sync is text-driven, not audio-driven, because SpeechSynthesis exposes
   no audio stream, so shapes are plausible rather than phonetically exact.
10. **Autoplaying audio with no visible stop control conflicts with WCAG 1.4.2**, which
    wants a way to stop audio that plays for over 3 seconds. The spec forbids visible
    controls, so the compromise is invisible: **Escape** cancels the intro, and it never
    replays within a visit.
11. **Desktop-only features.** The floating project cards and the custom cursor are
    hidden below `xl`; every project remains reachable through the Projects section.
    The hero ring shows the first five projects — there are now six.
12. **Three sections are outside the nav** (*Looking For*, *Certifications*, *Work With
    Me*). The bar holds 10 comfortably; 13 would overflow at 1280px. All three are
    anchorable and reachable by scrolling or in-page CTAs.
13. **HeroScene chunk is 884 kB** (235 kB gzip). That is three.js itself. It is isolated
    from the initial bundle and only loaded on desktop with WebGL and motion enabled,
    which is why Vite's size warning is left standing rather than silenced.

# Phase Definitions

### Phase 0 — Project Inspection
Inspect existing architecture, dependencies, assets, components, configuration and current implementation.

### Phase 1 — Design System
Create the global colors, typography, spacing, buttons, cards, glass effects, borders, shadows and responsive design foundation.

### Phase 2 — Navigation
Create responsive sticky navigation, desktop navigation, mobile menu, smooth scrolling and active section indication.

### Phase 3 — Cinematic Hero
Create the main hero with: ALVIA YOVAS, AI & FULL STACK DEVELOPER, introduction, CTA buttons, stylized avatar, cinematic entrance animation.

### Phase 4 — 3D Environment
Create: Three.js / React Three Fiber scene, camera, lighting, particles, atmosphere, floating objects, depth layers, mouse parallax, responsive 3D behavior.

### Phase 5 — Avatar Interaction
Add: floating avatar, idle breathing, blinking, subtle head movement, subtle body movement, mouse interaction.

### Phase 6 — Automatic Talking Avatar
Automatically start the introduction when the website is entered. NO visible mute, pause, resume, replay, audio player or voice control UI. Use browser-compatible SpeechSynthesis. Handle browser restrictions gracefully.

### Phase 7 — Lip Sync / Mouth Animation
Make the avatar appear to actually speak. Implement mouth states, mouth opening/closing, speech synchronization, blinking, subtle facial/head movement. Do NOT fake speech by moving the entire image.

### Phase 8 — Floating Project Cards
Add interactive 3D project cards around the avatar: Zana AI, AirIndex India, Codesphere, OBE-AI / CO-PO, SecureWipe.

### Phase 9 — About
Create a premium About Me section explaining Alvia's background, interests and development focus.

### Phase 10 — What I'm Looking For
Add: Freelance, Internships, Collaborations, Hackathons, Project Partnerships.

### Phase 11 — Services
Add: Full Stack Web Development, AI Applications, Backend/API Development, Developer Tools, Data/Analytics, Cloud/Deployment.

### Phase 12 — Featured Projects
Create case-study style project presentations for: Codesphere, AirIndex India, Zana AI, OBE-AI / CO-PO, SecureWipe.

### Phase 13 — Skills
Add organized skills for: Languages, Frontend, Backend, Databases, AI/Data, Tools, Cloud.

### Phase 14 — Experience
Add verified professional experience only. Do NOT invent metrics or claims.

### Phase 15 — Education
Add: B.E. CSE — Jeppiaar Engineering College — 2024–2028; Diploma in Computer Application — CSC Computer Education — 2023–2024.

### Phase 16 — Achievements & Leadership
Add: 2× SIH Internal Winner, AWS Technical Lead, Technical Event Coordinator & Participant.

### Phase 17 — Certifications
Display only real certifications. Never fabricate certificates.

### Phase 18 — Resume
Create Resume section with View Resume and Download Resume. Use the actual resume when provided.

### Phase 19 — Work With Me
Create a freelance/client-focused section explaining what Alvia can build.

### Phase 20 — Project Inquiry Form
Fields: Name, Email, Project Type, Budget, Description, Timeline, Message. Include validation.

### Phase 21 — Contact
Include: alviayovas@gmail.com · Chennai, India · github.com/alviayovas-cell · linkedin.com/in/alviayovas · instagram.com/alvia_yovas. Do NOT add a phone number unless explicitly provided.

### Phase 22 — Custom Cursor
Desktop-only subtle custom cursor with hover interaction. Disable on mobile/touch devices.

### Phase 23 — Scroll Animation
Add scroll reveals, text animation, image parallax, project transitions, subtle 3D movement.

### Phase 24 — Mobile Experience
Create a dedicated responsive mobile experience. Reduce heavy 3D effects and particles while preserving the premium visual quality.

### Phase 25 — Performance Optimization
Optimize images, Three.js, particles, animations, fonts, bundle size, loading.

### Phase 26 — Accessibility
Implement semantic HTML, keyboard navigation, ARIA labels where necessary, focus states, alt text, reduced-motion support.

### Phase 27 — SEO
Add title, meta description, Open Graph, proper headings, relevant metadata.

### Phase 28 — Final UI/UX Polish
Review the entire website and improve typography, spacing, alignment, transitions, animations, hierarchy, responsive design, hover interactions.

### Phase 29 — Final Testing
Test desktop, tablet, mobile, navigation, 3D, avatar, speech, lip animation, forms, links, WebGL fallback, reduced motion. Fix all errors.

### Phase 30 — Production Build
Run the production build (`npm run build`). Fix all build errors and verify the production output.
