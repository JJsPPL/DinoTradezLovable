
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Watchlist from '@/components/Watchlist';
import StockSearch from '@/components/StockSearch';
import Analysis from '@/components/Analysis';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

const Index = () => {
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const addAnimationObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
      );
      
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => observer.observe(el));
    };

    // Fix for text contrast issues
    const fixTextContrast = () => {
      // Find elements with white text on light backgrounds and fix them
      document.querySelectorAll('.bg-white .text-white, .bg-gray-50 .text-white, .bg-gray-100 .text-white').forEach(
        (el) => {
          el.classList.add('forced-dark-text');
          el.classList.remove('text-white');
          el.classList.add('text-gray-900');
        }
      );

      // Fix for white boxes with white text - stronger fix
      document.querySelectorAll('[class*="bg-white"] .text-white, [class*="bg-gray-50"] .text-white, [class*="bg-gray-100"] .text-white').forEach(
        (el) => {
          el.classList.add('forced-dark-text');
          el.classList.remove('text-white');
          el.classList.add('text-gray-900');
        }
      );
      
      // Fix links for GitHub Pages
      document.querySelectorAll('a[href^="/"]').forEach(
        (el) => {
          const href = el.getAttribute('href');
          if (href && href.startsWith('/') && !href.startsWith('//')) {
            el.setAttribute('href', `/DinoTradez${href}`);
          }
        }
      );
    };

    // Run after a short delay to ensure all components are rendered
    setTimeout(() => {
      addAnimationObserver();
      fixTextContrast();
    }, 100);
    
    // Add animation class to body elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      section.classList.add('animate-on-scroll');
      section.style.opacity = '0';
      // Add staggered animation delay
      section.style.animationDelay = `${index * 0.1}s`;
    });
    
    return () => {
      // Clean up animation classes when component unmounts
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        section.classList.remove('animate-on-scroll');
        section.style.opacity = '1';
        section.style.animationDelay = '';
      });
    };
  }, []);

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle('high-contrast');
    
    // Force refresh text contrast
    const fixTextContrast = () => {
      document.querySelectorAll('.bg-white .text-white, .bg-gray-50 .text-white, .bg-gray-100 .text-white').forEach(
        (el) => {
          el.classList.add('forced-dark-text');
          el.classList.remove('text-white');
          el.classList.add('text-gray-900');
        }
      );
    };
    setTimeout(fixTextContrast, 50);
  };

  return (
    <div className={`flex flex-col min-h-screen bg-black text-white ${highContrast ? 'high-contrast' : ''}`}>
      <Header />
      <main className="flex-grow">
        <Hero />
        <Watchlist />
        <StockSearch />
        <Analysis />
        <About />
      </main>
      <Footer />
      <Toaster position="top-right" />
      
      {/* Accessibility toggle for high contrast mode */}
      <button 
        onClick={toggleHighContrast}
        className="fixed bottom-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-full shadow-lg"
        aria-label={highContrast ? "Disable high contrast mode" : "Enable high contrast mode"}
        title={highContrast ? "Disable high contrast mode" : "Enable high contrast mode"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path>
          <path d="M12 22c5.5 0 10-4.5 10-10h-10V2C6.5 2 2 6.5 2 12s4.5 10 10 10z"></path>
        </svg>
      </button>
    </div>
  );
};

export default Index;
