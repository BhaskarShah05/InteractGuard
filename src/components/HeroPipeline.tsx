import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Database, 
  ShieldAlert, 
  Stethoscope, 
  HeartHandshake, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  AlertTriangle,
  Lock,
  Sparkles,
  Info
} from 'lucide-react';

interface HeroPipelineProps {
  onLaunchDemo: () => void;
}

export const HeroPipeline: React.FC<HeroPipelineProps> = ({ onLaunchDemo }) => {
  const [activeStep, setActiveStep] = useState<number>(2);

  const steps = [
    {
      id: 0,
      title: '1. Ingestion',
      subtitle: 'Multimodal Input',
      icon: FileText,
      badge: 'OCR & Text',
      color: '#38bdf8',
      summary: 'Accepts printed prescriptions, PDFs, clinic notes or raw strings. Extracts drug names, forms, and frequencies with confidence metrics.',
      details: [
        'Image / PDF / Typed text ingestion',
        'Extracts dosage, form, and frequency',
        'Initial extraction confidence score'
      ]
    },
    {
      id: 1,
      title: '2. Brand & FDC',
      subtitle: 'Indian Context Graph',
      icon: Layers,
      badge: 'HITL Checkpoint 1',
      color: '#2dd4bf',
      summary: 'Resolves ambiguous Indian brand names (e.g. Warf, Voveran, Doloo 650) and decomposes complex Fixed-Dose Combinations into active molecules.',
      details: [
        'RapidFuzz brand normalization',
        'FDC unrolling (e.g., Combiflam → Ibuprofen + Paracetamol)',
        'Low confidence flags require human confirmation'
      ]
    },
    {
      id: 2,
      title: '3. Deterministic Engine',
      subtitle: 'DDInter + Context Rules',
      icon: Database,
      badge: 'Database Decides',
      color: '#f59e0b',
      summary: 'Pairwise DDInter 2.0 lookup + duplicate molecule detection. Deterministic clinical rules escalate severity based on patient age, eGFR, and pregnancy.',
      details: [
        'Duplicate ingredient alert (e.g. cumulative Paracetamol)',
        'DDInter 2.0 interaction database lookup',
        'eGFR / Age deterministic severity escalation',
        'Explicit "Not Covered" state — Not Found ≠ Safe'
      ]
    },
    {
      id: 3,
      title: '4. Physician Gate',
      subtitle: 'Clinical Review (HITL 2)',
      icon: Stethoscope,
      badge: 'Release Gate',
      color: '#ec4899',
      summary: 'Physician reviews prioritized alerts, inspects pharmacological mechanisms, overrides with mandatory clinical notes, and approves verified alternatives.',
      details: [
        'Mandatory doctor review before patient release',
        'Verified alternatives checked by safety engine',
        'Audited override reason requirement'
      ]
    },
    {
      id: 4,
      title: '5. Patient Counseling',
      subtitle: 'Localized Safety Advice',
      icon: HeartHandshake,
      badge: 'English + हिंदी',
      color: '#10b981',
      summary: 'Physician-approved guidance translated into plain language (English & Hindi) detailing symptoms to watch, warnings, and when to seek urgent care.',
      details: [
        'Dual-language: English & Hindi (हिंदी)',
        'Plain-language symptom red-flags',
        'Strict advice: "Do not stop or modify doses on your own"'
      ]
    }
  ];

  return (
    <div style={{
      background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.5) 100%)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-light)',
      padding: '2rem 1.5rem',
      boxShadow: 'var(--shadow-lg)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background glow */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '20%',
        width: '400px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(2, 132, 199, 0.12) 0%, rgba(2, 132, 199, 0) 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />

      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="pulse-dot" style={{ background: '#22c55e' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#38bdf8' }}>
              Deterministic Agentic Pipeline
            </span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>
            Interactive Safety Architecture
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Click any node to inspect pipeline logic:
          </span>
          <button 
            onClick={onLaunchDemo}
            className="btn btn-primary btn-sm"
          >
            <span>Run Live Demo</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Pipeline Visual Track */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '0.75rem',
        position: 'relative',
        marginBottom: '2rem'
      }}>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = activeStep === idx;

          return (
            <div
              key={step.id}
              onClick={() => setActiveStep(idx)}
              style={{
                background: isSelected 
                  ? 'rgba(30, 41, 59, 0.95)' 
                  : 'rgba(15, 23, 42, 0.6)',
                border: isSelected 
                  ? `2px solid ${step.color}` 
                  : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                boxShadow: isSelected ? `0 0 20px -5px ${step.color}40` : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '6px',
                  background: `${step.color}20`,
                  color: step.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={16} />
                </div>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.4rem',
                  borderRadius: '4px',
                  background: isSelected ? `${step.color}25` : 'rgba(255,255,255,0.05)',
                  color: isSelected ? step.color : 'var(--text-muted)'
                }}>
                  {step.badge}
                </span>
              </div>

              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isSelected ? '#ffffff' : '#cbd5e1' }}>
                  {step.title}
                </div>
                <div style={{ fontSize: '0.7rem', color: isSelected ? step.color : 'var(--text-muted)' }}>
                  {step.subtitle}
                </div>
              </div>

              {idx < 4 && (
                <div style={{
                  position: 'absolute',
                  right: '-10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  display: 'none' // handled via container flex if needed
                }}>
                  <ArrowRight size={12} color="var(--border-light)" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Step Expanded Details */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1 1 350px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: steps[activeStep].color
            }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
              {steps[activeStep].title}: {steps[activeStep].subtitle}
            </h4>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '0.75rem' }}>
            {steps[activeStep].summary}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {steps[activeStep].details.map((item, i) => (
              <span key={i} style={{
                fontSize: '0.75rem',
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid var(--border-subtle)',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <CheckCircle2 size={12} color={steps[activeStep].color} />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          minWidth: '240px',
          flex: '0 0 auto'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Info size={12} />
            PRD Architectural Rule
          </div>
          <div style={{ fontSize: '0.8rem', color: '#f1f5f9', fontWeight: 500, lineHeight: 1.4 }}>
            {activeStep === 0 && 'Vision OCR extraction is treated as candidate data. Must never be accepted without confidence calibration.'}
            {activeStep === 1 && 'Uncertain Indian brand matches trigger blocking review. No silent guesses allowed.'}
            {activeStep === 2 && 'Severity is strictly determined by DDInter 2.0 & deterministic clinical rules. LLM role is strictly constrained to explanation.'}
            {activeStep === 3 && 'Physician sign-off is the absolute release gate. Patient guidance cannot be accessed prior to approval.'}
            {activeStep === 4 && 'Counseling must warn patient not to alter medication on their own and provide bilingual red-flags.'}
          </div>
        </div>
      </div>
    </div>
  );
};
