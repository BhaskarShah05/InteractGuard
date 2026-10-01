export type SeverityLevel = 
  | 'contraindicated'
  | 'major'
  | 'moderate'
  | 'minor'
  | 'none'
  | 'not_covered';

export interface ActiveIngredient {
  name: string;
  strength: string;
  pharmacologicalClass: string;
  atcCode?: string;
  rxNormId?: string;
}

export interface MedicineItem {
  id: string;
  rawString: string;
  detectedName: string;
  strength: string;
  dosageForm: string;
  frequency: string;
  confidence: number; // 0 to 1
  resolvedBrand: string;
  manufacturer?: string;
  status: 'confirmed' | 'review_required' | 'corrected' | 'unrecognized';
  isFDC: boolean;
  activeIngredients: ActiveIngredient[];
  suggestedAlternatives?: string[];
  userConfirmed: boolean;
}

export interface InteractionAlert {
  id: string;
  drugsInvolved: [string, string];
  brandsInvolved: [string, string];
  databaseSeverity: SeverityLevel;
  adjustedSeverity: SeverityLevel;
  adjustmentReason?: string;
  mechanism: string;
  clinicalEffect: string;
  evidenceSource: string;
  coverageStatus: 'verified' | 'unverified' | 'not_covered';
  physicianDecision: 'pending' | 'approved' | 'modified' | 'overridden';
  physicianNote?: string;
  overrideReason?: string;
  verifiedAlternatives?: Array<{
    drugName: string;
    rationale: string;
    safetyChecked: boolean;
  }>;
}

export interface DuplicateAlert {
  id: string;
  ingredient: string;
  brandsInvolved: string[];
  totalCumulativeDose: string;
  recommendedMaxSingleDose: string;
  clinicalRisk: string;
  severity: 'major' | 'moderate';
}

export interface PatientContext {
  age: number;
  eGFR: number; // mL/min/1.73m²
  pregnancyStatus: 'not_pregnant' | 'trimester_1' | 'trimester_2' | 'trimester_3';
  allergies: string[];
  hepaticImpairment: boolean;
  activeConditions: string[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  stage: string;
  actor: 'System / Extraction' | 'System / Resolver' | 'System / DDInter Engine' | 'System / Rules Engine' | 'Physician / HITL' | 'Patient Gate';
  action: string;
  details: string;
  level: 'info' | 'warning' | 'critical' | 'success';
}

export interface PatientCounselingContent {
  whatWasFound: string;
  whatToWatch: string[];
  whenToContactDoctor: string[];
  safetyRules: string[];
}

export interface PrescriptionSession {
  id: string;
  title: string;
  prescriptionDate: string;
  doctorName: string;
  patientName: string;
  rawInputType: 'image' | 'pdf' | 'text';
  rawInputContent: string;
  medicines: MedicineItem[];
  interactions: InteractionAlert[];
  duplicates: DuplicateAlert[];
  patientContext: PatientContext;
  counseling: {
    en: PatientCounselingContent;
    hi: PatientCounselingContent;
  };
  auditTrail: AuditLogEntry[];
  physicianSignedOff: boolean;
  signedOffAt?: string;
  signedOffBy?: string;
  patientViewUnlocked: boolean;
}
