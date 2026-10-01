import React from 'react';
import { 
  Activity, 
  ArrowRight, 
  ShieldCheck, 
  Database, 
  Cpu, 
  FileText, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Stethoscope, 
  HeartHandshake, 
  Lock,
  GitBranch,
  Table
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (route: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', padding: '2rem 0 5rem 0' }}>
      <div className="content-wrapper">
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-none" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
              System Architecture
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Deterministic Engine + Constrained LLM
            </span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1rem' }}>
            How InteractGuard Enforces Prescription Safety
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            Most AI medical tools ask an LLM to "read this prescription and list interactions." In clinical practice, this leads to unpredictable hallucinations and missed contraindications. InteractGuard enforces a dual-engine architecture: verified clinical databases compute truth, while language models merely explain it.
          </p>
        </div>

        {/* 8-Stage Pipeline Detail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.5rem' }}>
            The 8-Stage Verification Lifecycle
          </h2>

          {[
            {
              num: '01',
              title: 'Prescription Ingestion & Candidate OCR',
              tech: 'Vision Model / Tesseract + Regex Parser',
              description: 'Extracts drug strings, dosage forms (tablets, syrups, drops), strengths (mg, mcg), and frequency schedules. Every extracted candidate receives an OCR confidence score.',
              badge: 'Stage 1'
            },
            {
              num: '02',
              title: 'Indian Brand Resolution & HITL Checkpoint 1',
              tech: 'RapidFuzz + Indian Medicines Dataset',
              description: 'Matches trade brand names against the domestic Indian pharmacopeia. If confidence is below threshold (<80%), the system raises a blocking confirmation card—never guessing blindly.',
              badge: 'HITL 1'
            },
            {
              num: '03',
              title: 'Fixed-Dose Combination (FDC) Decomposition',
              tech: 'RxNorm + ATC Semantic Graph',
              description: 'Unrolls multi-drug products (e.g. Combiflam → Ibuprofen 400mg + Paracetamol 325mg) into individual canonical active pharmaceutical ingredients (APIs).',
              badge: 'Stage 3'
            },
            {
              num: '04',
              title: 'Duplicate Ingredient & Overdose Detection',
              tech: 'Cumulative Dose Calculator',
              description: 'Aggregates identical molecules across distinct single-drug and FDC brands to flag cumulative toxicity hazards (such as multi-brand Paracetamol ingestion exceeding safe thresholds).',
              badge: 'Stage 4'
            },
            {
              num: '05',
              title: 'Deterministic Interaction Lookup & Uncertainty Tagging',
              tech: 'DDInter 2.0 Local SQLite Engine',
              description: 'Queries pairwise and drug-class matrices. Severity is strictly retrieved from clinical evidence tables. Unindexed herbal preparations are explicitly classified as "Not Covered" rather than safe.',
              badge: 'Stage 5'
            },
            {
              num: '06',
              title: 'Patient-Context Deterministic Escalation',
              tech: 'Rule-Based Modifier Engine',
              description: 'Applies deterministic clinical logic based on age (≥65), renal clearance (eGFR < 45 mL/min), pregnancy, and reported allergies to adjust severity from Database baseline to Context-adjusted alert.',
              badge: 'Stage 6'
            },
            {
              num: '07',
              title: 'Physician Review Console & Alternative Verification (HITL 2)',
              tech: 'Doctor Portal + Clinical Override Logger',
              description: 'The physician reviews prioritized alerts, inspects prescriber-only verified alternatives (already safety-checked by the engine), and either approves or overrides with mandatory clinical justification.',
              badge: 'HITL 2'
            },
            {
              num: '08',
              title: 'Gated Patient Counseling Release & Localization',
              tech: 'JSON-Schema Constrained Model (English + Hindi)',
              description: 'Only once signed off by a physician, the system unlocks patient-facing guidance in English and Hindi (हिंदी) highlighting warning signs and advising against self-medication.',
              badge: 'Release Gate'
            }
          ].map(stage => (
            <div
              key={stage.num}
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.5rem',
                padding: '1.5rem'
              }}
            >
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                color: '#38bdf8',
                background: 'rgba(56, 189, 248, 0.1)',
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {stage.num}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
                    {stage.title}
                  </h3>
                  <span className="badge badge-minor" style={{ background: 'rgba(30, 41, 59, 0.8)', color: '#38bdf8' }}>
                    {stage.tech}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison: Naive LLM vs InteractGuard */}
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1.25rem' }}>
            Comparison: Naive LLM Checking vs. InteractGuard Deterministic Engine
          </h2>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Dimension</th>
                  <th style={{ padding: '0.75rem 1rem', color: '#f87171' }}>Standard Pure-LLM Approach</th>
                  <th style={{ padding: '0.75rem 1rem', color: '#38bdf8' }}>InteractGuard Architecture</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#f8fafc' }}>Brand Resolution</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#fca5a5' }}>Hallucinates chemical identity or assumes US brand names</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#7dd3fc' }}>RapidFuzz against curated Indian dataset with confidence calibration</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#f8fafc' }}>FDC Handling</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#fca5a5' }}>Frequently misses secondary active ingredients in combination tablets</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#7dd3fc' }}>Deterministic graph unrolling expands each brand into all active molecules</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#f8fafc' }}>Severity Rating</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#fca5a5' }}>Varies randomly between queries; prone to arbitrary escalation</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#7dd3fc' }}>DDInter 2.0 ground-truth lookup modified by strict clinical logic</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#f8fafc' }}>Unindexed Drugs</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#fca5a5' }}>Claims "No interaction found, safe to consume"</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#7dd3fc' }}>Explicit "Not Covered / Insufficient Evidence" state (Not found ≠ Safe)</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#f8fafc' }}>Clinical Governance</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#fca5a5' }}>Provides unfiltered advice directly to consumers without physician gate</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#7dd3fc' }}>Mandatory physician sign-off gate before patient counseling unlocks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => onNavigate('/demo')}
            className="btn btn-primary btn-lg"
          >
            <span>Try the Interactive Demo Now</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
