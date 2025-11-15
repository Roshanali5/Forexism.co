import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Lock, 
  CheckCircle, 
  Clock, 
  BookOpen,
  ArrowLeft,
  Video,
  FileText,
  Download,
  Star,
  Users,
  Award
} from 'lucide-react';

const PremiumCoursePage = ({ 
  courseId, 
  userProfile, 
  isAuthenticated,
  setCurrentPage,
  setShowAuthModal,
  setAuthMode 
}) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeModule, setActiveModule] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);
  const [courseContent, setCourseContent] = useState(null);

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';
      
      // Fetch course details
      const response = await fetch(`${API_URL}/courses/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCourse(data.data);
        
        // If user has access, fetch course content
        if (data.data.hasAccess) {
          fetchCourseContent();
        }
        
        setError('');
      } else {
        setError(data.message || 'Failed to load course');
      }
    } catch (err) {
      setError('Error loading course: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseContent = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';
      const response = await fetch(`${API_URL}/courses/${courseId}/content`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCourseContent(data.data);
      }
    } catch (err) {
      console.error('Error fetching course content:', err);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      setAuthMode('login');
      return;
    }

    // For premium courses, show payment option
    if (course.isPaid) {
      // Redirect to courses page with payment modal
      setCurrentPage('courses');
      // You might want to pass the course ID to pre-select it
      return;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading course...</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-400 text-xl">{error || 'Course not found'}</div>
        <button
          onClick={() => setCurrentPage('courses')}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  const isEnrolled = userProfile?.enrolledCourses?.includes(courseId);
  const hasAccess = isEnrolled || course.isFree;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => setCurrentPage('courses')}
            className="flex items-center space-x-2 text-blue-300 hover:text-white mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Courses</span>
          </button>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-gray-300 text-lg mb-6">{course.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Video className="h-5 w-5 text-blue-400" />
                  <span>{course.totalVideos || course.lessons} videos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  <span>{course.totalLessons || course.lessons} lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-400" />
                  <span>{course.enrolledStudents?.length || 0} students</span>
                </div>
              </div>

              {!hasAccess && course.isPaid && (
                <div className="bg-yellow-600/20 border border-yellow-500/50 rounded-lg p-4 mb-6">
                  <p className="text-yellow-200 flex items-center space-x-2">
                    <Lock className="h-5 w-5" />
                    <span>
                      🔒 Premium Course - Enroll to access all {course.totalVideos || course.lessons} videos and lessons
                    </span>
                  </p>
                </div>
              )}

              {hasAccess && (
                <div className="bg-green-600/20 border border-green-500/50 rounded-lg p-4 mb-6">
                  <p className="text-green-200 flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>You have full access to this course</span>
                  </p>
                </div>
              )}

              {!hasAccess ? (
                <button
                  onClick={handleEnroll}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all"
                >
                  {course.isPaid ? `Enroll Now - $${course.price}` : 'Enroll for Free'}
                </button>
              ) : (
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveModule(0)}
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
                  >
                    Start Learning
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-bold transition-all">
                    Download Resources
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative">
              <img
                src={course.image || '/api/placeholder/600/400'}
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg shadow-2xl"
              />
              {!hasAccess && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <Lock className="h-16 w-16 text-white mx-auto mb-4" />
                    <p className="text-white font-semibold">Premium Content</p>
                    <p className="text-gray-300">Enroll to unlock</p>
                  </div>
                </div>
              )}
              
              {/* Course Type Badge */}
              <div className="absolute top-4 right-4">
                {course.isOneToOne ? (
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Award className="h-4 w-4" />
                    <span>1-on-1</span>
                  </span>
                ) : course.isPaid ? (
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Premium - ${course.price}
                  </span>
                ) : (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    FREE
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Course Modules */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Course Content</h3>
              
              {hasAccess && courseContent ? (
                <div className="space-y-2">
                  {courseContent.modules?.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="border border-gray-700 rounded-lg">
                      <button
                        onClick={() => setActiveModule(moduleIndex)}
                        className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <h4 className="font-semibold text-white">{module.title}</h4>
                        <p className="text-sm text-gray-400">
                          {module.videos?.length || 0} videos
                        </p>
                      </button>
                      
                      {activeModule === moduleIndex && module.videos && (
                        <div className="p-2 space-y-1">
                          {module.videos.map((video, videoIndex) => (
                            <button
                              key={videoIndex}
                              onClick={() => setActiveVideo(videoIndex)}
                              className={`w-full text-left p-2 rounded flex items-center space-x-2 text-sm ${
                                activeVideo === videoIndex 
                                  ? 'bg-blue-600 text-white' 
                                  : 'hover:bg-gray-700 text-gray-300'
                              }`}
                            >
                              <Play className="h-3 w-3" />
                              <span className="flex-1 truncate">{video.title}</span>
                              {video.isPreview && (
                                <span className="text-xs bg-green-600 px-1 rounded">Preview</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : hasAccess ? (
                <div className="text-center py-8">
                  <Video className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Course content loading...</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Lock className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Enroll to access course content</p>
                  <button
                    onClick={handleEnroll}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                  >
                    Enroll Now
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content - Video Player & Details */}
          <div className="lg:col-span-3">
            {hasAccess && courseContent?.modules?.[activeModule]?.videos?.[activeVideo] ? (
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg mb-4">
                  <video
                    controls
                    className="w-full h-64 lg:h-96 object-cover rounded-lg"
                    poster={courseContent.modules[activeModule].videos[activeVideo].thumbnail}
                  >
                    <source 
                      src={courseContent.modules[activeModule].videos[activeVideo].videoUrl} 
                      type="video/mp4" 
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <h2 className="text-2xl font-bold mb-4">
                  {courseContent.modules[activeModule].videos[activeVideo].title}
                </h2>
                
                <p className="text-gray-300 mb-6">
                  {courseContent.modules[activeModule].videos[activeVideo].description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Duration: {courseContent.modules[activeModule].videos[activeVideo].duration || 'N/A'}</span>
                  <span>
                    Video {activeVideo + 1} of {courseContent.modules[activeModule].videos.length}
                  </span>
                </div>
              </div>
            ) : hasAccess ? (
              <div className="bg-gray-900 rounded-lg p-12 text-center">
                <Video className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Welcome to the Course!</h3>
                <p className="text-gray-400 mb-6">Select a video from the course content to start learning</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">📚 What You'll Learn</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {course.learningOutcomes?.map((outcome, index) => (
                        <li key={index}>• {outcome}</li>
                      )) || <li>Advanced trading strategies</li>}
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">🎯 Requirements</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {course.requirements?.map((req, index) => (
                        <li key={index}>• {req}</li>
                      )) || <li>Basic understanding of trading</li>}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg p-12 text-center">
                <Lock className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Premium Content Locked</h3>
                <p className="text-gray-400 mb-6">
                  Enroll in this course to access all {course.totalVideos || course.lessons} videos, 
                  learning materials, and resources
                </p>
                <button
                  onClick={handleEnroll}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-bold"
                >
                  {course.isPaid ? `Enroll Now - $${course.price}` : 'Enroll for Free'}
                </button>
                
                {/* Course Highlights */}
                <div className="mt-8 grid md:grid-cols-3 gap-4 text-left">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Video className="h-5 w-5 text-blue-400" />
                      <h4 className="font-bold text-white">Video Lessons</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      {course.totalVideos || course.lessons} high-quality video lessons
                    </p>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="h-5 w-5 text-green-400" />
                      <h4 className="font-bold text-white">Resources</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Downloadable materials and cheat sheets
                    </p>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-purple-400" />
                      <h4 className="font-bold text-white">Community</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Access to student community and support
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Course Curriculum */}
            {course.curriculum && course.curriculum.length > 0 && (
              <div className="mt-8 bg-gray-900 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-6">Course Curriculum</h3>
                <div className="space-y-4">
                  {course.curriculum.map((week, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-colors">
                      <h4 className="text-lg font-bold mb-2 text-white">Week {week.week}: {week.title}</h4>
                      {week.topics && (
                        <div className="mb-3">
                          <h5 className="font-semibold text-blue-400 mb-1">Topics Covered:</h5>
                          <ul className="list-disc list-inside text-gray-300">
                            {week.topics.map((topic, topicIndex) => (
                              <li key={topicIndex}>{topic}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {week.objectives && (
                        <div>
                          <h5 className="font-semibold text-green-400 mb-1">Learning Objectives:</h5>
                          <ul className="list-disc list-inside text-gray-300">
                            {week.objectives.map((objective, objIndex) => (
                              <li key={objIndex}>{objective}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructor Info */}
            <div className="mt-8 bg-gray-900 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">About the Instructor</h3>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">{course.instructor}</h4>
                  <p className="text-gray-300 mt-2">
                    Expert trader with years of experience in forex markets. 
                    Specialized in price action trading and market structure analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumCoursePage;