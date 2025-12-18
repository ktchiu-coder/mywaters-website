**Live Demo:** [My Daily Waters Website](https://mywaters-website.vercel.app/)
# My Daily Waters

This is an interactive diary application that combines **emotion tracking** with **aquarium-based visualization**. Users record their daily moods, and small fish in the aquarium accompany the ups and downs of their emotions.

---

## 🎨 Project Concept & Design
The original intention behind *My Daily Waters* was to transform the often monotonous act of journaling into a lively aquarium experience. Each diary entry is represented as a fish, with different colors reflecting different emotions, allowing users to intuitively see the emotional “color palette” of their month.

### Visual Style:
- **Handwritten-style fonts**: Add warmth and a personal diary feel.
- **Stationery-inspired UI**: Creates a familiar, paper-based journaling atmosphere.
- **Motion effects**: Fish swim, float, and sway randomly in the aquarium, enhancing interactivity and playfulness.

---

## ✨ Completed Features

The core structure and basic setup have been implemented:

- **Navigation System**: Implemented a floating bottom navigation bar that smoothly switches between three main pages.
- **Emotion & Visual Mapping**: Defined five core emotions, each paired with a unique color that directly affects the appearance of the fish.
- **Diary Data Structure**: Built a complete TypeScript data structure to ensure each diary entry (mood, content, timestamp) is accurately stored.
- **UI Theme & Animations**:
  - Integrated Google Fonts to support handwritten-style typography.
  - Implemented random swimming and floating animations for the fish to simulate a real aquarium.
  - Applied a stationery-inspired background design to enhance overall aesthetics.

---

## 🚀 Future Development Roadmap

- **[ ] Persistent Data Storage**: Plan to introduce LocalStorage or a database so diary entries are not lost upon page refresh.
- **[ ] Advanced Diary Input**: Improve the input interface to allow users to manually adjust date and time (defaulting to the current time).
- **[ ] Management Features**: Add edit and delete functionality for diary entries on the “This Month” page.
- **[ ] AI-Generated Insights**: Integrate AI to analyze a month’s worth of text entries, helping users recognize emotional patterns and receive reflective guidance.
- **[ ] Interaction Enhancements**: Plan to add water ripple effects or allow users to guide fish movement with the mouse.

---

## 🛠 Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Deployment**: Vercel
- **Styling**: Tailwind CSS

---

## 🧠 Development Reflections & Challenges

During the development of **My Daily Waters**, I encountered several interesting challenges:

1. **The Learning Curve of TypeScript**  
   This was my first in-depth experience using React with TypeScript. At the beginning, I ran into many type errors when defining diary `interfaces` and passing props. By consulting the official documentation, I gradually came to appreciate how strong typing improves stability in larger projects.

2. **CSS Animations**  
   To make the fish movements feel natural rather than rigid, I spent a long time experimenting with `keyframes` and random delays. While I’ve achieved an initial effect, I’m still exploring how to make these animations smoother within React’s lifecycle.

3. **Data Management**  
   I am currently working on efficiently fetching and managing multiple data entries. Although I learned the basics in class, applying them to an aquarium visualization—especially ensuring that data changes are immediately reflected on screen—remains an ongoing area of exploration.

---

## 📦 Running the Project Locally

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
