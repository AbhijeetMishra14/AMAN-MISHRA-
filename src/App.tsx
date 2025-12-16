import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HelpWidget from './components/HelpWidget';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Career from './pages/Career';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Pricing from './pages/Pricing';
import WordPressDevelopment from './pages/services/WordPressDevelopment';
import DigitalMarketing from './pages/services/DigitalMarketing';
import SEOService from './pages/services/SEOService';
import PromotionalVideo from './pages/services/PromotionalVideo';
import UIUXDesign from './pages/services/UIUXDesign';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminClients from './pages/AdminClients';
import AdminPricing from './pages/AdminPricing';
import AdminCareer from './pages/AdminCareer';
import AdminFAQ from './pages/AdminFAQ';
import BlogEditor from './pages/BlogEditor';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <HelpWidget />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/career" element={<Career />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/service/wordpress-development" element={<WordPressDevelopment />} />
            <Route path="/service/digital-marketing" element={<DigitalMarketing />} />
            <Route path="/service/seo-service-nepal" element={<SEOService />} />
            <Route path="/service/promotional-video" element={<PromotionalVideo />} />
            <Route path="/service/ui-ux-design" element={<UIUXDesign />} />
            
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/clients" element={<AdminClients />} />
            <Route path="/admin/pricing" element={<AdminPricing />} />
            <Route path="/admin/careers" element={<AdminCareer />} />
            <Route path="/admin/faq" element={<AdminFAQ />} />
            <Route path="/admin/blog/new" element={<BlogEditor />} />
            <Route path="/admin/blog/:id" element={<BlogEditor />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
