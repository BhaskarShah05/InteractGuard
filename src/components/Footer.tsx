import React from 'react';
import { ShieldCheck, Lock, ExternalLink, Heart, Terminal, BookOpen, AlertOctagon } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer style={{
      backgroundColor: '#070d19',
      borderTop: '1px solid var(--border-subtle)',
      padding: '3.5rem 0 2rem 0',
      marginTop: 'auto'
    }}>
      <div className="content-wrapper">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <ShieldCheck size={18} />
              </div>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                Interact<span style={{ color: '#38bdf8' }}>Guard</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Specialized prescription interaction-safety layer engineered for Indian clinical realities, brand ambiguity, and high-frequency fixed-dose combinations.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              backgroundColor: 'rgba(13, 148, 136, 0.1)',
              border: '1px solid rgba(13, 148, 136, 0.25)',
              fontSize: '0.75rem',
              color: '#2dd4bf'
            }}>
              <Lock size={12} />
              <span>DPDP Act 2023 Architecture • Zero-Retention Default</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#f1f5f9', marginBottom: '1.2rem' }}>
              Application
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <button onClick={() => onNavigate('/')} style={{ color: 'var(--text-secondary)', textAlign: 'left' }}>
                  Platform Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/demo')} style={{ color: 'var(--text-secondary)', textAlign: 'left' }}>
                  Interactive Prescription Demo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/physician')} style={{ color: 'var(--text-secondary)', textAlign: 'left' }}>
                  Physician Review Console
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/patient')} style={{ color: 'var(--text-secondary)', textAlign: 'left' }}>
                  Patient Counseling (English / हिंदी)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/how-it-works')} style={{ color: 'var(--text-secondary)', textAlign: 'left' }}>
                  Agentic Pipeline & HITL
                </button>
              </li>
            </ul>
          </div>

          {/* Clinical & Safety */}
          <div>
            <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#f1f5f9', marginBottom: '1.2rem' }}>
              Clinical Evidence
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <button onClick={() => onNavigate('/about')} style={{ color: 'var(--text-secondary)', textAlign: 'left' }}>
                  Indian Brand & FDC Graph
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/how-it-works')} style={{ color: 'var(--text-secondary)', textAlign: 'left' }}>
                  DDInter 2.0 Local Engine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/how-it-works')} style={{ color: 'var(--text-secondary)', textAlign: 'left' }}>
                  Deterministic Rules vs LLM Role
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} style={{ color: 'var(--text-secondary)', textAlign: 'left' }}>
                  Evaluation Benchmarks (≥95% Recall)
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div>
            <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#f1f5f9', marginBottom: '1.2rem' }}>
              Compliance & Safety
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <button onClick={() => onNavigate('/disclaimer')} style={{ color: 'var(--text-secondary)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <AlertOctagon size={14} color="#f87171" />
                  <span>Mandatory Clinical Disclaimer</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy')} style={{ color: 'var(--text-secondary)', textAlign: 'left' }}>
                  Privacy & DPDP Act 2023 Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy')} style={{ color: 'var(--text-secondary)', textAlign: 'left' }}>
                  Audit Trail & Ephemeral Sessions
                </button>
              </li>
              <li>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  Complies with Ayushman Bharat Digital Mission (ABDM) architectural principles.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer Bar */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            lineHeight: 1.5
          }}>
            <strong style={{ color: '#cbd5e1' }}>Clinical Use Restriction:</strong> This system is strictly an informational clinical decision-support tool. It does not provide medical advice, diagnosis, or treatment, and does not replace the independent medical judgment of a registered medical practitioner. Always cross-reference high-risk alerts with authoritative clinical pharmacopeias before making prescribing or dispensing decisions.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              © 2026 InteractGuard Technologies. Derived from InteractGuard PRD v1.0 specification.
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <button onClick={() => onNavigate('/privacy')} style={{ color: 'var(--text-muted)' }}>Privacy</button>
              <button onClick={() => onNavigate('/disclaimer')} style={{ color: 'var(--text-muted)' }}>Disclaimer</button>
              <button onClick={() => onNavigate('/about')} style={{ color: 'var(--text-muted)' }}>Architecture</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
