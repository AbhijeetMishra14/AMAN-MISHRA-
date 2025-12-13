import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    { slug: 'best-chatgpt-seo-agency', title: 'Best ChatGPT SEO Agencies To Watch', date: '10, Dec 2025' },
    { slug: 'youtube-monetization-in-nepal', title: 'How To Monetize Youtube Channel In Nepal', date: '10, Dec 2025' },
    { slug: 'how-to-monetize-facebook-page', title: 'How To Monetize Facebook Page In Nepal', date: '03, Dec 2025' },
    { slug: 'seo-agency-in-australia', title: 'SEO Agency in Australia: Proven Strategies', date: '21, Nov 2025' },
    { slug: 'website-development-for-school', title: 'Website Development for School', date: '17, Oct 2025' },
    { slug: 'ai-chatbot-for-website', title: 'AI Chatbot for Website', date: '08, Oct 2025' },
    { slug: 'importance-of-link-building', title: 'Importance of Link Building in SEO', date: '19, Sep 2025' },
    { slug: 'what-is-seo', title: 'What is SEO? A Complete Guide for Beginners', date: '08, Mar 2024' }
  ];

  return (
    <div className="blog-page">
      <section className="page-hero">
        <div className="container">
          <h1>Blog</h1>
          <p>Keep up to date with the industry and gain insights</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-list">
            {blogPosts.map((post, index) => (
              <Link key={index} to={`/blogs/${post.slug}`} className="blog-post-card">
                <div className="blog-post-image">
                  <div className="blog-placeholder">Blog Image</div>
                </div>
                <div className="blog-post-content">
                  <span className="blog-post-date">{post.date}</span>
                  <h2>{post.title}</h2>
                  <span className="read-more">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
