import { useParams, Link } from 'react-router-dom';
import './BlogPost.css';

const BlogPost = () => {
  const { slug: _slug } = useParams();

  // In a real app, you would fetch the blog post data based on the slug
  const blogPost = {
    title: 'Blog Post Title',
    date: '10, Dec 2025',
    content: 'This is the blog post content...'
  };

  return (
    <div className="blog-post-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/blogs">Blog</Link> / <span>{blogPost.title}</span>
        </nav>

        <article className="blog-post">
          <h1>{blogPost.title}</h1>
          <div className="blog-post-meta">
            <span>Published {blogPost.date}</span>
            <span>By Aman Mishra</span>
          </div>
          <div className="blog-post-content">
            <p>{blogPost.content}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </article>

        <div className="blog-navigation">
          <Link to="/blogs" className="btn btn-outline">Back to Blog</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;