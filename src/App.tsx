import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SafetyDisclaimerBanner } from './components/SafetyDisclaimerBanner';
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { DemoPage } from './pages/DemoPage';
import { PhysicianPage } from './pages/PhysicianPage';
import { PatientPage } from './pages/PatientPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { DisclaimerPage } from './pages/DisclaimerPage';

export const App: React.FC = () => {
  // Support simple client-side route state with browser history integration
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname && window.location.pathname !== '/'
      ? window.location.pathname
      : '/';
  });

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/':
        return <HomePage onNavigate={navigate} />;
      case '/how-it-works':
        return <HowItWorksPage onNavigate={navigate} />;
      case '/demo':
        return <DemoPage onNavigate={navigate} />;
      case '/physician':
        return <PhysicianPage onNavigate={navigate} />;
      case '/patient':
        return <PatientPage onNavigate={navigate} />;
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/privacy':
        return <PrivacyPage onNavigate={navigate} />;
      case '/disclaimer':
        return <DisclaimerPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="app-container">
      {/* Mandatory Clinical Decision Support Persistent Banner */}
      <SafetyDisclaimerBanner onLearnMore={() => navigate('/disclaimer')} />

      {/* Main Navigation Bar */}
      <Navbar currentRoute={currentRoute} onNavigate={navigate} />

      {/* Dynamic Route View */}
      <main style={{ flex: 1 }}>
        {renderCurrentPage()}
      </main>

      {/* Comprehensive Clinical Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
