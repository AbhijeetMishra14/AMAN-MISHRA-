import axios from 'axios';

interface Blog {
  title: string;
  content: string;
  author?: string;
  metaTitle?: string;
  metaDescription?: string;
}

interface Pricing {
  planName: string;
  price: number;
  features: string[];
}

interface Job {
  title: string;
  description: string;
  location: string;
}

interface FAQ {
  _id?: string;
  question: string;
  answer: string;
  page: string;
  order?: number;
  active?: boolean;
}

interface Section {
  title: string;
  content: string;
  page: string;
}

interface Testimonial {
  text: string;
  authorName: string;
  authorCompany: string;
  authorAvatar?: string;
  page: string;
  order?: number;
  active?: boolean;
  rating?: number;
}

interface Portfolio {
  _id?: string;
  title: string;
  description?: string;
  page: string;
  imageUrl?: string;
  websiteUrl?: string;
  order?: number;
  active?: boolean;
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const adminAPI = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Add token to requests
adminAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminService = {
  // Login
  login: async (email: string, password: string) => {
    const res = await adminAPI.post('/admin/login', { email, password });
    localStorage.setItem('admin_token', res.data.token);
    return res.data;
  },

  // Get current admin
  getMe: async () => {
    const res = await adminAPI.get('/admin/me');
    return res.data.admin;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('admin_token');
  },

  // Blogs
  createBlog: async (data: Blog) => {
    const res = await adminAPI.post('/blogs', data);
    return res.data;
  },

  updateBlog: async (id: string, data: Partial<Blog>) => {
    const res = await adminAPI.put(`/blogs/${id}`, data);
    return res.data;
  },

  deleteBlog: async (id: string) => {
    const res = await adminAPI.delete(`/blogs/${id}`);
    return res.data;
  },

  getBlogById: async (id: string) => {
    const res = await adminAPI.get(`/blogs/${id}`);
    return res.data;
  },

  listBlogs: async () => {
    const res = await adminAPI.get('/blogs');
    return res.data;
  },

  // Upload image
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await axios.post(`${API_BASE}/blogs/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
      },
    });
    return res.data;
  },

  // Client logos (Trusted Clients)
  listClientLogos: async () => {
    const res = await adminAPI.get('/clients');
    return res.data;
  },

  createClientLogo: async (data: { name: string; imageUrl: string; website?: string }) => {
    const res = await adminAPI.post('/clients', data);
    return res.data;
  },

  deleteClientLogo: async (id: string) => {
    const res = await adminAPI.delete(`/clients/${id}`);
    return res.data;
  },

  // Pricing
  listPricing: async () => {
    const res = await adminAPI.get('/pricing/all');
    return res.data;
  },

  createPricing: async (data: Pricing) => {
    const res = await adminAPI.post('/pricing', data);
    return res.data;
  },

  updatePricing: async (id: string, data: Partial<Pricing>) => {
    const res = await adminAPI.put(`/pricing/${id}`, data);
    return res.data;
  },

  deletePricing: async (id: string) => {
    const res = await adminAPI.delete(`/pricing/${id}`);
    return res.data;
  },

  // Jobs / Careers
  listJobs: async () => {
    const res = await adminAPI.get('/jobs/admin/all');
    return res.data;
  },

  createJob: async (data: Job) => {
    const res = await adminAPI.post('/jobs', data);
    return res.data;
  },

  updateJob: async (id: string, data: Partial<Job>) => {
    const res = await adminAPI.put(`/jobs/${id}`, data);
    return res.data;
  },

  deleteJob: async (id: string) => {
    const res = await adminAPI.delete(`/jobs/${id}`);
    return res.data;
  },

  // FAQ
  listFAQs: async () => {
    const res = await adminAPI.get('/faq');
    return res.data;
  },

  listAllFAQs: async () => {
    const res = await adminAPI.get('/faq/admin/all');
    return { faqs: res.data };
  },

  // Get FAQs for a specific page (public)
  getFAQsByPage: async (page: string) => {
    const res = await adminAPI.get(`/faq/page/${page}`);
    return res.data;
  },

  // Get FAQs for a specific page (admin)
  getPageFAQsAdmin: async (page: string) => {
    const res = await adminAPI.get(`/faq/admin/page/${page}`);
    return res.data;
  },

  createFAQ: async (data: FAQ) => {
    const res = await adminAPI.post('/faq', data);
    return res.data;
  },

  updateFAQ: async (id: string, data: Partial<FAQ>) => {
    const res = await adminAPI.put(`/faq/${id}`, data);
    return res.data;
  },

  deleteFAQ: async (id: string) => {
    const res = await adminAPI.delete(`/faq/${id}`);
    return res.data;
  },

  // Page Sections
  listSections: async () => {
    const res = await adminAPI.get('/sections');
    return res.data;
  },

  getSection: async (id: string) => {
    const res = await adminAPI.get(`/sections/${id}`);
    return res.data;
  },

  createSection: async (data: Section) => {
    const res = await adminAPI.post('/sections', data);
    return res.data;
  },

  updateSection: async (id: string, data: Partial<Section>) => {
    const res = await adminAPI.put(`/sections/${id}`, data);
    return res.data;
  },

  deleteSection: async (id: string) => {
    const res = await adminAPI.delete(`/sections/${id}`);
    return res.data;
  },

  reorderSections: async (sections: Partial<Section[]>) => {
    const res = await adminAPI.put('/sections/reorder/all', { sections });
    return res.data;
  },

  toggleSectionVisibility: async (id: string) => {
    const res = await adminAPI.patch(`/sections/${id}/visibility`);
    return res.data;
  },

  getSectionVersions: async (id: string) => {
    const res = await adminAPI.get(`/sections/${id}/versions`);
    return res.data;
  },

  revertSectionVersion: async (id: string, version: number) => {
    const res = await adminAPI.post(`/sections/${id}/revert/${version}`);
    return res.data;
  },

  // Testimonials
  listTestimonials: async () => {
    const res = await adminAPI.get('/testimonials/admin/all');
    return res.data;
  },

  getTestimonialsByPage: async (page: string) => {
    const res = await adminAPI.get(`/testimonials/admin/page/${page}`);
    return res.data;
  },

  createTestimonial: async (data: Testimonial) => {
    const res = await adminAPI.post('/testimonials', data);
    return res.data;
  },

  updateTestimonial: async (id: string, data: Partial<Testimonial>) => {
    const res = await adminAPI.put(`/testimonials/${id}`, data);
    return res.data;
  },

  deleteTestimonial: async (id: string) => {
    const res = await adminAPI.delete(`/testimonials/${id}`);
    return res.data;
  },

  toggleTestimonialVisibility: async (id: string) => {
    const res = await adminAPI.patch(`/testimonials/${id}/toggle`);
    return res.data;
  },

  reorderTestimonials: async (testimonials: Partial<Testimonial[]>) => {
    const res = await adminAPI.put('/testimonials/reorder/all', { testimonials });
    return res.data;
  },

  // Portfolio
  listAllPortfolios: async () => {
    const res = await adminAPI.get('/portfolio/admin/all');
    return { portfolios: res.data };
  },

  getPortfoliosByPage: async (page: string) => {
    const res = await adminAPI.get(`/portfolio/page/${page}`);
    return res.data;
  },

  getPortfoliosByPageAdmin: async (page: string) => {
    const res = await adminAPI.get(`/portfolio/admin/page/${page}`);
    return res.data;
  },

  createPortfolio: async (data: Portfolio) => {
    const res = await adminAPI.post('/portfolio', data);
    return res.data;
  },

  updatePortfolio: async (id: string, data: Partial<Portfolio>) => {
    const res = await adminAPI.put(`/portfolio/${id}`, data);
    return res.data;
  },

  deletePortfolio: async (id: string) => {
    const res = await adminAPI.delete(`/portfolio/${id}`);
    return res.data;
  },
};

export default adminService;