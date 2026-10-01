import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, FileCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (route: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '2.5rem 0 5rem 0' }}>
      <div className="content-wrapper" style={{ maxWidth: '850px' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-none" style={{ background: 'rgba(13, 148, 136, 0.2)', color: '#2dd4bf' }}>
              DPDP Act 2023 Compliant
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Data Governance & Ephemeral Processing
            </span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1rem' }}>
            Privacy, Security & Compliance Architecture
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            InteractGuard is designed from the ground up to comply with India’s Digital Personal Data Protection (DPDP) Act 2023 and the architectural principles of the Ayushman Bharat Digital Mission (ABDM).
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '3rem' }}>
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '6px', background: 'rgba(13, 148, 136, 0.2)', color: '#2dd4bf', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <EyeOff size={16} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
                Zero-Retention Default Policy
              </h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Prescription images, PDFs, and typed medication notes are processed ephemerally in RAM during the active session. Once the clinical check and counseling release are completed or the session is closed, raw medical documents are purged from volatile memory.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lock size={16} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
                Anonymized Safety Telemetry
              </h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Audit logs record pipeline timestamps, normalized drug IDs, and physician override reasons for clinical governance. No Personally Identifiable Information (PII) such as phone numbers, Aadhaar numbers, or residential addresses are stored in telemetry logs.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Server size={16} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
                On-Premise & In-Country Deployment
              </h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              For enterprise hospital networks and pharmacy chains, InteractGuard supports containerized air-gapped on-premise deployment or secure sovereign Indian cloud environments (e.g. AWS Mumbai / Azure Central India).
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => onNavigate('/demo')}
            className="btn btn-primary"
          >
            <span>Return to Interactive Demo</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
