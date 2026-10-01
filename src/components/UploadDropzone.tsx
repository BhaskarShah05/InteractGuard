import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { OFFICIAL_DEMO_SESSION, ALTERNATIVE_SCENARIOS } from '../data/mockClinicalData';
import { PrescriptionSession } from '../types';

interface UploadDropzoneProps {
  onSelectSession: (session: PrescriptionSession) => void;
  currentSession: PrescriptionSession;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({ onSelectSession, currentSession }) => {
  const [activeTab, setActiveTab] = useState<'preset' | 'text' | 'file'>('preset');
  const [customText, setCustomText] = useState<string>(currentSession.rawInputContent);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSelectPreset = (session: PrescriptionSession) => {
    setIsProcessing(true);
    setTimeout(() => {
      onSelectSession(session);
      setCustomText(session.rawInputContent);
      setIsProcessing(false);
    }, 400);
  };

  const handleCustomAnalyze = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Create session based on text
      const newSession: PrescriptionSession = {
        ...OFFICIAL_DEMO_SESSION,
        id: `rx-${Date.now()}`,
        title: 'Custom Uploaded Prescription',
        prescriptionDate: 'Today',
        rawInputType: 'text',
        rawInputContent: customText,
        physicianSignedOff: false,
        patientViewUnlocked: false
      };
      onSelectSession(newSession);
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Upload size={18} color="#38bdf8" />
            <span>Prescription Ingestion & Case Selector</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Select verified PRD test scenarios or upload/paste a clinical prescription for end-to-end analysis.
          </p>
        </div>

        {/* Tab switchers */}
        <div style={{
          display: 'flex',
          background: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '8px',
          padding: '0.25rem',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => setActiveTab('preset')}
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: activeTab === 'preset' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'preset' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            Verified Scenarios
          </button>
          <button
            onClick={() => setActiveTab('text')}
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: activeTab === 'text' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'text' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            Pasted Text
          </button>
          <button
            onClick={() => setActiveTab('file')}
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: activeTab === 'file' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'file' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            Image / PDF Drop
          </button>
        </div>
      </div>

      {/* Tab: Presets */}
      {activeTab === 'preset' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
          {/* PRD Official Scenario */}
          <div
            onClick={() => handleSelectPreset(OFFICIAL_DEMO_SESSION)}
            style={{
              background: currentSession.id === OFFICIAL_DEMO_SESSION.id ? 'rgba(2, 132, 199, 0.15)' : 'rgba(15, 23, 42, 0.6)',
              border: currentSession.id === OFFICIAL_DEMO_SESSION.id ? '2px solid #38bdf8' : '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="badge badge-major" style={{ fontSize: '0.7rem' }}>
                PRD Official Demo Script
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Warfarin + NSAID + FDC</span>
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.35rem' }}>
              Geriatric Ortho-Cardiology Case
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4, marginBottom: '0.75rem' }}>
              Rx: <strong>Warf 5mg</strong>, <strong>Voveran 50mg</strong>, misspelled <strong>Doloo 650</strong>, and <strong>Combiflam</strong> FDC.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5' }}>
                HITL 1 Brand Discrepancy
              </span>
              <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(245, 158, 11, 0.15)', color: '#fcd34d' }}>
                Duplicate Paracetamol
              </span>
              <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(56, 189, 248, 0.15)', color: '#7dd3fc' }}>
                eGFR Severity Escalation
              </span>
            </div>
          </div>

          {/* Scenario 2 */}
          <div
            onClick={() => handleSelectPreset(ALTERNATIVE_SCENARIOS[0])}
            style={{
              background: currentSession.id === ALTERNATIVE_SCENARIOS[0].id ? 'rgba(2, 132, 199, 0.15)' : 'rgba(15, 23, 42, 0.6)',
              border: currentSession.id === ALTERNATIVE_SCENARIOS[0].id ? '2px solid #38bdf8' : '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="badge badge-contraindicated" style={{ fontSize: '0.7rem' }}>
                Scenario 2: Cardiac Glycoside
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>P-gp Efflux Inhibition</span>
            </div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.35rem' }}>
              Cardiology & Macrolide Co-administration
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4, marginBottom: '0.75rem' }}>
              Rx: <strong>Lanoxin 0.25mg</strong> (Digoxin) + <strong>Claribid 500mg</strong> (Clarithromycin) + <strong>Pan-D</strong> FDC.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5' }}>
                Digoxin Toxicity Alert
              </span>
              <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(13, 148, 136, 0.15)', color: '#2dd4bf' }}>
                Verified Alternatives Provided
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Pasted Text */}
      {activeTab === 'text' && (
        <div>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={5}
            placeholder="Type or paste prescription text (e.g. Tab. Warf 5mg OD, Tab. Voveran 50mg BD, Tab. Combiflam BD)..."
            style={{
              width: '100%',
              backgroundColor: '#0f172a',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              padding: '0.85rem',
              color: '#f8fafc',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.5,
              resize: 'vertical',
              marginBottom: '1rem'
            }}
          />
          <button
            onClick={handleCustomAnalyze}
            disabled={isProcessing}
            className="btn btn-primary"
            style={{ fontSize: '0.875rem' }}
          >
            {isProcessing ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Extracting & Resolving Indian Medicines...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Run Prescription Interaction Analysis</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Tab: File Dropzone */}
      {activeTab === 'file' && (
        <div style={{
          border: '2px dashed var(--border-light)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
          cursor: 'pointer'
        }}>
          <div style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '50%',
            backgroundColor: 'rgba(2, 132, 199, 0.1)',
            color: '#38bdf8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <FileText size={28} />
          </div>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.35rem' }}>
            Drop Printed / Digital Prescription Here
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Supports PDF, JPG, PNG, and camera photos. Processed locally in accordance with DPDP Act 2023.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => handleSelectPreset(OFFICIAL_DEMO_SESSION)}
              className="btn btn-secondary btn-sm"
            >
              Load Sample Prescription Document
            </button>
          </div>
        </div>
      )}

      {/* Privacy Notice Microcopy */}
      <div style={{
        marginTop: '1rem',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <CheckCircle2 size={13} color="#22c55e" />
          <span>DPDP Act 2023 Compliant: Ephemeral session processing. Zero patient health data stored without explicit consent.</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>
          Session ID: {currentSession.id}
        </span>
      </div>
    </div>
  );
};
