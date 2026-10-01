import React from 'react';
import { HeroPipeline } from '../components/HeroPipeline';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  Database, 
  Stethoscope, 
  Layers, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  HelpCircle,
  FileCheck,
  Zap,
  Activity
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <section style={{ paddingTop: '2.5rem' }}>
        <div className="content-wrapper">
          <div style={{ maxWidth: '820px', margin: '0 auto 2.5rem auto', textAlign: 'center' }}>
            {/* Top Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(2, 132, 199, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#38bdf8',
              marginBottom: '1.25rem'
            }}>
              <ShieldCheck size={14} />
              <span>Clinical Decision Support for Indian Healthcare</span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              color: '#ffffff'
            }}>
              A Safety Layer for <br />
              <span style={{
                background: 'linear-gradient(135deg, #38bdf8 0%, #2dd4bf 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Indian Prescriptions.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#cbd5e1',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}>
              InteractGuard resolves ambiguous Indian medicine trade names, expands complex Fixed-Dose Combinations (FDCs), checks interaction hazards via DDInter 2.0, and enforces mandatory physician sign-off before patient counseling is released.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('/demo')}
                className="btn btn-primary btn-lg"
              >
                <span>Analyze a Prescription</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => onNavigate('/how-it-works')}
                className="btn btn-secondary btn-lg"
              >
                <Activity size={18} color="#38bdf8" />
                <span>See How It Works</span>
              </button>
            </div>

            {/* Trust Microcopy */}
            <div style={{
              marginTop: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              <span>• Decision Support</span>
              <span>• Physician Review Required</span>
              <span>• Not Medical Advice</span>
              <span>• DPDP Act 2023 Compliant</span>
            </div>
          </div>

          {/* Interactive Pipeline Widget */}
          <HeroPipeline onLaunchDemo={() => onNavigate('/demo')} />
        </div>
      </section>

      {/* Problem Section tailored to Indian clinical settings */}
      <section style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)', padding: '4rem 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="content-wrapper">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', color: '#f87171', textTransform: 'uppercase' }}>
              The Clinical Challenge in India
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem', color: '#f8fafc' }}>
              Why Generic Global Checkers Fail on Indian Prescriptions
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="glass-card">
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Layers size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
                Fixed-Dose Combinations (FDCs)
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                India has one of the highest prevalences of multi-drug FDCs in the world. Single brand names (like Combiflam or Novamox-CV) hide multiple active ingredients that go unnoticed by basic drug-checking tools.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <AlertTriangle size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
                Accidental Duplicate Ingestion
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Patients commonly receive an antipyretic (e.g. Dolo-650) and a pain reliever (e.g. Combiflam) from different doctors, unknowingly taking dangerous cumulative doses of Paracetamol exceeding 3.5g/day.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Database size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
                100,000+ Domestic Trade Names
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Prescriptions use domestic brand names (Warf, Voveran, Ecosprin, Pan-D) rather than generic chemical designations. A spelling slip or dialect variation can lead to catastrophic misidentification without fuzzy confidence gating.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Stethoscope size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
                Fragmented Consultations
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                With brief OPD consultations and lack of unified electronic health records across private clinics, prescribers lack the time to manually cross-reference 5+ simultaneous drug monographs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Pillars / USP Section */}
      <section>
        <div className="content-wrapper">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', color: '#38bdf8', textTransform: 'uppercase' }}>
              Architectural Rigor
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem', color: '#f8fafc' }}>
              The 5 Core Safety Pillars of InteractGuard
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Built strictly to eliminate LLM hallucinations, avoid alert fatigue, and respect clinical governance.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Pillar 1 */}
            <div className="glass-card" style={{ borderLeft: '4px solid #38bdf8' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.25rem' }}>PILLAR 1</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
                Database Decides; LLM Explains
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Interaction existence, pharmacodynamics, and severity ratings come strictly from verified clinical databases (DDInter 2.0). The language model is strictly confined to generating plain-language bilingual summaries.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="glass-card" style={{ borderLeft: '4px solid #2dd4bf' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2dd4bf', marginBottom: '0.25rem' }}>PILLAR 2</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
                No Silent Guesses (HITL 1)
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                If brand OCR or fuzzy matching score is below calibrated confidence thresholds, the pipeline halts with a blocking confirmation card. It never makes a blind guess on drug identity.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="glass-card" style={{ borderLeft: '4px solid #f87171' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f87171', marginBottom: '0.25rem' }}>PILLAR 3</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
                Physician Release Gate (HITL 2)
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Patient-facing counseling cannot be accessed until a registered medical professional reviews the alerts, evaluates verified alternatives, or logs a clinical justification for overrides.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="glass-card" style={{ borderLeft: '4px solid #c084fc' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c084fc', marginBottom: '0.25rem' }}>PILLAR 4</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
                Not Found ≠ Safe (Uncertainty Handling)
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Unindexed herbal formulations, supplements, and rare molecules are explicitly displayed as "Not Covered / Insufficient Data". We never falsely reassure prescribers that absent data means no interaction.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="glass-card" style={{ borderLeft: '4px solid #fbbf24' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24', marginBottom: '0.25rem' }}>PILLAR 5</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
                Context-Driven Escalation
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Deterministic rules adapt severity based on kidney function (eGFR &lt; 45), elderly status (&ge; 65), and pregnancy. A Moderate alert cleanly escalates to Contraindicated with a transparent reason badge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section>
        <div className="content-wrapper">
          <div style={{
            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.25) 0%, rgba(13, 148, 136, 0.25) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem 2rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1rem' }}>
              Experience the Clinical Demo
            </h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 2rem auto', color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6 }}>
              Test the official PRD scenario featuring Warfarin, Diclofenac, misspelled Dolo-650, Combiflam FDC duplicate warnings, and bilingual patient counseling.
            </p>
            <button
              onClick={() => onNavigate('/demo')}
              className="btn btn-primary btn-lg"
              style={{ fontSize: '1.1rem' }}
            >
              <span>Launch Interactive Prescription Analysis</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
