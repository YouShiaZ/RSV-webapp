import React, { useMemo } from 'react';
import { WhatsAppIcon, EmailIcon, TelegramIcon, ViberIcon } from '../common/Icons';
import { contactInfo } from '@/lib/contactInfo';

const CTASection: React.FC = () => {
  const { email, whatsappUrl, telegramUrl, viberUrl } = contactInfo;
  const whatsappCtaUrl = useMemo(() => {
    const message = "Hi, I'm interested in Red Sea Valley properties";
    const separator = whatsappUrl.includes('?') ? '&' : '?';
    return `${whatsappUrl}${separator}text=${encodeURIComponent(message)}`;
  }, [whatsappUrl]);

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="container-custom">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-xl mb-12 text-primary-100 max-w-2xl mx-auto">
            Get in touch with our team today and let us help you discover your dream home along the Red Sea
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href={whatsappCtaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold flex items-center space-x-3 transition-all transform hover:scale-105 shadow-lg"
            >
              <WhatsAppIcon className="w-6 h-6" />
              <span>Contact on WhatsApp</span>
            </a>

            <a
              href={`mailto:${email}`}
              className="bg-primary-700 text-white hover:bg-primary-800 px-8 py-4 rounded-lg font-semibold flex items-center space-x-3 transition-all transform hover:scale-105 shadow-lg"
            >
              <EmailIcon className="w-6 h-6" />
              <span>Send Us an Email</span>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-6 text-primary-100 text-sm">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg transition-colors"
            >
              <TelegramIcon className="w-5 h-5" />
              <span>Telegram</span>
            </a>
            <a
              href={viberUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg transition-colors"
            >
              <ViberIcon className="w-5 h-5" />
              <span>Viber</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
