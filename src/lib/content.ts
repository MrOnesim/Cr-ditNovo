export type Lang = 'fr' | 'es' | 'en' | 'de' | 'it' | 'pt';

export interface Translations {
  // Page Header & Meta
  pageTitle: string;
  pageSubtitle: string;
  badgeFast: string;
  stepIndicator: string;
  stepOf: string;
  noCommitment: string;
  footerDisclaimer: string;
  footerLegal: string;

  // Steps
  step1Title: string;
  step2Title: string;
  step3Title: string;
  step4Title: string;

  // Common buttons
  previous: string;
  next: string;
  submit: string;
  loadingText: string;

  // Step 1: Votre prêt
  kindLabel: string;
  personalLoan: string;
  personalLoanDesc: string;
  proLoan: string;
  proLoanDesc: string;
  purposeLabel: string;
  amountLabel: string;
  monthsLabel: string;
  minAmount: string;
  maxAmount: string;
  minMonths: string;
  maxMonths: string;
  presetAmounts: string;
  presetMonths: string;
  amountRangeHint: string;
  monthsRangeHint: string;
  step1BannerTitle: string;

  // Step 2: Votre identité
  civilityLabel: string;
  civilities: [string, string, string];
  civilityMrs?: string;
  civilityMr?: string;
  civilityOther?: string;
  firstNameLabel: string;
  firstNamePlaceholder: string;
  lastNameLabel: string;
  lastNamePlaceholder: string;
  emailLabel: string;
  phoneLabel: string;
  birthLabel: string;
  birthAgeNotice: string;
  birthHint?: string;
  countryLabel: string;
  cityLabel: string;

  // Step 3: Votre situation
  employmentLabel: string;
  seniorityLabel: string;
  incomeLabel: string;
  incomeMinHint: string;
  incomeMin?: string;
  chargesLabel: string;
  chargesOptionalHint: string;
  chargesHelp?: string;
  housingLabel: string;
  ibanLabel: string;
  ibanHelp: string;
  proCompanyLabel: string;
  proSiretLabel: string;
  proCompanySection: string;
  companyInfoTitle?: string;
  debtRatioTitle: string;
  debtRatioGood: string;
  debtRatioHigh: string;
  docsTitle: string;
  docsNote: string;
  uploadIdRecto: string;
  uploadIdVerso: string;
  uploadIncome: string;
  chooseFile: string;
  fileSelected: string;
  removeFile: string;
  fileTooLarge: string;
  fileFormatError: string;

  // Step 4: Récapitulatif
  summaryTitle: string;
  summarySubtitle: string;
  summaryGuarantee: string;
  preApprovalGuarantee?: string;
  loanDetails: string;
  borrowerDetails: string;
  typeLabel?: string;
  rateLabel?: string;
  applicantLabel?: string;
  residenceLabel?: string;
  companyLabel?: string;
  attachedDocs?: string;
  rgpdConsentTitle?: string;
  marketingConsentTitle?: string;
  monthlyPayment: string;
  tann: string;
  taeg: string;
  totalCost: string;
  totalInterest: string;
  consentLabel: string;
  consentTitle: string;
  marketingLabel: string;
  marketingTitle: string;
  attachedDocsRecap: string;
  sumType: string;
  sumPurpose: string;
  sumAmount: string;
  sumMonths: string;
  sumMonthly: string;
  sumRate: string;
  sumApplicant: string;
  sumEmail: string;
  sumPhone: string;
  sumResidence: string;
  sumEmployment: string;
  sumCompany: string;
  sumIncome: string;
  sumHousing: string;
  sumIban: string;

  // Units
  monthUnit: string;
  yearUnit: string;

  // Analysis Modal
  analysisTitle: string;
  analysisSteps: [string, string, string];
  analysisSecurity: string;

  // Sidebar
  promoBadge: string;
  realtimeSimulation: string;
  yourAdvisor: string;
  advisorStatus: string;
  advisorRole: string;
  advisorQuote: string;
  securityTitle: string;
  security1: string;
  security2: string;
  security3: string;
  security4: string;

  // Confirmation
  successTitle: string;
  successSubtitle: string;
  referenceLabel: string;
  statusAgreed: string;
  whatsappButton: string;
  whatsappHint: string;
  emailButton: string;
  copyRef: string;
  copied: string;
  whatsappPriorityTitle: string;
  whatsappPriorityDesc: string;
  copySummaryBtn: string;
  printDocBtn: string;
  recapTitle: string;
  newSimulationBtn: string;
}

