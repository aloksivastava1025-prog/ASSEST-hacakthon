import React, { useState } from 'react';
import { Building2, Globe, Target, Briefcase, DollarSign, ArrowRight, CheckCircle2 } from 'lucide-react';
import './BusinessOnboarding.css';

export default function BusinessOnboarding({ onComplete }) {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'B2B',
    industry: '',
    website: '',
    revenue: 'pre-revenue',
    targetAudience: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  const loadingSteps = [
    "Waking CrewAI Intelligence Agents...",
    "Executing deep-web queries for market context...",
    "Mapping competitor trajectories...",
    "Extracting core buyer personas...",
    "Synthesizing Strategic Advisory Report..."
  ];

  React.useEffect(() => {
    let interval;
    if (isSubmitting) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev < loadingSteps.length - 1 ? prev + 1 : prev);
      }, 4500); // Progress steps to simulate the ~60s CrewAI wait
    } else {
      setCurrentStep(0);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:8000/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business_context: `${formData.businessName} - ${formData.industry} (${formData.businessType}) targeting ${formData.targetAudience}` })
      });
      const data = await res.json();
      console.log("CrewAI Report Generated:", data.report);
      // We attach the raw report to formData out of convenience so InsightModal or Dash can read it
      formData.researchReport = data.report;
    } catch (err) {
      console.error(err);
    }
    setIsSubmitting(false);
    onComplete(formData);
  };

  return (
    <div className="onboarding-layout">
      <div className="onboarding-container glass-panel">
        {isSubmitting ? (
          <div style={{ padding: '80px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '400px', justifyContent: 'center' }}>
            <div className="glow-bg" style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(20, 184, 166, 0.1)', border: '2px solid var(--primary-color)', margin: '0 auto 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(20, 184, 166, 0.4)' }}>
              <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '2px dashed var(--primary-color)', animation: 'spin 10s linear infinite' }}></div>
              <Globe size={40} className="text-cyan" />
            </div>
            <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>CrewAI Engine Processing</h2>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px 24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', width: '100%', maxWidth: '400px' }}>
              <p style={{ fontSize: '15px', color: 'var(--primary-color)', fontFamily: 'monospace', margin: 0, textAlign: 'left' }}>
                $ {loadingSteps[currentStep]} <span style={{ animation: 'pulse 1s infinite' }}>_</span>
              </p>
            </div>
            <style>{`
              @keyframes spin { 100% { transform: rotate(360deg); } }
              @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            `}</style>
          </div>
        ) : (
          <>
            <div className="onboarding-header">
              <h2>Tell us about your business</h2>
              <p className="text-secondary">We'll use this context to hyper-personalize your AI agents and ensure they align perfectly with your brand voice and goals.</p>
            </div>

        <form className="onboarding-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="form-group grid-2">
            <div className="input-block">
              <label><Building2 size={16} /> Business Name</label>
              <input 
                type="text" 
                name="businessName"
                placeholder="e.g. Acme Corp" 
                value={formData.businessName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-block">
              <label><Briefcase size={16} /> Business Type</label>
              <select name="businessType" value={formData.businessType} onChange={handleChange}>
                <option value="B2B">B2B (Business to Business)</option>
                <option value="B2C">B2C (Business to Consumer)</option>
                <option value="D2C">D2C (Direct to Consumer)</option>
                <option value="SaaS">SaaS / Software</option>
                <option value="Agency">Agency / Services</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-group grid-2">
            <div className="input-block">
              <label><Target size={16} /> Industry / Category</label>
              <input 
                type="text" 
                name="industry"
                placeholder="e.g. E-Commerce, Healthcare, Real Estate" 
                value={formData.industry}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-block">
              <label><Globe size={16} /> Website (Optional)</label>
              <input 
                type="url" 
                name="website"
                placeholder="https://yourwebsite.com" 
                value={formData.website}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-group">
            <div className="input-block">
              <label><DollarSign size={16} /> Monthly Revenue / Earnings</label>
              <select name="revenue" value={formData.revenue} onChange={handleChange}>
                <option value="pre-revenue">Pre-revenue</option>
                <option value="under_1k">Under $1,000 / mo</option>
                <option value="1k_10k">$1,000 - $10,000 / mo</option>
                <option value="10k_50k">$10,000 - $50,000 / mo</option>
                <option value="over_50k">Over $50,000 / mo</option>
              </select>
            </div>
          </div>

          {/* Row 4 */}
          <div className="form-group">
            <div className="input-block">
              <label>Target Audience Description</label>
              <textarea 
                name="targetAudience"
                placeholder="Who are your ideal customers? Describe their demographics, pain points, and desires..."
                rows="4"
                value={formData.targetAudience}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary w-full btn-large" disabled={isSubmitting}>
              {isSubmitting ? (
                <>Saving Profile...</>
              ) : (
                <>Let's Build <ArrowRight size={18} /></>
              )}
            </button>
          </div>
        </form>
          </>
        )}
      </div>
    </div>
  );
}
