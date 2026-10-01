import { PrescriptionSession } from '../types';

export const OFFICIAL_DEMO_SESSION: PrescriptionSession = {
  id: 'rx-in-2026-8941',
  title: 'Geriatric Ortho-Cardiology Consultation (Scenario 1 - PRD Official Demo)',
  prescriptionDate: '01 Oct 2026',
  doctorName: 'Dr. V. K. Sharma, MD, DM (Cardiology)',
  patientName: 'Rameshwar Lal (Age 68, Male)',
  rawInputType: 'text',
  rawInputContent: `Rx
1. Tab. Warf 5mg — 1 tab OD at 8 PM (Warfarin Sodium)
2. Tab. Voveran 50mg — 1 tab BD pc for knee arthralgia (Diclofenac Sodium)
3. Tab. Doloo 650 — 1 tab SOS for fever/headache
4. Tab. Combiflam — 1 tab BD for pain
5. Tab. Herbal Joint Churna — 1 tsp with warm water (Ayurvedic OTC)
Patient: 68 yr male, chronic AFib on anticoagulation, reduced kidney function reported.`,
  medicines: [
    {
      id: 'med-1',
      rawString: 'Tab. Warf 5mg — 1 tab OD at 8 PM',
      detectedName: 'Warf',
      strength: '5mg',
      dosageForm: 'Tablet',
      frequency: 'Once daily at 8 PM',
      confidence: 0.98,
      resolvedBrand: 'Warf 5mg Tablet (Cipla Ltd.)',
      manufacturer: 'Cipla Ltd.',
      status: 'confirmed',
      isFDC: false,
      activeIngredients: [
        {
          name: 'Warfarin Sodium',
          strength: '5mg',
          pharmacologicalClass: 'Vitamin K Antagonist / Anticoagulant',
          atcCode: 'B01AA03',
          rxNormId: '11289'
        }
      ],
      userConfirmed: true
    },
    {
      id: 'med-2',
      rawString: 'Tab. Voveran 50mg — 1 tab BD pc',
      detectedName: 'Voveran',
      strength: '50mg',
      dosageForm: 'Enteric Coated Tablet',
      frequency: 'Twice daily after meals',
      confidence: 0.95,
      resolvedBrand: 'Voveran 50mg Tablet (Novartis India Ltd.)',
      manufacturer: 'Novartis India Ltd.',
      status: 'confirmed',
      isFDC: false,
      activeIngredients: [
        {
          name: 'Diclofenac Sodium',
          strength: '50mg',
          pharmacologicalClass: 'Non-Steroidal Anti-inflammatory Drug (NSAID)',
          atcCode: 'M01AB05',
          rxNormId: '3355'
        }
      ],
      userConfirmed: true
    },
    {
      id: 'med-3',
      rawString: 'Tab. Doloo 650 — 1 tab SOS',
      detectedName: 'Doloo 650 (Spelling Discrepancy)',
      strength: '650mg',
      dosageForm: 'Tablet',
      frequency: 'As needed (SOS) for fever/headache',
      confidence: 0.62,
      resolvedBrand: 'Dolo 650 Tablet (Micro Labs Ltd.)',
      manufacturer: 'Micro Labs Ltd.',
      status: 'review_required',
      isFDC: false,
      activeIngredients: [
        {
          name: 'Paracetamol (Acetaminophen)',
          strength: '650mg',
          pharmacologicalClass: 'Analgesic & Antipyretic',
          atcCode: 'N02BE01',
          rxNormId: '161'
        }
      ],
      suggestedAlternatives: ['Dolo 650 (Micro Labs)', 'Calpol 650 (GSK)', 'Pacimol 650 (Ipca)'],
      userConfirmed: false
    },
    {
      id: 'med-4',
      rawString: 'Tab. Combiflam — 1 tab BD for pain',
      detectedName: 'Combiflam',
      strength: 'Fixed-Dose Combination',
      dosageForm: 'Film-coated Tablet',
      frequency: 'Twice daily',
      confidence: 0.96,
      resolvedBrand: 'Combiflam Tablet (Sanofi India Ltd.)',
      manufacturer: 'Sanofi India Ltd.',
      status: 'confirmed',
      isFDC: true,
      activeIngredients: [
        {
          name: 'Ibuprofen',
          strength: '400mg',
          pharmacologicalClass: 'Non-Steroidal Anti-inflammatory Drug (NSAID)',
          atcCode: 'M01AE01',
          rxNormId: '5640'
        },
        {
          name: 'Paracetamol (Acetaminophen)',
          strength: '325mg',
          pharmacologicalClass: 'Analgesic & Antipyretic',
          atcCode: 'N02BE01',
          rxNormId: '161'
        }
      ],
      userConfirmed: true
    },
    {
      id: 'med-5',
      rawString: 'Tab. Herbal Joint Churna — 1 tsp with warm water',
      detectedName: 'Herbal Joint Churna',
      strength: 'Unspecified crude formulation',
      dosageForm: 'Powder / Churna',
      frequency: 'Once daily with warm water',
      confidence: 0.40,
      resolvedBrand: 'Unindexed Ayurvedic Proprietary Mixture',
      manufacturer: 'Local AYUSH Manufacturer',
      status: 'unrecognized',
      isFDC: false,
      activeIngredients: [
        {
          name: 'Guggulu / Shallaki / Unstandardized Herbs',
          strength: 'Unknown',
          pharmacologicalClass: 'Indigenous Medicine (Ayurvedic)',
          atcCode: 'N/A'
        }
      ],
      userConfirmed: false
    }
  ],
  duplicates: [
    {
      id: 'dup-1',
      ingredient: 'Paracetamol (Acetaminophen)',
      brandsInvolved: ['Dolo 650 (650mg)', 'Combiflam (325mg)'],
      totalCumulativeDose: '975mg per combined ingestion (potential >3,900mg/day if co-administered QDS)',
      recommendedMaxSingleDose: '1,000mg per dose (max 3,000mg/24h in elderly or renal patients)',
      clinicalRisk: 'High risk of unintentional cumulative hepatotoxicity due to simultaneous consumption of single-ingredient antipyretic (Dolo) and FDC analgesic (Combiflam).',
      severity: 'major'
    }
  ],
  interactions: [
    {
      id: 'int-1',
      drugsInvolved: ['Warfarin Sodium', 'Diclofenac Sodium'],
      brandsInvolved: ['Warf 5mg', 'Voveran 50mg'],
      databaseSeverity: 'major',
      adjustedSeverity: 'contraindicated',
      adjustmentReason: 'Escalated from Major to CONTRAINDICATED because Patient eGFR is 35 mL/min (CKD Stage 3b) and Age is 68. Concurrent systemic NSAID therapy drastically amplifies upper GI haemorrhage risk (RR 4.2x) and provokes acute hemodynamically mediated renal failure.',
      mechanism: 'Diclofenac inhibits CYP2C9 metabolism of active S-warfarin, displaces warfarin from albumin binding sites, and suppresses platelet COX-1, while causing direct gastrointestinal mucosal erosion.',
      clinicalEffect: 'Severe gastrointestinal bleeding, occult haemorrhage, marked elevation in INR, and sudden decline in renal clearance.',
      evidenceSource: 'DDInter 2.0 (ID: DDInter-01948) & British Medical Journal Evidence Set (Evidence Level A)',
      coverageStatus: 'verified',
      physicianDecision: 'pending',
      physicianNote: '',
      verifiedAlternatives: [
        {
          drugName: 'Topical Diclofenac 1.16% Gel (Voveran Emulgel)',
          rationale: 'Minimal systemic absorption (<2% of oral dose), avoids CYP2C9 inhibition and gastric mucosal toxicity while treating localized knee arthralgia.',
          safetyChecked: true
        },
        {
          drugName: 'Paracetamol Monotherapy (Max 2g/day) under INR monitoring',
          rationale: 'Non-ulcerogenic alternative for mild-to-moderate arthralgia; avoid co-administration with other paracetamol products.',
          safetyChecked: true
        }
      ]
    },
    {
      id: 'int-2',
      drugsInvolved: ['Warfarin Sodium', 'Ibuprofen (from Combiflam FDC)'],
      brandsInvolved: ['Warf 5mg', 'Combiflam Tablet'],
      databaseSeverity: 'major',
      adjustedSeverity: 'contraindicated',
      adjustmentReason: 'Escalated due to elderly status (68y) and existing Diclofenac co-prescription creating a dual-NSAID synergistic bleeding hazard.',
      mechanism: 'Ibuprofen competes for protein binding, competitively inhibits platelet thromboxane A2, and causes gastric irritation synergizing with anticoagulation.',
      clinicalEffect: 'Gross hematuria, melena, dangerous INR prolongation, and gastric ulcer perforation.',
      evidenceSource: 'DDInter 2.0 (ID: DDInter-02188) / openFDA Drug Safety Warnings',
      coverageStatus: 'verified',
      physicianDecision: 'pending',
      verifiedAlternatives: [
        {
          drugName: 'Discontinue Combiflam completely',
          rationale: 'Duplicate NSAID therapy with Voveran is completely irrational and contra-indicated.',
          safetyChecked: true
        }
      ]
    },
    {
      id: 'int-3',
      drugsInvolved: ['Warfarin Sodium', 'Herbal Joint Churna (Unstandardized Herbs)'],
      brandsInvolved: ['Warf 5mg', 'Herbal Joint Churna'],
      databaseSeverity: 'not_covered',
      adjustedSeverity: 'not_covered',
      adjustmentReason: 'Pharmacopeial interaction database does not possess verified clinical pharmacokinetic trial data for this specific unindexed herbal compound.',
      mechanism: 'Potential presence of coumarin derivatives, guggulsterones, or salicylic glycosides which can unpredictably potentiate or inhibit VKORC1 and CYP enzymes.',
      clinicalEffect: 'Unpredictable INR fluctuation; potential occult coagulopathy or sudden thrombosis.',
      evidenceSource: 'AYUSH-Allopathy Safety Advisory 2024 / Insufficient Clinical Trial Data',
      coverageStatus: 'not_covered',
      physicianDecision: 'pending',
      physicianNote: 'Crucial clinical teaching point: Not Found in database ≠ Safe. Advise patient to discontinue unverified herbal churna.',
      verifiedAlternatives: [
        {
          drugName: 'Physical physiotherapy / supervised joint rehabilitation',
          rationale: 'Proven non-pharmacological management with zero drug-interaction liability.',
          safetyChecked: true
        }
      ]
    }
  ],
  patientContext: {
    age: 68,
    eGFR: 35,
    pregnancyStatus: 'not_pregnant',
    allergies: ['Penicillin (mild cutaneous rash)'],
    hepaticImpairment: false,
    activeConditions: ['Atrial Fibrillation', 'Stage 3b Chronic Kidney Disease', 'Bilateral Knee Osteoarthritis']
  },
  counseling: {
    en: {
      whatWasFound: 'Your prescription contains a strong blood-thinner (Warf) combined with pain relievers (Voveran and Combiflam) that should NOT be taken together. In addition, two of your medicines (Dolo and Combiflam) both contain Paracetamol, which can lead to an accidental overdose.',
      whatToWatch: [
        'Unusual bruising, black or bloody stools, or bleeding that does not stop.',
        'Sudden severe dizziness, persistent stomach pain, or nausea.',
        'Swelling in your ankles or rapid decrease in urination volume.'
      ],
      whenToContactDoctor: [
        'Contact your cardiologist or primary physician BEFORE taking any doses of Voveran or Combiflam with your Warf tablet.',
        'If you experience any nosebleeds, red urine, or vomiting blood, go to the emergency room immediately.',
        'Stop taking the unverified herbal churna until your doctor reviews its ingredients.'
      ],
      safetyRules: [
        'Never change or stop your Warf (Warfarin) dose on your own.',
        'Do not take multiple fever/pain tablets together without checking the composition label for Paracetamol.',
        'Keep a written card in your wallet stating you are taking Warfarin.'
      ]
    },
    hi: {
      whatWasFound: 'आपके नुस्खे (प्रिस्क्रिप्शन) में खून पतला करने वाली दवा (वारफ - Warf) के साथ दर्द निवारक दवाएं (वोवेरान और कॉम्बीफ्लेम) शामिल हैं, जिन्हें एक साथ लेना अत्यंत खतरनाक हो सकता है। इसके अलावा, डोलो-650 और कॉम्बीफ्लेम दोनों में पैरासिटामोल मौजूद है, जिससे अनजाने में दवा की अत्यधिक मात्रा (ओवरडोज) हो सकती है।',
      whatToWatch: [
        'शरीर पर बिना चोट के नीले निशान (ब्रूइसिंग), मसूड़ों से खून आना, या काले रंग का मल आना।',
        'अचानक चक्कर आना, पेट में तेज जलन या दर्द, या उल्टी में खून आना।',
        'पैर के टखनों में सूजन या पेशाब की मात्रा में अचानक कमी आना।'
      ],
      whenToContactDoctor: [
        'वारफ (Warf) के साथ वोवेरान या कॉम्बीफ्लेम लेने से पहले तुरंत अपने डॉक्टर से संपर्क करें।',
        'यदि कोई भी रक्तस्राव (ब्लडिंग) दिखाई दे तो तुरंत नजदीकी अस्पताल के इमरजेंसी विभाग में जाएं।',
        'जब तक डॉक्टर जांच न लें, तब तक बिना किसी मानक के हर्बल चूर्ण का सेवन तुरंत रोक दें।'
      ],
      safetyRules: [
        'डॉक्टर की सलाह के बिना खून पतला करने वाली दवा (Warf) की खुराक कभी भी न बदलें और न ही बंद करें।',
        'दर्द या बुखार की दो अलग-अलग गोलियां एक साथ कभी न लें—उनमें एक ही दवा (जैसे पैरासिटामोल) हो सकती है।',
        'हमेशा अपने पास एक पर्ची रखें जिसमें लिखा हो कि आप वारफारिन (Warfarin) ले रहे हैं।'
      ]
    }
  },
  auditTrail: [
    {
      id: 'aud-1',
      timestamp: '2026-10-01 20:45:10 IST',
      stage: 'Prescription Ingestion',
      actor: 'System / Extraction',
      action: 'Prescription text parsed successfully',
      details: 'Detected 5 line items; isolated 4 modern allopathic brands and 1 indigenous herbal formulation.',
      level: 'info'
    },
    {
      id: 'aud-2',
      timestamp: '2026-10-01 20:45:12 IST',
      stage: 'Brand Resolution & FDC Expansion',
      actor: 'System / Resolver',
      action: 'Low-confidence match flagged for "Doloo 650"',
      details: 'Spelling deviation resolved to Dolo 650 (Micro Labs) with score 0.62. Blocked automatic approval pending Human-in-the-Loop verification.',
      level: 'warning'
    },
    {
      id: 'aud-3',
      timestamp: '2026-10-01 20:45:13 IST',
      stage: 'Duplicate Check',
      actor: 'System / Resolver',
      action: 'Duplicate Active Molecule Detected',
      details: 'Paracetamol identified simultaneously in Dolo 650 (650mg) and Combiflam (325mg). Cumulative single intake: 975mg.',
      level: 'critical'
    },
    {
      id: 'aud-4',
      timestamp: '2026-10-01 20:45:15 IST',
      stage: 'Deterministic Interaction Lookup',
      actor: 'System / DDInter Engine',
      action: 'Pharmacokinetic interaction detected',
      details: 'Pairwise check Warfarin + Diclofenac identified Major bleeding alert in DDInter 2.0 database.',
      level: 'critical'
    },
    {
      id: 'aud-5',
      timestamp: '2026-10-01 20:45:16 IST',
      stage: 'Patient Context Escalation',
      actor: 'System / Rules Engine',
      action: 'Severity Escalation Rule Applied',
      details: 'Patient Age (68) and eGFR (35 mL/min) triggered deterministic Rule #CKD-NSAID-04. Alert escalated from Major to CONTRAINDICATED.',
      level: 'critical'
    },
    {
      id: 'aud-6',
      timestamp: '2026-10-01 20:45:17 IST',
      stage: 'Coverage Check',
      actor: 'System / DDInter Engine',
      action: 'Explicit Not Covered State assigned',
      details: 'Herbal Joint Churna has no standardized pharmacopeial monograph. Marked as UNCOVERED (Not safe).',
      level: 'warning'
    }
  ],
  physicianSignedOff: false,
  patientViewUnlocked: false
};

