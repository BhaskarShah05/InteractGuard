import React, { useState } from 'react';
import { InteractionAlert } from '../types';
import { Stethoscope, CheckCircle, AlertOctagon, Edit3, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

interface PhysicianReviewPanelProps {
  alerts: InteractionAlert[];
  physicianSignedOff: boolean;
  onApproveAll: () => void;
  onOverrideAlert: (alertId: string, reason: string) => void;
  onSelectAlternative: (alertId: string, alternativeName: string) => void;
}

export const PhysicianReviewPanel: React.FC<PhysicianReviewPanelProps> = ({
  alerts,
  physicianSignedOff,
  onApproveAll,
  onOverrideAlert,
  onSelectAlternative
}) => {
  const [overrideModalAlertId, setOverrideModalAlertId] = useState<string | null>(null);
  const [overrideReason, setOverrideReason] = useState<string>('');
  const [selectedAlternative, setSelectedAlternative] = useState<Record<string, string>>({});

  const handleOpenOverride = (alertId: string) => {
    setOverrideModalAlertId(alertId);
    setOverrideReason('');
  };

  const handleSaveOverride = () => {
    if (!overrideModalAlertId || !overrideReason.trim()) return;
    onOverrideAlert(overrideModalAlertId, overrideReason);
    setOverrideModalAlertId(null);
    setOverrideReason('');
  };

  const handleAlternativePick = (alertId: string, altName: string) => {
    setSelectedAlternative(prev => ({ ...prev, [alertId]: altName }));
    onSelectAlternative(alertId, altName);
  };

  const highPriorityAlerts = alerts.filter(a => a.adjustedSeverity === 'contraindicated' || a.adjustedSeverity === 'major');

  return (
    <div className="glass-card" style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-contraindicated">HITL Checkpoint 2</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Registered Medical Practitioner Console</span>
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>
            Physician Decision & Release Gate
          </h3>
        </div>

        {physicianSignedOff ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#4ade80',
            fontSize: '0.85rem',
            fontWeight: 700
          }}>
            <ShieldCheck size={18} />
            <span>CLINICALLY APPROVED & SIGNED OFF</span>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            fontSize: '0.85rem',
            fontWeight: 700
          }}>
            <Lock size={16} />
            <span>PATIENT COUNSELING LOCKED PENDING APPROVAL</span>
          </div>
        )}
      </div>

      <p style={{ fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Per clinical governance rules, patient-facing counseling instructions remain locked until a physician reviews prioritized alerts, inspects verified alternatives, or logs a clinical justification for overriding contraindications.
      </p>

      {/* Review Cards for each alert */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
        {alerts.map((alert) => {
          const isOverridden = alert.physicianDecision === 'overridden';
          const isApproved = alert.physicianDecision === 'approved' || physicianSignedOff;

          return (
            <div
              key={alert.id}
              style={{
                background: isOverridden ? 'rgba(245, 158, 11, 0.08)' : 'rgba(15, 23, 42, 0.6)',
                border: isOverridden ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 320px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <span className={`badge badge-${alert.adjustedSeverity}`}>
                      {alert.adjustedSeverity.toUpperCase()}
                    </span>
                    <strong style={{ fontSize: '0.95rem', color: '#f8fafc' }}>
                      {alert.drugsInvolved.join(' + ')}
                    </strong>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    {alert.clinicalEffect}
                  </p>

                  {/* Overridden state note */}
                  {isOverridden && alert.overrideReason && (
                    <div style={{
                      background: 'rgba(245, 158, 11, 0.12)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      color: '#fef08a',
                      marginBottom: '0.75rem'
                    }}>
                      <strong>Doctor Override Reason:</strong> "{alert.overrideReason}"
                    </div>
                  )}

                  {/* Prescriber-Only Verified Alternatives */}
                  {alert.verifiedAlternatives && alert.verifiedAlternatives.length > 0 && (
                    <div style={{
                      background: 'rgba(13, 148, 136, 0.08)',
                      border: '1px solid rgba(13, 148, 136, 0.25)',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      marginTop: '0.5rem'
                    }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2dd4bf', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                        Verified Prescriber Alternatives (Checked by Safety Engine):
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {alert.verifiedAlternatives.map((alt, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '0.75rem',
                              background: selectedAlternative[alert.id] === alt.drugName ? 'rgba(13, 148, 136, 0.2)' : 'rgba(0,0,0,0.2)',
                              padding: '0.45rem 0.75rem',
                              borderRadius: '6px',
                              border: selectedAlternative[alert.id] === alt.drugName ? '1px solid #2dd4bf' : '1px solid var(--border-subtle)'
                            }}
                          >
                            <div>
                              <div style={{ fontSize: '0.825rem', fontWeight: 600, color: '#f8fafc' }}>
                                {alt.drugName}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {alt.rationale}
                              </div>
                            </div>
                            <button
                              onClick={() => handleAlternativePick(alert.id, alt.drugName)}
                              className="btn btn-sm"
                              style={{
                                background: selectedAlternative[alert.id] === alt.drugName ? '#0d9488' : 'rgba(255,255,255,0.05)',
                                color: '#ffffff',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontSize: '0.7rem'
                              }}
                            >
                              {selectedAlternative[alert.id] === alt.drugName ? 'Selected' : 'Substitute'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Physician Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '160px' }}>
                  <button
                    onClick={() => handleOpenOverride(alert.id)}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', justifyContent: 'flex-start' }}
                  >
                    <Edit3 size={14} />
                    <span>Override with Reason</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Override Reason Modal */}
      {overrideModalAlertId && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem'
        }}>
          <div style={{
            background: '#1e293b',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            maxWidth: '520px',
            width: '100%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
          }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.5rem' }}>
              Physician Override Justification
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Clinical governance requires a registered medical justification to override high-risk interactions. This note will be recorded in the audit trail.
            </p>
            <textarea
              rows={4}
              value={overrideReason}
              onChange={(e) => setOverrideReason(e.target.value)}
              placeholder="E.g., Co-prescribed under close INR telemetry monitoring. Patient advised to withhold diclofenac if INR > 3.0..."
              style={{
                width: '100%',
                backgroundColor: '#0f172a',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '0.75rem',
                color: '#f8fafc',
                fontSize: '0.85rem',
                resize: 'none',
                marginBottom: '1rem'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => setOverrideModalAlertId(null)}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveOverride}
                disabled={!overrideReason.trim()}
                className="btn btn-primary btn-sm"
                style={{ opacity: overrideReason.trim() ? 1 : 0.5 }}
              >
                Log Override & Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Sign-off CTA bar */}
      <div style={{
        borderTop: '1px solid var(--border-light)',
        paddingTop: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {highPriorityAlerts.length} Critical Alert(s) Evaluated • Physician Action Logged
        </div>

        <button
          onClick={onApproveAll}
          className="btn btn-success btn-lg"
          style={{ boxShadow: '0 4px 15px rgba(5, 150, 105, 0.4)' }}
        >
          <ShieldCheck size={20} />
          <span>{physicianSignedOff ? 'Update Clinical Approval' : 'Approve & Release Patient Guidance'}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
