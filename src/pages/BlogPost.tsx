import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import './BlogPost.css';

interface BlogData {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  images?: string[];
  category?: string;
  tableOfContents?: Array<{
    id: string;
    level: number;
    title: string;
  }>;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTOCId, setActiveTOCId] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTOCClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveTOCId(id);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Scroll the TOC item into view
      const tocButton = tocRef.current?.querySelector(`button[data-toc-id="${id}"]`);
      if (tocButton) {
        tocButton.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  // Track which section is currently in view
  useEffect(() => {
    if (!contentRef.current || !blog?.tableOfContents || blog.tableOfContents.length === 0) return;

    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const headings = contentRef.current?.querySelectorAll('h2, h3');
        if (!headings || headings.length === 0) return;

        let currentId = '';
        
        headings.forEach((heading) => {
          const rect = heading.getBoundingClientRect();
          // Check if heading is in the upper portion of the viewport
          if (rect.top >= 0 && rect.top <= 200) {
            currentId = heading.id || '';
          }
        });

        // If no heading found in upper portion, find the one closest to top
        if (!currentId) {
          let closestHeading: Element | null = null;
          let minDistance = Infinity;

          headings.forEach((heading) => {
            const rect = heading.getBoundingClientRect();
            const distance = Math.abs(rect.top - 100);
            if (distance < minDistance) {
              minDistance = distance;
              closestHeading = heading;
            }
          });

          if (closestHeading) {
            currentId = closestHeading.id || '';
          }
        }

        if (currentId) {
          setActiveTOCId(currentId);
          
          // Scroll the TOC item into view as page scrolls
          const tocButton = tocRef.current?.querySelector(`button[data-toc-id="${currentId}"]`);
          if (tocButton) {
            tocButton.scrollIntoView({ behavior: 'auto', block: 'nearest' });
          }
        }
      }, 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [blog]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/blogs/${slug}`);
        if (!response.ok) throw new Error('Blog not found');
        const data = await response.json();
        setBlog(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Add IDs to headings after content renders
  useEffect(() => {
    if (!contentRef.current || !blog?.tableOfContents || blog.tableOfContents.length === 0) return;

    const headings = contentRef.current.querySelectorAll('h2, h3');
    let tocIndex = 0;

    headings.forEach((heading) => {
      if (tocIndex < blog.tableOfContents!.length) {
        const tocItem = blog.tableOfContents![tocIndex];
        heading.id = tocItem.id;
        tocIndex++;
      }
    });
  }, [blog]);

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <div className="loading">Loading blog...</div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-post-page">
        <div className="container">
          <p className="error-message">Blog not found</p>
          <Link to="/blogs" className="btn btn-outline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/blogs">Blog</Link> / <span>{blog.title}</span>
        </nav>

        <div className="blog-post-wrapper">
          <article className="blog-post">
            <h1>{blog.title}</h1>
            <div className="blog-post-meta">
              <span>Published {new Date(blog.createdAt).toLocaleDateString()}</span>
              <span>By Aman Mishra</span>
            </div>
            {blog.images && blog.images.length > 0 && (
              <div className="blog-featured-image">
                <img src={blog.images[0]} alt={blog.title} />
              </div>
            )}

            <div className="blog-post-content" ref={contentRef} dangerouslySetInnerHTML={{ __html: blog.content }} />
          </article>

          {blog.tableOfContents && blog.tableOfContents.length > 0 && (
            <aside className="table-of-contents-sidebar">
              <div className="toc-sticky" ref={tocRef}>
                <h3>📑 Table of Contents</h3>
                <ul className="toc-list">
                  {blog.tableOfContents.map((item) => (
                    <li key={item.id} className={`toc-item toc-level-${item.level} ${activeTOCId === item.id ? 'active' : ''}`}>
                      <button
                        className={`toc-link ${activeTOCId === item.id ? 'active' : ''}`}
                        onClick={() => handleTOCClick(item.id)}
                        data-toc-id={item.id}
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>

        <div className="blog-navigation">
          <Link to="/blogs" className="btn btn-outline">Back to Blog</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
