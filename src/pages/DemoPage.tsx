import React, { useState } from 'react';
import { PrescriptionSession, PatientContext } from '../types';
import { OFFICIAL_DEMO_SESSION, ALTERNATIVE_SCENARIOS } from '../data/mockClinicalData';
import { UploadDropzone } from '../components/UploadDropzone';
import { BrandResolverCard } from '../components/BrandResolverCard';
import { IngredientTable } from '../components/IngredientTable';
import { InteractionCard } from '../components/InteractionCard';
import { ContextPanel } from '../components/ContextPanel';
import { PhysicianReviewPanel } from '../components/PhysicianReviewPanel';
import { PatientCounselingCard } from '../components/PatientCounselingCard';
import { AuditTimeline } from '../components/AuditTimeline';
import { 
  FileText, 
  Layers, 
  Database, 
  Stethoscope, 
  HeartHandshake, 
  History, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  Sparkles,
  UserCheck
} from 'lucide-react';

interface DemoPageProps {
  onNavigate: (route: string) => void;
}

export const DemoPage: React.FC<DemoPageProps> = ({ onNavigate }) => {
  const [session, setSession] = useState<PrescriptionSession>(OFFICIAL_DEMO_SESSION);
  const [activeTab, setActiveTab] = useState<'all' | 'analysis' | 'physician' | 'patient' | 'audit'>('all');

  // Handle HITL Checkpoint 1: Confirm Low-Confidence Medicine
  const handleConfirmMedicine = (medId: string, confirmedBrand: string) => {
    setSession(prev => {
      const updatedMedicines = prev.medicines.map(m => {
        if (m.id === medId) {
          return {
            ...m,
            userConfirmed: true,
            status: 'confirmed' as const,
            confidence: 1.0,
            resolvedBrand: confirmedBrand
          };
        }
        return m;
      });

      const newAuditLog = [
        ...prev.auditTrail,
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
          stage: 'HITL Checkpoint 1 (Prescriber Verification)',
          actor: 'Physician / HITL' as const,
          action: `Confirmed drug candidate "${confirmedBrand}"`,
          details: `Manual verification passed for previously low-confidence candidate (original raw string resolved).`,
          level: 'success' as const
        }
      ];

      return {
        ...prev,
        medicines: updatedMedicines,
        auditTrail: newAuditLog
      };
    });
  };

  // Handle Context Changes (eGFR, Age) with deterministic severity adjustment
  const handleContextChange = (updatedContext: PatientContext) => {
    setSession(prev => {
      // Recalculate adjusted severities based on eGFR
      const updatedInteractions = prev.interactions.map(item => {
        if (item.id === 'int-1' || item.drugsInvolved.includes('Diclofenac Sodium')) {
          if (updatedContext.eGFR < 45 || updatedContext.age >= 65) {
            return {
              ...item,
              adjustedSeverity: 'contraindicated' as const,
              adjustmentReason: `Escalated from Major to CONTRAINDICATED because Patient eGFR is ${updatedContext.eGFR} mL/min and Age is ${updatedContext.age}. Concurrent NSAID therapy exacerbates bleeding (RR 4.2x) and provokes acute hemodynamically mediated renal failure.`
            };
          } else {
            return {
              ...item,
              adjustedSeverity: 'major' as const,
              adjustmentReason: `Database baseline Major: Warfarin + Diclofenac CYP2C9 inhibition and GI mucosal damage.`
            };
          }
        }
        return item;
      });

      const auditEntry = {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
        stage: 'Deterministic Context Recalculation',
        actor: 'System / Rules Engine' as const,
        action: `Patient Context Modified: eGFR=${updatedContext.eGFR} mL/min, Age=${updatedContext.age}`,
        details: updatedContext.eGFR < 45 
          ? `Rule #CKD-NSAID-04 engaged: escalated Warfarin+Diclofenac alert to CONTRAINDICATED.`
          : `Renal clearance above threshold; baseline severity applied.`,
        level: updatedContext.eGFR < 45 ? ('critical' as const) : ('info' as const)
      };

      return {
        ...prev,
        patientContext: updatedContext,
        interactions: updatedInteractions,
        auditTrail: [...prev.auditTrail, auditEntry]
      };
    });
  };

  // Handle Physician Sign-off (HITL Checkpoint 2)
  const handleApproveAll = () => {
    setSession(prev => {
      const now = new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST';
      const updatedInteractions = prev.interactions.map(i => ({
        ...i,
        physicianDecision: 'approved' as const
      }));

      const newAudit = [
        ...prev.auditTrail,
        {
          id: `aud-${Date.now()}`,
          timestamp: now,
          stage: 'HITL Checkpoint 2 (Clinical Sign-off)',
          actor: 'Physician / HITL' as const,
          action: 'Physician Approval Granted & Patient Guidance Released',
          details: 'Registered Medical Practitioner reviewed all drug interactions, duplicate paracetamol warnings, and approved patient-facing counseling instructions.',
          level: 'success' as const
        }
      ];

      return {
        ...prev,
        interactions: updatedInteractions,
        physicianSignedOff: true,
        patientViewUnlocked: true,
        signedOffAt: now,
        signedOffBy: 'Dr. V. K. Sharma (KMC Reg: 48921)',
        auditTrail: newAudit
      };
    });
  };

  // Handle Physician Override with Mandatory Reason
  const handleOverrideAlert = (alertId: string, reason: string) => {
    setSession(prev => {
      const now = new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST';
      const updatedInteractions = prev.interactions.map(a => {
        if (a.id === alertId) {
          return {
            ...a,
            physicianDecision: 'overridden' as const,
            overrideReason: reason
          };
        }
        return a;
      });

      const newAudit = [
        ...prev.auditTrail,
        {
          id: `aud-${Date.now()}`,
          timestamp: now,
          stage: 'Clinical Override',
          actor: 'Physician / HITL' as const,
          action: `Alert [${alertId}] Overridden by Doctor`,
          details: `Doctor justification logged: "${reason}". Action committed to immutable audit trail.`,
          level: 'warning' as const
        }
      ];

      return {
        ...prev,
        interactions: updatedInteractions,
        auditTrail: newAudit
      };
    });
  };

  // Handle Selecting Verified Alternative
  const handleSelectAlternative = (alertId: string, altName: string) => {
    setSession(prev => {
      const now = new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST';
      const newAudit = [
        ...prev.auditTrail,
        {
          id: `aud-${Date.now()}`,
          timestamp: now,
          stage: 'Alternative Selection',
          actor: 'Physician / HITL' as const,
          action: `Substituted with verified alternative "${altName}"`,
          details: `Replaced interacting agent with prescriber-checked alternative. Passed safety engine checks.`,
          level: 'success' as const
        }
      ];

      return {
        ...prev,
        auditTrail: newAudit
      };
    });
  };

  const handleResetSession = () => {
    setSession(OFFICIAL_DEMO_SESSION);
  };

  const pendingConfirmations = session.medicines.filter(m => !m.userConfirmed && m.status !== 'confirmed').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem 0 5rem 0' }}>
      <div className="content-wrapper">
        {/* Workspace Title & Clinical Session Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-none" style={{ background: 'rgba(2, 132, 199, 0.2)', color: '#38bdf8' }}>
                Live Decision Support Console
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Session: {session.id}
              </span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc' }}>
              {session.title}
            </h1>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Prescriber: <strong>{session.doctorName}</strong> • Patient: <strong>{session.patientName}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handleResetSession}
              className="btn btn-secondary btn-sm"
              title="Reset to default PRD scenario"
            >
              <RotateCcw size={14} />
              <span>Reset Demo State</span>
            </button>
            <button
              onClick={handleApproveAll}
              className={`btn btn-sm ${session.physicianSignedOff ? 'btn-success' : 'btn-primary'}`}
            >
              <CheckCircle2 size={16} />
              <span>{session.physicianSignedOff ? 'Sign-off Active' : 'Sign Off as Physician'}</span>
            </button>
          </div>
        </div>

        {/* View Mode Filters */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem'
        }}>
          {[
            { id: 'all', label: 'Full End-to-End Workflow' },
            { id: 'analysis', label: '1. Medicines & Interactions' },
            { id: 'physician', label: '2. Physician Console (HITL 2)' },
            { id: 'patient', label: `3. Patient Counseling ${session.physicianSignedOff ? '(Unlocked)' : '(Locked)'}` },
            { id: 'audit', label: `Audit Log (${session.auditTrail.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: activeTab === tab.id ? 'var(--primary)' : 'rgba(15, 23, 42, 0.6)',
                color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                border: activeTab === tab.id ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Step 1: Upload / Ingestion */}
          {(activeTab === 'all' || activeTab === 'analysis') && (
            <UploadDropzone
              onSelectSession={(newSession) => setSession(newSession)}
              currentSession={session}
            />
          )}

          {/* Step 2: Brand Resolver & HITL 1 */}
          {(activeTab === 'all' || activeTab === 'analysis') && (
            <BrandResolverCard
              medicines={session.medicines}
              onConfirmMedicine={handleConfirmMedicine}
            />
          )}

          {/* Step 3: FDCs & Duplicate Detection */}
          {(activeTab === 'all' || activeTab === 'analysis') && (
            <IngredientTable
              medicines={session.medicines}
              duplicates={session.duplicates}
            />
          )}

          {/* Step 4: Patient Context Sliders (Live Rule Modifiers) */}
          {(activeTab === 'all' || activeTab === 'analysis' || activeTab === 'physician') && (
            <ContextPanel
              context={session.patientContext}
              onChangeContext={handleContextChange}
            />
          )}

          {/* Step 5: Interaction Alerts (DDInter 2.0) */}
          {(activeTab === 'all' || activeTab === 'analysis' || activeTab === 'physician') && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>
                    Identified Interaction Pairs & Evidence
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Ranked by severity. Evaluated against DDInter 2.0 local database + deterministic physiological rules.
                  </p>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                  {session.interactions.length} pairwise checks evaluated
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {session.interactions.map(alert => (
                  <InteractionCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Physician Review Console & Release Gate (HITL 2) */}
          {(activeTab === 'all' || activeTab === 'physician') && (
            <PhysicianReviewPanel
              alerts={session.interactions}
              physicianSignedOff={session.physicianSignedOff}
              onApproveAll={handleApproveAll}
              onOverrideAlert={handleOverrideAlert}
              onSelectAlternative={handleSelectAlternative}
            />
          )}

          {/* Step 7: Patient Counseling Card (English & Hindi) */}
          {(activeTab === 'all' || activeTab === 'patient') && (
            <PatientCounselingCard
              isUnlocked={session.patientViewUnlocked}
              counseling={session.counseling}
              onJumpToPhysician={() => setActiveTab('physician')}
            />
          )}

          {/* Step 8: Immutable Audit Trail */}
          {(activeTab === 'all' || activeTab === 'audit') && (
            <AuditTimeline logs={session.auditTrail} />
          )}
        </div>
      </div>
    </div>
  );
};