export const translations: Record<Lang, Translations> = {
  es: {
    pageTitle: 'Solicitud de Préstamo en Línea',
    pageSubtitle: 'Complete su solicitud en 4 sencillos pasos y obtenga de inmediato su preacuerdo certificado.',
    badgeFast: 'Financiación Rápida en Europa · Respuesta en menos de 24h',
    stepIndicator: 'Paso',
    stepOf: 'de 4',
    noCommitment: 'Sin compromiso',
    footerDisclaimer: 'CréditNovo — Simulación y gestión de financiación personal y profesional.',
    footerLegal: 'Un crédito le compromete y debe ser reembolsado. Verifique su capacidad de pago antes de comprometerse. Atención WhatsApp directa al +34 742 08 48 22.',

    step1Title: 'Su préstamo',
    step2Title: 'Su identidad',
    step3Title: 'Su situación',
    step4Title: 'Resumen',

    previous: 'Anterior',
    next: 'Continuar',
    submit: 'Enviar mi solicitud',
    loadingText: 'Análisis y validación de su solicitud...',

    kindLabel: 'Tipo de financiación',
    personalLoan: 'Préstamo personal',
    personalLoanDesc: 'Auto, reformas, proyectos personales y liquidez',
    proLoan: 'Préstamo profesional',
    proLoanDesc: 'Inversión, maquinaria, tesorería y crecimiento empresarial',
    purposeLabel: 'Finalidad del préstamo',
    amountLabel: 'Importe deseado',
    monthsLabel: 'Plazo de devolución',
    minAmount: 'Mín. 1 000',
    maxAmount: 'Máx. 75 000',
    minMonths: '18 meses',
    maxMonths: '84 meses',
    presetAmounts: 'Importes habituales :',
    presetMonths: 'Plazos habituales :',
    amountRangeHint: 'De 1.000 a 75.000 (paso de 500)',
    monthsRangeHint: 'De 18 a 84 meses (intervalos de 6 meses)',
    step1BannerTitle: 'Financiación adaptada a sus proyectos personales y profesionales',

    civilityLabel: 'Tratamiento',
    civilities: ['Sra.', 'Sr.', 'Otro'],
    firstNameLabel: 'Nombre',
    firstNamePlaceholder: 'Carlos',
    lastNameLabel: 'Apellidos',
    lastNamePlaceholder: 'García Martínez',
    emailLabel: 'Correo electrónico',
    phoneLabel: 'Teléfono móvil',
    birthLabel: 'Fecha de nacimiento',
    birthAgeNotice: 'Debe tener entre 18 y 90 años.',
    countryLabel: 'País de residencia',
    cityLabel: 'Ciudad de residencia',

    employmentLabel: 'Situación laboral',
    seniorityLabel: 'Antigüedad laboral',
    incomeLabel: 'Ingresos netos mensuales',
    incomeMinHint: 'Mínimo 300',
    chargesLabel: 'Gastos mensuales (alquiler, préstamos)',
    chargesOptionalHint: 'Opcional (alquiler o préstamos vigentes)',
    housingLabel: 'Tipo de vivienda',
    ibanLabel: 'IBAN para el abono (opcional)',
    ibanHelp: 'Para agilizar la transferencia tras la aprobación definitiva.',
    proCompanyLabel: 'Razón social de la empresa',
    proSiretLabel: 'NIF / CIF de la empresa',
    proCompanySection: 'Datos de la Empresa (Préstamo Profesional)',
    debtRatioTitle: 'Tasa de endeudamiento estimada',
    debtRatioGood: 'Excelente capacidad de pago (inferior al 40%). Perfil muy favorable.',
    debtRatioHigh: 'Atención: endeudamiento superior al 40%. Puede ampliar el plazo para reducir la cuota mensual.',
    docsTitle: 'Documentos adjuntos (opcionales)',
    docsNote: 'Opcional en este paso. El documento de identidad y justificantes se solicitarán tras el preacuerdo mediante un canal seguro.',
    uploadIdRecto: 'DNI / NIE (anverso)',
    uploadIdVerso: 'DNI / NIE (reverso)',
    uploadIncome: 'Justificante de ingresos / nómina',
    chooseFile: 'Seleccionar archivo',
    fileSelected: 'Archivo seleccionado',
    removeFile: 'Eliminar',
    fileTooLarge: 'El archivo supera el tamaño máximo permitido (10 MB).',
    fileFormatError: 'Formato no admitido. Formatos válidos: JPG, PNG, PDF.',

    summaryTitle: 'Compruebe su solicitud',
    summarySubtitle: 'Revise la exactitud de sus datos antes de obtener su preacuerdo inmediato.',
    summaryGuarantee: 'Al validar, se emite de inmediato su preacuerdo oficial con transmisión directa a su asesor por WhatsApp.',
    loanDetails: 'Detalles de la financiación',
    borrowerDetails: 'Datos del solicitante',
    monthlyPayment: 'Cuota mensual estimada',
    tann: 'Tipo de Interés Nominal (TIN)',
    taeg: 'TAE fija',
    totalCost: 'Importe total adeudado',
    totalInterest: 'Total intereses',
    consentLabel: 'Acepto la política de privacidad y autorizo a CréditNovo y a sus entidades bancarias colaboradoras a tramitar mi solicitud.',
    consentTitle: 'Consentimiento RGPD obligatorio * :',
    marketingLabel: 'Deseo recibir el seguimiento de mi expediente y ofertas exclusivas por email.',
    marketingTitle: 'Comunicaciones y seguimiento (opcional) :',
    attachedDocsRecap: 'Documentos adjuntos :',
    sumType: 'Tipo :',
    sumPurpose: 'Finalidad :',
    sumAmount: 'Importe :',
    sumMonths: 'Plazo :',
    sumMonthly: 'Cuota mensual :',
    sumRate: 'Tipo de interés :',
    sumApplicant: 'Solicitante :',
    sumEmail: 'Email :',
    sumPhone: 'Teléfono :',
    sumResidence: 'Residencia :',
    sumEmployment: 'Situación laboral :',
    sumCompany: 'Empresa :',
    sumIncome: 'Ingresos netos :',
    sumHousing: 'Vivienda :',
    sumIban: 'IBAN :',

    monthUnit: 'meses',
    yearUnit: 'años',

    analysisTitle: 'Análisis de su solicitud en curso',
    analysisSteps: [
      'Comprobación de criterios de idoneidad y perfil...',
      'Consulta de condiciones bancarias preferentes...',
      'Emisión de su preacuerdo de financiación certificado...',
    ],
    analysisSecurity: 'Procesamiento seguro y cifrado con estándares bancarios',

    promoBadge: 'Tipo promocional garantizado 30 días',
    realtimeSimulation: 'Simulación en tiempo real',
    yourAdvisor: 'Sarah Dumont',
    advisorStatus: 'En línea para asesorarle',
    advisorRole: 'Asesora senior en financiación europea',
    advisorQuote: '«Revisamos su expediente con carácter prioritario en menos de 24h.»',
    securityTitle: 'Garantías y seguridad',
    security1: 'Datos encriptados y tratados en la UE',
    security2: 'Socios bancarios autorizados en la UE',
    security3: 'Respuesta en 1 día hábil',
    security4: 'Estudio 100% gratuito y sin compromiso',

    successTitle: '¡Su solicitud ha sido validada con éxito!',
    successSubtitle: 'Se ha emitido un preacuerdo favorable para su préstamo.',
    referenceLabel: 'Referencia de su expediente',
    statusAgreed: 'Preacuerdo inmediato concedido',
    whatsappButton: 'Enviar expediente por WhatsApp',
    whatsappHint: 'Haga clic para contactar directamente con su asesor en WhatsApp (+34 742 08 48 22)',
    emailButton: 'Recibir resumen por correo',
    copyRef: 'Copiar referencia',
    copied: '¡Copiado!',
    whatsappPriorityTitle: 'Transmisión prioritaria por WhatsApp',
    whatsappPriorityDesc: 'Su asesor asignado le responde de inmediato en el',
    copySummaryBtn: 'Copiar resumen',
    printDocBtn: 'Imprimir expediente',
    recapTitle: 'Síntesis del expediente registrado',
    newSimulationBtn: 'Nueva simulación',
  },

  fr: {
    pageTitle: 'Demande de Prêt en Ligne',
    pageSubtitle: 'Complétez votre formulaire en 4 étapes simples et recevez immédiatement votre accord de principe certifié.',
    badgeFast: 'Financement Express en Europe · Réponse sous 24h',
    stepIndicator: 'Étape',
    stepOf: 'sur 4',
    noCommitment: 'Sans engagement',
    footerDisclaimer: 'CréditNovo — Simulation et accompagnement en financement personnel et professionnel.',
    footerLegal: 'Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager. Assistance WhatsApp directe au +34 742 08 48 22.',

    step1Title: 'Votre prêt',
    step2Title: 'Votre identité',
    step3Title: 'Votre situation',
    step4Title: 'Récapitulatif',

    previous: 'Précédent',
    next: 'Continuer',
    submit: 'Envoyer ma demande',
    loadingText: 'Analyse et validation de votre dossier...',

    kindLabel: 'Type de financement',
    personalLoan: 'Prêt personnel',
    personalLoanDesc: 'Auto, travaux, projet de vie & trésorerie personnelle',
    proLoan: 'Prêt professionnel',
    proLoanDesc: 'Investissement, matériel, trésorerie & développement d\'entreprise',
    purposeLabel: 'Objet du financement',
    amountLabel: 'Montant souhaité',
    monthsLabel: 'Durée de remboursement',
    minAmount: 'Min. 1 000',
    maxAmount: 'Max. 75 000',
    minMonths: '18 mois',
    maxMonths: '84 mois',
    presetAmounts: 'Montants fréquents :',
    presetMonths: 'Durées suggérées :',
    amountRangeHint: 'De 1 000 à 75 000 (pas de 500)',
    monthsRangeHint: 'De 18 à 84 mois (pas de 6 mois)',
    step1BannerTitle: 'Financement sur-mesure pour vos projets personnels et professionnels',

    civilityLabel: 'Civilité',
    civilities: ['Mme', 'M.', 'Autre'],
    firstNameLabel: 'Prénom',
    firstNamePlaceholder: 'Camille',
    lastNameLabel: 'Nom',
    lastNamePlaceholder: 'Rousseau',
    emailLabel: 'Adresse email',
    phoneLabel: 'Téléphone mobile',
    birthLabel: 'Date de naissance',
    birthAgeNotice: 'Vous devez avoir entre 18 et 90 ans.',
    countryLabel: 'Pays de résidence',
    cityLabel: 'Ville de résidence',

    employmentLabel: 'Situation professionnelle',
    seniorityLabel: 'Ancienneté dans l\'emploi',
    incomeLabel: 'Revenu net mensuel',
    incomeMinHint: 'Minimum 300',
    chargesLabel: 'Charges mensuelles (loyer, crédits)',
    chargesOptionalHint: 'Facultatif (loyer ou crédits en cours)',
    housingLabel: 'Situation de logement',
    ibanLabel: 'IBAN de versement (facultatif)',
    ibanHelp: 'Pour accélérer le virement de vos fonds après acceptation finale.',
    proCompanyLabel: 'Raison sociale de l\'entreprise',
    proSiretLabel: 'Numéro SIRET / Identifiant fiscal',
    proCompanySection: 'Informations Entreprise (Prêt Professionnel)',
    debtRatioTitle: 'Taux d\'endettement estimé',
    debtRatioGood: 'Excellente capacité de remboursement (inférieure à 40%). Votre profil est très favorable.',
    debtRatioHigh: 'Attention : taux supérieur à 40%. Vous pouvez allonger la durée pour diminuer vos mensualités.',
    docsTitle: 'Pièces justificatives (facultatives)',
    docsNote: 'Facultatif à cette étape. La pièce d\'identité et les justificatifs seront demandés après l\'accord de principe, via un canal sécurisé.',
    uploadIdRecto: 'Pièce d\'identité (recto)',
    uploadIdVerso: 'Pièce d\'identité (verso)',
    uploadIncome: 'Justificatif de revenus / avis',
    chooseFile: 'Choisir un fichier',
    fileSelected: 'Fichier sélectionné',
    removeFile: 'Supprimer',
    fileTooLarge: 'Le fichier dépasse la taille maximale autorisée (10 Mo).',
    fileFormatError: 'Format non supporté. Formats autorisés : JPG, PNG, PDF.',

    summaryTitle: 'Vérifiez votre demande',
    summarySubtitle: 'Vérifiez l\'exactitude de vos informations avant d\'obtenir votre accord de principe immédiat.',
    summaryGuarantee: 'En validant, un accord de principe officiel vous est immédiatement délivré avec transmission directe à notre conseiller via WhatsApp.',
    loanDetails: 'Détails du financement',
    borrowerDetails: 'Informations de l\'emprunteur',
    monthlyPayment: 'Mensualité estimée',
    tann: 'Taux Annuel Net (TANN)',
    taeg: 'TAEG fixe',
    totalCost: 'Montant Total Dû (MTIC)',
    totalInterest: 'Total des intérêts',
    consentLabel: 'J\'accepte la politique de confidentialité et autorise CréditNovo ainsi que ses partenaires bancaires européens à étudier ma demande.',
    consentTitle: 'Consentement RGPD obligatoire * :',
    marketingLabel: 'Je souhaite recevoir le suivi de mon dossier et les offres promotionnelles par email.',
    marketingTitle: 'Communications & Suivi (facultatif) :',
    attachedDocsRecap: 'Documents joints :',
    sumType: 'Type :',
    sumPurpose: 'Objet :',
    sumAmount: 'Montant :',
    sumMonths: 'Durée :',
    sumMonthly: 'Mensualité :',
    sumRate: 'Taux :',
    sumApplicant: 'Demandeur :',
    sumEmail: 'Email :',
    sumPhone: 'Téléphone :',
    sumResidence: 'Résidence :',
    sumEmployment: 'Emploi :',
    sumCompany: 'Entreprise :',
    sumIncome: 'Revenu net :',
    sumHousing: 'Logement :',
    sumIban: 'IBAN :',

    monthUnit: 'mois',
    yearUnit: 'ans',

    analysisTitle: 'Analyse de votre dossier en cours',
    analysisSteps: [
      'Vérification des critères d\'éligibilité et du profil...',
      'Interrogation des barèmes bancaires partenaires...',
      'Édition de votre accord de principe certifié...',
    ],
    analysisSecurity: 'Traitement sécurisé et chiffré aux normes bancaires',

    promoBadge: 'Taux promotionnel garanti 30 jours',
    realtimeSimulation: 'Simulation en temps réel',
    yourAdvisor: 'Sarah Dumont',
    advisorStatus: 'En ligne pour vous accompagner',
    advisorRole: 'Conseillère senior en financement',
    advisorQuote: '« Nous étudions votre dossier en priorité sous 24h avec nos partenaires bancaires européens. »',
    securityTitle: 'Garanties et sécurité',
    security1: 'Données chiffrées & traitées dans l\'UE',
    security2: 'Partenaires bancaires de premier plan',
    security3: 'Réponse sous 1 jour ouvré',
    security4: 'Étude 100% gratuite & sans engagement',

    successTitle: 'Votre dossier a été validé avec succès !',
    successSubtitle: 'Un accord de principe favorable a été émis pour votre demande.',
    referenceLabel: 'Référence de votre dossier',
    statusAgreed: 'Accord de principe immédiat',
    whatsappButton: 'Transmettre mon dossier par WhatsApp',
    whatsappHint: 'Cliquez pour envoyer directement votre récapitulatif à notre conseiller dédié (+34 742 08 48 22)',
    emailButton: 'Recevoir le récapitulatif par Email',
    copyRef: 'Copier la référence',
    copied: 'Copié !',
    whatsappPriorityTitle: 'Transmission prioritaire WhatsApp',
    whatsappPriorityDesc: 'Votre conseiller dédié vous répond immédiatement au',
    copySummaryBtn: 'Copier le récapitulatif',
    printDocBtn: 'Imprimer le dossier',
    recapTitle: 'Synthèse du dossier enregistré',
    newSimulationBtn: 'Nouvelle simulation',
  },

  en: {
    pageTitle: 'Online Loan Application',
    pageSubtitle: 'Complete your application in 4 simple steps and receive your certified pre-approval immediately.',
    badgeFast: 'Express European Financing · Response within 24h',
    stepIndicator: 'Step',
    stepOf: 'of 4',
    noCommitment: 'No commitment',
    footerDisclaimer: 'CréditNovo — Simulation and support for personal and business financing.',
    footerLegal: 'A loan commits you and must be repaid. Check your repayment capacity before committing. Direct WhatsApp assistance at +34 742 08 48 22.',

    step1Title: 'Your loan',
    step2Title: 'Your identity',
    step3Title: 'Your situation',
    step4Title: 'Summary',

    previous: 'Previous',
    next: 'Continue',
    submit: 'Submit my application',
    loadingText: 'Analyzing and validating your application...',

    kindLabel: 'Financing type',
    personalLoan: 'Personal loan',
    personalLoanDesc: 'Car, home renovation, personal projects & cash flow',
    proLoan: 'Business loan',
    proLoanDesc: 'Equipment, working capital, inventory & company growth',
    purposeLabel: 'Financing purpose',
    amountLabel: 'Requested amount',
    monthsLabel: 'Repayment term',
    minAmount: 'Min. 1,000',
    maxAmount: 'Max. 75,000',
    minMonths: '18 months',
    maxMonths: '84 months',
    presetAmounts: 'Frequent amounts:',
    presetMonths: 'Suggested terms:',
    amountRangeHint: 'From 1,000 to 75,000 (steps of 500)',
    monthsRangeHint: 'From 18 to 84 months (steps of 6 months)',
    step1BannerTitle: 'Tailored financing for personal and business projects',

    civilityLabel: 'Title',
    civilities: ['Ms.', 'Mr.', 'Other'],
    firstNameLabel: 'First name',
    firstNamePlaceholder: 'John',
    lastNameLabel: 'Last name',
    lastNamePlaceholder: 'Smith',
    emailLabel: 'Email address',
    phoneLabel: 'Mobile phone',
    birthLabel: 'Date of birth',
    birthAgeNotice: 'You must be between 18 and 90 years old.',
    countryLabel: 'Country of residence',
    cityLabel: 'City',

    employmentLabel: 'Employment status',
    seniorityLabel: 'Job tenure',
    incomeLabel: 'Monthly net income',
    incomeMinHint: 'Minimum 300',
    chargesLabel: 'Monthly expenses (rent, existing loans)',
    chargesOptionalHint: 'Optional (rent or ongoing credits)',
    housingLabel: 'Housing situation',
    ibanLabel: 'Disbursement IBAN (optional)',
    ibanHelp: 'To speed up the payout upon final contract approval.',
    proCompanyLabel: 'Company name',
    proSiretLabel: 'Company tax ID / Registration number',
    proCompanySection: 'Company Information (Business Loan)',
    debtRatioTitle: 'Estimated debt-to-income ratio',
    debtRatioGood: 'Healthy debt ratio (under 40%). Favorable credit profile.',
    debtRatioHigh: 'Caution: debt ratio exceeds 40%. Consider a longer duration to reduce monthly payments.',
    docsTitle: 'Supporting documents (optional)',
    docsNote: 'Optional right now. Proof of identity and income can be uploaded securely after instant pre-approval.',
    uploadIdRecto: 'ID / Passport (front)',
    uploadIdVerso: 'ID / Passport (back)',
    uploadIncome: 'Proof of income / payslip',
    chooseFile: 'Select file',
    fileSelected: 'File selected',
    removeFile: 'Remove',
    fileTooLarge: 'File exceeds maximum size (10 MB).',
    fileFormatError: 'Unsupported format. Allowed: JPG, PNG, PDF.',

    summaryTitle: 'Review your application',
    summarySubtitle: 'Check your information before receiving your immediate pre-approval.',
    summaryGuarantee: 'Upon submission, an official pre-approval is issued immediately with direct transmission to your dedicated advisor on WhatsApp.',
    loanDetails: 'Financing details',
    borrowerDetails: 'Applicant information',
    monthlyPayment: 'Estimated monthly payment',
    tann: 'Fixed Annual Rate (APR base)',
    taeg: 'Fixed APR',
    totalCost: 'Total amount repayable',
    totalInterest: 'Total interest',
    consentLabel: 'I accept the privacy policy and authorize CréditNovo and its European banking partners to process my application.',
    consentTitle: 'Mandatory GDPR consent * :',
    marketingLabel: 'I wish to receive status updates and promotional offers by email.',
    marketingTitle: 'Communications & Follow-up (optional) :',
    attachedDocsRecap: 'Attached documents:',
    sumType: 'Type:',
    sumPurpose: 'Purpose:',
    sumAmount: 'Amount:',
    sumMonths: 'Term:',
    sumMonthly: 'Monthly payment:',
    sumRate: 'Interest rate:',
    sumApplicant: 'Applicant:',
    sumEmail: 'Email:',
    sumPhone: 'Phone:',
    sumResidence: 'Residence:',
    sumEmployment: 'Employment:',
    sumCompany: 'Company:',
    sumIncome: 'Net income:',
    sumHousing: 'Housing:',
    sumIban: 'IBAN:',

    monthUnit: 'months',
    yearUnit: 'years',

    analysisTitle: 'Processing your application',
    analysisSteps: [
      'Checking eligibility criteria and credit profile...',
      'Matching optimal banking terms with partner networks...',
      'Generating your certified pre-approval agreement...',
    ],
    analysisSecurity: 'Secure processing encrypted to European banking standards',

    promoBadge: 'Promotional rate guaranteed for 30 days',
    realtimeSimulation: 'Real-time simulation',
    yourAdvisor: 'Sarah Dumont',
    advisorStatus: 'Online and ready to assist',
    advisorRole: 'Senior European Financing Advisor',
    advisorQuote: '« We prioritize your application and follow up within 24h with our European banking partners. »',
    securityTitle: 'Guarantees & Security',
    security1: 'Data encrypted and hosted in the EU',
    security2: 'Authorized EU banking partners',
    security3: 'Response within 1 business day',
    security4: '100% free and without obligation',

    successTitle: 'Your application has been pre-approved!',
    successSubtitle: 'A favorable pre-approval has been issued for your loan request.',
    referenceLabel: 'Application reference',
    statusAgreed: 'Instant pre-approval granted',
    whatsappButton: 'Send file via WhatsApp',
    whatsappHint: 'Click to transmit your full summary directly to your dedicated loan officer (+34 742 08 48 22)',
    emailButton: 'Receive summary by email',
    copyRef: 'Copy reference',
    copied: 'Copied!',
    whatsappPriorityTitle: 'Priority WhatsApp transmission',
    whatsappPriorityDesc: 'Your dedicated advisor is available immediately at',
    copySummaryBtn: 'Copy summary',
    printDocBtn: 'Print application',
    recapTitle: 'Summary of recorded application',
    newSimulationBtn: 'New simulation',
  },

  de: {
    pageTitle: 'Online-Kreditantrag',
    pageSubtitle: 'Stellen Sie Ihren Antrag in 4 Schritten und erhalten Sie sofort eine Vorabgenehmigung.',
    badgeFast: 'Express-Finanzierung in Europa · Antwort in 24h',
    stepIndicator: 'Schritt',
    stepOf: 'von 4',
    noCommitment: 'Unverbindlich',
    footerDisclaimer: 'CréditNovo — Simulation und Vermittlung von Privat- und Geschäftskrediten.',
    footerLegal: 'Ein Kredit verpflichtet und muss zurückgezahlt werden. WhatsApp-Hilfe: +34 742 08 48 22.',

    step1Title: 'Ihr Kredit',
    step2Title: 'Ihre Identität',
    step3Title: 'Ihre Situation',
    step4Title: 'Übersicht',

    previous: 'Zurück',
    next: 'Weiter',
    submit: 'Antrag absenden',
    loadingText: 'Prüfung und Validierung Ihrer Unterlagen...',

    kindLabel: 'Finanzierungsart',
    personalLoan: 'Privatkredit',
    personalLoanDesc: 'Auto, Renovierung, Projekte und Liquidität',
    proLoan: 'Geschäftskredit',
    proLoanDesc: 'Ausrüstung, Betriebsmittel und Expansion',
    purposeLabel: 'Verwendungszweck',
    amountLabel: 'Wunschbetrag',
    monthsLabel: 'Laufzeit',
    minAmount: 'Min. 1.000',
    maxAmount: 'Max. 75.000',
    minMonths: '18 Monate',
    maxMonths: '84 Monate',
    presetAmounts: 'Häufige Beträge:',
    presetMonths: 'Empfohlene Laufzeiten:',
    amountRangeHint: 'Von 1.000 bis 75.000 (Schritte zu 500)',
    monthsRangeHint: 'Von 18 bis 84 Monate (Schritte zu 6 Monaten)',
    step1BannerTitle: 'Maßgeschneiderte Finanzierung für persönliche und geschäftliche Projekte',

    civilityLabel: 'Anrede',
    civilities: ['Frau', 'Herr', 'Andere'],
    firstNameLabel: 'Vorname',
    firstNamePlaceholder: 'Thomas',
    lastNameLabel: 'Nachname',
    lastNamePlaceholder: 'Müller',
    emailLabel: 'E-Mail-Adresse',
    phoneLabel: 'Mobiltelefon',
    birthLabel: 'Geburtsdatum',
    birthAgeNotice: 'Sie müssen zwischen 18 und 90 Jahre alt sein.',
    countryLabel: 'Wohnsitzland',
    cityLabel: 'Wohnort',

    employmentLabel: 'Berufliche Situation',
    seniorityLabel: 'Betriebszugehörigkeit',
    incomeLabel: 'Monatliches Nettoeinkommen',
    incomeMinHint: 'Mindestens 300',
    chargesLabel: 'Monatliche Ausgaben (Miete, Raten)',
    chargesOptionalHint: 'Optional (Miete oder laufende Kredite)',
    housingLabel: 'Wohnsituation',
    ibanLabel: 'Auszahlungs-IBAN (optional)',
    ibanHelp: 'Für eine schnelle Auszahlung nach Vertragsabschluss.',
    proCompanyLabel: 'Unternehmensname',
    proSiretLabel: 'Steuernummer / Handelsregisternummer',
    proCompanySection: 'Unternehmensdaten (Geschäftskredit)',
    debtRatioTitle: 'Geschätzte Schuldenquote',
    debtRatioGood: 'Sehr gute Rückzahlungsfähigkeit (unter 40%).',
    debtRatioHigh: 'Achtung: Belastung über 40%. Erhöhen Sie die Laufzeit für kleinere Monatsraten.',
    docsTitle: 'Nachweise (optional)',
    docsNote: 'Optional in diesem Schritt. Ausweis und Gehaltsnachweis können später sicher hochgeladen werden.',
    uploadIdRecto: 'Personalausweis (Vorderseite)',
    uploadIdVerso: 'Personalausweis (Rückseite)',
    uploadIncome: 'Einkommensnachweis',
    chooseFile: 'Datei auswählen',
    fileSelected: 'Datei ausgewählt',
    removeFile: 'Entfernen',
    fileTooLarge: 'Die Datei überschreitet die maximale Größe von 10 MB.',
    fileFormatError: 'Nicht unterstütztes Format. Erlaubt: JPG, PNG, PDF.',

    summaryTitle: 'Überprüfen Sie Ihren Antrag',
    summarySubtitle: 'Prüfen Sie Ihre Angaben vor Erhalt der Vorabgenehmigung.',
    summaryGuarantee: 'Bei Bestätigung erhalten Sie sofort eine offizielle Vorabzusage mit direkter Weiterleitung an Ihren Berater per WhatsApp.',
    loanDetails: 'Finanzierungsdetails',
    borrowerDetails: 'Angaben zum Antragsteller',
    monthlyPayment: 'Geschätzte Monatsrate',
    tann: 'Sollzinssatz (gebunden)',
    taeg: 'Effektiver Jahreszins',
    totalCost: 'Gesamtrückzahlungsbetrag',
    totalInterest: 'Zinsen gesamt',
    consentLabel: 'Ich akzeptiere die Datenschutzbestimmungen und ermächtige CréditNovo und europäische Bankpartner zur Prüfung.',
    consentTitle: 'DSGVO-Zustimmung erforderlich * :',
    marketingLabel: 'Ich möchte Neuigkeiten und Angebote per E-Mail erhalten.',
    marketingTitle: 'Benachrichtigungen (optional) :',
    attachedDocsRecap: 'Angehängte Dokumente:',
    sumType: 'Art:',
    sumPurpose: 'Zweck:',
    sumAmount: 'Betrag:',
    sumMonths: 'Laufzeit:',
    sumMonthly: 'Monatsrate:',
    sumRate: 'Zinssatz:',
    sumApplicant: 'Antragsteller:',
    sumEmail: 'E-Mail:',
    sumPhone: 'Telefon:',
    sumResidence: 'Wohnort:',
    sumEmployment: 'Beruf:',
    sumCompany: 'Firma:',
    sumIncome: 'Nettoeinkommen:',
    sumHousing: 'Wohnen:',
    sumIban: 'IBAN:',

    monthUnit: 'Monate',
    yearUnit: 'Jahre',

    analysisTitle: 'Prüfung Ihres Antrags läuft',
    analysisSteps: [
      'Prüfung der Kriterien und des Kreditprofils...',
      'Abgleich mit aktuellen Bankkonditionen...',
      'Erstellung Ihrer Vorabgenehmigung...',
    ],
    analysisSecurity: 'Sichere Datenübertragung nach Bankenstandard',

    promoBadge: 'Aktionszins 30 Tage garantiert',
    realtimeSimulation: 'Echtzeit-Simulation',
    yourAdvisor: 'Sarah Dumont',
    advisorStatus: 'Online für Sie da',
    advisorRole: 'Senior-Finanzberaterin Europa',
    advisorQuote: '«Wir bearbeiten Ihren Antrag innerhalb von 24 Stunden vorrangig.»',
    securityTitle: 'Sicherheit & Garantien',
    security1: 'Verschlüsselt und in der EU verarbeitet',
    security2: 'Autorisierte EU-Bankpartner',
    security3: 'Antwort innerhalb von 1 Werktag',
    security4: '100% kostenlos und unverbindlich',

    successTitle: 'Ihr Antrag wurde erfolgreich vorgeprüft!',
    successSubtitle: 'Eine positive Grundsatzentscheidung wurde für Ihren Kredit erteilt.',
    referenceLabel: 'Vorgangsnummer',
    statusAgreed: 'Sofortige Vorabgenehmigung erteilt',
    whatsappButton: 'Unterlagen per WhatsApp senden (+34 742 08 48 22)',
    whatsappHint: 'Klicken Sie, um Ihre Zusammenfassung direkt an Ihren Berater zu übermitteln',
    emailButton: 'Zusammenfassung per E-Mail erhalten',
    copyRef: 'Vorgangsnummer kopieren',
    copied: 'Kopiert!',
    whatsappPriorityTitle: 'Prioritäre WhatsApp-Übermittlung',
    whatsappPriorityDesc: 'Ihr persönlicher Berater ist erreichbar unter',
    copySummaryBtn: 'Zusammenfassung kopieren',
    printDocBtn: 'Antrag drucken',
    recapTitle: 'Übersicht des Antrags',
    newSimulationBtn: 'Neue Simulation',
  },

  it: {
    pageTitle: 'Richiesta di Prestito Online',
    pageSubtitle: 'Completa la richiesta in 4 passaggi e ricevi subito un pre-accordo certificato.',
    badgeFast: 'Finanziamenti Rapidi in Europa · Risposta in 24h',
    stepIndicator: 'Passo',
    stepOf: 'di 4',
    noCommitment: 'Senza impegno',
    footerDisclaimer: 'CréditNovo — Simulazione e supporto per finanziamenti personali e professionali.',
    footerLegal: 'Il credito ti impegna e deve essere restituito. Verifica la tua capacità di rimborso. WhatsApp: +34 742 08 48 22.',

    step1Title: 'Il tuo prestito',
    step2Title: 'I tuoi dati',
    step3Title: 'La tua situazione',
    step4Title: 'Riepilogo',

    previous: 'Indietro',
    next: 'Continua',
    submit: 'Invia richiesta',
    loadingText: 'Analisi e valutazione della richiesta...',

    kindLabel: 'Tipo di finanziamento',
    personalLoan: 'Prestito personale',
    personalLoanDesc: 'Auto, ristrutturazioni, progetti personali e liquidità',
    proLoan: 'Prestito aziendale',
    proLoanDesc: 'Attrezzature, liquidità d\'impresa ed espansione',
    purposeLabel: 'Finalità del prestito',
    amountLabel: 'Importo richiesto',
    monthsLabel: 'Durata del rimborso',
    minAmount: 'Min. 1.000',
    maxAmount: 'Max. 75.000',
    minMonths: '18 mesi',
    maxMonths: '84 mesi',
    presetAmounts: 'Importi frequenti:',
    presetMonths: 'Durate suggerite:',
    amountRangeHint: 'Da 1.000 a 75.000 (a passi di 500)',
    monthsRangeHint: 'Da 18 a 84 mesi (intervalli di 6 mesi)',
    step1BannerTitle: 'Finanziamenti su misura per i tuoi progetti personali e d\'impresa',

    civilityLabel: 'Titolo',
    civilities: ['Sig.ra', 'Sig.', 'Altro'],
    firstNameLabel: 'Nome',
    firstNamePlaceholder: 'Marco',
    lastNameLabel: 'Cognome',
    lastNamePlaceholder: 'Rossi',
    emailLabel: 'Indirizzo email',
    phoneLabel: 'Cellulare',
    birthLabel: 'Data di nascita',
    birthAgeNotice: 'Devi avere tra 18 e 90 anni.',
    countryLabel: 'Paese di residenza',
    cityLabel: 'Città di residenza',

    employmentLabel: 'Situazione lavorativa',
    seniorityLabel: 'Anzianità lavorativa',
    incomeLabel: 'Reddito netto mensile',
    incomeMinHint: 'Minimo 300',
    chargesLabel: 'Spese mensili (affitto, prestiti)',
    chargesOptionalHint: 'Facoltativo (affitto o rate in corso)',
    housingLabel: 'Situazione abitativa',
    ibanLabel: 'IBAN di accredito (facoltativo)',
    ibanHelp: 'Per velocizzare l\'erogazione dopo l\'approvazione definitiva.',
    proCompanyLabel: 'Ragione sociale',
    proSiretLabel: 'Partita IVA / Codice Fiscale azienda',
    proCompanySection: 'Dati Aziendali (Prestito Professionale)',
    debtRatioTitle: 'Tasso di indebitamento stimato',
    debtRatioGood: 'Ottima capacità di rimborso (sotto il 40%). Profilo favorevole.',
    debtRatioHigh: 'Attenzione: indebitamento superiore al 40%. Allunga la durata per ridurre la rata mensile.',
    docsTitle: 'Documenti allegati (facoltativi)',
    docsNote: 'Facoltativo in questa fase. Documento d\'identità e busta paga saranno richiesti in seguito via canale sicuro.',
    uploadIdRecto: 'Documento d\'identità (fronte)',
    uploadIdVerso: 'Documento d\'identità (retro)',
    uploadIncome: 'Busta paga / dichiarazione redditi',
    chooseFile: 'Seleziona file',
    fileSelected: 'File selezionato',
    removeFile: 'Rimuovi',
    fileTooLarge: 'Il file supera la dimensione massima consentita (10 MB).',
    fileFormatError: 'Formato non supportato. Consentiti: JPG, PNG, PDF.',

    summaryTitle: 'Controlla la tua richiesta',
    summarySubtitle: 'Verifica i tuoi dati prima di ricevere il pre-accordo immediato.',
    summaryGuarantee: 'Alla conferma, viene emesso immediatamente un pre-accordo ufficiale con trasmissione diretta al consulente via WhatsApp.',
    loanDetails: 'Dettagli del finanziamento',
    borrowerDetails: 'Dati del richiedente',
    monthlyPayment: 'Rata mensile stimata',
    tann: 'Tasso Annuo Nominale (TAN)',
    taeg: 'TAEG fisso',
    totalCost: 'Totale da rimborsare',
    totalInterest: 'Interessi complessivi',
    consentLabel: 'Accetto l\'informativa sulla privacy e autorizzo CréditNovo e i partner bancari ad esaminare la richiesta.',
    consentTitle: 'Consenso GDPR obbligatorio * :',
    marketingLabel: 'Desidero ricevere aggiornamenti e offerte via email.',
    marketingTitle: 'Comunicazioni facoltative :',
    attachedDocsRecap: 'Documenti allegati:',
    sumType: 'Tipo:',
    sumPurpose: 'Finalità:',
    sumAmount: 'Importo:',
    sumMonths: 'Durata:',
    sumMonthly: 'Rata mensile:',
    sumRate: 'Tasso:',
    sumApplicant: 'Richiedente:',
    sumEmail: 'Email:',
    sumPhone: 'Telefono:',
    sumResidence: 'Residenza:',
    sumEmployment: 'Occupazione:',
    sumCompany: 'Azienda:',
    sumIncome: 'Reddito netto:',
    sumHousing: 'Abitazione:',
    sumIban: 'IBAN:',

    monthUnit: 'mesi',
    yearUnit: 'anni',

    analysisTitle: 'Analisi della richiesta in corso',
    analysisSteps: [
      'Verifica dei criteri di ammissibilità e profilo creditizio...',
      'Consultazione dei tassi bancari preferenziali...',
      'Emissione del pre-accordo di finanziamento certificato...',
    ],
    analysisSecurity: 'Elaborazione sicura e crittografata con standard bancari',

    promoBadge: 'Tasso promozionale bloccato per 30 giorni',
    realtimeSimulation: 'Simulazione in tempo reale',
    yourAdvisor: 'Sarah Dumont',
    advisorStatus: 'Online per assisterti',
    advisorRole: 'Consulente senior in finanziamenti europei',
    advisorQuote: '«Esaminiamo la tua pratica con priorità entro 24 ore.»',
    securityTitle: 'Garanzie e sicurezza',
    security1: 'Dati protetti ed elaborati nell\'UE',
    security2: 'Partner bancari autorizzati nell\'UE',
    security3: 'Risposta entro 1 giorno lavorativo',
    security4: '100% gratuito e senza impegno',

    successTitle: 'La tua richiesta è stata validata con successo!',
    successSubtitle: 'È stato rilasciato un pre-accordo favorevole per il tuo prestito.',
    referenceLabel: 'Codice pratica',
    statusAgreed: 'Pre-accordo immediato rilasciato',
    whatsappButton: 'Invia pratica su WhatsApp (+34 742 08 48 22)',
    whatsappHint: 'Clicca per trasmettere il riepilogo direttamente al consulente',
    emailButton: 'Ricevi riepilogo via Email',
    copyRef: 'Copia riferimento',
    copied: 'Copiato!',
    whatsappPriorityTitle: 'Trasmissione prioritaria via WhatsApp',
    whatsappPriorityDesc: 'Il tuo consulente dedicato risponde subito al',
    copySummaryBtn: 'Copia riepilogo',
    printDocBtn: 'Stampa pratica',
    recapTitle: 'Sintesi della pratica registrata',
    newSimulationBtn: 'Nuova simulazione',
  },

  pt: {
    pageTitle: 'Pedido de Crédito Online',
    pageSubtitle: 'Complete o seu pedido em 4 passos simples e receba de imediato a sua pré-aprovação certificada.',
    badgeFast: 'Financiamento Rápido na Europa · Resposta em 24h',
    stepIndicator: 'Passo',
    stepOf: 'de 4',
    noCommitment: 'Sem compromisso',
    footerDisclaimer: 'CréditNovo — Simulação e apoio a financiamentos particulares e empresariais.',
    footerLegal: 'O crédito compromete-o e deve ser reembolsado. Verifique a sua capacidade de reembolso. Apoio direto por WhatsApp: +34 742 08 48 22.',

    step1Title: 'O seu crédito',
    step2Title: 'A sua identidade',
    step3Title: 'A sua situação',
    step4Title: 'Resumo',

    previous: 'Anterior',
    next: 'Continuar',
    submit: 'Enviar pedido',
    loadingText: 'Análise e validação do seu pedido...',

    kindLabel: 'Tipo de financiamento',
    personalLoan: 'Crédito pessoal',
    personalLoanDesc: 'Automóvel, remodelações, projetos e liquidez',
    proLoan: 'Crédito profissional',
    proLoanDesc: 'Equipamento, tesouraria, compras e expansão do negócio',
    purposeLabel: 'Finalidade do financiamento',
    amountLabel: 'Montante pretendido',
    monthsLabel: 'Prazo de reembolso',
    minAmount: 'Mín. 1 000',
    maxAmount: 'Máx. 75 000',
    minMonths: '18 meses',
    maxMonths: '84 meses',
    presetAmounts: 'Montantes habituais:',
    presetMonths: 'Prazos sugeridos:',
    amountRangeHint: 'De 1 000 a 75 000 (intervalos de 500)',
    monthsRangeHint: 'De 18 a 84 meses (intervalos de 6 meses)',
    step1BannerTitle: 'Financiamento adaptado aos seus projetos pessoais e empresariais',

    civilityLabel: 'Título',
    civilities: ['Sra.', 'Sr.', 'Outro'],
    firstNameLabel: 'Nome próprio',
    firstNamePlaceholder: 'João',
    lastNameLabel: 'Apelido',
    lastNamePlaceholder: 'Silva',
    emailLabel: 'Correio eletrónico',
    phoneLabel: 'Telemóvel',
    birthLabel: 'Data de nascimento',
    birthAgeNotice: 'Deve ter entre 18 e 90 anos.',
    countryLabel: 'País de residência',
    cityLabel: 'Cidade de residência',

    employmentLabel: 'Situação profissional',
    seniorityLabel: 'Antiguidade profissional',
    incomeLabel: 'Rendimento líquido mensal',
    incomeMinHint: 'Mínimo 300',
    chargesLabel: 'Despesas mensais (renda, créditos)',
    chargesOptionalHint: 'Opcional (renda ou créditos em vigor)',
    housingLabel: 'Situação habitacional',
    ibanLabel: 'IBAN para transferência (opcional)',
    ibanHelp: 'Para acelerar a disponibilização do montante após aprovação.',
    proCompanyLabel: 'Nome da empresa',
    proSiretLabel: 'NIF da empresa',
    proCompanySection: 'Dados da Empresa (Crédito Profissional)',
    debtRatioTitle: 'Taxa de esforço estimada',
    debtRatioGood: 'Excelente capacidade de reembolso (inferior a 40%). Perfil favorável.',
    debtRatioHigh: 'Atenção: taxa de esforço superior a 40%. Aumente o prazo para reduzir a prestação.',
    docsTitle: 'Documentos comprovativos (opcionais)',
    docsNote: 'Opcional nesta fase. A identificação e comprovativos serão pedidos após pré-aprovação por canal seguro.',
    uploadIdRecto: 'Cartão de Cidadão (frente)',
    uploadIdVerso: 'Cartão de Cidadão (verso)',
    uploadIncome: 'Comprovativo de rendimentos',
    chooseFile: 'Selecionar ficheiro',
    fileSelected: 'Ficheiro selecionado',
    removeFile: 'Eliminar',
    fileTooLarge: 'O ficheiro excede o tamanho máximo (10 MB).',
    fileFormatError: 'Formato não suportado. Formatos válidos: JPG, PNG, PDF.',

    summaryTitle: 'Verifique o seu pedido',
    summarySubtitle: 'Reveja os seus dados antes de receber a sua pré-aprovação imediata.',
    summaryGuarantee: 'Ao confirmar, recebe imediatamente um parecer favorável oficial com envio direto ao seu gestor por WhatsApp.',
    loanDetails: 'Detalhes do crédito',
    borrowerDetails: 'Dados do requerente',
    monthlyPayment: 'Prestação mensal estimada',
    tann: 'Taxa de Juro Nominal (TAN)',
    taeg: 'TAEG fixa',
    totalCost: 'Montante Total Imputado ao Consumidor (MTIC)',
    totalInterest: 'Total de juros',
    consentLabel: 'Aceito a política de privacidade e autorizo a CréditNovo e parceiros bancários a analisar o meu processo.',
    consentTitle: 'Consentimento RGPD obrigatório * :',
    marketingLabel: 'Desejo receber novidades e ofertas promocionais por email.',
    marketingTitle: 'Comunicações e acompanhamento (opcional) :',
    attachedDocsRecap: 'Documentos anexos:',
    sumType: 'Tipo:',
    sumPurpose: 'Finalidade:',
    sumAmount: 'Montante:',
    sumMonths: 'Prazo:',
    sumMonthly: 'Prestação mensal:',
    sumRate: 'Taxa de juro:',
    sumApplicant: 'Requerente:',
    sumEmail: 'Email:',
    sumPhone: 'Telefone:',
    sumResidence: 'Residência:',
    sumEmployment: 'Profissão:',
    sumCompany: 'Empresa:',
    sumIncome: 'Rendimento líquido:',
    sumHousing: 'Habitação:',
    sumIban: 'IBAN:',

    monthUnit: 'meses',
    yearUnit: 'anos',

    analysisTitle: 'Análise do processo em curso',
    analysisSteps: [
      'Verificação dos critérios e do perfil financeiro...',
      'Consulta das melhores condições bancárias parceiras...',
      'Emissão da sua pré-aprovação oficial...',
    ],
    analysisSecurity: 'Processamento seguro e encriptado com normas bancárias',

    promoBadge: 'Taxa promocional garantida por 30 dias',
    realtimeSimulation: 'Simulação em tempo real',
    yourAdvisor: 'Sarah Dumont',
    advisorStatus: 'Online para o apoiar',
    advisorRole: 'Consultora sénior de crédito',
    advisorQuote: '«Analisamos o seu processo de forma prioritária em 24h.»',
    securityTitle: 'Garantias e segurança',
    security1: 'Dados encriptados e tratados na UE',
    security2: 'Parceiros bancários autorizados na UE',
    security3: 'Resposta em 1 dia útil',
    security4: '100% gratuito e sem compromisso',

    successTitle: 'O seu pedido foi pré-aprovado com sucesso!',
    successSubtitle: 'Foi emitido um parecer prévio favorável para o seu crédito.',
    referenceLabel: 'Referência do processo',
    statusAgreed: 'Parecer favorável imediato',
    whatsappButton: 'Enviar processo pelo WhatsApp (+34 742 08 48 22)',
    whatsappHint: 'Clique para enviar diretamente o seu processo ao gestor dedicado',
    emailButton: 'Receber resumo por Email',
    copyRef: 'Copiar referência',
    copied: 'Copiado!',
    whatsappPriorityTitle: 'Transmissão prioritária WhatsApp',
    whatsappPriorityDesc: 'O seu gestor dedicado responde imediatamente no',
    copySummaryBtn: 'Copiar resumo',
    printDocBtn: 'Imprimir processo',
    recapTitle: 'Síntese do processo registado',
    newSimulationBtn: 'Nova simulação',
  },
};

