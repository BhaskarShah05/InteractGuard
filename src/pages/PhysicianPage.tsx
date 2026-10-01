import React, { useState } from 'react';
import { Stethoscope, ShieldCheck, AlertOctagon, CheckCircle2, FileText, ArrowRight, Activity, Filter, Lock } from 'lucide-react';
import { OFFICIAL_DEMO_SESSION } from '../data/mockClinicalData';
import { InteractionAlert } from '../types';
import { PhysicianReviewPanel } from '../components/PhysicianReviewPanel';
import { InteractionCard } from '../components/InteractionCard';

interface PhysicianPageProps {
  onNavigate: (route: string) => void;
}

export const PhysicianPage: React.FC<PhysicianPageProps> = ({ onNavigate }) => {
  const [session, setSession] = useState(OFFICIAL_DEMO_SESSION);

  const handleApproveAll = () => {
    setSession(prev => ({
      ...prev,
      physicianSignedOff: true,
      patientViewUnlocked: true,
      signedOffAt: new Date().toLocaleTimeString('en-IN') + ' IST'
    }));
  };

  const handleOverride = (alertId: string, reason: string) => {
    setSession(prev => ({
      ...prev,
      interactions: prev.interactions.map(a => a.id === alertId ? { ...a, physicianDecision: 'overridden', overrideReason: reason } : a)
    }));
  };

  const handleAlternative = (alertId: string, altName: string) => {
    // alternative picked
  };

  return (
    <div style={{ padding: '2.5rem 0 5rem 0' }}>
      <div className="content-wrapper">
        <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-contraindicated">
              Physician Console
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Registered Medical Practitioner (RMP) Workflow
            </span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.75rem' }}>
            Clinical Safety Review & Sign-Off Portal
          </h1>
          <p style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            Review flagged prescriptions requiring clinical oversight. Evaluate DDInter 2.0 evidence, select prescriber-checked verified alternatives, log clinical justifications, and release bilingual patient counseling instructions.
          </p>
        </div>

        {/* Doctor Identity & Active Case Card */}
        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                background: 'rgba(2, 132, 199, 0.2)',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Stethoscope size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                  {session.doctorName}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Cardiology & Internal Medicine • License Verified • Patient: {session.patientName}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={() => onNavigate('/demo')}
                className="btn btn-secondary btn-sm"
              >
                <span>Open in Interactive Demo</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Physician Console Review Module */}
        <PhysicianReviewPanel
          alerts={session.interactions}
          physicianSignedOff={session.physicianSignedOff}
          onApproveAll={handleApproveAll}
          onOverrideAlert={handleOverride}
          onSelectAlternative={handleAlternative}
        />

        {/* Detailed Pharmacological Evidence Cards */}
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1rem' }}>
            Underlying Pharmacological Evidence & Mechanism Analysis
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {session.interactions.map(alert => (
              <InteractionCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
