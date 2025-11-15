# Forexism - Forex Trading Platform

A comprehensive forex trading education platform with courses, VIP signals, blog, events, and more.

## 🚀 Features

- **User Authentication** - Login, Signup, Forgot Password
- **Courses Management** - Free & Paid courses with video lectures
- **Payment System** - Manual payment verification (Bank Transfer & TRC20)
- **VIP Signals** - Exclusive Discord community access
- **Blog** - Latest trading insights and strategies
- **Events** - Webinars, workshops, and trading sessions
- **PropFirm** - Information about proprietary trading firms
- **Contact** - Contact form with WhatsApp integration
- **Responsive Design** - Works on all devices

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for backend)

## 🛠️ Installation

### Frontend Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/forexism.git
cd forexism
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
Edit `.env` file with your configurations

5. **Start development server**
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📦 Project Structure

```
forexism/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navigation.js
│   │   ├── Footer.js
│   │   ├── Notification.js
│   │   ├── AuthModal.js
│   │   └── PaymentModal.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── BlogPage.js
│   │   ├── CoursesPage.js
│   │   ├── PropFirmPage.js
│   │   ├── EventsPage.js
│   │   ├── VIPSignalsPage.js
│   │   ├── AboutPage.js
│   │   └── ContactPage.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Technologies Used

### Frontend
- **React.js** - UI Framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP Client

### Backend (To be implemented)
- **Node.js** - Runtime
- **Express.js** - Framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Multer** - File uploads

## 📱 Features Overview

### Authentication
- Email/Password login
- User registration
- Forgot password functionality
- JWT token-based authentication

### Courses
- Free and paid courses
- Video lecture management
- Course enrollment system
- Payment verification workflow

### Payment System
- Manual payment verification
- Bank transfer support
- TRC20 (USDT) support
- Screenshot upload for verification
- Admin verification dashboard (backend)

### VIP Signals
- Discord community integration
- Subscription management
- Access control based on payment status

### Blog
- Content management
- Category filtering
- Author attribution
- Admin can create posts

### Events
- Event listings
- Registration system
- Online and in-person events
- Calendar integration

## 🔧 Configuration

### Tailwind CSS Setup

The project uses Tailwind CSS for styling. The configuration is in `tailwind.config.js`.

### API Integration

Update the API URL in `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Social Media Links

Configure social media links in `.env`:
```
REACT_APP_FACEBOOK_URL=https://facebook.com/forexism
REACT_APP_LINKEDIN_URL=https://linkedin.com/company/forexism
REACT_APP_INSTAGRAM_URL=https://instagram.com/forexism
```

### WhatsApp Support

Set your WhatsApp number in `.env`:
```
REACT_APP_WHATSAPP_NUMBER=1234567890
```

## 🚀 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 📝 Available Scripts

- `npm start` - Run development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🎯 Next Steps (Backend Implementation)

1. Set up Node.js Express server
2. Configure MongoDB database
3. Implement authentication endpoints
4. Create payment verification system
5. Build admin dashboard
6. Set up file upload for screenshots
7. Implement email notifications
8. Add course video hosting integration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 📧 Contact

For support or inquiries:
- Email: support@forexism.com
- WhatsApp: +1 (234) 567-890
- Website: https://forexism.com

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icon set
- All contributors and supporters

---

Made with ❤️ for traders worldwide