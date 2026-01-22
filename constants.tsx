
import React from 'react';

export const PACKAGES = {
  silver: {
    name: 'Silver Package',
    price: 250,
    maxAds: 10,
    description: 'Perfect for casual sellers',
    color: 'bg-slate-100 border-slate-300',
    btnColor: 'bg-slate-800'
  },
  gold: {
    name: 'Gold Package',
    price: 500,
    maxAds: Infinity,
    description: 'Unlimited growth for professionals',
    color: 'bg-yellow-50 border-yellow-200',
    btnColor: 'bg-yellow-600'
  }
};

export const CATEGORIES = [
  { id: '1', name: 'Electronics', icon: '📱' },
  { id: '2', name: 'Vehicles', icon: '🚗' },
  { id: '3', name: 'Real Estate', icon: '🏠' },
  { id: '4', name: 'Home & Garden', icon: '🪴' },
  { id: '5', name: 'Fashion', icon: '👕' },
  { id: '6', name: 'Jobs', icon: '💼' },
  { id: '7', name: 'Services', icon: '🛠️' },
  { id: '8', name: 'Hobby & Sport', icon: '⚽' },
];

export const MOCK_CHART_DATA = [
  { name: 'Mon', views: 400, clicks: 240 },
  { name: 'Tue', views: 300, clicks: 139 },
  { name: 'Wed', views: 200, clicks: 980 },
  { name: 'Thu', views: 278, clicks: 390 },
  { name: 'Fri', views: 189, clicks: 480 },
  { name: 'Sat', views: 239, clicks: 380 },
  { name: 'Sun', views: 349, clicks: 430 },
];
