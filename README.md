# 🛌 BED ROT SIMULATOR 2026

> "It's not laziness, it's a lifestyle."

**Bed Rot Simulator** is a high-fidelity "Cozy RPG" simulation built for the modern era of decomposition. Designed for those who have mastered the art of staying under the covers, this app allows you to engineer the ultimate nest of comfort, snacks, and tech.

---

## 🎨 Aesthetic & Vibe
Inspired by classic RPG dialogue boxes and pixel-art aesthetics, the simulator features a Neo-Brutalist "Cozy" UI. 
- **Palette**: Warm beiges (#E6DAC3), deep chocolates (#3E2723), and soft purples (#2C2137).
- **Style**: Thick borders, harsh shadows, and CRT-style scanline overlays.
- **Sound**: Custom procedural 8-bit sound effects.

## � Screenshots

| Landing Page | Nest Customization |
| :---: | :---: |
| ![Landing Page](https://via.placeholder.com/800x450?text=Landing+Page+View) | ![Customization](https://via.placeholder.com/800x450?text=Item+Customization+View) |
| **Atmospheric Lighting** | **Final Share Card** |
| ![Atmospheric Lighting](https://via.placeholder.com/800x450?text=Atmospheric+Lighting+Mode) | ![Share Card](https://via.placeholder.com/800x450?text=Final+Share+Result) |

## �🛠️ Key Features

- **The Nest Builder**: Step-by-step customization of your bedding, gadgets, snacks, and comfort items.
- **Dynamic Physics**: Drag-and-drop mechanics via `framer-motion` to arrange your "rot station" exactly how you like it.
- **Atmosphere Control**: Switch between Daylight, Rainy Mood, 3 AM Night, and Golden Hour to set the perfect rotting vibe.
- **Rot Analytics**: Real-time calculation of your **Comfort Level**, **Social Battery**, and **Hydration** based on item selection.
- **Social Integration**: 
  - One-click sharing to Twitter/X.
  - Native Mobile Share API support.
  - Procedural PNG generation with custom metadata overlays.
- **Visitor Tracking**: Integrated Vercel Analytics and a classic pixel-style hit counter.

## 💻 Tech Stack

- **Frontend**: React 19 (Main), Vite (Build Tool).
- **Styling**: Tailwind CSS 4.0.
- **Animation**: Framer Motion (Transitions & Drag-and-Drop).
- **State Management**: Zustand (Global Step & Inventory Store).
- **Image Generation**: `html-to-image` for high-quality screenshots.
- **Sound**: Custom Audio API hook (`useSound`) for React 19 compatibility.

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/BhriguKumarDeka/BedRotSimulator.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 📜 Development Scripts
- `npm run dev`: Launch the Vite dev server.
- `npm run build`: Generate a production-ready build.
- `node scripts/generate_sounds.js`: A helper script for generating the procedural `.wav` assets used in the app.

---
Created with 💤 by [Bhrigu Kumar Deka](https://bhrigu.live).
