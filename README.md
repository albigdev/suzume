# 🚗 Suzuki Connect Companion (Unofficial)

A modern **Vite + React** application with a **Supabase** backend ---
designed as a **third-party companion tool** for the official **Suzuki
Connect** mobile app.

It works with data exported from the official mobile app, processes and
visualizes statistics, and adds new functionalities beyond what the
original app provides.\
Any Suzuki Connect user can register and upload their exported CSV data
to access enhanced insights and dashboards.

## ✨ Features

### 🔐 Authentication

- Sign up, log in, log out\
- Password recovery flow included

### 🚘 Driving Data

- Upload and manage driving data exported from the Suzuki Connect
  mobile app\
- CSV parsing and validation\
- Reverse geolocation for destination names

### 📊 Statistics

- Total distance\
- Driving time\
- Fuel cost & fuel economy\
- Road types\
- Destinations and trip breakdowns based on geolocation\
- Yearly / monthly / daily filtering

### 📈 Dashboard

- Visual dashboard displaying statistics with year/month/day filters

### 👤 User Profiles

- Users can set a display name and upload avatar images

## 📝 To-Do (Upcoming Features)

### 🔗 Share Button

Make individual trips shareable via a public link so non-registered
users can view them.

### 🤝 Friends System

Add friends, view each other's profile and selected stats (total km,
fuel economy, car type, etc.).

### 🪪 Car Card (Canva-style)

Auto-generated "Car Card" inside the profile, containing levels, badges,
stats, etc.

### 📈 More Dashboard Modules

Show activity feed, bar/line charts, social-related analytics.

### ✏️ Editable Upload Table

Editable popup table for modifying upload data before importing.

## 🧰 Technologies Used

- React (Vite)
- React Router
- Styled Components
- React Query
- Context API
- React Hook Form
- Papaparse
- React Error Boundaries
- React Hot Toast
- MUI Charts
- Reverse Geolocation (geocode.maps.co)
- Supabase

## 🧪 Testing

Frontend available on Netlify (https://suzume-app.netlify.app/).

Includes a demo user (prefilled login details) with sample data.\
Profile features require registering your own account.

## 🚀 Getting Started

### 1️⃣ Clone the repository

    git clone https://github.com/albigdev/suzume.git
    cd suzume

### 2️⃣ Install dependencies

    npm install

### 3️⃣ Add environment variables

Create a `.env` file:

    VITE_SUPABASE_URL=your-url
    VITE_SUPABASE_ANON_KEY=your-key

### 4️⃣ Start development server

    npm run dev

## 📁 Folder Structure

    suzume/
    │
    ├── contexts/
    ├── public/
    └── src/
        ├── assets/
        ├── features/
        ├── hooks/
        ├── pages/
        ├── services/
        ├── styles/
        ├── ui/
        └── utils/

## 🙏 Acknowledgments

Learned React & Vite from **Jonas Schmedtmann** --- highly recommended.

## 👨‍💻 Author

Created by **albigdev**
