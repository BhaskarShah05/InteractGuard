import React, { useState } from 'react';
import { AuditLogEntry } from '../types';
import { History, Shield, CheckCircle2, AlertTriangle, AlertOctagon, Terminal, ChevronDown, ChevronUp } from 'lucide-react';

interface AuditTimelineProps {
  logs: AuditLogEntry[];
}

export const AuditTimeline: React.FC<AuditTimelineProps> = ({ logs }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="glass-card" style={{ marginBottom: '2rem' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '6px',
            background: 'rgba(56, 189, 248, 0.15)',
            color: '#38bdf8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <History size={16} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
              Deterministic Audit Trail & Safety Telemetry
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {logs.length} immutable events recorded • DPDP Act 2023 compliant audit log
            </span>
          </div>
        </div>

        <button style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ fontSize: '0.8rem' }}>{isOpen ? 'Collapse' : 'Expand Log'}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {isOpen && (
        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {logs.map((entry) => {
              const isCritical = entry.level === 'critical';
              const isWarning = entry.level === 'warning';
              const isSuccess = entry.level === 'success';

              return (
                <div
                  key={entry.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    background: 'rgba(15, 23, 42, 0.5)',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${
                      isCritical ? '#ef4444' : isWarning ? '#f59e0b' : isSuccess ? '#22c55e' : '#0284c7'
                    }`
                  }}
                >
                  <div style={{ marginTop: '2px' }}>
                    {isCritical && <AlertOctagon size={16} color="#ef4444" />}
                    {isWarning && <AlertTriangle size={16} color="#f59e0b" />}
                    {isSuccess && <CheckCircle2 size={16} color="#22c55e" />}
                    {!isCritical && !isWarning && !isSuccess && <Shield size={16} color="#38bdf8" />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#f8fafc' }}>
                          {entry.action}
                        </span>
                        <span style={{
                          fontSize: '0.7rem',
                          background: 'rgba(255,255,255,0.05)',
                          color: 'var(--text-muted)',
                          padding: '0.1rem 0.4rem',
                          borderRadius: '4px'
                        }}>
                          {entry.actor}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        {entry.timestamp}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                      {entry.details}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
