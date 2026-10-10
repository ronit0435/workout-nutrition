
import React from 'react';
import { useStore } from '../context/StoreContext';

export default function DemoOrdersButton() {
  const { navigate } = useStore();

  return (
    <button
      type="button"
      onClick={() => navigate('demo-orders')}
      className="fixed bottom-24 right-4 z-50 rounded-full bg-red-600 px-5 py-3 font-bold text-white shadow-lg hover:bg-red-700"
    >
      Demo Orders
    </button>
  );
}