// Localized option helpers
export function getLocalizedPurposes(lang: Lang, kind: 'personnel' | 'professionnel') {
  if (kind === 'personnel') {
    return [
      {
        id: 'travaux',
        icon: 'Hammer',
        label: lang === 'es' ? 'Obras y reformas' : lang === 'fr' ? 'Travaux & rénovation' : lang === 'en' ? 'Home renovation' : lang === 'de' ? 'Renovierung' : lang === 'it' ? 'Ristrutturazioni' : 'Obras e remodelações',
      },
      {
        id: 'auto',
        icon: 'Car',
        label: lang === 'es' ? 'Coche / moto' : lang === 'fr' ? 'Voiture / moto' : lang === 'en' ? 'Car / motorbike' : lang === 'de' ? 'Auto / Motorrad' : lang === 'it' ? 'Auto / moto' : 'Carro / mota',
      },
      {
        id: 'regroupement',
        icon: 'Layers',
        label: lang === 'es' ? 'Reunificación de deudas' : lang === 'fr' ? 'Regroupement de crédits' : lang === 'en' ? 'Debt consolidation' : lang === 'de' ? 'Umschuldung' : lang === 'it' ? 'Consolidamento debiti' : 'Consolidação de créditos',
      },
      {
        id: 'etudes',
        icon: 'GraduationCap',
        label: lang === 'es' ? 'Estudios y formación' : lang === 'fr' ? 'Études & formation' : lang === 'en' ? 'Studies & training' : lang === 'de' ? 'Studium & Bildung' : lang === 'it' ? 'Studi e formazione' : 'Estudos e formação',
      },
      {
        id: 'voyage',
        icon: 'Plane',
        label: lang === 'es' ? 'Viajes y ocio' : lang === 'fr' ? 'Voyage & loisirs' : lang === 'en' ? 'Travel & leisure' : lang === 'de' ? 'Reisen & Freizeit' : lang === 'it' ? 'Viaggi e tempo libero' : 'Viagens e lazer',
      },
      {
        id: 'sante',
        icon: 'HeartPulse',
        label: lang === 'es' ? 'Salud e imprevistos' : lang === 'fr' ? 'Santé & imprévus' : lang === 'en' ? 'Health & emergencies' : lang === 'de' ? 'Gesundheit' : lang === 'it' ? 'Salute e imprevisti' : 'Saúde e imprevistos',
      },
    ];
  }

  return [
    {
      id: 'tresorerie',
      icon: 'Coins',
      label: lang === 'es' ? 'Tesorería y liquidez' : lang === 'fr' ? 'Trésorerie' : lang === 'en' ? 'Cash flow & liquidity' : lang === 'de' ? 'Liquidität' : lang === 'it' ? 'Liquidità aziendale' : 'Tesouraria',
    },
    {
      id: 'equipement',
      icon: 'Cpu',
      label: lang === 'es' ? 'Equipamiento y maquinaria' : lang === 'fr' ? 'Équipement & matériel' : lang === 'en' ? 'Equipment & machinery' : lang === 'de' ? 'Ausrüstung' : lang === 'it' ? 'Attrezzature' : 'Equipamento e máquinas',
    },
    {
      id: 'local',
      icon: 'Store',
      label: lang === 'es' ? 'Local comercial u oficina' : lang === 'fr' ? 'Local commercial' : lang === 'en' ? 'Commercial premises' : lang === 'de' ? 'Gewerberaum' : lang === 'it' ? 'Locale commerciale' : 'Espaço comercial',
    },
    {
      id: 'stock',
      icon: 'Boxes',
      label: lang === 'es' ? 'Compra de existencias' : lang === 'fr' ? 'Achat de stock' : lang === 'en' ? 'Stock & inventory' : lang === 'de' ? 'Warenbestand' : lang === 'it' ? 'Acquisto scorte' : 'Compra de existências',
    },
    {
      id: 'recrutement',
      icon: 'Users',
      label: lang === 'es' ? 'Contratación de personal' : lang === 'fr' ? 'Recrutement' : lang === 'en' ? 'Hiring & staff' : lang === 'de' ? 'Personal' : lang === 'it' ? 'Assunzioni' : 'Contratação',
    },
    {
      id: 'croissance',
      icon: 'TrendingUp',
      label: lang === 'es' ? 'Crecimiento y expansión' : lang === 'fr' ? 'Développement' : lang === 'en' ? 'Business growth' : lang === 'de' ? 'Wachstum' : lang === 'it' ? 'Sviluppo' : 'Crescimento',
    },
  ];
}

