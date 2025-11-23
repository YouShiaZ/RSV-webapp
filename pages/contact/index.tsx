import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { EmailIcon, PhoneIcon, WhatsAppIcon } from '@/components/common/Icons';
import { leadService } from '@/lib/leadService';

interface FormData {
  name: string;
  email?: string;
  message: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').optional(),
  message: yup.string().required('Message is required'),
});

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const ownerEmail = process.env.NEXT_PUBLIC_OWNER_EMAIL || 'mafdyzakaria2050@gmail.com';
  const ownerWhatsApp = process.env.NEXT_PUBLIC_OWNER_WHATSAPP || '201224470757';
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/share/1EbKv5MC5t/';
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/mafdylabib?igsh=NDYxNzc0d3c3Nmxk';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      // Save lead to Firestore
      await leadService.create({
        name: data.name,
        phone: '', // No phone required for contact form
        email: data.email,
        message: data.message,
      });

      // Send email notification
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          phone: '', // No phone for contact form
        }),
      });

      setSuccess(true);
      reset();

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout
      title="Contact Us - Red Sea Valley Real Estate"
      description="Get in touch with Red Sea Valley Real Estate. Contact us via email, phone, or WhatsApp for inquiries about luxury properties in Hurghada, El Gouna, and more."
    >
      <div className="bg-gray-50">
        {/* Hero */}
        <div className="relative h-96 bg-gradient-to-r from-primary-600 to-primary-800">
          <div className="absolute inset-0 flex items-center">
            <div className="container-custom text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl max-w-3xl mx-auto">
                We're here to help you find your perfect Red Sea property
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <EmailIcon className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                      <a
                        href={`mailto:${ownerEmail}`}
                        className="text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        {ownerEmail}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <WhatsAppIcon className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">WhatsApp</h3>
                      <a
                        href={`https://wa.me/${ownerWhatsApp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        +{ownerWhatsApp}
                      </a>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Social Media</h3>
                      <div className="flex space-x-3">
                        <a
                          href={facebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 transition-colors"
                        >
                          Facebook
                        </a>
                        <span className="text-gray-400">·</span>
                        <a
                          href={instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 transition-colors"
                        >
                          Instagram
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Info */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Red Sea Valley Real Estate</h2>
                <p className="text-gray-600 leading-relaxed">
                  We specialize in premium properties across Hurghada, Sahl Hasheesh, El Gouna, and Soma Bay. 
                  Whether you're looking to buy, rent, or invest, our experienced team is ready to help you 
                  find the perfect property along the Red Sea coast.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="text-sm">We'll get back to you as soon as possible.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="label">Name *</label>
                    <input
                      {...register('name')}
                      type="text"
                      className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Email</label>
                    <input
                      {...register('email')}
                      type="email"
                      className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="your@email.com (optional)"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Message *</label>
                    <textarea
                      {...register('message')}
                      rows={6}
                      className={`input-field resize-none ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="Tell us about your property requirements or any questions you have..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
