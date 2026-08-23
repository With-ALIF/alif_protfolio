# Abdullah Al Khalid (Alif) - Developer Portfolio

A modern, high-performance, and visually stunning personal portfolio and Content Management System (CMS) built with **Vanilla HTML5, CSS3, and ES6+ JavaScript**, backed by **Supabase** and **Vercel Serverless Functions**.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Serverless-000000?style=flat-square&logo=vercel&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![Telegram](https://img.shields.io/badge/Telegram-Bot_Alerts-26A5E4?style=flat-square&logo=telegram&logoColor=white)

---

## 🌟 Overview

This portfolio is engineered with a strict focus on lightning-fast performance, maintainability, responsive aesthetics, and modular architecture. It includes an integrated **Admin Dashboard** allowing dynamic updates to projects, skills, services, and profile details stored in a cloud **Supabase** database—eliminating the need to manually touch code for everyday content updates.

---

## ✨ Key Features

- **⚡ Framework-Free & High-Performance**: Built entirely with native HTML5, CSS3, and ES6+ modular JavaScript. Zero heavy framework overhead or complex bundlers.
- **🗄️ Supabase Cloud Database**: Dynamic data loading for profile bio, technical skills, timeline/experience, statistics, projects, and services.
- **🛠️ Built-in Admin CMS Panel**: Comprehensive password-protected `/admin` interface for seamless CRUD (Create, Read, Update, Delete) management of all portfolio content.
- **📬 Dual Notification System**:
  - **EmailJS Integration**: Direct browser-to-inbox messaging from the contact form.
  - **Telegram Bot Webhook**: Vercel serverless function (`/api/telegram`) for instant real-time Telegram push notifications on new contact inquiries.
- **🎨 Modern & Responsive Design**: Hand-crafted CSS design system featuring dark mode aesthetics, glassmorphism, responsive grid layouts, and micro-interactions.
- **🔍 Dynamic Project Details & Filtering**: Rich modal views and dedicated showcase components for live previews, repository links, and tech stack tags.
- **🧩 Dynamic SVG Icon System**: Lightweight Lucide icons rendered on-demand via JavaScript.
- **📜 Smooth Navigation**: Modular section loaders, scroll-to-top controls, and responsive navigation.

---

## 📂 Repository Structure

```yaml
alif_portfolio/
├── .vercel/              # Vercel project configuration
├── admin/                # Admin Panel & CMS
│   ├── index.html        # Admin login interface
│   ├── admin.css / .js   # Admin authentication logic & styling
│   ├── panel.html        # Admin management dashboard
│   └── panel.css / .js   # Full CRUD operations handler for Supabase
├── api/                  # Serverless API endpoints
│   └── telegram.js       # Vercel serverless function for Telegram alerts
├── app/                  # Component-specific styles and layouts
├── appearance/           # Styling utilities & UI helpers
├── config/               # Integration credentials & database schemas
│   ├── config.js         # EmailJS configuration
│   ├── supabase.js       # Supabase client initialization
│   ├── mailer.js         # Contact submission handler
│   └── schema.sql        # Complete database schema & RLS for Supabase
├── core/                 # Core application state & logic
├── icons/                # SVG icon assets & Lucide renderers
├── lib/                  # Global styles (hero, about, experience, skill, error)
├── project/              # Project showcase & detail view logic
├── script/               # Application bootstrapping & modular section renderers
│   ├── main.js           # Main application entry point
│   ├── body.js           # Layout mounting & section coordinator
│   ├── sections/         # Individual UI section builders (Hero, About, etc.)
│   └── utils/            # Helper functions & DOM utilities
├── scroll/               # Scroll observer & scroll-to-top button
├── service/              # Dynamic accordion services logic
├── style/                # Additional visual tokens & themes
├── tags/                 # Dynamic technology badge system
├── .env.example          # Template for environment variables
├── index.html            # Main portfolio entry point
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- Modern Web Browser (Chrome, Firefox, Edge, Safari)
- [Node.js](https://nodejs.org/) & [Vercel CLI](https://vercel.com/cli) (recommended for running serverless functions locally)
- A [Supabase](https://supabase.com/) account & project
- A [Telegram Bot](https://t.me/BotFather) token and Chat ID (optional, for Telegram alerts)

### 1. Clone the Repository

```bash
git clone https://github.com/With-AIF/alif_portfolio.git
cd alif_portfolio
```

### 2. Configure Environment Variables

Create a `.env.local` or `.env` file in the root directory (refer to `.env.example`):

```env
# Telegram Bot Configuration (Vercel Serverless Function)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

### 4. Run Locally

To run both the static frontend and the `/api/telegram` serverless endpoint:

```bash
npx vercel dev
```

Or open `index.html` with any local live server (e.g., VS Code Live Server).

---

## 🛠️ Admin Dashboard

Access the built-in CMS by navigating to `/admin` in your browser:

- **Authentication**: Secure administrative login.
- **Content Management**: Add, modify, or remove projects, skills, experiences, and service items in real time.
- **Instant Sync**: Changes reflect immediately on the live portfolio via Supabase.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System, Flexbox, Grid), JavaScript (ES6+ Modules)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **APIs & Notifications**: Vercel Serverless Functions (Node.js), [EmailJS](https://www.emailjs.com/), Telegram Bot API
- **Icons & UI**: [Lucide Icons](https://lucide.dev/)

---

## 👤 Author

**Abdullah Al Khalid (Alif)**  
- Portfolio: [alif.mnr.bd](https://alif.mnr.bd)  
- Role: Frontend & Full-Stack Developer  

---
