import React from 'react';
import { 
  ShieldCheck, 
  Database, 
  Target, 
  Layers, 
  Cpu, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', padding: '2rem 0 5rem 0' }}>
      <div className="content-wrapper">
        {/* Title */}
        <div style={{ maxWidth: '820px', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="badge badge-none" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
              Project Rationale
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Engineered for the Indian Healthcare Ecosystem
            </span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1rem' }}>
            Addressing Medication Safety in India
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            InteractGuard is designed as mission-critical safety infrastructure for hospital outpatient departments, e-pharmacy checkout gates, and digital telehealth platforms across India.
          </p>
        </div>

        {/* Success Metrics / Quantitative Evaluation Targets */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1rem' }}>
            Validation Benchmarks & Rigorous Success Targets
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div className="glass-card" style={{ borderTop: '4px solid #38bdf8' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                ≥95%
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                Major Interaction Recall
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Benchmark on curated, hand-verified clinical evaluation datasets of high-risk drug combinations.
              </p>
            </div>

            <div className="glass-card" style={{ borderTop: '4px solid #2dd4bf' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#2dd4bf', fontFamily: 'var(--font-mono)' }}>
                ≥90%
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                Brand Resolution & Escalation
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Accurate domestic brand identification or correct escalation to human confirmation for uncertain variants.
              </p>
            </div>

            <div className="glass-card" style={{ borderTop: '4px solid #a855f7' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#c084fc', fontFamily: 'var(--font-mono)' }}>
                &lt;10s
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                End-to-End Latency
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Rapid analysis excluding human review, enabling real-time integration into clinical and dispensing workflows.
              </p>
            </div>

            <div className="glass-card" style={{ borderTop: '4px solid #10b981' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                0%
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                Silent Guessing
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Zero unverified predictions permitted to reach patient guidance without physician oversight.
              </p>
            </div>
          </div>
        </div>

        {/* Data Sources and Standards */}
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1.25rem' }}>
            Clinical Data Foundations & Ontologies
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.35rem' }}>
                DDInter 2.0 Database
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Peer-reviewed clinical interaction repository containing over 220,000 curated pairwise and class-level drug interactions with evidence categorization.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#2dd4bf', marginBottom: '0.35rem' }}>
                Indian Medicines & FDC Registry
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Curated domestic mapping of trade brands, CDSCO-approved fixed-dose combinations, and active pharmaceutical ingredient compositions.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#c084fc', marginBottom: '0.35rem' }}>
                RxNorm & WHO-ATC Standards
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Standardized anatomical, therapeutic, and chemical classification codes ensuring interoperability across modern electronic health records.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => onNavigate('/demo')}
            className="btn btn-primary btn-lg"
          >
            <span>Launch Clinical Demo</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
