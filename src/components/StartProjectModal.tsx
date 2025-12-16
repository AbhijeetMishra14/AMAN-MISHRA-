import { useState } from 'react';
import './StartProjectModal.css';

interface StartProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StartProjectModal = ({ isOpen, onClose }: StartProjectModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    contactEmail: ''
  });
  const [error, setError] = useState('');

  const steps = [
    {
      id: 1,
      title: 'Project Type',
      description: 'What type of project are you interested in?',
      options: [
        'Web Development',
        'Mobile App Development',
        'UI/UX Design',
        'Digital Marketing',
        'Other'
      ],
      key: 'projectType'
    },
    {
      id: 2,
      title: 'Budget Range',
      description: 'What is your budget range?',
      options: [
        '$5,000 - $10,000',
        '$10,000 - $25,000',
        '$25,000 - $50,000',
        '$50,000+',
        'Not Sure'
      ],
      key: 'budget'
    },
    {
      id: 3,
      title: 'Timeline',
      description: 'When do you want to start?',
      options: [
        'Immediately',
        '1-2 Weeks',
        '1 Month',
        '2-3 Months',
        'Flexible'
      ],
      key: 'timeline'
    },
    {
      id: 4,
      title: 'Project Details',
      description: 'Tell us about your project',
      isTextarea: true,
      key: 'description'
    },
    {
      id: 5,
      title: 'Contact Information',
      description: 'How can we reach you?',
      isEmail: true,
      key: 'contactEmail'
    }
  ];

  const handleNext = () => {
    const step = steps[currentStep - 1];
    const fieldValue = formData[step.key as keyof typeof formData];

    // Validate that the field is filled
    if (!fieldValue || fieldValue.trim() === '') {
      setError(`Please select or fill in ${step.title.toLowerCase()}`);
      return;
    }

    setError('');
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setError('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOptionSelect = (option: string) => {
    const step = steps[currentStep - 1];
    setFormData({
      ...formData,
      [step.key]: option
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const step = steps[currentStep - 1];
    setFormData({
      ...formData,
      [step.key]: e.target.value
    });
  };

  const handleSubmit = async () => {
    const step = steps[currentStep - 1];
    const fieldValue = formData[step.key as keyof typeof formData];

    // Validate final field
    if (!fieldValue || fieldValue.trim() === '') {
      setError(`Please fill in ${step.title.toLowerCase()}`);
      return;
    }

    try {
      // Send to backend
      const response = await fetch('http://localhost:5000/api/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('Project request submitted:', result);
        // Show success message
        alert('✓ Project request submitted successfully! We will contact you soon.');
        
        // Close modal and reset
        onClose();
        setCurrentStep(1);
        setError('');
        setFormData({
          projectType: '',
          budget: '',
          timeline: '',
          description: '',
          contactEmail: ''
        });
      } else {
        setError(result.error || 'Failed to submit project request');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setError('Network error. Please check your connection and try again.');
    }
  };

  const currentStepData = steps[currentStep - 1];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        {/* Progress Indicator */}
        <div className="progress-container">
          {steps.map((step) => (
            <div key={step.id} className="progress-step">
              <div className={`step-circle ${currentStep >= step.id ? 'active' : ''}`}>
                {step.id}
              </div>
              <div className="step-label">{step.title}</div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="step-content">
          <h2>{currentStepData.title}</h2>
          <p className="step-description">{currentStepData.description}</p>

          {error && <div className="error-message">{error}</div>}

          {currentStepData.isTextarea ? (
            <textarea
              className="form-textarea"
              placeholder="Describe your project in detail..."
              value={formData[currentStepData.key as keyof typeof formData]}
              onChange={handleInputChange}
              rows={5}
            />
          ) : currentStepData.isEmail ? (
            <input
              type="email"
              className="form-email"
              placeholder="your@email.com"
              value={formData[currentStepData.key as keyof typeof formData]}
              onChange={handleInputChange}
            />
          ) : (
            <div className="options-grid">
              {currentStepData.options?.map((option) => (
                <button
                  key={option}
                  className={`option-btn ${
                    formData[currentStepData.key as keyof typeof formData] === option ? 'selected' : ''
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <div className="step-counter">
            Step {currentStep} of {steps.length}
          </div>
          {currentStep === steps.length ? (
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit Project Request
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartProjectModal;
