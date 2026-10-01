import React, { useState } from 'react';
import { InteractionAlert, SeverityLevel } from '../types';
import { 
  AlertTriangle, 
  ShieldAlert, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  ShieldQuestion,
  ExternalLink
} from 'lucide-react';

interface InteractionCardProps {
  alert: InteractionAlert;
}

export const InteractionCard: React.FC<InteractionCardProps> = ({ alert }) => {
  const isMinor = alert.adjustedSeverity === 'minor' || alert.adjustedSeverity === 'none';
  const [isExpanded, setIsExpanded] = useState<boolean>(!isMinor);

  const getSeverityBadge = (sev: SeverityLevel) => {
    switch (sev) {
      case 'contraindicated':
        return <span className="badge badge-contraindicated">CONTRAINDICATED</span>;
      case 'major':
        return <span className="badge badge-major">MAJOR HAZARD</span>;
      case 'moderate':
        return <span className="badge badge-moderate">MODERATE RISK</span>;
      case 'minor':
        return <span className="badge badge-minor">MINOR / MONITOR</span>;
      case 'none':
        return <span className="badge badge-none">NONE RECORDED</span>;
      case 'not_covered':
        return <span className="badge badge-uncovered">NOT COVERED / UNCERTAIN</span>;
      default:
        return null;
    }
  };

  const isNotCovered = alert.coverageStatus === 'not_covered';

  return (
    <div
      style={{
        background: isNotCovered
          ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(30, 41, 59, 0.7) 100%)'
          : alert.adjustedSeverity === 'contraindicated'
          ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(30, 41, 59, 0.7) 100%)'
          : alert.adjustedSeverity === 'major'
          ? 'linear-gradient(135deg, rgba(225, 29, 72, 0.1) 0%, rgba(30, 41, 59, 0.7) 100%)'
          : 'rgba(30, 41, 59, 0.7)',
        border: isNotCovered
          ? '1px solid rgba(196, 181, 253, 0.35)'
          : alert.adjustedSeverity === 'contraindicated'
          ? '1px solid rgba(248, 113, 113, 0.45)'
          : alert.adjustedSeverity === 'major'
          ? '1px solid rgba(251, 113, 133, 0.4)'
          : '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        marginBottom: '1rem',
        boxShadow: alert.adjustedSeverity === 'contraindicated' ? '0 4px 20px rgba(220, 38, 38, 0.15)' : 'none',
        transition: 'all 0.2s'
      }}
    >
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 340px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            {getSeverityBadge(alert.adjustedSeverity)}

            {/* Severity Change Badge: Database vs Adjusted */}
            {alert.databaseSeverity !== alert.adjustedSeverity && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.7rem',
                fontWeight: 600,
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#fca5a5'
              }}>
                <span>DB: {alert.databaseSeverity.toUpperCase()}</span>
                <ArrowRight size={10} />
                <span>Adjusted: {alert.adjustedSeverity.toUpperCase()}</span>
              </div>
            )}

            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Source: {alert.evidenceSource.split('(')[0]}
            </span>
          </div>

          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.35rem' }}>
            {alert.drugsInvolved[0]} <span style={{ color: '#38bdf8' }}>+</span> {alert.drugsInvolved[1]}
          </h4>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Prescribed Brands: <strong>{alert.brandsInvolved[0]}</strong> & <strong>{alert.brandsInvolved[1]}</strong>
          </div>
        </div>

        {/* Toggle Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.8rem',
            color: '#38bdf8',
            padding: '0.35rem 0.65rem',
            borderRadius: '6px',
            background: 'rgba(2, 132, 199, 0.1)'
          }}
        >
          <span>{isExpanded ? 'Hide Evidence' : 'View Pharmacological Evidence'}</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          {/* Explicit Uncertainty State Warning */}
          {isNotCovered && (
            <div style={{
              background: 'rgba(124, 58, 237, 0.15)',
              border: '1px solid rgba(124, 58, 237, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem'
            }}>
              <ShieldQuestion size={20} color="#c084fc" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#e9d5ff', fontSize: '0.85rem' }}>
                  Safety Precaution: Not Indexed In Verified Interaction Database
                </strong>
                <p style={{ color: '#d8b4fe', fontSize: '0.8rem', marginTop: '0.25rem', lineHeight: 1.4 }}>
                  InteractGuard follows a strict safety principle: <em>"Not Found in database does NOT equal safe."</em> This compound lacks peer-reviewed pharmacokinetic interaction trials. A physician must manually review concomitant use.
                </p>
              </div>
            </div>
          )}

          {/* Adjustment Reason Callout */}
          {alert.adjustmentReason && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderRadius: '6px',
              padding: '0.75rem 1rem',
              marginBottom: '1rem',
              fontSize: '0.825rem',
              color: '#fca5a5'
            }}>
              <strong>Clinical Context Adjustment: </strong>
              <span>{alert.adjustmentReason}</span>
            </div>
          )}

          {/* Mechanism & Clinical Effect Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '0.85rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Pharmacokinetic / Dynamic Mechanism
              </div>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                {alert.mechanism}
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '0.85rem', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Observable Clinical Hazards
              </div>
              <p style={{ fontSize: '0.85rem', color: '#fca5a5', lineHeight: 1.5 }}>
                {alert.clinicalEffect}
              </p>
            </div>
          </div>

          {/* Evidence citation footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BookOpen size={14} color="#38bdf8" />
              <span>Evidence: {alert.evidenceSource}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#94a3b8' }}>
              <CheckCircle2 size={13} color="#22c55e" />
              <span>Deterministic DDInter 2.0 Mapping</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
