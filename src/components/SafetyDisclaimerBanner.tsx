import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

interface SafetyDisclaimerBannerProps {
  onLearnMore?: () => void;
}

export const SafetyDisclaimerBanner: React.FC<SafetyDisclaimerBannerProps> = ({ onLearnMore }) => {
  return (
    <div style={{
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderBottom: '1px solid rgba(220, 38, 38, 0.25)',
      padding: '0.5rem 1rem',
      fontSize: '0.8rem',
      color: '#e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      textAlign: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f87171', fontWeight: 600 }}>
        <ShieldAlert size={14} />
        <span>CLINICAL DECISION SUPPORT NOTICE:</span>
      </div>
      <span>
        InteractGuard is an informational decision-support tool. It does not provide medical advice, diagnosis, or treatment, and does not replace the judgment of a qualified healthcare professional.
      </span>
      {onLearnMore && (
        <button 
          onClick={onLearnMore} 
          style={{ 
            color: '#38bdf8', 
            textDecoration: 'underline', 
            fontWeight: 500, 
            fontSize: '0.75rem',
            marginLeft: '0.25rem' 
          }}
        >
          Read Policy
        </button>
      )}
    </div>
  );
};