export function getLocalizedEmployment(lang: Lang) {
  return [
    {
      id: 'cdi',
      label: lang === 'es' ? 'Indefinido' : lang === 'fr' ? 'CDI' : lang === 'en' ? 'Permanent' : lang === 'de' ? 'Unbefristet' : lang === 'it' ? 'Tempo indeterminato' : 'Sem termo',
      desc: lang === 'es' ? 'Contrato indefinido' : lang === 'fr' ? 'Contrat à durée indéterminée' : lang === 'en' ? 'Permanent contract' : lang === 'de' ? 'Festanstellung' : lang === 'it' ? 'Contratto a tempo indeterminato' : 'Contrato sem termo',
    },
    {
      id: 'cdd',
      label: lang === 'es' ? 'Temporal / Obra' : lang === 'fr' ? 'CDD / Intérim' : lang === 'en' ? 'Fixed-term' : lang === 'de' ? 'Befristet' : lang === 'it' ? 'Tempo determinato' : 'A termo',
      desc: lang === 'es' ? 'Contrato temporal o interinidad' : lang === 'fr' ? 'Mission ou contrat temporaire' : lang === 'en' ? 'Temporary contract' : lang === 'de' ? 'Projekt- oder Zeitarbeit' : lang === 'it' ? 'Lavoro temporaneo' : 'Contrato temporário',
    },
    {
      id: 'independant',
      label: lang === 'es' ? 'Autónomo' : lang === 'fr' ? 'Indépendant' : lang === 'en' ? 'Self-employed' : lang === 'de' ? 'Selbstständig' : lang === 'it' ? 'Autonomo' : 'Independente',
      desc: lang === 'es' ? 'Profesional por cuenta propia' : lang === 'fr' ? 'Artisan, libéral, gérant' : lang === 'en' ? 'Freelancer or business owner' : lang === 'de' ? 'Freiberufler oder Unternehmer' : lang === 'it' ? 'Libero professionista' : 'Trabalhador independente',
    },
    {
      id: 'fonctionnaire',
      label: lang === 'es' ? 'Funcionario' : lang === 'fr' ? 'Fonctionnaire' : lang === 'en' ? 'Civil servant' : lang === 'de' ? 'Beamter' : lang === 'it' ? 'Dipendente pubblico' : 'Funcionário público',
      desc: lang === 'es' ? 'Empleado público con plaza' : lang === 'fr' ? 'Agent titulaire de la fonction publique' : lang === 'en' ? 'Public sector employee' : lang === 'de' ? 'Öffentlicher Dienst' : lang === 'it' ? 'Pubblica amministrazione' : 'Função pública',
    },
    {
      id: 'retraite',
      label: lang === 'es' ? 'Jubilado' : lang === 'fr' ? 'Retraité' : lang === 'en' ? 'Retired' : lang === 'de' ? 'Ruheständler' : lang === 'it' ? 'Pensionato' : 'Reformado',
      desc: lang === 'es' ? 'Pensión contributiva' : lang === 'fr' ? 'Pensions de retraite' : lang === 'en' ? 'Retirement pension' : lang === 'de' ? 'Rente oder Pension' : lang === 'it' ? 'Pensione di anzianità' : 'Pensão de reforma',
    },
    {
      id: 'autre',
      label: lang === 'es' ? 'Otra situación' : lang === 'fr' ? 'Autre situation' : lang === 'en' ? 'Other' : lang === 'de' ? 'Sonstige' : lang === 'it' ? 'Altra situazione' : 'Outra situação',
      desc: lang === 'es' ? 'Estudiante, sin actividad, etc.' : lang === 'fr' ? 'Étudiant, sans activité, etc.' : lang === 'en' ? 'Student, between jobs, etc.' : lang === 'de' ? 'Student, Übergang etc.' : lang === 'it' ? 'Studente o altro' : 'Estudante ou outra',
    },
  ];
}

