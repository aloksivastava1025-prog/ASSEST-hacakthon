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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call for saving business profile
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete(formData);
    }, 1500);
  };

  return (
    <div className="onboarding-layout">
      <div className="onboarding-container glass-panel">
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
      </div>
    </div>
  );
}
