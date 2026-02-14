# Spotify UI Clone

<div align="center">
  
  ![Spotify Clone](https://img.shields.io/badge/Spotify-Clone-1DB954?style=for-the-badge&logo=spotify&logoColor=white)
  ![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  
  **A modern, pixel-perfect Spotify Web Player UI clone built for learning and portfolio purposes**
  
  [Demo](#) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started)

</div>

---

## ⚠️ Disclaimer

> **This project is a UI clone created solely for educational and learning purposes.**
>
> - This is **NOT** affiliated with Spotify AB or any of its subsidiaries
> - All Spotify trademarks, service marks, trade names, and logos belong to their respective owners
> - This project does not contain any audio playback functionality or Spotify API integration
> - Designed to demonstrate modern web development practices and UI/UX implementation
> - **Not intended for commercial use or distribution**

---

## ✨ Features

### 🎨 Dynamic UI

- **Adaptive Color Theming** - Background colors dynamically change based on album artwork
- **Real-time Color Extraction** - Hover over any card to see the theme adapt to the dominant colors
- **Smooth Transitions** - Fluid animations and transitions throughout the interface
- **Responsive Design** - Works seamlessly across desktop and tablet devices

### 🖱️ Interactive Elements

- **Resizable Sidebars** - Drag-to-resize left and right sidebars with smooth animations
- **Collapsible Navigation** - Auto-collapse sidebar when resized below threshold
- **Scroll-Triggered Effects** - Dynamic navbar styling on scroll
- **Custom Scrollbars** - Beautiful overlay scrollbars using OverlayScrollbars

### 🏗️ Architecture Highlights

- **Global State Management** - Zustand for efficient, minimal re-renders
- **Custom Hooks** - Reusable logic for sidebar resize, scroll triggers, and color extraction
- **Component Composition** - Modular and maintainable component structure
- **Type-Safe** - Full TypeScript support with strict typing

---

## 🛠️ Tech Stack

### Core Technologies

| Technology       | Version | Purpose                         |
| ---------------- | ------- | ------------------------------- |
| **React**        | 19.2.0  | UI Library with latest features |
| **TypeScript**   | 5.9.3   | Type-safe JavaScript            |
| **Vite**         | 7.3.1   | Lightning-fast build tool       |
| **React Router** | 7.13.0  | Client-side routing             |

### Styling & UI

| Library                      | Purpose                                                        |
| ---------------------------- | -------------------------------------------------------------- |
| **Tailwind CSS**             | 4.1.18 - Utility-first CSS framework with custom design tokens |
| **@tailwindcss/vite**        | Vite plugin for Tailwind v4                                    |
| **Tailwind Merge**           | Efficiently merge Tailwind classes                             |
| **Class Variance Authority** | Component variants management                                  |
| **clsx**                     | Conditional className utilities                                |

### State Management

| Library     | Purpose                                                        |
| ----------- | -------------------------------------------------------------- |
| **Zustand** | 5.0.11 - Lightweight state management with minimal boilerplate |

### UI Components & Libraries

| Library                | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| **Radix UI**           | Accessible, unstyled component primitives        |
| **React Icons**        | Comprehensive icon library (5k+ icons)           |
| **OverlayScrollbars**  | Custom styled scrollbars with smooth performance |
| **Fast Average Color** | Dynamic color extraction from images             |

### Developer Experience

| Tool                     | Purpose                           |
| ------------------------ | --------------------------------- |
| **ESLint**               | Code linting and quality checks   |
| **Babel React Compiler** | Optimized React compilation       |
| **TypeScript ESLint**    | TypeScript-specific linting rules |

---

## 📐 Architecture & Patterns

### 🗂️ Project Structure

```
spotify-ui-clone/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI primitives (buttons, etc.)
│   │   ├── global-nav.tsx  # Top navigation bar
│   │   ├── left-sidebar.tsx    # Library sidebar (resizable)
│   │   ├── right-sidebar.tsx   # Now playing sidebar (resizable)
│   │   ├── main-view.tsx       # Main content area with resize handlers
│   │   ├── now-playing-bar.tsx # Bottom playback controls
│   │   └── scroll-area.tsx     # Custom scroll container
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── use-sidebar-resize.ts   # Sidebar drag-to-resize logic
│   │   ├── use-scroll-trigger.ts   # Scroll position detection
│   │   └── use-extract-color.ts    # Image color extraction
│   │
│   ├── stores/             # Zustand state stores
│   │   ├── use-sidebar-store.ts    # Sidebar width & collapse state
│   │   └── use-theme-store.ts      # Dynamic theme colors
│   │
│   ├── utils/              # Utility functions
│   │   └── cn.ts           # className merger utility
│   │
│   ├── styles/             # Global styles
│   │   └── main.css        # Custom CSS & Tailwind directives
│   │
│   ├── constants.ts        # App-wide constants
│   ├── App.tsx            # Home page component
│   └── main.tsx           # App entry point & router setup
│
├── public/                # Static assets
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

### 🎯 Key Design Patterns

#### 1. **State Management with Zustand**

```typescript
// Minimal boilerplate, maximum efficiency
const useSidebarStore = create<SidebarState>((set) => ({
  leftSidebarWidth: 420,
  setLeftSidebarWidth: (width) => set({ leftSidebarWidth: width }),
  // ... more actions
}));

// Component only re-renders when specific state changes
const width = useSidebarStore((state) => state.leftSidebarWidth);
```

#### 2. **Custom Hooks for Reusability**

```typescript
// Encapsulated resize logic, reusable for any sidebar
const { handleMouseDown } = useSidebarResize({
  side: "left",
  minWidth: 72,
  maxWidth: 420,
  collapseThreshold: 280,
});
```

#### 3. **Component Composition**

```tsx
// Clean, declarative component structure
<Layout>
  <GlobalNav />
  <LeftSidebar />
  <MainView>
    <Outlet /> {/* React Router nested routes */}
  </MainView>
  <RightSidebar />
  <NowPlayingBar />
</Layout>
```

#### 4. **Dynamic Theming**

```typescript
// Real-time color extraction and theming
const { extractColorFromImage } = useExtractColor();
onMouseEnter={() => extractColorFromImage(imageSrc)}
// Updates global theme store → all themed components react
```

### 🎨 Layout Management

#### **CSS Grid & Flexbox**

- Main app shell uses **CSS Grid** for precise layout control
- Responsive card grids with **Container Queries** (@container)
- Flexible sections using **Flexbox** for dynamic content

#### **Resizable Panels**

- Custom drag-to-resize implementation with smooth animations
- Min/max width constraints with auto-collapse functionality
- CSS variables for dynamic width updates without re-renders

#### **Container Queries**

```css
/* Responsive components based on container size, not viewport */
@container /left-sidebar (max-width: 280px) {
  /* Hide elements when sidebar is narrow */
}
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/spotify-ui-clone.git
   cd spotify-ui-clone
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

---

## 🎓 What You Can Learn From This Project

### State Management

- ✅ **Zustand** - Minimal boilerplate state management
- ✅ **Selector optimization** - Prevent unnecessary re-renders
- ✅ **Global vs local state** - When to use each

### Advanced React Patterns

- ✅ **Custom hooks** - Extract and reuse component logic
- ✅ **Compound components** - Build flexible component APIs
- ✅ **Ref forwarding** - Access child component DOM nodes
- ✅ **useCallback & useMemo** - Performance optimization

### CSS & Styling

- ✅ **Tailwind v4** - Latest features including @theme
- ✅ **Container queries** - Component-based responsive design
- ✅ **CSS custom properties** - Dynamic theming
- ✅ **CSS Grid & Flexbox** - Modern layout techniques

### Browser APIs

- ✅ **Canvas API** - Image color analysis
- ✅ **Drag events** - Custom resize handlers
- ✅ **IntersectionObserver** - Scroll-based triggers
- ✅ **CSS Variables** - Dynamic styling

### Type Safety

- ✅ **TypeScript generics** - Reusable type-safe code
- ✅ **Discriminated unions** - Type narrowing
- ✅ **Utility types** - Pick, Omit, Partial, etc.

---

## 🎨 Key Features Walkthrough

### 1️⃣ Dynamic Color Extraction

Hover over any album/playlist card, and watch the entire UI adapt to match the artwork's dominant colors:

- Background gradient updates
- Navbar color changes on scroll
- Smooth color transitions

**Technology**: `fast-average-color` library + Zustand store

### 2️⃣ Resizable Sidebars

Drag the resize handles to adjust sidebar widths:

- Smooth dragging experience
- Auto-collapse below threshold
- Persistent state across components

**Technology**: Custom `useSidebarResize` hook + mouse events

### 3️⃣ Custom Scrollbars

Beautiful, non-intrusive scrollbars that overlay content:

- Smooth scrolling
- Auto-hide on inactivity
- Consistent across browsers

**Technology**: OverlayScrollbars library

### 4️⃣ Scroll-Triggered Effects

Navbar background adapts as you scroll:

- Transparent at top
- Solid color when scrolled
- Smooth transition

**Technology**: Custom `useScrollTrigger` hook

---

## 📝 License

This project is licensed under the **MIT License** - feel free to use it for learning and portfolio purposes.

**Important**: This is a UI clone for educational purposes only. Spotify, the Spotify logo, and all related trademarks are the property of Spotify AB.

---

## 🙏 Acknowledgments

- **Spotify** - For the amazing UI/UX design inspiration
- **Vercel** - For Radix UI components
- **Tailwind Labs** - For Tailwind CSS
- **Open Source Community** - For all the amazing libraries used in this project

---

## 📧 Contact

**Your Name** - [@ahmaddzidnii](https://github.com/ahmaddzidnii)

**Project Link** - [https://github.com/ahmaddzidnii/spotify-ui-clone](https://github.com/ahmaddzidnii/spotify-ui-clone)

---

<div align="center">
  
  ### ⭐ Star this repo if you found it helpful!
  
  **Made with ❤️ for learning and sharing knowledge**
  
</div>
