'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useLocalization } from '@/hooks/useLocalization';

interface WhatsAppFloatButtonProps {
  phoneNumber?: string; // WhatsApp business number (e.g., "233241234567")
  message?: string; // Pre-filled message
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showOnPages?: string[]; // Pages to show on (empty = all pages)
  hideOnPages?: string[]; // Pages to hide on
}

export default function WhatsAppFloatButton({
  phoneNumber = '233241234567', // Default Ghana number - UPDATE THIS
  message = 'Hello! I would like to purchase coins or subscribe to premium.',
  position = 'bottom-right',
  showOnPages = [],
  hideOnPages = [],
}: WhatsAppFloatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { country } = useLocalization();

  // Format phone number (remove leading + or 0, add country code if needed)
  const formatPhoneNumber = (phone: string): string => {
    let formatted = phone.replace(/^\+/, '').replace(/^0/, '');
    if (!formatted.startsWith('233')) {
      formatted = '233' + formatted;
    }
    return formatted;
  };

  const handleWhatsAppClick = () => {
    const formattedPhone = formatPhoneNumber(phoneNumber);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
        aria-label="Contact us on WhatsApp"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Popup Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 opacity-100">
          <div className="space-y-3">
            <div className="text-center">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                Need Help?
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Chat with us on WhatsApp
              </p>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Buy Coins / Premium
              </button>
              
              <button
                onClick={() => {
                  const formattedPhone = formatPhoneNumber(phoneNumber);
                  const helpMessage = encodeURIComponent('Hello! I need help with my account.');
                  window.open(`https://wa.me/${formattedPhone}?text=${helpMessage}`, '_blank');
                }}
                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-all"
              >
                General Support
              </button>
            </div>
            
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                We typically respond within minutes
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

