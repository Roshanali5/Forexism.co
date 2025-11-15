import React, { useState, useMemo, useEffect } from 'react';
import { ChevronRight, Calendar, User, Tag, Clock, Share2 } from 'lucide-react';

const BlogPage = ({ isAuthenticated }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      console.log('🔍 Fetching blogs from:', `${API_BASE_URL}/blogs`);
      
      const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📡 Blogs API Response Status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📋 Blogs API Response Data:', data);
      console.log(`✅ Found ${Array.isArray(data) ? data.length : data.blogs?.length || 0} blogs`);
      
      // Handle direct array response from API
      if (Array.isArray(data)) {
        console.log(`✅ Loaded ${data.length} blogs from database`);
        setBlogPosts(data);
      } else if (data.blogs && Array.isArray(data.blogs)) {
        console.log(`✅ Loaded ${data.blogs.length} blogs from database (nested)`);
        setBlogPosts(data.blogs);
      } else if (data.success && Array.isArray(data.data)) {
        console.log(`✅ Loaded ${data.data.length} blogs from database (success format)`);
        setBlogPosts(data.data);
      } else {
        console.warn('⚠️ Unexpected API response format:', data);
        setBlogPosts([]);
      }
    } catch (error) {
      console.error('❌ Error fetching blogs:', error);
      console.error('Error details:', error.message);
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle newsletter subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setSubscribeMessage('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setSubscribeMessage('Please enter a valid email address');
      return;
    }

    setSubscribeLoading(true);
    setSubscribeMessage('');

    try {
      // Simulate API call - replace with your actual newsletter API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically make an API call to your newsletter service
      console.log('Subscribing email:', email);
      
      setSubscribeMessage('🎉 Successfully subscribed to our newsletter!');
      setEmail('');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubscribeMessage('');
      }, 5000);
      
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscribeMessage('❌ Failed to subscribe. Please try again.');
    } finally {
      setSubscribeLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Share functionality
  const handleShare = async (post) => {
    const shareUrl = window.location.href;
    const shareText = `Check out this article: ${post.title}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else if (navigator.clipboard) {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShowShareTooltip(true);
        setTimeout(() => setShowShareTooltip(false), 2000);
      } catch (error) {
        // Final fallback: prompt
        prompt('Copy this link to share:', shareUrl);
      }
    } else {
      // Ultimate fallback
      prompt('Copy this link to share:', shareUrl);
    }
  };

  // Dynamically generate categories from blog posts
  const categories = useMemo(() => {
    const uniqueCategories = ['all'];
    if (blogPosts && blogPosts.length > 0) {
      const blogCategories = [...new Set(blogPosts.map(post => post.category).filter(cat => cat))];
      uniqueCategories.push(...blogCategories.sort());
    }
    return uniqueCategories;
  }, [blogPosts]);

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const getPostDate = (post) => {
    return post.date || (post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) : 'Recent');
  };

  // Handle read more click
  const handleReadMore = (post) => {
    setSelectedPost(post);
  };

  // Handle back to blog list
  const handleBackToList = () => {
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading blogs...</div>
      </div>
    );
  }

  // Article Detail View
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-black">
        {/* Navigation */}
        <nav className="bg-black border-b border-[#0076FF]/20 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <button
              onClick={handleBackToList}
              className="flex items-center text-[#0076FF] hover:text-[#0066e6] font-semibold transition-colors"
            >
              <ChevronRight className="h-5 w-5 rotate-180 mr-2" />
              Back to Blog
            </button>
          </div>
        </nav>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <article className="text-white">
            {/* Article Header */}
            <div className="mb-8">
              {selectedPost.category && (
                <span className="px-4 py-2 bg-[#0076FF] text-white text-sm font-bold rounded-full mb-4 inline-block">
                  {selectedPost.category}
                </span>
              )}
              <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                {selectedPost.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <span className="font-medium">{selectedPost.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{getPostDate(selectedPost)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{selectedPost.readTime || '5 min'} read</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {selectedPost.image && (
              <div className="mb-8 rounded-2xl overflow-hidden">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-64 lg:h-96 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400/1e3a8a/ffffff?text=Blog+Image';
                  }}
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed text-lg">
                {selectedPost.content ? (
                  <div className="whitespace-pre-line">{selectedPost.content}</div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-xl text-[#0076FF] font-medium">
                      {selectedPost.excerpt}
                    </p>
                    <p>
                      This article is currently being prepared. Please check back later for the complete content.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {selectedPost.tags && selectedPost.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#0076FF]/30">
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#0076FF]/20 text-[#0076FF] text-sm rounded-full border border-[#0076FF]/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-12 pt-8 border-t border-[#0076FF]/30 flex gap-4 flex-wrap">
              <button
                onClick={handleBackToList}
                className="px-6 py-3 bg-[#0076FF] text-white rounded-xl hover:bg-[#0066e6] transition-all font-bold flex items-center space-x-2"
              >
                <ChevronRight className="h-5 w-5 rotate-180" />
                <span>Back to Blog</span>
              </button>
              <button 
                onClick={() => handleShare(selectedPost)}
                className="px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all font-bold flex items-center space-x-2 relative"
              >
                <Share2 className="h-5 w-5" />
                <span>Share Article</span>
                
                {/* Share Tooltip */}
                {showShareTooltip && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                    Link copied to clipboard!
                  </div>
                )}
              </button>
            </div>
          </article>
        </div>
      </div>
    );
  }

  // Main Blog List View
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1a2332] via-[#1e2b3d] to-[#1a2332] py-16 lg:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#0076FF] rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0076FF] rounded-full filter blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-[#0076FF]/30 backdrop-blur-sm border border-[#0076FF]/30 rounded-3xl p-12 text-center">
            <div className="inline-block px-4 py-2 bg-[#0076FF] rounded-full text-sm font-medium mb-6">
              <span className="text-white">Trading Blog</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Trading Insights
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
              Professional trading strategies, market analysis, and educational content
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="bg-gradient-to-br from-black via-[#1a2332] to-black py-8 sticky top-0 z-40 border-b border-[#0076FF]/20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-[#0076FF] text-white shadow-lg shadow-[#0076FF]/50'
                      : 'bg-[#0076FF]/20 text-[#0076FF] hover:bg-[#0076FF]/30'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-gradient-to-br from-black via-[#1a2332] to-black py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Blog Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div 
                  key={post._id}
                  className="relative group cursor-pointer"
                  onClick={() => handleReadMore(post)}
                >
                  <div className="absolute -inset-1 bg-[#0076FF] rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-gray-900 to-black border border-[#0076FF]/20 rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                    <div className="relative overflow-hidden flex-shrink-0">
                      <img
                        src={post.image || 'https://via.placeholder.com/400x200/1e3a8a/ffffff?text=Blog+Image'}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x200/1e3a8a/ffffff?text=Image+Not+Found';
                        }}
                      />
                      {post.category && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 bg-[#0076FF] text-white text-xs font-bold rounded-full shadow-lg">
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center space-x-4 mb-3 text-gray-400 text-sm">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {getPostDate(post)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime || '5 min'}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#0076FF] transition-colors leading-tight flex-grow">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-4 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[#0076FF]/20 text-[#0076FF] text-xs rounded border border-[#0076FF]/30"
                            >
                              #{tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">
                              +{post.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-4 border-t border-[#0076FF]/30 mt-auto">
                        <div className="flex items-center text-gray-400 text-sm">
                          <User className="h-4 w-4 mr-2" />
                          <span>{post.author}</span>
                        </div>
                        <button className="text-[#0076FF] hover:text-[#0066e6] flex items-center space-x-1 font-semibold">
                          <span>Read More</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State - Only shows when no posts exist */
            <div className="text-center py-16">
              <div className="inline-block p-6 bg-[#0076FF]/20 rounded-full mb-4">
                <Tag className="h-16 w-16 text-[#0076FF]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Articles Available</h3>
              <p className="text-gray-400 mb-8">
                {selectedCategory === 'all' 
                  ? 'No blog posts have been published yet. Check back later for new content.' 
                  : `No articles found in ${selectedCategory} category. Try selecting a different category.`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Section - Updated with working subscription */}
      <div className="bg-gradient-to-br from-[#1a2332] via-black to-[#1a2332] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Stay Informed
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Get the latest trading insights and market analysis delivered to your inbox
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-[#0076FF]/10 border border-[#0076FF]/50 rounded-xl focus:ring-2 focus:ring-[#0076FF] focus:border-transparent text-white placeholder-gray-500 outline-none transition-all"
              required
            />
            <button 
              type="submit"
              disabled={subscribeLoading}
              className="px-8 py-4 bg-[#0076FF] text-white rounded-xl hover:bg-[#0066e6] transition-all font-bold shadow-lg hover:shadow-[#0076FF]/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
            >
              {subscribeLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Subscribing...</span>
                </div>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
          
          {/* Subscription Message */}
          {subscribeMessage && (
            <div className={`mt-4 text-sm font-medium ${
              subscribeMessage.includes('❌') 
                ? 'text-red-400' 
                : 'text-green-400'
            }`}>
              {subscribeMessage}
            </div>
          )}
          
          <p className="text-gray-400 text-sm mt-4">
            No spam, unsubscribe at any time
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;