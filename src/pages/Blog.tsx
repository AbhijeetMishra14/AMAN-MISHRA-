import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Blog.css';

interface BlogItem {
  _id: string;
  title: string;
  summary: string;
  slug: string;
  images?: string[];
  createdAt: string;
  views?: number;
  category?: string;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const postsPerPage = 6;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'All',
    'Company',
    'Digital Marketing',
    'Mobile App Development',
    'News & Updates',
    'Testing & Deployment',
    'Uncategorized',
    'Web Development'
  ];

  // Filter blogs by category
  const filteredBlogs = selectedCategory === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageClick(currentPage + 1);
    }
  };

  const getPaginationButtons = () => {
    const buttons: (number | '...')[] = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      buttons.push(1);
      if (currentPage > 3) buttons.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (!buttons.includes(i)) buttons.push(i);
      }
      if (currentPage < totalPages - 2) buttons.push('...');
      buttons.push(totalPages);
    }

    return buttons;
  };

  return (
    <div className="blog-page">
      <nav className="breadcrumb">
        <div className="breadcrumb-content">
          <Link to="/">Home</Link>
          <span className="separator">•</span>
          <span>Blog</span>
        </div>
      </nav>
      <section className="blog-hero">
        <div className="blog-hero-content">
          <h1>Blog</h1>
          <p>Makura gives you access to a collection of numerous blogs to keep you well-informed. Just read one article a week from Makura to keep your mind active.</p>
        </div>
      </section>

      <section className="blog-section">
        <div className="blog-container">
          <div className="blog-wrapper">
            <aside className="blog-sidebar">
              <div className="sidebar-section">
                <h3>Category</h3>
                <ul className="category-list">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <button
                        className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedCategory(category);
                          setCurrentPage(1);
                        }}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <main className="blog-main">
              {loading ? (
                <div className="loading">Loading blogs...</div>
              ) : blogs.length === 0 ? (
                <div className="no-blogs">No blogs published yet.</div>
              ) : (
                <>
                  <div className="blog-posts-grid">
                    {currentPosts.map((post) => (
                      <Link key={post._id} to={`/blogs/${post.slug}`} className="blog-post-card">
                        <div className="blog-post-image">
                          {post.images && post.images.length > 0 ? (
                            <img src={post.images[0]} alt={post.title} />
                          ) : (
                            <div className="blog-image-placeholder"></div>
                          )}
                        </div>
                        <div className="blog-post-info">
                          <div className="blog-meta">
                            <span className="blog-date">📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                            <span className="blog-views">👁️ {post.views || 0} views</span>
                          </div>
                          <h3 className="blog-title">{post.title}</h3>
                          <p className="blog-description">{post.summary || post.title}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="blog-pagination">
                    {getPaginationButtons().map((button, index) => (
                      <button
                        key={index}
                        className={`pagination-btn ${button === currentPage ? 'active' : ''} ${button === '...' ? 'ellipsis' : ''}`}
                        onClick={() => typeof button === 'number' && handlePageClick(button)}
                        disabled={button === '...'}
                      >
                        {button}
                      </button>
                    ))}
                  {currentPage < totalPages && (
                    <button
                      className={`pagination-btn next`}
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  )}
                </div>

                {filteredBlogs.length > 0 && totalPages > 1 && (
                  <div className="pagination-info">
                    Page {currentPage} of {totalPages}
                  </div>
                )}
                </>
              )}
            </main>
          </div>
        </div>
      </section>

      <section className="blog-cta-section">
        <div className="cta-content">
          <h2>Keep up to date with the industry and gain insights into the field through our educational blog posts.</h2>
          <button className="cta-button">Start a project</button>
        </div>
        <div className="cta-decoration">
          <div className="character-left"></div>
          <div className="character-right"></div>
        </div>
      </section>
    </div>
  );
};

export default Blog;

