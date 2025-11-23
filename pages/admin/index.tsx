import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRequireAuth } from '@/lib/useAuth';
import { propertyService } from '@/lib/propertyService';
import { leadService } from '@/lib/leadService';
import { Property, Lead } from '@/lib/types';
import AdminNav from '@/components/admin/AdminNav';
import PropertyList from '@/components/admin/PropertyList';
import LeadList from '@/components/admin/LeadList';
import PropertyForm from '@/components/admin/PropertyForm';

export default function AdminDashboard() {
  const { user, loading: authLoading } = useRequireAuth();
  const [activeTab, setActiveTab] = useState<'properties' | 'leads'>('properties');
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [propsData, leadsData] = await Promise.all([
        propertyService.getAll(),
        leadService.getAll(),
      ]);
      setProperties(propsData);
      setLeads(leadsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePropertyAdded = () => {
    setShowPropertyForm(false);
    setEditingProperty(null);
    loadData();
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setShowPropertyForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    try {
      await propertyService.delete(id);
      await loadData();
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property');
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Stats
  const stats = [
    {
      label: 'Total Properties',
      value: properties.length,
      icon: '🏠',
      color: 'bg-blue-500',
    },
    {
      label: 'For Rent',
      value: properties.filter(p => p.forRent).length,
      icon: '📋',
      color: 'bg-green-500',
    },
    {
      label: 'For Sale',
      value: properties.filter(p => p.forSale).length,
      icon: '💰',
      color: 'bg-yellow-500',
    },
    {
      label: 'Total Leads',
      value: leads.length,
      icon: '👥',
      color: 'bg-purple-500',
    },
  ];

  return (
    <>
      <Head>
        <title>Admin Dashboard - Red Sea Valley</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        <AdminNav />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your properties and leads</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center text-2xl`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('properties')}
                className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
                  activeTab === 'properties'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                Properties ({properties.length})
              </button>
              <button
                onClick={() => setActiveTab('leads')}
                className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
                  activeTab === 'leads'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                Leads ({leads.length})
              </button>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading data...</p>
            </div>
          ) : (
            <>
              {activeTab === 'properties' && (
                <>
                  {showPropertyForm ? (
                    <PropertyForm
                      property={editingProperty}
                      onSuccess={handlePropertyAdded}
                      onCancel={() => {
                        setShowPropertyForm(false);
                        setEditingProperty(null);
                      }}
                    />
                  ) : (
                    <PropertyList
                      properties={properties}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onAdd={() => setShowPropertyForm(true)}
                    />
                  )}
                </>
              )}

              {activeTab === 'leads' && <LeadList leads={leads} />}
            </>
          )}
        </div>
      </div>
    </>
  );
}
