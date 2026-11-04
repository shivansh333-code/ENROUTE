# 🏔️ ENROUTE — Himachal Road Journeys

**Discover the roads less travelled. Experience Himachal differently.**

ENROUTE is a travel platform designed to help travellers explore the beauty of Himachal Pradesh. It aims to make trip discovery and planning easier through curated destinations, travel experiences, intelligent recommendations and AI-powered assistance.

---

## 🌄 About the Project

ENROUTE focuses on connecting travellers with the scenic destinations, hidden gems, local experiences and beautiful mountain roads of Himachal Pradesh.

The platform provides an interactive travel experience where users can discover destinations, explore travel information, plan journeys and get assistance through an AI-powered travel companion called **Ask Pahadi AI**.

## ✨ Features

### 🔐 User Authentication
- User registration and login.
- Email OTP verification during registration.
- Forgot password functionality using email OTP.
- Secure password hashing.
- JWT-based authentication.
- Protected routes and session management.

### 🗺️ Travel Exploration
- Explore destinations across Himachal Pradesh.
- Discover scenic locations and offbeat destinations.
- View destination and travel-related information.
- Explore curated travel experiences.

### 🤖 Ask Pahadi AI
An AI-powered travel assistant concept designed to help users with:
- Travel recommendations.
- Destination suggestions.
- Trip itinerary planning.
- Budget-based travel ideas.
- Information about Himachal Pradesh.

### 🧭 Trip Planning
- Plan journeys and explore travel possibilities.
- Organize travel experiences.
- Discover destinations based on traveller interests.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend development |
| TypeScript | Type-safe frontend code |
| Vite | Frontend development and build tool |
| Tailwind CSS | UI styling |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB | Database |
| Mongoose | MongoDB object modelling |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Nodemailer | Email OTP delivery |
| OpenAI API | Planned AI integration for Ask Pahadi AI |

---

## 📁 Project Structure

```text
ENROUTE/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── views/
│   │   ├── data/
│   │   ├── api/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/shivansh333-code/ENROUTE.git
```

```bash
cd ENROUTE
```

### 2. Setup the frontend

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend folder if required by your API configuration.

### 3. Setup the backend

Open another terminal:

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

Add the following environment variables:

```env
PORT=5000
CLIENT_URL=http://localhost:5173

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OTP_SECRET=your_otp_secret

NODE_ENV=development

EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password
EMAIL_FROM=ENROUTE <your_email@gmail.com>
```

**Important:** Replace the example values with your own credentials. Never commit `.env` files or expose your secrets publicly.

### 4. Run the backend

```bash
cd backend
npm run dev
```

### 5. Run the frontend

In another terminal:

```bash
cd frontend
npm run dev
```

Open the application:

```text
http://localhost:5173
```

---

## 🔒 Security

- Passwords are hashed before being stored.
- Email verification is required during registration.
- OTPs have an expiration time and limited verification attempts.
- JWT-based authentication is implemented.
- Environment variables are used for sensitive credentials.

---

## 🚀 Future Enhancements

- AI-powered Ask Pahadi AI travel assistant.
- Smart itinerary generation.
- Interactive destination maps.
- Weather-based travel recommendations.
- Travel budget estimation.
- User profiles and saved destinations.
- More local information about Himachal culture, food and traditions.

---

## 👨‍💻 Developer

**Shivansh Kaushal**

GitHub: [@shivansh333-code](https://github.com/shivansh333-code)

---

## ❤️ Project Vision

ENROUTE aims to make exploring Himachal Pradesh more accessible, engaging and personalized.

**Every road has a story. Let ENROUTE help you discover it.**