export function getLocalizedSeniority(lang: Lang) {
  if (lang === 'es') {
    return ['Menos de 1 año', '1 a 3 años', '3 a 5 años', 'Más de 5 años'];
  }
  if (lang === 'en') {
    return ['Less than 1 year', '1 to 3 years', '3 to 5 years', 'Over 5 years'];
  }
  if (lang === 'de') {
    return ['Weniger als 1 Jahr', '1 bis 3 Jahre', '3 bis 5 Jahre', 'Mehr als 5 Jahre'];
  }
  if (lang === 'it') {
    return ['Meno di 1 anno', 'Da 1 a 3 anni', 'Da 3 a 5 anni', 'Più di 5 anni'];
  }
  if (lang === 'pt') {
    return ['Menos de 1 ano', '1 a 3 anos', '3 a 5 anos', 'Mais de 5 anos'];
  }
  return ["Moins d'1 an", '1 à 3 ans', '3 à 5 ans', 'Plus de 5 ans'];
}

export function getLocalizedHousing(lang: Lang) {
  if (lang === 'es') {
    return ['Inquilino / Alquiler', 'Propietario', 'Con familiares / Alojado', 'Vivienda de empresa'];
  }
  if (lang === 'en') {
    return ['Tenant / Renting', 'Homeowner', 'Living with family', 'Company accommodation'];
  }
  if (lang === 'de') {
    return ['Mieter', 'Eigentümer', 'Bei Angehörigen', 'Dienstwohnung'];
  }
  if (lang === 'it') {
    return ['Inquilino in affitto', 'Proprietario', 'Ospitato / Con familiari', 'Alloggio di servizio'];
  }
  if (lang === 'pt') {
    return ['Arrendatário / Inquilino', 'Proprietário', 'Em casa de familiares', 'Habitação de função'];
  }
  return ['Locataire', 'Propriétaire', 'Hébergé', 'Logement de fonction'];
}
