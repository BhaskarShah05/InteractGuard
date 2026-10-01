import React, { useState } from 'react';
import { HeartHandshake, Lock, Languages, AlertTriangle, ShieldCheck, ArrowRight, Stethoscope } from 'lucide-react';
import { OFFICIAL_DEMO_SESSION } from '../data/mockClinicalData';
import { PatientCounselingCard } from '../components/PatientCounselingCard';

interface PatientPageProps {
  onNavigate: (route: string) => void;
}

export const PatientPage: React.FC<PatientPageProps> = ({ onNavigate }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(true); // default preview or toggle
  const session = OFFICIAL_DEMO_SESSION;

  return (
    <div style={{ padding: '2.5rem 0 5rem 0' }}>
      <div className="content-wrapper">
        <div style={{ maxWidth: '800px', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-none" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
              Patient Counseling Portal
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Bilingual Patient & Caregiver Instructions
            </span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.75rem' }}>
            Plain-Language Medication Safety Guide
          </h1>
          <p style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            Safe, verified, doctor-approved guidance for patients and caregivers in India. Available in English and Hindi (हिंदी).
          </p>
        </div>

        {/* State Toggle for demonstration */}
        <div className="glass-card" style={{ padding: '1rem 1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
            <strong>Demo Simulation Mode:</strong> Toggle physician sign-off state to inspect how the release gate protects patients.
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setIsUnlocked(false)}
              className={`btn btn-sm ${!isUnlocked ? 'btn-danger' : 'btn-secondary'}`}
            >
              <Lock size={14} />
              <span>Simulate Locked State</span>
            </button>
            <button
              onClick={() => setIsUnlocked(true)}
              className={`btn btn-sm ${isUnlocked ? 'btn-success' : 'btn-secondary'}`}
            >
              <ShieldCheck size={14} />
              <span>Simulate Doctor-Approved</span>
            </button>
          </div>
        </div>

        {/* Patient Counseling Card */}
        <PatientCounselingCard
          isUnlocked={isUnlocked}
          counseling={session.counseling}
          onJumpToPhysician={() => onNavigate('/physician')}
        />

        {/* Emergency Assistance notice */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.25rem' }}>
              Have Questions About Your Prescribed Dose?
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Always contact your treating physician or hospital pharmacy before altering your medication routine.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/demo')}
            className="btn btn-secondary btn-sm"
          >
            <span>View Clinical Review Pipeline</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
