import React from 'react';
import { PatientContext } from '../types';
import { UserCheck, Sliders, Shield, AlertCircle, Sparkles, Activity } from 'lucide-react';

interface ContextPanelProps {
  context: PatientContext;
  onChangeContext: (updated: PatientContext) => void;
}

export const ContextPanel: React.FC<ContextPanelProps> = ({ context, onChangeContext }) => {
  const handleEgfrChange = (val: number) => {
    onChangeContext({
      ...context,
      eGFR: val
    });
  };

  const handleAgeChange = (val: number) => {
    onChangeContext({
      ...context,
      age: val
    });
  };

  const handlePregnancyChange = (val: PatientContext['pregnancyStatus']) => {
    onChangeContext({
      ...context,
      pregnancyStatus: val
    });
  };

  return (
    <div className="glass-card" style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-major">Deterministic Context Engine</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rules & Physiological Modifiers</span>
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>
            Patient Context & Severity Modifiers
          </h3>
        </div>

        <div style={{
          fontSize: '0.75rem',
          color: '#38bdf8',
          background: 'rgba(2, 132, 199, 0.15)',
          padding: '0.35rem 0.75rem',
          borderRadius: '6px',
          border: '1px solid rgba(2, 132, 199, 0.3)'
        }}>
          Live Rule Escalation Active
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        {/* eGFR / Renal Function */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
              Renal Function (eGFR)
            </label>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '1rem',
              color: context.eGFR < 45 ? '#f87171' : context.eGFR < 60 ? '#fbbf24' : '#4ade80'
            }}>
              {context.eGFR} mL/min
            </span>
          </div>
          <input
            type="range"
            min={15}
            max={110}
            step={1}
            value={context.eGFR}
            onChange={(e) => handleEgfrChange(Number(e.target.value))}
            style={{ width: '100%', accentColor: context.eGFR < 45 ? '#ef4444' : '#0284c7', marginBottom: '0.5rem' }}
          />
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
            <span>&lt;30 Severe CKD</span>
            <span>30-59 Moderate</span>
            <span>&gt;60 Normal</span>
          </div>
          {context.eGFR < 45 && (
            <div style={{
              marginTop: '0.5rem',
              fontSize: '0.75rem',
              color: '#fca5a5',
              background: 'rgba(239, 68, 68, 0.1)',
              padding: '0.35rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid rgba(239, 68, 68, 0.25)'
            }}>
              Trigger: Escalates systemic NSAID bleeding risk to <strong>CONTRAINDICATED</strong>.
            </div>
          )}
        </div>

        {/* Patient Age */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
              Patient Age
            </label>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '1rem',
              color: context.age >= 65 ? '#fbbf24' : '#f8fafc'
            }}>
              {context.age} Years {context.age >= 65 ? '(Geriatric)' : ''}
            </span>
          </div>
          <input
            type="range"
            min={18}
            max={95}
            step={1}
            value={context.age}
            onChange={(e) => handleAgeChange(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#0284c7', marginBottom: '0.5rem' }}
          />
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Young Adult</span>
            <span>Adult</span>
            <span>≥65 High Bleed Vulnerability</span>
          </div>
        </div>

        {/* Pregnancy Status */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem'
        }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', display: 'block', marginBottom: '0.5rem' }}>
            Pregnancy Status
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem' }}>
            {[
              { id: 'not_pregnant', label: 'Not Pregnant' },
              { id: 'trimester_1', label: '1st Trimester' },
              { id: 'trimester_2', label: '2nd Trimester' },
              { id: 'trimester_3', label: '3rd Trimester' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => handlePregnancyChange(item.id as any)}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.4rem',
                  borderRadius: '6px',
                  background: context.pregnancyStatus === item.id ? 'var(--primary)' : 'rgba(30, 41, 59, 0.8)',
                  color: context.pregnancyStatus === item.id ? '#ffffff' : 'var(--text-secondary)',
                  border: context.pregnancyStatus === item.id ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
                  fontWeight: context.pregnancyStatus === item.id ? 700 : 500
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Clinical Conditions & Allergies */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.4)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '0.85rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.8rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <strong style={{ color: '#cbd5e1' }}>Recorded Comorbidities:</strong>
          {context.activeConditions.map((cond, i) => (
            <span key={i} style={{
              background: 'rgba(30, 41, 59, 0.8)',
              padding: '0.15rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid var(--border-light)',
              color: '#94a3b8'
            }}>
              {cond}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <strong style={{ color: '#cbd5e1' }}>Allergies:</strong>
          {context.allergies.length > 0 ? (
            context.allergies.map((allg, i) => (
              <span key={i} style={{
                background: 'rgba(239, 68, 68, 0.1)',
                padding: '0.15rem 0.5rem',
                borderRadius: '4px',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171',
                fontWeight: 600
              }}>
                {allg}
              </span>
            ))
          ) : (
            <span style={{ color: 'var(--text-muted)' }}>No known drug allergies reported</span>
          )}
        </div>
      </div>
    </div>
  );
};
