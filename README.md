# SNUCEE Practice Exam

Practice app for the **Shiv Nadar University Common Entrance Examination (SNUCEE)** with real sample questions, timed mock tests, and detailed explanations.

## Features

- **Practice Mode** — Go through questions at your own pace with instant feedback, detailed explanations, and chapter references
- **Mock Exam** — Simulate real exam conditions with a 2-hour timer, negative marking (−0.25), and comprehensive score report
- **80 Unique Questions** — From SNUSAT & APT sample papers (2025–2026)
- **4 Sections** — Logical Reasoning, Quantitative Aptitude, Mathematics, Physics

## Question Bank Details

**80 unique questions** extracted from 3 official SNU sample papers (after removing duplicates).

| Year | Section | Questions |
|------|---------|-----------|
| 2025 | Logical Reasoning | 10 |
| 2025 | Quantitative Aptitude | 10 |
| 2025 | APT Mathematics | 10 |
| 2025 | APT Physics | 10 |
| 2026 | Logical Reasoning | 10 |
| 2026 | Quantitative Aptitude | 10 |
| 2026 | APT Mathematics | 10 |
| 2026 | APT Physics | 10 |
| **Total** | | **80** |

> The "SNUSAT Sample Questions 2025" PDF is a subset of the full "SNUSAT APT SQ 2025" PDF, so only unique questions were included.

## Exam Pattern

| Part | Section | Questions | Duration |
|------|---------|-----------|----------|
| A – Aptitude (SNUSAT) | Logical Reasoning | 20 | 45 min |
| A – Aptitude (SNUSAT) | Quantitative Aptitude | 20 | 45 min |
| B – Subject (APT) | Mathematics | 20 | 30 min |
| B – Subject (APT) | Physics | 20 | 30 min |
| **Total** | | **80** | **2 hours** |

**Scoring:** +1.25 correct · −0.25 wrong · 0 unanswered

## Deploy Locally

### Prerequisites

- **Node.js** (v18 or later) — [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

### macOS

```bash
# 1. Clone the repository
git clone https://github.com/kgsekaran88/SNUCEE-Entrance-exam.git
cd SNUCEE-Entrance-exam

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Windows

```powershell
# 1. Clone the repository
git clone https://github.com/kgsekaran88/SNUCEE-Entrance-exam.git
cd SNUCEE-Entrance-exam

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build (optional)

```bash
# Build for production
npm run build

# Start the production server
npm start
```

The production server runs on [http://localhost:3000](http://localhost:3000) by default. Use the `PORT` environment variable to change it:

```bash
PORT=8080 npm start        # macOS / Linux
set PORT=8080 && npm start # Windows CMD
$env:PORT=8080; npm start  # Windows PowerShell
```

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS