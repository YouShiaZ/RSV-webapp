# Red Sea Valley Real Estate

A production-ready, modern real estate web application built with Next.js 14 (Pages Router), TypeScript, Tailwind CSS, Firebase, and more.

## 🌊 About

Red Sea Valley is a premium real estate platform specializing in luxury properties along Egypt's Red Sea coast, including:

- **Hurghada** - Egypt's premier Red Sea resort destination
- **Sahl Hasheesh** - Exclusive bay with pristine beaches
- **El Gouna** - Sophisticated lagoon town
- **Soma Bay** - Secluded peninsula paradise

## ✨ Features

### Public Features
- **Hero Slider** - Stunning full-width image carousel showcasing Red Sea lifestyle
- **Property Listings** - Advanced filtering by type, region, price, bedrooms, bathrooms
- **Property Details** - Full gallery, amenities, interactive map, lead capture form
- **Regions Explorer** - Detailed information about each destination
- **Contact Forms** - Lead capture with email notifications and WhatsApp integration
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Performance Optimized** - Lazy loading, code splitting, image optimization

### Admin Features (No public link)
- **Secure Login** - Firebase Authentication
- **Property Management** - Add, edit, delete properties with image uploads
- **Lead Management** - View all leads with contact information
- **Dashboard Stats** - Overview of properties and leads
- **Firebase Integration** - Firestore for data, Storage for images

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Yup validation
- **Backend**: Firebase v9 (Firestore, Auth, Storage)
- **Email**: Nodemailer
- **Carousel**: Swiper.js

## 📋 Prerequisites

- Node.js 16+ and npm
- Firebase account
- SMTP email account (Gmail recommended)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd webapp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Firestore Database**
4. Enable **Authentication** (Email/Password)
5. Enable **Storage**
6. Get your Firebase config from Project Settings

### 4. Create Collections in Firestore

Create two collections:
- `properties` - Will store property listings
- `leads` - Will store customer inquiries

### 5. Create Admin User

1. Go to Firebase Console > Authentication
2. Add a new user with email/password:
   - Email: `mafdyzakaria2050@gmail.com` (or your preferred email)
   - Password: (choose a strong password)

### 6. Configure Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in your values:

```env
# Firebase Configuration (from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# Owner Contact (Already configured)
NEXT_PUBLIC_OWNER_EMAIL=mafdyzakaria2050@gmail.com
NEXT_PUBLIC_OWNER_WHATSAPP=201224470757
NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/share/1EbKv5MC5t/
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/mafdylabib?igsh=NDYxNzc0d3c3Nmxk

# Admin Email
NEXT_PUBLIC_ADMIN_EMAIL=mafdyzakaria2050@gmail.com

# Email Configuration (Nodemailer)
RSV_OWNER_EMAIL=mafdyzakaria2050@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

#### Setting Up Gmail SMTP

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Security > 2-Step Verification > App passwords
   - Create a new app password for "Mail"
   - Use this password in `SMTP_PASS`

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 8. Access Admin Panel

Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

**Note**: There is NO link to admin in the public site. You must access it directly.

Login with the credentials you created in Firebase Authentication.

## 📁 Project Structure

```
webapp/
├── pages/
│   ├── api/
│   │   └── leads.ts           # Email notification API
│   ├── admin/
│   │   ├── index.tsx          # Admin dashboard
│   │   └── login.tsx          # Admin login
│   ├── properties/
│   │   ├── index.tsx          # Properties listing
│   │   └── [id].tsx           # Property details
│   ├── regions/
│   │   └── index.tsx          # Regions page
│   ├── about/
│   │   └── index.tsx          # About page
│   ├── contact/
│   │   └── index.tsx          # Contact page
│   ├── _app.tsx               # App wrapper
│   ├── _document.tsx          # HTML document
│   └── index.tsx              # Home page
├── components/
│   ├── layout/
│   │   ├── Layout.tsx         # Main layout
│   │   ├── Navbar.tsx         # Navigation
│   │   └── Footer.tsx         # Footer
│   ├── common/
│   │   ├── Icons.tsx          # Icon components
│   │   └── PropertyCard.tsx   # Property card
│   ├── home/
│   │   ├── Hero.tsx           # Hero slider
│   │   ├── RegionsSection.tsx # Regions grid
│   │   ├── FeaturedProperties.tsx
│   │   └── CTASection.tsx     # Call-to-action
│   ├── properties/
│   │   ├── PropertyFilters.tsx
│   │   └── LeadModal.tsx      # Lead form modal
│   └── admin/
│       ├── AdminNav.tsx       # Admin navigation
│       ├── PropertyList.tsx   # Properties table
│       ├── PropertyForm.tsx   # Add/Edit form
│       └── LeadList.tsx       # Leads table
├── lib/
│   ├── firebase.ts            # Firebase config
│   ├── types.ts               # TypeScript types
│   ├── propertyService.ts     # Property CRUD
│   ├── leadService.ts         # Lead CRUD
│   ├── useProperties.ts       # Properties context
│   └── useAuth.ts             # Auth hooks
├── styles/
│   └── globals.css            # Global styles
└── public/                    # Static assets
```

## 🎨 Customization

### Branding

- Logo text: "RSV" (Red Sea Valley)
- Primary color: Turquoise (`#14b8a6` - Tailwind's `primary-500`)
- Can be customized in `tailwind.config.ts`

### Images

The app uses placeholder images from Unsplash. For production:

1. Upload your own images to Firebase Storage
2. Update image URLs in properties
3. Add your domain to `next.config.js` under `images.domains`

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

Vercel will automatically configure Next.js and deploy your site.

### Environment Variables on Vercel

Make sure to add all the environment variables from `.env.local` to your Vercel project settings.

## 📝 Adding Your First Property

1. Login to admin at `/admin/login`
2. Click "Add Property"
3. Fill in all required fields:
   - Use Unsplash or your own image URLs
   - Set appropriate price, bedrooms, bathrooms
   - Add amenities like "Pool", "Sea View", "Parking"
   - Select region and type
   - Enable "For Rent" or "For Sale"
   - Enable "Featured" to show on homepage
4. Click "Add Property"

## 📧 Testing Email Notifications

1. Add a property
2. Visit the property detail page on the public site
3. Click "I'm Interested"
4. Fill in the form
5. Check your email inbox (configured in `RSV_OWNER_EMAIL`)

## 🔒 Security Notes

- **Admin Access**: No link in public navigation. Access via `/admin/login` only.
- **Firebase Rules**: Configure Firestore security rules in production.
- **Environment Variables**: Never commit `.env.local` to version control.
- **SMTP Credentials**: Use app-specific passwords, not your main password.

## 🆘 Troubleshooting

### Firebase Connection Issues

- Verify all Firebase config values are correct
- Check Firebase Console for enabled services
- Ensure Firestore rules allow read/write

### Email Not Sending

- Verify SMTP credentials
- For Gmail: ensure App Password is used (not regular password)
- Check spam folder
- Review server logs for errors

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

## 📞 Support

For issues or questions, contact: mafdyzakaria2050@gmail.com

## 📜 License

This project is proprietary and confidential. All rights reserved.

---

**Built with ❤️ for Red Sea Valley Real Estate**
