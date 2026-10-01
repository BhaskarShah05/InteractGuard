import React from 'react';
import { MedicineItem, DuplicateAlert } from '../types';
import { Layers, AlertTriangle, Info, Check, ShieldAlert } from 'lucide-react';

interface IngredientTableProps {
  medicines: MedicineItem[];
  duplicates: DuplicateAlert[];
}

export const IngredientTable: React.FC<IngredientTableProps> = ({ medicines, duplicates }) => {
  // Aggregate all unique active ingredients
  const allIngredients = medicines.flatMap(m => 
    m.activeIngredients.map(ing => ({
      ...ing,
      fromBrand: m.resolvedBrand,
      isFDC: m.isFDC
    }))
  );

  return (
    <div className="glass-card" style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-none">Decomposition Graph</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>FDC Unrolling & ATC Class Mapping</span>
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>
            Active Molecules & Duplicate Detection
          </h3>
        </div>

        {duplicates.length > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(220, 38, 38, 0.15)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            color: '#f87171',
            fontSize: '0.8rem',
            fontWeight: 600
          }}>
            <ShieldAlert size={16} />
            <span>{duplicates.length} Cumulative Overdose Hazard Identified</span>
          </div>
        )}
      </div>

      {/* Duplicate Warning Callout */}
      {duplicates.map(dup => (
        <div
          key={dup.id}
          style={{
            background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.12) 0%, rgba(185, 28, 28, 0.05) 100%)',
            border: '1px solid rgba(220, 38, 38, 0.4)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}
        >
          <div style={{
            width: '2.25rem',
            height: '2.25rem',
            borderRadius: '50%',
            background: 'rgba(220, 38, 38, 0.2)',
            color: '#f87171',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <AlertTriangle size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
              <span className="badge badge-contraindicated">
                Duplicate Active Ingredient Alert
              </span>
              <strong style={{ fontSize: '1rem', color: '#f87171' }}>
                {dup.ingredient}
              </strong>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.5, marginBottom: '0.5rem' }}>
              {dup.clinicalRisk}
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              fontSize: '0.8rem',
              background: 'rgba(0, 0, 0, 0.25)',
              padding: '0.65rem 0.85rem',
              borderRadius: '6px',
              border: '1px solid rgba(220, 38, 38, 0.2)'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Brands Involved: </span>
                <strong style={{ color: '#f8fafc' }}>{dup.brandsInvolved.join(' + ')}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Combined Dose: </span>
                <strong style={{ color: '#fca5a5' }}>{dup.totalCumulativeDose}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Safe Single Limit: </span>
                <strong style={{ color: '#86efac' }}>{dup.recommendedMaxSingleDose}</strong>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Expanded Active Molecules Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.85rem',
          textAlign: 'left'
        }}>
          <thead>
            <tr style={{
              borderBottom: '1px solid var(--border-light)',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <th style={{ padding: '0.75rem 1rem' }}>Source Prescription Brand</th>
              <th style={{ padding: '0.75rem 1rem' }}>Active Molecule</th>
              <th style={{ padding: '0.75rem 1rem' }}>Form / Strength</th>
              <th style={{ padding: '0.75rem 1rem' }}>Pharmacological Class</th>
              <th style={{ padding: '0.75rem 1rem' }}>ATC / RxNorm</th>
            </tr>
          </thead>
          <tbody>
            {allIngredients.map((ing, idx) => {
              const isDuplicate = duplicates.some(d => d.ingredient.toLowerCase().includes(ing.name.toLowerCase()) || ing.name.toLowerCase().includes('paracetamol'));

              return (
                <tr
                  key={idx}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    background: isDuplicate ? 'rgba(239, 68, 68, 0.05)' : 'transparent',
                    transition: 'background 0.15s'
                  }}
                >
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#f8fafc' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span>{ing.fromBrand}</span>
                      {ing.isFDC && (
                        <span style={{
                          fontSize: '0.65rem',
                          background: 'rgba(13, 148, 136, 0.2)',
                          color: '#2dd4bf',
                          padding: '0.1rem 0.35rem',
                          borderRadius: '4px'
                        }}>
                          FDC
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: isDuplicate ? '#fca5a5' : '#38bdf8', fontWeight: 600 }}>
                    {ing.name}
                    {isDuplicate && (
                      <span style={{
                        marginLeft: '0.5rem',
                        fontSize: '0.65rem',
                        background: 'rgba(220, 38, 38, 0.2)',
                        color: '#f87171',
                        padding: '0.1rem 0.35rem',
                        borderRadius: '3px',
                        fontWeight: 700
                      }}>
                        DUPLICATE
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#cbd5e1' }}>
                    {ing.strength}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>
                    {ing.pharmacologicalClass}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {ing.atcCode || 'N/A'} {ing.rxNormId ? `/ RX:${ing.rxNormId}` : ''}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
