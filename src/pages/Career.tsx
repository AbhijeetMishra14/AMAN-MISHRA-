import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Asset120 from '../assets/Asset-120-1.svg';
import { adminService } from '../services/adminService';
import './Career.css';

interface Job {
  _id: string;
  title: string;
  location?: string;
  type?: string;
  description?: string;
  active?: boolean;
}

type FAQ = {
  _id: string;
  question: string;
  answer: string;
  order?: number;
  active?: boolean;
};

const DEFAULT_FAQS: FAQ[] = [
  {
    _id: '1',
    question: 'What services do I get from Aman Mishra?',
    answer: 'I provide business services from application development to social media management and branding all together so that it becomes easy for you to get your business solution all in one spot.',
  },
  {
    _id: '2',
    question: 'What services do I provide?',
    answer: 'I offer a range of different services ranging from website development, app development, digital marketing and many more.',
  },
  {
    _id: '3',
    question: 'Do you help with social media promotions as well?',
    answer: 'Yes, I also have a talented creative team to help your business grow on social media.',
  },
  {
    _id: '4',
    question: 'Where are you located?',
    answer: 'I am based in Nepal, but I work with clients from all over the world.',
  },
];

const fallbackJobs: Job[] = [
  { _id: '1', title: 'SEO Intern', location: 'Remote', type: 'Internship', description: '' },
  { _id: '2', title: 'UI/UX Designer', location: 'Remote', type: 'Internship', description: '' },
];

const Career = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState<FAQ[]>(DEFAULT_FAQS);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/jobs');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setJobs(data);
        } else {
          setJobs(fallbackJobs);
        }
      } catch (e) {
        console.error('Failed to load jobs', e);
        setJobs(fallbackJobs);
      } finally {
        setLoading(false);
      }
    };

    const loadFAQs = async () => {
      try {
        const faqData = await adminService.listFAQs();
        const faqList = Array.isArray(faqData) ? faqData : (faqData?.faqs || []);
        if (faqList.length > 0) {
          setFaqs(faqList);
        } else {
          setFaqs(DEFAULT_FAQS);
        }
      } catch (e) {
        console.error('Failed to load FAQs', e);
        setFaqs(DEFAULT_FAQS);
      }
    };

    void loadJobs();
    void loadFAQs();
  }, []);

  const hasJobs = jobs.length > 0;

  return (
    <div className="career-page">
      {/* Hero Section */}
      <section className="career-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span className="separator">•</span>
            <span>Vacancies</span>
          </nav>
          
          <div className="hero-content-wrapper">
            <div className="hero-text">
              <h1>Open Positions</h1>
              <p>
                Search for a role that fits your profile and if you can't find one, send us a general application with your resume attached. We want the brightest minds to work with us so that we can innovate, team up, and set the road for providing the best achievable consumer experience in the future.
              </p>
            </div>
            <div className="hero-illustration">
              <img src={Asset120} alt="Vacancies Illustration" className="illustration-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Openings Section */}
      <section className="no-openings-section">
        <div className="container">
          <div className="no-openings-content">
            <p className="no-openings-text">
              We are currently hiring! If you're interested in joining our team, please reach out to us at{' '}
              <a href="mailto:amandreamsbig@gmail.com">amandreamsbig@gmail.com</a> with your resume and portfolio.
            </p>

            <div className="hiring-section">
              <h3 className="hiring-title">
                {hasJobs ? 'We are currently open for hiring:' : 'No specific openings right now, but you can still apply:'}
              </h3>
              {loading ? (
                <p>Loading positions...</p>
              ) : hasJobs ? (
                <ul className="hiring-list">
                  {jobs.map((job) => (
                    <li key={job._id}>
                      <strong>{job.title}</strong>
                      {job.location && <span> • {job.location}</span>}
                      {job.type && <span> • {job.type}</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="hiring-list">
                  {fallbackJobs.map((job) => (
                    <li key={job._id}>{job.title}</li>
                  ))}
                </ul>
              )}
              <p className="hiring-note">
                If you are interested, please add your skills and experience in your application email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Have questions about joining our team or our services? We have answers.</p>

          <div className="faq-grid">
            {(faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS).map((faq) => (
              <div key={faq._id} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;