export const ALTERNATIVE_SCENARIOS: PrescriptionSession[] = [
  {
    id: 'rx-in-2026-9012',
    title: 'Cardiology & Macrolide Co-administration (Scenario 2)',
    prescriptionDate: '28 Sep 2026',
    doctorName: 'Dr. Anita Desai, MD (Internal Medicine)',
    patientName: 'Sunita Mehra (Age 72, Female)',
    rawInputType: 'text',
    rawInputContent: `Rx
1. Tab. Lanoxin 0.25mg (Digoxin) — 1 tab OD
2. Tab. Claribid 500mg (Clarithromycin) — 1 tab BD for chest infection
3. Cap. Pan-D (Pantoprazole 40mg + Domperidone 30mg) — 1 cap OD ac
Patient: Heart failure patient with suspected atypical pneumonia.`,
    medicines: [
      {
        id: 'med-s2-1',
        rawString: 'Tab. Lanoxin 0.25mg — 1 tab OD',
        detectedName: 'Lanoxin',
        strength: '0.25mg',
        dosageForm: 'Tablet',
        frequency: 'Once daily in morning',
        confidence: 0.99,
        resolvedBrand: 'Lanoxin 0.25mg Tablet (GSK India)',
        manufacturer: 'GlaxoSmithKline Pharmaceuticals Ltd.',
        status: 'confirmed',
        isFDC: false,
        activeIngredients: [
          {
            name: 'Digoxin',
            strength: '0.25mg',
            pharmacologicalClass: 'Cardiac Glycoside',
            atcCode: 'C01AA05',
            rxNormId: '3407'
          }
        ],
        userConfirmed: true
      },
      {
        id: 'med-s2-2',
        rawString: 'Tab. Claribid 500mg — 1 tab BD',
        detectedName: 'Claribid',
        strength: '500mg',
        dosageForm: 'Tablet',
        frequency: 'Twice daily',
        confidence: 0.97,
        resolvedBrand: 'Claribid 500mg Tablet (Kremers Urban / Abbott)',
        manufacturer: 'Abbott Healthcare',
        status: 'confirmed',
        isFDC: false,
        activeIngredients: [
          {
            name: 'Clarithromycin',
            strength: '500mg',
            pharmacologicalClass: 'Macrolide Antibiotic',
            atcCode: 'J01FA09',
            rxNormId: '21212'
          }
        ],
        userConfirmed: true
      },
      {
        id: 'med-s2-3',
        rawString: 'Cap. Pan-D — 1 cap OD ac',
        detectedName: 'Pan-D',
        strength: 'FDC (40mg + 30mg)',
        dosageForm: 'Capsule',
        frequency: 'Once daily before meals',
        confidence: 0.96,
        resolvedBrand: 'Pan-D Capsule (Alkem Laboratories Ltd.)',
        manufacturer: 'Alkem Laboratories Ltd.',
        status: 'confirmed',
        isFDC: true,
        activeIngredients: [
          {
            name: 'Pantoprazole',
            strength: '40mg',
            pharmacologicalClass: 'Proton Pump Inhibitor (PPI)',
            atcCode: 'A02BC02',
            rxNormId: '40790'
          },
          {
            name: 'Domperidone',
            strength: '30mg SR',
            pharmacologicalClass: 'Dopamine Antagonist / Prokinetic',
            atcCode: 'A03FA03',
            rxNormId: '3582'
          }
        ],
        userConfirmed: true
      }
    ],
    duplicates: [],
    interactions: [
      {
        id: 'int-s2-1',
        drugsInvolved: ['Digoxin', 'Clarithromycin'],
        brandsInvolved: ['Lanoxin 0.25mg', 'Claribid 500mg'],
        databaseSeverity: 'major',
        adjustedSeverity: 'contraindicated',
        adjustmentReason: 'Clarithromycin potently inhibits intestinal P-glycoprotein (P-gp) and reduces Eubacterium lentum gut degradation of digoxin, doubling serum digoxin concentrations and precipitating fatal ventricular arrhythmias in elderly patients.',
        mechanism: 'P-glycoprotein efflux pump inhibition + reduction in non-renal elimination.',
        clinicalEffect: 'Digoxin toxicity: severe bradycardia, visual halo disturbances, AV block, and ventricular tachycardia.',
        evidenceSource: 'FDA Drug Safety Communication & DDInter 2.0 (ID: DDInter-00432)',
        coverageStatus: 'verified',
        physicianDecision: 'pending',
        verifiedAlternatives: [
          {
            drugName: 'Azithromycin 500mg or Amoxicillin-Clavulanate',
            rationale: 'Substantially lower P-gp inhibition profile, dramatically minimizing digoxin toxicity risk while treating respiratory pathogens.',
            safetyChecked: true
          }
        ]
      }
    ],
    patientContext: {
      age: 72,
      eGFR: 48,
      pregnancyStatus: 'not_pregnant',
      allergies: [],
      hepaticImpairment: false,
      activeConditions: ['Atrial Fibrillation with Rapid Ventricular Response', 'Congestive Heart Failure']
    },
    counseling: {
      en: {
        whatWasFound: 'Your antibiotic (Claribid) severely interferes with your heart medicine (Lanoxin). Taking them together can double the strength of your heart medicine in your blood, which is very dangerous.',
        whatToWatch: ['Yellow or green tint to your vision, or halos around lights.', 'Unusually slow heartbeat (<50 bpm) or feeling your heart flutter.', 'Extreme nausea, vomiting, or confusion.'],
        whenToContactDoctor: ['Contact your prescribing doctor immediately before taking the antibiotic Claribid.', 'Seek emergency cardiac assistance if your pulse drops significantly or if you feel faint.'],
        safetyRules: ['Do not begin the Claribid antibiotic until your cardiologist approves an alternative or adjusts your Lanoxin dose.']
      },
      hi: {
        whatWasFound: 'आपकी एंटीबायोटिक दवा (Claribid) आपकी हृदय की दवा (Lanoxin) के साथ गहरा टकराव करती है। दोनों को एक साथ लेने पर हृदय की दवा का स्तर खून में दोगुना हो सकता है, जो जानलेवा हो सकता है।',
        whatToWatch: ['आंखों के आगे पीला या हरा घेरा (हेलो) दिखना।', 'दिल की धड़कन का अत्यधिक धीमा होना या अनियमित होना।', 'लगातार जी मिचलाना, उल्टी या अत्यधिक कमजोरी महसूस होना।'],
        whenToContactDoctor: ['Claribid एंटीबायोटिक की पहली गोली लेने से पहले अपने डॉक्टर से तुरंत संपर्क करें।', 'यदि धड़कन असामान्य रूप से धीमी लगे तो तुरंत आपातकालीन कक्ष (ER) में जाएं।'],
        safetyRules: ['कार्डियोलॉजिस्ट से बात किए बिना इस एंटीबायोटिक को कतई शुरू न करें।']
      }
    },
    auditTrail: [
      {
        id: 'aud-s2-1',
        timestamp: '2026-09-28 11:20:00 IST',
        stage: 'Prescription Ingestion',
        actor: 'System / Extraction',
        action: 'Ingested high-risk cardiovascular prescription',
        details: 'Extracted Lanoxin, Claribid, and Pan-D FDC.',
        level: 'info'
      },
      {
        id: 'aud-s2-2',
        timestamp: '2026-09-28 11:20:02 IST',
        stage: 'Deterministic Interaction Lookup',
        actor: 'System / DDInter Engine',
        action: 'P-gp Mediated Toxicity Alert Generated',
        details: 'Identified major P-gp mediated cardiac glycoside accumulation hazard.',
        level: 'critical'
      }
    ],
    physicianSignedOff: false,
    patientViewUnlocked: false
  }
];
