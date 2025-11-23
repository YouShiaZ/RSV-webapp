const fallbackWhatsapp = process.env.NEXT_PUBLIC_OWNER_WHATSAPP || '201224470757';

export const contactInfo = {
  email: process.env.NEXT_PUBLIC_OWNER_EMAIL || 'mafdyzakaria2050@gmail.com',
  phone: process.env.NEXT_PUBLIC_OWNER_PHONE || '+201224470757',
  whatsappNumber: fallbackWhatsapp,
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || `https://wa.me/${fallbackWhatsapp}`,
  telegramUrl: process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/+201224470757',
  viberUrl: process.env.NEXT_PUBLIC_VIBER_URL || 'viber://chat?number=201224470757',
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/share/1EbKv5MC5t/',
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/mafdylabib?igsh=NDYxNzc0d3c3Nmxk',
};
