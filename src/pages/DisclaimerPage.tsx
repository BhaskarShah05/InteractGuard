import React from 'react';
import { AlertOctagon, ShieldAlert, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

interface DisclaimerPageProps {
  onNavigate: (route: string) => void;
}

export const DisclaimerPage: React.FC<DisclaimerPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '2.5rem 0 5rem 0' }}>
      <div className="content-wrapper" style={{ maxWidth: '850px' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-contraindicated">
              Mandatory Clinical Notice
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              PRD Section 21 Compliance
            </span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1rem' }}>
            Clinical Decision-Support Disclaimer
          </h1>
        </div>

        {/* Primary Callout Box */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(185, 28, 28, 0.05) 100%)',
          border: '2px solid rgba(239, 68, 68, 0.4)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          marginBottom: '2.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <AlertOctagon size={28} color="#f87171" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f87171' }}>
              Statutory Clinical Restatement
            </h2>
          </div>
          <p style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#ffffff',
            lineHeight: 1.7,
            fontFamily: 'var(--font-heading)'
          }}>
            "This system is an informational clinical decision-support tool. It does not provide medical advice, diagnosis, or treatment and does not replace the judgment of a qualified healthcare professional."
          </p>
        </div>

        {/* Breakdown of Clinical Responsibilities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
              1. Non-Diagnostic Classification
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              InteractGuard acts strictly as a secondary digital safety guard for registered healthcare professionals, pharmacists, and informed patients. It does not prescribe, change, or dispense pharmaceutical products autonomously.
            </p>
          </div>

          <div className="glass-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
              2. Data Completeness & Uncertainty
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              While InteractGuard indexes extensive Indian domestic brand data and international pharmacopeias (DDInter 2.0, openFDA), no database contains exhaustive documentation of all potential clinical idiosyncrasies, off-label combinations, or unindexed Ayurvedic/homeopathic formulations. Absence of an alert does not establish safety.
            </p>
          </div>

          <div className="glass-card">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
              3. Patient Safety Mandate
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Patients must never discontinue, adjust, or substitute prescribed medications based on decision-support summaries without prior consultation with their licensed medical doctor.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => onNavigate('/demo')}
            className="btn btn-primary"
          >
            <span>Acknowledge & Launch Demo</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
