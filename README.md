# Ride On

## 🚗 Frontend Task for Fischer Jordan: Ride Sharing App (Frontend Only)

Ride On is a ride-sharing application similar to Uber and Ola, designed to facilitate booking rides, driving as a part-time or full-time job, ride-sharing, car rentals, and courier services. This project is built with **Next.js**, **MongoDB**, **Leaflet.js**, and **Stripe** for payment integration.

---

## 🔥 Features Implemented

### 🏎️ Ride Booking
- Users can book rides easily through an intuitive interface.
- Integrated **OTP verification** for ride authentication.
- Users can **give feedback**, **comment**, and **chat** with drivers.
- Price estimation and **secure payment via Stripe**.
- Navigation assistance (static features for now).

### 🚘 Drive Feature
- Users can sign up to **become a driver** and earn money.
- Flexible options for full-time or part-time driving.

### 👫 Ride Sharing
- Users can **share rides** with others based on location.
- View nearby ride options and book accordingly.

### 🚙 Car Rentals
- Rent cars for **fixed durations** or **specific locations**.
- Different rental methods available to suit user needs.

### 📦 Courier Services
- Users can **send couriers** with different services.
- Multiple delivery options available.

### 🏠 Profile & Wallets
- **Interactive Dashboard** for users.
- **Booking History** with past ride details.
- **Wallet Integration**, including a special Ride On wallet.

### 🔐 Authentication
- **NextAuth.js** integrated with **MongoDB** for secure authentication.
- Supports login and registration functionalities.

### 💬 Chatbot Integration
- **Gemini AI-powered chatbot** for assistance (not generalized yet).

---

## ⚙️ Tech Stack Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: MongoDB (via NextAuth.js)
- **Maps**: Leaflet.js
- **Payments**: Stripe
- **Authentication**: NextAuth.js
- **Chatbot**: Gemini AI

---

## 🛠️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url.git
   cd your-repo-folder
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   _If you face dependency issues:_
   ```bash
   npm install --force
   ```
3. Create a `.env.local` file in the root directory and add the required environment variables:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_GEOCODING_API_KEY=...
   GEMINI_API_KEY=...
   MONGODB_URI=mongodb+srv://...
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=supersecretkey123
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

---

## 📌 Folder Structure

```
.
├── app
│   ├── api
│   ├── booking
│   ├── courier
│   ├── drive
│   ├── login
│   ├── rentals
│   ├── ride
│   ├── sharing
│   ├── signup
│   ├── layout.tsx
│   ├── page.tsx
├── components
│   ├── ui
│   │   ├── AccountInf.tsx
│   │   ├── BookingDetailsComponent.tsx
│   │   ├── Chatbot.tsx
│   │   ├── DynamicMap.js
│   │   ├── PaymentButton.js
│   │   ├── RideOptions.jsx
│   │   ├── StripePayment.js
│   │   ├── ThemeContext.tsx
├── lib
├── models
├── public/images
├── .env.local
├── .gitignore
├── auth.ts
├── components.json
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── README.md
```

---

## 🛠️ Future Enhancements
- 🚀 **Real-time navigation** updates using live map APIs.
- 🔍 **AI-powered ride suggestions** based on user preferences.
- 📢 **Enhanced chatbot integration** with better response handling.
- 🔐 **Two-factor authentication (2FA)** for added security.

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 🎯 Contributing
Feel free to fork, contribute, and submit pull requests to enhance this project. Feedback and suggestions are always welcome!

---

## 📞 Contact
For any queries, reach out at: **your-email@example.com**

🚀 Happy Coding!

