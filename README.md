# Social Media Polarization Platform

A real-time React + TypeScript social media platform that tracks and visualizes opinion polarization as users interact with political content.

## 🎯 Overview

This platform combines a functional social media interface with real-time behavioral analytics. Real users create accounts, interact with posts, and their political opinions are tracked based on engagement patterns. An admin dashboard provides live visualization of opinion clustering and echo chamber formation.

## ✨ Features

### Dual-View System

**1. Social Media View (Regular Users)**
- User registration and login (localStorage-based)
- News feed with pre-seeded political posts (left/right/neutral)
- Like, comment, and interact with posts
- Opinion score that updates based on interactions
- Real-time opinion badge showing current political leaning

**2. Admin Dashboard View**
- Live network visualization of all users
- Real-time metrics (total users, interactions, polarization)
- User list with current opinion scores
- D3.js force-directed graph showing opinion clustering
- Automatic updates every second

### Content & Tracking

- **15 Pre-seeded Posts**: Mix of left-leaning, right-leaning, and neutral content
- **Opinion Calculation**: Based on weighted interactions
  - Views: 0.1x weight
  - Likes: 0.5x weight
  - Comments: 0.8x weight
- **Dynamic Connections**: Users with similar opinions automatically connect in the network graph

### Data Storage

- **No backend required** - All data stored in browser localStorage
- User accounts (username, password hash, opinions)
- Posts with likes and comments
- Interaction history
- Persistent across page refreshes

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ControlPanel.tsx    # Simulation controls
│   ├── MetricsDisplay.tsx  # Current metrics display
│   ├── NetworkGraph.tsx    # D3 network visualization
│   └── MetricsChart.tsx    # Time-series charts
├── hooks/              # Custom React hooks
│   └── useSimulation.ts    # Simulation state management
├── simulation/         # Simulation logic
│   └── engine.ts          # Core simulation engine
├── types/             # TypeScript type definitions
│   └── index.ts           # All type definitions
├── utils/             # Utility functions
│   └── calculations.ts    # Metric calculations
├── App.tsx            # Main application component
├── App.css            # Application styles
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 🎮 How to Use

### For Regular Users:

1. **Register an Account**
   - Create username, password, and display name
   - Start with neutral opinion (0.0)

2. **Browse Your Feed**
   - Scroll through posts on various topics
   - Posts are mixed: political and non-political content

3. **Interact with Posts**
   - **Like**: Show support (0.5x influence on your opinion)
   - **Comment**: Share your thoughts (0.8x influence)
   - **View**: Posts automatically influence you slightly (0.1x)

4. **Watch Your Opinion Shift**
   - Top-right badge shows your current political leaning
   - Color-coded: Blue (left) | Gray (neutral) | Red (right)

### For Admin/Researchers:
Opinion Tracking

### How Opinions Are Calculated:

Each post has a political leaning score:
- **Left posts**: -1.0 to -0.6 (climate action, healthcare, education)
- **Neutral posts**: -0.1 to 0.1 (tech news, recipes, sports)
- **Right posts**: 0.6 to 1.0 (free market, borders, traditional values)

When you interact with a post, your opinion shifts toward that post's leaning:

```
new_opinion = weighted_average(all_interactions)
```

**Example:**
- User starts at 0.0 (neutral)
- Likes 3 left-leaning posts (-0.8 each) → opinion shifts to -0.4
- Comments on 1 right-leaning post (0.9) → opinion shifts to -0.1
- Continues interacting → opinion stabilizes around their preferred content

### Connection Formation:

Users are connected in the network graph if:
```
|user1Research Applications

This platform is ideal for:

1. **Classroom Demonstrations**
   - Show students how echo chambers form naturally
   - Demonstrate filter bubble effects in real-time

2. **Social Computing Research**
   - Study how content influences opinion formation
   - Track engagement patterns with political content

3. **Algorithm Design**
   - Test different recommendation strategies
   - Measure polarization outcomes

4. **User Behavior Studies**
   - Observe what content types users engage with
   - Analyze clustering patterns in social networks

## 🔒 Privacy & Ethics

**This is an educational/research platform:**
- ✅ Users see their opinion scores transparently
- ✅ No actual sensitive data collected
- ✅ All data stays in browser localStorage
- ✅ No tracking beyond the platform
- ⚠️ For research use, obtain proper IRB approval and informed consent

## 🎯 Experiment Ideas

Try these experiments:

1. **Echo Chamber Formation**
   - Have 5 friends register and interact naturally
   - Watch if they cluster by political views

2. **Opinion Manipulation**
   - Start neutral, deliberately like only left or right posts
   - See how quickly your opinion shifts

3. **Cross-Pollination**
   - Intentionally engage with opposite-leaning content
   - Observe if you stay near center or shift

4. **Network Effects**
   - Get 10+ users and watch the network graph
   - Look for distinct clusters forming

## 📝 Data Storage Structure

All data stored in browser localStorage:

```
social_media_accounts: [
  {
    id: "user_123...",
    username: "alice",
    displayName: "Alice Johnson",
    opinion: -0.42,
    ...
  }
]

social_media_posts: [
  { id, content, leaning, likes[], comments[] }
]

social_media_interactions: [
  { userId, postId, type, postLeaning, timestamp }
]

social_media_session: {
  userId, username, displayName, loginTime
}
```
- **TypeScript**: Type-safe development
- **D3.js**: Network visualization
- **Recharts**: Time-series charts
- **Vite**: Build tool and dev server

## 📝 Code Quality

- Fully typed with TypeScript
- Modular architecture with clear separation of concerns
- Well-commented code
- Custom hooks for state management
- Reusable components

## 🔍 Observations

Try different strategies and observe:

- **Echo chambers**: Similarity-based strategy typically increases polarization
- **Bridging divides**: Random exposure often reduces polarization but may lead to unpredictable shifts
- **Balanced approach**: Diversity intervention can maintain moderate polarization while preserving some cross-group interaction

## 📄 License

This project is created for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and use this project for your own learning and research.

---

**Built with** ❤️ **for understanding social media dynamics**
