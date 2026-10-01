import React, { useState } from 'react';
import { MedicineItem } from '../types';
import { AlertTriangle, CheckCircle, Edit3, HelpCircle, ShieldAlert, ArrowRight, Check } from 'lucide-react';

interface BrandResolverCardProps {
  medicines: MedicineItem[];
  onConfirmMedicine: (id: string, confirmedBrand: string) => void;
}

export const BrandResolverCard: React.FC<BrandResolverCardProps> = ({ medicines, onConfirmMedicine }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState<string>('');

  const unconfirmedCount = medicines.filter(m => !m.userConfirmed && m.status !== 'confirmed').length;

  return (
    <div className="glass-card" style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-moderate">HITL Checkpoint 1</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Indian Brand Normalization</span>
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>
            Prescription Extraction & Brand Resolution
          </h3>
        </div>

        {unconfirmedCount > 0 ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            fontSize: '0.8rem',
            fontWeight: 600
          }}>
            <ShieldAlert size={16} />
            <span>{unconfirmedCount} Medicine Requires Human Verification</span>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#4ade80',
            fontSize: '0.8rem',
            fontWeight: 600
          }}>
            <CheckCircle size={16} />
            <span>All Medicines Verified by Prescriber / User</span>
          </div>
        )}
      </div>

      {/* Medicines Table / List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {medicines.map((med) => {
          const isReviewRequired = !med.userConfirmed && (med.status === 'review_required' || med.confidence < 0.8);
          const isUnrecognized = med.status === 'unrecognized';

          return (
            <div
              key={med.id}
              style={{
                background: isReviewRequired 
                  ? 'rgba(245, 158, 11, 0.08)' 
                  : isUnrecognized 
                  ? 'rgba(124, 58, 237, 0.08)'
                  : 'rgba(15, 23, 42, 0.6)',
                border: isReviewRequired
                  ? '1px solid rgba(245, 158, 11, 0.4)'
                  : isUnrecognized
                  ? '1px solid rgba(124, 58, 237, 0.4)'
                  : '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                position: 'relative',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 300px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      Raw input:
                    </span>
                    <code style={{
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(0,0,0,0.3)',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      color: '#cbd5e1'
                    }}>
                      "{med.rawString}"
                    </code>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                      {med.resolvedBrand}
                    </h4>
                    {med.manufacturer && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Mfg: {med.manufacturer}
                      </span>
                    )}
                  </div>

                  {/* Composition / Actives chips */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      Composition:
                    </span>
                    {med.activeIngredients.map((ing, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.75rem',
                          background: 'rgba(30, 41, 59, 0.8)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '4px',
                          padding: '0.15rem 0.5rem',
                          color: '#38bdf8'
                        }}
                      >
                        {ing.name} ({ing.strength})
                      </span>
                    ))}
                    {med.isFDC && (
                      <span style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        background: 'rgba(13, 148, 136, 0.2)',
                        color: '#2dd4bf',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px'
                      }}>
                        Fixed-Dose Combination
                      </span>
                    )}
                  </div>
                </div>

                {/* Right side: Confidence & Confirmation State */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Match Confidence:
                    </span>
                    <span
                      className={`badge ${
                        med.confidence >= 0.9 
                          ? 'badge-none' 
                          : med.confidence >= 0.6 
                          ? 'badge-moderate' 
                          : 'badge-contraindicated'
                      }`}
                    >
                      {Math.round(med.confidence * 100)}% ({med.confidence >= 0.9 ? 'High' : 'Review Required'})
                    </span>
                  </div>

                  {/* Actions for review required items */}
                  {isReviewRequired && (
                    <div style={{
                      background: 'rgba(245, 158, 11, 0.15)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: '6px',
                      padding: '0.5rem 0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <div style={{ fontSize: '0.75rem', color: '#fde047' }}>
                        Low match confidence. Confirm or adjust:
                      </div>
                      <button
                        onClick={() => onConfirmMedicine(med.id, med.resolvedBrand)}
                        className="btn btn-primary btn-sm"
                        style={{ background: '#d97706', fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                      >
                        <Check size={12} />
                        Confirm "{med.resolvedBrand.split(' ')[0]}"
                      </button>
                    </div>
                  )}

                  {med.userConfirmed && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#4ade80', fontSize: '0.75rem', fontWeight: 600 }}>
                      <CheckCircle size={14} />
                      <span>Verified by Prescriber</span>
                    </div>
                  )}

                  {isUnrecognized && (
                    <div style={{
                      background: 'rgba(124, 58, 237, 0.15)',
                      border: '1px solid rgba(124, 58, 237, 0.3)',
                      borderRadius: '6px',
                      padding: '0.4rem 0.75rem',
                      fontSize: '0.75rem',
                      color: '#c084fc'
                    }}>
                      Non-standard formulation • Flagged as Unindexed
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
