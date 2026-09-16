# 🌐 URL Shortener — Frontend Web Application

Modern, responsive web client for the URL Shortener application, built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **React Router v7**, and **Recharts**. It provides a sleek landing page with instant guest link shortening, full authentication workflows, a comprehensive user dashboard for managing shortened links, and granular click analytics with interactive visual charts.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Prerequisites](#-prerequisites)
- [Environment Variables](#-environment-variables)
- [Installation & Getting Started](#-installation--getting-started)
- [Application Architecture & Routes](#-application-architecture--routes)
  - [Route Hierarchy](#route-hierarchy)
  - [Page Details](#page-details)
- [API Client & Token Refresh Flow](#-api-client--token-refresh-flow)
- [Analytics & Visualizations](#-analytics--visualizations)
- [Scripts Reference](#-scripts-reference)

---

## ✨ Features

- **Guest URL Shortening**: Quick-shorten links directly on the landing page without requiring account registration.
- **Full Authentication Suite**:
  - Sign Up with client-side & server validation.
  - Sign In with secure dual-token handling.
  - Forgot Password & Email Reset flow.
  - Protected route redirection & session logout.
- **Link Management Dashboard**:
  - Create authenticated short links with persistence.
  - List all user URLs with quick copy and link preview.
  - Real-time date range filters: *Last 24 hours*, *Last 7 days*, *Last 30 days*, *All*.
  - Sort links by *Created At* or *Total Clicks*.
  - Delete URLs with instant UI revalidation.
- **Deep Click Analytics**:
  - Time-series click graphs powered by **Recharts** with customizable granularities (*Hour*, *Day*, *Week*, *Month*, *Year*).
  - Breakdown widgets for **Top Referrers**, **Geographic Locations (Countries)**, **Device Types**, and **Browsers**.
- **Transparent Silent Token Refresh**:
  - Axios interceptor automatically catches `401 Unauthorized` responses and refreshes the Access Token via the backend's HTTP-only signed refresh cookie.
  - Concurrent requests wait on the same refresh promise to prevent multiple duplicate refresh calls.
- **Modern Responsive Design**: Clean mobile-first UI styled with Tailwind CSS v4, custom CSS variables, and toast notifications via `react-hot-toast`.

---

## 🛠️ Tech Stack

- **Framework / Build Tool**: React 19, Vite 8
- **Language**: TypeScript
- **Routing**: React Router v7 (`createBrowserRouter`, `RouterProvider`, `useLoaderData`, `useSearchParams`, `useRevalidator`)
- **Styling**: Tailwind CSS v4, Custom CSS Variables
- **Charts / Visualizations**: Recharts (`LineChart`, `CartesianGrid`, `XAxis`, `YAxis`, `Tooltip`)
- **HTTP Client**: Axios with custom interceptors
- **Icons & Assets**: SVG components loaded via `vite-plugin-svgr`
- **Feedback**: React Hot Toast

---

## 📁 Project Directory Structure

```
frontend/
├── public/                       # Static public assets
├── src/
│   ├── api/
│   │   ├── api.ts                # Axios client instance configuration
│   │   └── interceptor.ts        # Request/response interceptors & token refresh logic
│   ├── assets/                   # SVG icons and marketing images
│   │   ├── chevron_right.svg
│   │   ├── close.svg
│   │   ├── delete.svg
│   │   ├── hero.png
│   │   ├── logout.svg
│   │   ├── menu.svg
│   │   ├── people_working.svg
│   │   ├── visibility_off.svg
│   │   └── visibility_on.svg
│   ├── auth/                     # Authentication views
│   │   ├── forgetPwd.tsx         # Forgot password request form
│   │   ├── resetPwd.tsx          # Set new password form
│   │   ├── signIn.tsx            # Login page
│   │   └── signUp.tsx            # Registration page
│   ├── dashboard/                # User dashboard & analytics
│   │   ├── analytics.tsx         # Detailed link analytics & Recharts graph
│   │   ├── dashboard.tsx         # Dashboard layout with navigation bar
│   │   ├── desktopNav.tsx        # Desktop top navigation
│   │   ├── mobileNav.tsx         # Responsive mobile navigation drawer
│   │   └── myLinks.tsx           # Link creation, filters, and list view
│   ├── landing/                  # Public landing page
│   │   ├── landing.css           # Landing-specific styling and animations
│   │   └── landing.tsx           # Hero section, statistics, and quick shortener
│   ├── App.css                   # Global styles and CSS variable definitions
│   ├── App.tsx                   # React Router route definitions & Toaster mount
│   ├── index.css                 # Base Tailwind CSS imports
│   ├── loader.ts                 # React Router data loaders (urlsLoader, analysisLoader)
│   ├── main.tsx                  # Application root entry point
│   └── vite-env.d.ts             # Vite SVG & environment types
├── .env                          # Frontend environment variables
├── eslint.config.js              # ESLint configuration
├── index.html                    # HTML entry template
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.js                # Vite configuration with React and SVGR plugins
```

---

## 📦 Prerequisites

- **Node.js** (v20.x or later recommended)
- **npm** (v10.x or later)
- The **Backend API Server** running on `http://localhost:3000` (or configured URL)

---

## ⚙️ Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# URL where backend Express API routes are hosted
VITE_BACKEND_URL=http://localhost:3000/api/v1

# Public URL of the frontend application
VITE_FRONTEND_URL=http://localhost:5173
```

| Variable | Description | Default |
|---|---|---|
| `VITE_BACKEND_URL` | Base API URL including the `/api/v1` prefix | `http://localhost:3000/api/v1` |
| `VITE_FRONTEND_URL` | Base URL of the Vite client server | `http://localhost:5173` |

---

## 🚀 Installation & Getting Started

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Ensure your `.env` points to your running backend:
```env
VITE_BACKEND_URL=http://localhost:3000/api/v1
VITE_FRONTEND_URL=http://localhost:5173
```

### 3. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧭 Application Architecture & Routes

The client application utilizes **React Router v7** with route loaders to fetch data before rendering components.

### Route Hierarchy

| Path | Element | Route Loader | Description |
|---|---|---|---|
| `/` | `<LandingPage />` | *None* | Marketing landing page with instant guest URL shortener |
| `/signIn` | `<SignIn />` | *None* | User login page |
| `/signUp` | `<SignUp />` | *None* | User registration page |
| `/forget-pwd` | `<ForgetPwd />` | *None* | Request password reset link |
| `/resetPwd/:token` | `<ResetPwd />` | *None* | Password reset page with token parameter |
| `/dashboard` | `<DashboardNav />` | *None* | Dashboard shell (topbar, mobile drawer, logout) |
| `/dashboard` *(index)* | `<MyLinks />` | `urlsLoader` | User's link manager, shortener input, date/sort filters |
| `/dashboard/analysis/:urlId` | `<AnalyticsPage />` | `analysisLoader` | Performance charts & demographic breakdown for a URL |

---

### Page Details

#### 1. Landing Page (`/`)
- Interactive **Hero section** with illustration and CTA buttons.
- Collapsible **URL Shorten widget** calling `POST /unprotected/urlShortener`. Displays the generated link with one-click confirmation.
- Social proof and usage statistics blocks.

#### 2. Authentication Pages (`/signIn`, `/signUp`, `/forget-pwd`, `/resetPwd/:token`)
- Form validation with descriptive error hints.
- Stores JWT `accessToken` in `localStorage`.
- Server sets signed HTTP-only `refreshToken` cookie for background refresh.
- Redirects to `/dashboard` upon successful login/signup.

#### 3. My Links (`/dashboard`)
- **Shorten Input**: Creates links via `POST /protected/urlShortener` associated with the logged-in user.
- **Filtering & Sorting**:
  - `urlsByDate`: Filters URLs created within the last 24h, 7 days, 30 days, or all time.
  - `sortBy`: Reorders results by `created_at` or `totalClicks`.
- **List items**: Displays short URL link, original target link, total click badge, and formatted creation date.
- **Delete action**: Triggers `GET /urlDelete/:urlId` and uses React Router's `useRevalidator` to immediately update data.
- Clicking any link navigates to its `/dashboard/analysis/:urlId` view.

#### 4. Analytics (`/dashboard/analysis/:urlId`)
- **Granular Click Chart**: Recharts `LineChart` plotting `click_count` over time against `grouped_by` intervals (`hour`, `day`, `week`, `month`, `year`).
- **Distribution Cards**:
  - **Top Referrers**: Websites and domains where visitors clicked the link.
  - **Locations**: Countries where visitors originated.
  - **Devices**: Device breakdown (desktop, mobile, tablet).
  - **Browsers**: Visitor browsers (Chrome, Safari, Edge, Firefox, etc.).

---

## 🔄 API Client & Token Refresh Flow

The frontend features a resilient authentication architecture inside [`src/api/interceptor.ts`](src/api/interceptor.ts):

1. **Request Interceptor**: Automatically attaches the stored `accessToken` to outgoing requests:
   ```http
   Authorization: Bearer <accessToken>
   ```
2. **Response Interceptor (Silent Refresh)**:
   - When any API call returns `401 Unauthorized`, the interceptor traps the error.
   - It initiates a single refresh request to `/auth/refresh` (sending the signed HTTP-only `refreshToken` cookie).
   - Concurrent requests wait on the same `refreshedPromise`.
   - On success, the new `accessToken` is saved to `localStorage`, the original failed request headers are updated, and the request is seamlessly retried.
   - If the refresh token is expired or invalid, credentials are removed from `localStorage` and the user is redirected to `/signIn`.

---

## 📊 Analytics & Visualizations

Data is fetched via React Router loaders before component render:

```typescript
// src/loader.ts
export const analysisLoader = async ({ request, params }) => {
    const url = new URL(request.url);
    const groupBy = url.searchParams.get('groupBy') || 'hour';
    const urlId = params.urlId;

    const [resTopValues, resClicks] = await Promise.all([
        api.get(`/analysis/topValues/${urlId}`),
        api.get(`/analysis/clicksOverTime?groupBy=${groupBy}&urlsId=${urlId}`)
    ]);

    return {
        ...resTopValues.data,
        clicksOverTime: resClicks.data.clicksOverTime
    };
};
```

---

## 📜 Scripts Reference

In the `frontend` directory, you can run:

| Command | Action |
|---|---|
| `npm run dev` | Launches the Vite local dev server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles TypeScript and builds production assets to `dist/` |
| `npm run preview` | Locally serves the production build for testing |
| `npm run lint` | Runs ESLint over all `.ts` and `.tsx` source files |
