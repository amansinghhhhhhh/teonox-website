# TEONOX — Corporate Training Website

## Overview

A React + Vite frontend for **TEONOX**, a corporate training provider. Content is pulled from a WordPress headless CMS via REST API with ACF (Advanced Custom Fields) for dynamic sections.

## Tech Stack

| Technology             | Purpose                           |
| ---------------------- | --------------------------------- |
| **React 19**           | UI library                        |
| **react-router-dom 7** | Client-side routing               |
| **Vite 8**             | Build tool & dev server           |
| **WordPress REST API** | Headless CMS backend              |
| **ACF**                | Custom fields for dynamic content |
| **lucide**             | Icon library                      |

## Pages & Routes

| Route             | Page            | Dynamic Content                   |
| ----------------- | --------------- | --------------------------------- |
| `/`               | Home            | Programs (categories + cards)     |
| `/about`          | About           | —                                 |
| `/programs`       | Programs        | Program listing                   |
| `/programs/:slug` | Program Details | Hero section, Career Paths        |
| `/hire`           | Hire            | —                                 |
| `/careers`        | Careers         | Current Opportunities (accordion) |
| `/blog`           | Blog            | Post listing                      |
| `/blog/:slug`     | Blog Details    | —                                 |
| `/contact`        | Contact         | —                                 |

## WordPress API

- Custom Post Types: `program`, `career`, `post`
- Taxonomy: `program-category`
- ACF fields are available under the `acf` key in REST API responses

## Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Project Structure

```
src/
  api/
    wordpressApi.js        WP REST API functions
  components/
    Navbar.jsx
    Footer.jsx
  hooks/
    useLucide.js           Lucide icon helper
    useScrollReveal.js     Scroll animation helper
  pages/
    Home.jsx
    About.jsx
    Programs.jsx
    Program_Details.jsx
    Careers.jsx
    Blog.jsx
    Blog_Details.jsx
    Contact.jsx
    Hire.jsx
  App.jsx                  Routes & layout
  index.css                All styles
```
