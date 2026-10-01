import React, { useState } from 'react';
import { PatientCounselingContent } from '../types';
import { 
  HeartHandshake, 
  Lock, 
  Languages, 
  AlertTriangle, 
  PhoneCall, 
  Eye, 
  ShieldCheck, 
  ArrowRight,
  Info
} from 'lucide-react';

interface PatientCounselingCardProps {
  isUnlocked: boolean;
  counseling: {
    en: PatientCounselingContent;
    hi: PatientCounselingContent;
  };
  onJumpToPhysician: () => void;
}

export const PatientCounselingCard: React.FC<PatientCounselingCardProps> = ({
  isUnlocked,
  counseling,
  onJumpToPhysician
}) => {
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const content = lang === 'en' ? counseling.en : counseling.hi;

  if (!isUnlocked) {
    return (
      <div className="glass-card" style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        border: '2px dashed rgba(239, 68, 68, 0.4)',
        background: 'rgba(15, 23, 42, 0.6)',
        marginBottom: '2rem'
      }}>
        <div style={{
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '50%',
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          color: '#f87171',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto'
        }}>
          <Lock size={28} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
          Patient Counseling View Locked
        </h3>
        <p style={{ maxWidth: '550px', margin: '0 auto 1.5rem auto', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
          Per InteractGuard clinical safety protocol, patient-facing medication guidance cannot be released until a registered physician reviews the alerts, evaluates verified alternatives, and provides formal digital sign-off.
        </p>
        <button
          onClick={onJumpToPhysician}
          className="btn btn-primary"
        >
          <span>Go to Physician Review Console</span>
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{
      marginBottom: '2rem',
      background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(30, 41, 59, 0.8) 100%)',
      border: '1px solid rgba(52, 211, 153, 0.35)'
    }}>
      {/* Header bar with Language Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-none" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
              Approved for Release
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Physician Gated Counseling
            </span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>
            {lang === 'en' ? 'Patient Medication Safety Guide' : 'रोगी दवा सुरक्षा निर्देश'}
          </h3>
        </div>

        {/* Language switch button */}
        <div style={{
          display: 'flex',
          background: 'rgba(15, 23, 42, 0.9)',
          borderRadius: '8px',
          padding: '0.25rem',
          border: '1px solid var(--border-light)'
        }}>
          <button
            onClick={() => setLang('en')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: lang === 'en' ? 'var(--primary)' : 'transparent',
              color: lang === 'en' ? '#fff' : 'var(--text-secondary)',
              transition: 'all 0.15s'
            }}
          >
            English
          </button>
          <button
            onClick={() => setLang('hi')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              fontFamily: 'var(--font-hindi)',
              background: lang === 'hi' ? 'var(--teal-accent)' : 'transparent',
              color: lang === 'hi' ? '#fff' : 'var(--text-secondary)',
              transition: 'all 0.15s'
            }}
          >
            हिंदी (Hindi)
          </button>
        </div>
      </div>

      {/* Mandatory Safety Notice: Never change medicines without doctor */}
      <div style={{
        background: 'rgba(239, 68, 68, 0.12)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <AlertTriangle size={20} color="#f87171" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.875rem', color: '#fca5a5', fontWeight: 600 }} className={lang === 'hi' ? 'hindi-text' : ''}>
          {lang === 'en' 
            ? 'CRITICAL ADVICE: Do not stop or alter your prescribed medicines on your own. Speak with your doctor or pharmacist immediately before taking these pills.'
            : 'महत्वपूर्ण चेतावनी: अपने डॉक्टर की सलाह के बिना अपनी दवाएं खुद कभी बंद या कम न करें। इन दवाओं को लेने से पहले तुरंत अपने डॉक्टर से बात करें।'
          }
        </div>
      </div>

      {/* What Was Found */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Info size={18} color="#38bdf8" />
          <span>{lang === 'en' ? 'What was found in your prescription' : 'आपके नुस्खे में क्या पाया गया'}</span>
        </h4>
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          fontSize: '0.9rem',
          color: '#e2e8f0',
          lineHeight: 1.6
        }} className={lang === 'hi' ? 'hindi-text' : ''}>
          {content.whatWasFound}
        </div>
      </div>

      {/* Grid: What to watch & When to contact */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {/* What to Watch for */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem'
        }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fbbf24', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Eye size={18} />
            <span>{lang === 'en' ? 'Symptoms to watch closely' : 'किन लक्षणों पर तुरंत ध्यान दें'}</span>
          </h4>
          <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1' }} className={lang === 'hi' ? 'hindi-text' : ''}>
            {content.whatToWatch.map((item, idx) => (
              <li key={idx} style={{ lineHeight: 1.5 }}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* When to Contact Doctor */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem'
        }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f87171', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PhoneCall size={18} />
            <span>{lang === 'en' ? 'When to contact your doctor immediately' : 'डॉक्टर से तुरंत कब संपर्क करें'}</span>
          </h4>
          <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1' }} className={lang === 'hi' ? 'hindi-text' : ''}>
            {content.whenToContactDoctor.map((item, idx) => (
              <li key={idx} style={{ lineHeight: 1.5 }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key Safety Rules */}
      <div style={{
        background: 'rgba(2, 132, 199, 0.08)',
        border: '1px solid rgba(2, 132, 199, 0.25)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.25rem'
      }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          {lang === 'en' ? 'Golden Medication Safety Rules' : 'दवा सुरक्षा के मुख्य नियम'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem', color: '#cbd5e1' }} className={lang === 'hi' ? 'hindi-text' : ''}>
          {content.safetyRules.map((rule, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>•</span>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
