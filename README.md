# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




FarmKart Frontend - Project Walkthrough
Overview
FarmKart is a modern, responsive, and highly animated frontend application designed to eliminate agricultural middlemen by connecting farmers directly with buyers. The UI exudes a startup-level, premium feel inspired by Apple, Stripe, and Airbnb.

Technology Stack Used
React 18 via Vite 8
Tailwind CSS v4 (Native CSS configuration without PostCSS plugin dependency)
Framer Motion (Page transitions, layout animations, hover states)
GSAP + ScrollTrigger (Parallax and Hero section animations)
React Router DOM (Multi-page client-side routing)
Chart.js / react-chartjs-2 (Dashboard data visualization)
Lucide React (Clean, consistent iconography)
ShadCN-like Architecture (Extracted 
cn
 utility, generic components for Button and Input)
Main Features & Pages Implemented
1. Global Utilities & System
Custom Fonts Setup: Inter for body text and Poppins for headings to give a sleek contrast.
Theme Configuration: Implemented a rich color palette (Primary Green, Secondary Green, Accent Yellow, and Glassmorphism variations).
Toast Notification System: A custom 
ToastProvider
 built with Framer Motion for success/error handling.
Skeleton Loaders / Spinners: Reusable 
Skeleton
 component for lazy loading effects.
2. Landing Page (/)
Parallax Hero Section: Utilizing GSAP and Framer Motion, it features floating elements and smooth scroll parallax.
Live Produce Ticker: An endless side-scrolling ticker mimicking a live feed of marketplace activity.
Feature Breakdown & "How It Works": Designed with engaging SVG icons and timeline illustrations.
Testimonials Carousel: Scroll-snapping carousel showing farmer success stories.
3. Authentication (/auth)
Animated Tabs: Smooth toggling between Login and Registration.
Role Selection Module: Interactive blocks representing Farmer (Tractor) or Buyer (Storefront) selection.
4. Marketplace (/marketplace)
Complex Filtering: A sticky sidebar allowing category selection.
Responsive Grid: Product cards dynamically adjust to screen space.
Interactive Cards: Hover zoom scaling, elevation shadows, and lazy-loaded high-resolution imagery.
5. Product Detail (/product/:id)
Multi-image Gallery: Clickable image thumbnails altering the main display.
Animated Tabs Navigation: framer-motion AnimatePresence manages smooth transitions between Product Description, Farmer Profile, and Reviews.
Quantitive Selector: Custom increment/decrement button interface modifying total UI price in real-time.
6. Dashboards
A unique <Sidebar> handles intelligent routing arrays depending on explicit platform roles.

Farmer Overview (/dashboard/farmer): Contains Line and Bar charts using Chart.js, financial statues, and a dummy "Recent Orders" detailed table.
Farmer Add Produce (/dashboard/farmer/add): Expansive form handling media upload mockups, pricing, unit selectors, and harvest data points.
Buyer Orders (/dashboard/buyer): A visual Order Tracker demonstrating 4 progression points via animation sequences, alongside expansive order panels.
Admin Dashboard (/dashboard/admin): Elevated "dark-mode" sidebar interface highlighting system constraints (alerts) and overall high-figure tracking data.
Build and Code Delivery
The application builds successfully using Vite. Dependencies reflect modern standards, successfully addressing the Tailwind CSS v4 to Vite ecosystem migration requirement.

