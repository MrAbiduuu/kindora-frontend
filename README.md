# Kindora — Frontend

<p align="center">
  <strong>Small Acts. Greater Impact.</strong>
</p>

<p align="center">
  A community-driven event management platform that connects people with meaningful events and volunteering opportunities.
</p>

<p align="center">
  Built with Next.js, React, TypeScript, and Tailwind CSS.
</p>

---

## 🌸 About Kindora

**Kindora** is a community event management platform designed to bring people together through kindness, volunteering, and meaningful experiences.

Users can explore upcoming events, discover opportunities to contribute to their communities, join events, and manage their activities through a personalized dashboard.

The frontend provides a responsive and user-friendly interface with authentication and event management functionality.

## ✨ Features

- **Authentication**
  - Google authentication using Better Auth.
  - User registration and login.
  - Protected pages for authenticated users.

- **Event Discovery**
  - Browse available events.
  - View individual event details.
  - Explore upcoming events.

- **Event Participation**
  - Join community events.
  - View joined events.
  - Manage organized events.

- **User Profile**
  - View user information.
  - Access personal event activities.

- **Responsive Design**
  - Mobile-friendly interface.
  - Modern and clean UI.
  - Light and dark theme support.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | React framework |
| React | UI development |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| DaisyUI | UI components |
| Better Auth | Authentication |
| Motion | UI animations |
| Lucide React | Icons |
| Sonner | Toast notifications |

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone <YOUR_FRONTEND_GITHUB_URL>
```

### 2. Navigate to the project

```bash
cd kindora-frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory.

```env
NEXT_PUBLIC_API_URL=YOUR_BACKEND_API_URL

BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

Use your deployed frontend URL for the authentication variables in production.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication

Kindora uses **Better Auth** for user authentication.

Google OAuth is supported, and authenticated sessions are used to control access to private pages and protected backend operations.

Public pages include event browsing and event details. Authentication is required for joining events and accessing private user features.

## 🌐 Deployment

The frontend is deployed on Vercel.

**Live Website:**  
https://kindora-forntend.vercel.app

For production deployment, configure the required environment variables in your Vercel project settings.

## 📁 Project Structure

```text
kindora-frontend/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── events/
│   │   ├── login/
│   │   ├── register/
│   │   ├── profile/
│   │   ├── create-event/
│   │   ├── manage-events/
│   │   └── joined-events/
│   │
│   ├── components/
│   │   ├── home/
│   │   └── ...
│   │
│   └── lib/
│
├── .env.local
├── package.json
└── README.md
```

*This is a representative structure; folder names may differ in the current repository.*

## 🔗 Backend

Kindora uses a separate Express.js backend with MongoDB for data storage and API operations.

**Backend Repository:** `kindora-server`

## 👨‍💻 Author

Developed as a full-stack web development project.

---

<p align="center">
  Made with ❤️ for a kinder community.
</p>
