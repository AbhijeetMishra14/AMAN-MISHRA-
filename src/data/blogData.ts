export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  views: number;
  description: string;
}

export const allBlogPosts: BlogPost[] = [
  { slug: 'best-chatgpt-seo-agency', title: 'Best ChatGPT SEO Agencies To Watch', date: '25 Sep 2025', views: 329, description: 'Discover the leading ChatGPT-powered SEO agencies transforming digital marketing. Learn about their strategies and innovative approaches.' },
  { slug: 'wordpress-maintenance', title: 'WordPress Maintenance Services', date: '19 Sep 2025', views: 419, description: 'The majority of business owners plug in their WordPress site and expect it just to work indefinitely. The truth is, websites are similar to cars; they need regular maintenance to continue working properly.' },
  { slug: 'best-wordpress-seo-plugin', title: 'Best WordPress Seo Plugin', date: '15 Sep 2025', views: 394, description: 'If you have a WordPress site, you probably know how crucial search engine visibility is. Regardless of how good you write or how good your products are, unless your site is search engine optimized.' },
  { slug: 'link-building-seo', title: 'Importance of Link Building in SEO', date: '19 Sep 2025', views: 419, description: 'The digital marketing space has the most important tool, SEO (Search Engine Optimization), which helps your business to be seen on the internet.' },
  { slug: 'travel-website-development', title: 'Travel Website Development', date: '25 Sep 2025', views: 329, description: 'The travel business has transformed significantly during the last ten years. Tourists are not only dependent on the travel agents or printed travel booklets' },
  { slug: 'website-development-for-school', title: 'Website Development for School, Features, Benefits', date: '17 Oct 2025', views: 269, description: 'In today\'s digital-first world, a school\'s website is more than just an online presence; it represents the institution. A well-designed school website may help students, parents, and educators build trust.' },
  { slug: 'youtube-monetization-in-nepal', title: 'How To Monetize Youtube Channel In Nepal', date: '10 Dec 2025', views: 328, description: 'Learn the best strategies to monetize your YouTube channel in Nepal and earn consistent revenue from your content creation efforts.' },
  { slug: 'ai-chatbot-for-website', title: 'AI Chatbot for Website, Boost Engagement, Sales, Support', date: '08 Oct 2025', views: 328, description: 'In the new age of the digital world, websites should not be passive receivers of information but rather active engagements with the visitor, capable of responding to questions in real time as well as.' },
  { slug: 'facebook-monetization-nepal', title: 'How To Monetize Facebook Page In Nepal', date: '03 Dec 2025', views: 287, description: 'Unlock the potential of your Facebook page and start earning money through various monetization strategies available in Nepal.' },
  { slug: 'seo-agency-australia', title: 'SEO Agency in Australia: Proven Strategies', date: '21 Nov 2025', views: 356, description: 'Explore effective SEO strategies specifically tailored for the Australian market and learn from leading agency practices.' },
  { slug: 'school-website-guide', title: 'Creating Effective School Websites for Student Engagement', date: '12 Nov 2025', views: 234, description: 'A comprehensive guide on building school websites that engage students, parents, and faculty with modern design and functionality.' },
  { slug: 'mobile-app-trends-2025', title: 'Top Mobile App Development Trends in 2025', date: '05 Nov 2025', views: 412, description: 'Discover the latest trends in mobile app development that are shaping the industry and driving innovation forward.' },
  { slug: 'wordpress-security', title: 'WordPress Security Best Practices', date: '28 Oct 2025', views: 291, description: 'Protect your WordPress website with essential security practices and tools to prevent common vulnerabilities.' },
  { slug: 'digital-marketing-roi', title: 'Measuring ROI in Digital Marketing Campaigns', date: '15 Oct 2025', views: 378, description: 'Learn how to effectively measure and optimize your digital marketing ROI with proven strategies and tools.' },
  { slug: 'content-marketing-strategy', title: 'Effective Content Marketing Strategies for 2025', date: '02 Oct 2025', views: 445, description: 'Master the art of content marketing with strategies that drive engagement, traffic, and conversions for your business.' },
  { slug: 'web-design-principles', title: 'Web Design Principles That Convert', date: '18 Sep 2025', views: 523, description: 'Understand the fundamental principles of web design that help create websites with high conversion rates.' }
];

export const getRecentBlogPosts = (count: number = 6): BlogPost[] => {
  return allBlogPosts.slice(0, count);
};
