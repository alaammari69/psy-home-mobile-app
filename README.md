# PsyHome — Patient Mobile App

The patient-facing mobile app for **PsyHome**, an AI-assisted psychiatric diagnostic platform. Patients log in, view their profile, and go through AI-assisted diagnostic chat sessions from their phone.

> **Status:** advanced prototype, not a shipped/production product. Built as part of a final-year engineering capstone (PFE), graded *Excellent*.

## Part of the PsyHome Platform

This repo is the patient mobile app. The full system also includes:
- [PsyHome AI Diagnostic Engine](https://github.com/alaammari69/PsyHome-mental-disorders-diagnosis-api) — LangGraph/FastAPI backend
- [PsyHome Web Application](https://github.com/alaammari69/PsyHome-web-application) — psychiatrist-facing dashboard (React)

## Features

- **Authentication** — patient login with secure token storage via `expo-secure-store`
- **Home** — patient home screen with session access
- **Diagnostic sessions** — real-time AI-assisted chat session with the diagnostic engine (`SessionPage`)
- **Profile** — patient profile management

## Tech Stack

- **Framework:** React Native (Expo, Expo Router) + TypeScript
- **Navigation:** React Navigation
- **Secure storage:** expo-secure-store
- **Platforms:** iOS, Android, Web (via Expo)

## Project Structure

```
app/
├── _layout.tsx           # Root layout / navigation
├── LoginPage.tsx          # Patient login
├── HomePage.jsx           # Home screen
├── SessionPage.jsx        # AI-assisted diagnostic chat session
├── Profilepage.jsx        # Patient profile
└── styles/                # Per-screen stylesheets
```

## Getting Started

### Prerequisites

- Node.js 18+
- Expo Go app (for testing on a physical device) or an Android/iOS simulator
- The [PsyHome API](https://github.com/alaammari69/PsyHome-mental-disorders-diagnosis-api) running locally or remotely

### Installation

```bash
git clone https://github.com/alaammari69/psy-home-mobile-app.git
cd psy-home-mobile-app
npm install
```

Set up environment variables:

```bash
cp .env.example .env
# Point it at your running PsyHome API instance
```

Run the app:

```bash
npx expo start
```

Then open it in Expo Go, an Android emulator, or an iOS simulator from the Expo CLI output.

## Notes

This is a research/academic prototype built to demonstrate a full-stack AI-assisted clinical workflow, not a certified medical product.

## License

MIT — see [LICENSE](LICENSE).
