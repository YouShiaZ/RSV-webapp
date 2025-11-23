import React from 'react';

export const BedIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 12v6a2 2 0 002 2h14a2 2 0 002-2v-6M3 12V9a2 2 0 012-2h14a2 2 0 012 2v3M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
);

export const BathIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
  </svg>
);

export const AreaIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
  </svg>
);

export const LocationIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const VillaIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

export const ApartmentIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

export const StudioIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10M9 21h6" />
  </svg>
);

export const ShopIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

export const PhoneIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export const EmailIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export const TelegramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.51 13.74l-.24 3.38c.34 0 .49-.15.67-.33l1.6-1.52 3.32 2.44c.61.34 1.04.16 1.2-.56l2.18-10.23c.2-.92-.33-1.28-.92-1.06L3.3 10.31c-.9.35-.89.85-.16 1.08l3.47 1.08 8.05-5.08c.38-.25.73-.11.45.16l-5.6 5.89z" />
  </svg>
);

export const ViberIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 2H6.528C4.035 2 2 4.035 2 6.528v10.944C2 19.965 4.035 22 6.528 22h4.09l.23-.001c.47 0 .94-.208 1.28-.566l1.71-1.788c.23-.24.36-.55.36-.876v-.835c.27 0 .533-.027.774-.077 1.092-.223 2.123-.81 2.123-2.275V6.528C17.095 4.035 15.06 2 12.567 2h-5.62C4.035 2 2 4.035 2 6.528v4.248c0 .443.358.801.8.801s.801-.358.801-.8V6.528c0-1.113.904-2.017 2.017-2.017h10.144c1.114 0 2.017.904 2.017 2.017v8.198c0 .74-.26 1.14-.86 1.26-.33.067-.698.061-1.05.025-.55-.057-.987.36-.987.912v1.63l-1.345 1.39-3.655-.001H6.528c-1.113 0-2.017-.904-2.017-2.017v-3.666a.801.801 0 00-1.602 0v3.666C2.909 19.965 4.944 22 7.437 22h5.13c.43 0 .843-.177 1.142-.492l1.63-1.688c.27-.28.42-.656.42-1.045v-.933c.166-.01.33-.026.494-.048 1.317-.154 2.686-.995 2.686-2.928V6.528C19.999 4.035 17.964 2 15.471 2zm-7.21 3.46c-.21-.57-.68-.948-1.19-.7l-.05.025c-.71.33-1.05 1.474-.76 2.73.62 2.71 2.38 5.17 4.62 6.73.83.58 1.78 1.03 2.7 1.24 1.07.24 1.99-.14 2.22-1.14l.01-.042c.12-.61-.39-1.07-.97-1.27-.38-.13-.77-.27-1.13-.44-.53-.24-.9-.17-1.18.27-.18.27-.37.53-.58.77-.12.15-.29.18-.46.1-1.62-.78-2.86-2.03-3.73-3.66-.09-.17-.07-.35.08-.48.23-.2.5-.38.73-.59.32-.29.26-.63.07-1.03-.2-.41-.79-1.69-1-2.19z" />
  </svg>
);

interface PropertyTypeIconProps {
  type: 'Villa' | 'Apartment' | 'Studio' | 'Shop';
  className?: string;
}

export const PropertyTypeIcon: React.FC<PropertyTypeIconProps> = ({ type, className }) => {
  switch (type) {
    case 'Villa':
      return <VillaIcon className={className} />;
    case 'Apartment':
      return <ApartmentIcon className={className} />;
    case 'Studio':
      return <StudioIcon className={className} />;
    case 'Shop':
      return <ShopIcon className={className} />;
    default:
      return <VillaIcon className={className} />;
  }
};
