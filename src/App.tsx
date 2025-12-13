import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Career from './pages/Career';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Portfolio from './pages/Portfolio';
import PortfolioItem from './pages/PortfolioItem';
import CaseStudy from './pages/CaseStudy';
import FreeResources from './pages/FreeResources';
import FreeSEOAudit from './pages/FreeSEOAudit';
import WebDevelopment from './pages/services/WebDevelopment';
import WordPressDevelopment from './pages/services/WordPressDevelopment';
import DigitalMarketing from './pages/services/DigitalMarketing';
import SEOService from './pages/services/SEOService';
import AEO from './pages/services/AEO';
import PromotionalVideo from './pages/services/PromotionalVideo';
import UIUXDesign from './pages/services/UIUXDesign';
import MobileAppDevelopment from './pages/services/MobileAppDevelopment';
import AIWorkflowsAutomation from './pages/services/AIWorkflowsAutomation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/career" element={<Career />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<PortfolioItem />} />
            <Route path="/case-study" element={<CaseStudy />} />
            <Route path="/free-resources" element={<FreeResources />} />
            <Route path="/free-seo-audit" element={<FreeSEOAudit />} />
            <Route path="/service/web-development-service" element={<WebDevelopment />} />
            <Route path="/service/wordpress-development" element={<WordPressDevelopment />} />
            <Route path="/service/digital-marketing" element={<DigitalMarketing />} />
            <Route path="/service/seo-service-nepal" element={<SEOService />} />
            <Route path="/service/answer-engine-optimization-aeo" element={<AEO />} />
            <Route path="/service/promotional-video" element={<PromotionalVideo />} />
            <Route path="/service/ui-ux-design" element={<UIUXDesign />} />
            <Route path="/service/mobile-app-development" element={<MobileAppDevelopment />} />
            <Route path="/service/ai-workflow-automation" element={<AIWorkflowsAutomation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
