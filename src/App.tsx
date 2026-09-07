import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Send, ShieldCheck, CheckCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Stepper from './components/Stepper';
import LoanSidebar from './components/LoanSidebar';
import Step1Loan from './components/Step1Loan';
import Step2Identity from './components/Step2Identity';
import Step3Situation from './components/Step3Situation';
import Step4Summary from './components/Step4Summary';
import AnalysisModal from './components/AnalysisModal';
import ConfirmationScreen from './components/ConfirmationScreen';

import { FormData, ValidationErrors } from './types';
import { getInitialFormData, calculateLoan, INITIAL_FORM_STATE } from './data';
import { validateStep2, validateStep3, validateStep4 } from './lib/validate';
import { translations, Lang } from './lib/content';
import { COUNTRIES } from './lib/locale';

export default function App() {
  const [form, setForm] = useState<FormData>(() => getInitialFormData());
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxAccessibleStep, setMaxAccessibleStep] = useState<number>(1);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [referenceNumber, setReferenceNumber] = useState<string>('');

  // Language state: defaults to Spanish ('es')
  const [lang, setLang] = useState<Lang>('es');

  const t = translations[lang] || translations.es;

  // Real-time calculated simulation based on current amount and months
  const simulation = useMemo(() => {
    return calculateLoan(form.amount, form.months, form.profile);
  }, [form.amount, form.months, form.profile]);

  // Update form fields
  const handleFormChange = (updates: Partial<FormData>) => {
    setForm((prev) => {
      const next = { ...prev, ...updates };

      // If user changed country, update language if user hasn't changed it or adapt
      if (updates.country && updates.country !== prev.country) {
        const targetLang = COUNTRIES[updates.country]?.lang as Lang;
        if (targetLang && translations[targetLang]) {
          setLang(targetLang);
        }
      }

      return next;
    });

    // Clear matching errors for updated fields
    if (Object.keys(errors).length > 0) {
      setErrors((prevErrors) => {
        const nextErrors = { ...prevErrors };
        Object.keys(updates).forEach((key) => {
          delete nextErrors[key as keyof FormData];
        });
        return nextErrors;
      });
    }
  };

  // Next Step validation & transition
  const handleNext = () => {
    let currentStepErrors: ValidationErrors = {};

    if (currentStep === 1) {
      // Step 1 has no blocking validation per specification
      currentStepErrors = {};
    } else if (currentStep === 2) {
      currentStepErrors = validateStep2(form, lang);
    } else if (currentStep === 3) {
      currentStepErrors = validateStep3(form, lang);
    } else if (currentStep === 4) {
      currentStepErrors = validateStep4(form, lang);
    }

    if (Object.keys(currentStepErrors).length > 0) {
      setErrors(currentStepErrors);
      // Scroll to top of form card on error
      const formCard = document.getElementById('form-container');
      if (formCard) {
        formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // Clear errors
    setErrors({});

    if (currentStep < 4) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setMaxAccessibleStep((prev) => Math.max(prev, nextStep));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      // Step 4: Submit application!
      // Generate stable reference NOVO-XXXXXX
      const randomCode = Math.floor(100000 + Math.random() * 900000);
      setReferenceNumber(`NOVO-${randomCode}`);
      setIsAnalyzing(true);
    }
  };

  // Previous Step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setErrors({});
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Navigate via stepper directly
  const handleSelectStep = (stepNumber: number) => {
    if (stepNumber <= maxAccessibleStep) {
      setCurrentStep(stepNumber);
      setErrors({});
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Analysis complete callback
  const handleAnalysisComplete = () => {
    setIsAnalyzing(false);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Restart application
  const handleRestart = () => {
    setForm(INITIAL_FORM_STATE);
    setCurrentStep(1);
    setMaxAccessibleStep(1);
    setErrors({});
    setIsSubmitted(false);
    setReferenceNumber('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navigation */}
      <Navbar currentLang={lang} onSelectLang={setLang} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Intro header */}
        {!isSubmitted && (
          <div className="mb-6 sm:mb-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold mb-2.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.badgeFast}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.pageTitle}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t.pageSubtitle}
            </p>
          </div>
        )}

        {/* Form or Confirmation view */}
        {isSubmitted ? (
          <ConfirmationScreen
            form={form}
            simulation={simulation}
            referenceNumber={referenceNumber}
            onRestart={handleRestart}
            t={t}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Wizard */}
            <div id="form-container" className="lg:col-span-8 space-y-6">
              {/* Stepper */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
                <Stepper
                  currentStep={currentStep}
                  maxAccessibleStep={maxAccessibleStep}
                  onSelectStep={handleSelectStep}
                  t={t}
                />
              </div>

              {/* Form Body Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm relative">
                {/* Step Header */}
                <div className="pb-5 mb-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      {t.stepIndicator} {currentStep} {t.stepOf}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                      {currentStep === 1 && t.step1Title}
                      {currentStep === 2 && t.step2Title}
                      {currentStep === 3 && t.step3Title}
                      {currentStep === 4 && t.step4Title}
                    </h2>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{t.noCommitment}</span>
                  </div>
                </div>

                {/* Form Step Components */}
                <div>
                  {currentStep === 1 && (
                    <Step1Loan form={form} onChange={handleFormChange} t={t} lang={lang} />
                  )}
                  {currentStep === 2 && (
                    <Step2Identity
                      form={form}
                      onChange={handleFormChange}
                      errors={errors}
                      t={t}
                    />
                  )}
                  {currentStep === 3 && (
                    <Step3Situation
                      form={form}
                      onChange={handleFormChange}
                      simulation={simulation}
                      errors={errors}
                      t={t}
                      lang={lang}
                    />
                  )}
                  {currentStep === 4 && (
                    <Step4Summary
                      form={form}
                      simulation={simulation}
                      onChange={handleFormChange}
                      errors={errors}
                      t={t}
                      lang={lang}
                    />
                  )}
                </div>

                {/* Navigation Buttons Footer */}
                <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                  {/* Previous Button (hidden on Step 1) */}
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>{t.previous}</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {/* Next / Submit Button */}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-extrabold flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>{currentStep === 4 ? t.submit : t.next}</span>
                    {currentStep === 4 ? (
                      <Send className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Real-time Simulation Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <LoanSidebar form={form} simulation={simulation} t={t} />
            </div>
          </div>
        )}
      </main>

      {/* 2.5s Analysis Modal */}
      {isAnalyzing && <AnalysisModal onComplete={handleAnalysisComplete} t={t} />}

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>
            {t.footerDisclaimer}
          </p>
          <p className="text-[11px] text-slate-400">
            {t.footerLegal}
          </p>
        </div>
      </footer>
    </div>
  );
}
