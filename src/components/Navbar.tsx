import React from 'react';
import { ShieldCheck, Stethoscope, Users, Activity, FileText, Lock, AlertTriangle, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  hasActiveSession?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  return (
    <header style={{
      backgroundColor: 'var(--bg-header)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(16px)',
      background: 'rgba(15, 23, 42, 0.9)'
    }}>
      <div className="content-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.5rem' }}>
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 0 15px rgba(2, 132, 199, 0.4)'
          }}>
            <ShieldCheck size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#f8fafc' }}>
                Interact<span style={{ color: '#38bdf8' }}>Guard</span>
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                background: 'rgba(13, 148, 136, 0.2)',
                color: '#2dd4bf',
                padding: '0.15rem 0.45rem',
                borderRadius: '4px',
                border: '1px solid rgba(13, 148, 136, 0.4)',
                letterSpacing: '0.05em'
              }}>
                INDIA v1.0
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1 }}>
              Prescription Interaction-Safety Layer
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button 
            onClick={() => onNavigate('/')}
            style={{
              color: currentRoute === '/' ? '#38bdf8' : 'var(--text-secondary)',
              fontWeight: currentRoute === '/' ? 600 : 500,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'color 0.2s'
            }}
          >
            Product
          </button>

          <button 
            onClick={() => onNavigate('/how-it-works')}
            style={{
              color: currentRoute === '/how-it-works' ? '#38bdf8' : 'var(--text-secondary)',
              fontWeight: currentRoute === '/how-it-works' ? 600 : 500,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'color 0.2s'
            }}
          >
            <Activity size={16} />
            How It Works
          </button>

          <button 
            onClick={() => onNavigate('/demo')}
            style={{
              color: currentRoute === '/demo' ? '#38bdf8' : 'var(--text-secondary)',
              fontWeight: currentRoute === '/demo' ? 600 : 500,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'color 0.2s'
            }}
          >
            <FileText size={16} />
            Interactive Demo
          </button>

          <button 
            onClick={() => onNavigate('/physician')}
            style={{
              color: currentRoute === '/physician' ? '#38bdf8' : 'var(--text-secondary)',
              fontWeight: currentRoute === '/physician' ? 600 : 500,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'color 0.2s'
            }}
          >
            <Stethoscope size={16} />
            Physician Console
          </button>

          <button 
            onClick={() => onNavigate('/patient')}
            style={{
              color: currentRoute === '/patient' ? '#38bdf8' : 'var(--text-secondary)',
              fontWeight: currentRoute === '/patient' ? 600 : 500,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'color 0.2s'
            }}
          >
            <Users size={16} />
            Patient Counseling
          </button>

          <button 
            onClick={() => onNavigate('/about')}
            style={{
              color: currentRoute === '/about' ? '#38bdf8' : 'var(--text-secondary)',
              fontWeight: currentRoute === '/about' ? 600 : 500,
              fontSize: '0.9rem',
              transition: 'color 0.2s'
            }}
          >
            About
          </button>
        </nav>

        {/* Primary CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            onClick={() => onNavigate('/demo')}
            className="btn btn-primary"
            style={{ fontSize: '0.875rem' }}
          >
            <span>Launch Clinical Demo</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
