# Swedish Match 🇸🇪

A React-based memory card game where players match Swedish regions with their corresponding city, animal and signature — built as a group assignment for a Frontend Development course.

---

## How to Play

1. **Select a difficulty level:**
   - Easy (60s) — match 2 columns (Region + City)
   - Medium (90s) — match 3 columns (Region + City + Animal)
   - Hard (120s) — match all 4 columns (Region + City + Animal + Signature)
2. **Flip cards** — click one card from each column (Region, City, Animal, Signature)
3. **Match by region** — if all flipped cards belong to the same Swedish region, they stay face up
4. **Score** — match all 4 sets before the timer runs out to win

### Rules
- Number of columns to match depends on difficulty level
- You can only flip **one card per type** at a time
- All cards must be flipped before a match is evaluated
- Correct match → cards lock in place
- Wrong match → cards flip back after 1 second
- Timer stops on win or loss

---

## Features

- Cards regional matching mechanic
- Countdown timer with 3 difficulty levels
- Move counter
- Win / lose state with in-place UI feedback
- Exit confirmation modal with timer pause
- Card layout: types fixed to columns, regions randomized per row
- User login and account creation via localStorage
- Wikipedia API — regional knowledge cards shown on game completion

---

## Tech Stack

| Tool | Usage |
|------|-------|
| React | Component architecture, UI rendering |
| useState | Game state management |
| useEffect | Timer, win/lose detection, card initialization |
| React Router | Navigation between login and game pages |
| localStorage | User account storage |
| Wikipedia REST API | Regional knowledge cards |
| Vite | Build tool and dev server |
| CSS Grid | Card layout |
| Git / GitHub | Version control, branching, pull requests |

---

## Project Structure

```
src/
├── components/
│   ├── Game.jsx       — core game logic and state
│   ├── Login.jsx      — authentication UI
│   ├── Api.jsx        — Wikipedia API integration
│   └── UI.jsx         — shared UI components
├── data/
│   └── gameData.js    — card data and back image paths
├── styles/
│   └── game.css       — game styles
└── App.jsx            — routing
public/
└── images/            — card front and back images
```

---

## Game Data

Cards are organized into 4 Swedish regions:

| Region | City | Animal | Signature |
|--------|------|--------|-----------|
| Skåne | Malmö | White Crane | Øresund Bridge |
| Västra Götaland | Gothenburg | Seal | Tram |
| Stockholm | Stockholm | Rådjur | Nobel Prize |
| Norrbotten | Luleå | Moose | Aurora Borealis |

---


## Course

IT: Frontend Development — Sundsgårdens Folkhögskola, Sweden
