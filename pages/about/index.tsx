import React from 'react';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <Layout
      title="About Us - Red Sea Valley Real Estate"
      description="Learn about Red Sea Valley Real Estate, your trusted partner for luxury properties in Hurghada, Sahl Hasheesh, El Gouna, and Soma Bay."
    >
      <div className="bg-gray-50">
        {/* Hero */}
        <div className="relative h-96 bg-gradient-to-r from-primary-600 to-primary-800">
          <div className="absolute inset-0 flex items-center">
            <div className="container-custom text-center text-white">
              <h1 className="text-5xl font-bold mb-4">About Red Sea Valley</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Your Trusted Partner in Red Sea Real Estate
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container-custom py-16">
          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Who We Are</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  <strong className="text-primary-600">Red Sea Valley</strong> is a premier real estate agency specializing in luxury properties along Egypt's stunning Red Sea coast. With years of experience and deep local knowledge, we help clients discover their perfect property in the region's most exclusive destinations.
                </p>
                <p>
                  We operate across four distinctive regions: <strong>Hurghada</strong>, <strong>Sahl Hasheesh</strong>, <strong>El Gouna</strong>, and <strong>Soma Bay</strong>. Each destination offers its own unique charm, from vibrant resort living to serene beachfront retreats, and we're here to guide you to the perfect match.
                </p>
                <p>
                  Whether you're seeking a luxury villa with panoramic sea views, a modern apartment in a cosmopolitan community, a cozy studio for vacation getaways, or commercial property for business ventures, Red Sea Valley has the expertise and portfolio to exceed your expectations.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Trust & Transparency</h3>
              <p className="text-gray-600">
                We believe in honest communication and transparent dealings. Every property listing is accurate, and every promise is kept.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Quality Properties</h3>
              <p className="text-gray-600">
                We carefully curate our portfolio to feature only the finest properties that meet our high standards of quality and location.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Client-Focused Service</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We provide personalized service and support throughout your entire property journey.
              </p>
            </div>
          </div>

          {/* Service Areas */}
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Where We Operate</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Hurghada', 'Sahl Hasheesh', 'El Gouna', 'Soma Bay'].map((region) => (
                <div key={region} className="text-center p-6 bg-gray-50 rounded-lg">
                  <svg
                    className="w-12 h-12 text-primary-600 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-800">{region}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Property?</h2>
            <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
              Let us help you discover the perfect home or investment along the Red Sea coast.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/properties" className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors">
                Browse Properties
              </a>
              <a href="/contact" className="bg-primary-700 hover:bg-primary-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
