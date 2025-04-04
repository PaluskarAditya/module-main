import React, { useState } from 'react';
import { 
  FaBook, 
  FaNetworkWired, 
  FaUserShield, 
  FaClipboardCheck, 
  FaBars, 
  FaTimes, 
  FaVideo, 
  FaCog, 
  FaSignOutAlt,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaFileAlt,
  FaCertificate
} from 'react-icons/fa';

export default function Education() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Videos');
  const [activeCourse, setActiveCourse] = useState(null);

  const topics = [
    { name: 'Videos', icon: <FaVideo className="text-lg" /> },
    { name: 'Courses', icon: <FaGraduationCap className="text-lg" /> },
    { name: 'Tutorials', icon: <FaChalkboardTeacher className="text-lg" /> },
    { name: 'Documents', icon: <FaFileAlt className="text-lg" /> },
    { name: 'Certifications', icon: <FaCertificate className="text-lg" /> },
    { name: 'Profile', icon: <FaUserShield className="text-lg" /> },
    { name: 'Settings', icon: <FaCog className="text-lg" /> },
    { name: 'Logout', icon: <FaSignOutAlt className="text-lg" /> }
  ];

  const courses = [
    {
      id: 1,
      title: 'Cybersecurity Fundamentals',
      description: 'Learn the basics of cybersecurity including threats, vulnerabilities, and defenses',
      progress: 65,
      category: 'Beginner',
      lessons: 12,
      duration: '4h 30m'
    },
    {
      id: 2,
      title: 'Network Security',
      description: 'Master network protection techniques and firewall configurations',
      progress: 30,
      category: 'Intermediate',
      lessons: 8,
      duration: '3h 15m'
    },
    {
      id: 3,
      title: 'Ethical Hacking',
      description: 'Penetration testing methodologies and tools',
      progress: 0,
      category: 'Advanced',
      lessons: 15,
      duration: '6h 45m'
    }
  ];

  return (
    <div className='min-h-screen tracking-wide pt-[1rem] flex bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300'>
      {/* Sidebar */}
      <div 
        className={`${isNavOpen ? 'w-64' : 'w-20'} 
        bg-gray-900/80 backdrop-blur-sm min-h-screen pt-20 
        transition-all duration-300 border-r border-cyan-500/30`}
      >
        {/* Collapse Button */}
        <div 
          className={`flex ${isNavOpen ? 'justify-end pr-4' : 'justify-center'} 
          pb-3 border-b border-cyan-500/20`}
        >
          <button 
            onClick={() => setIsNavOpen(!isNavOpen)}
            className='text-cyan-400 hover:text-cyan-300 p-2 rounded-lg 
            hover:bg-cyan-400/10 transition-all duration-200'
          >
            {isNavOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className='mt-4 space-y-1 px-2'>
          {topics.map((topic) => (
            <button
              key={topic.name}
              onClick={() => setActiveTab(topic.name)}
              className={`w-full flex items-center ${isNavOpen ? 'px-4 py-3' : 'justify-center py-3'} 
              rounded-lg transition-all duration-200
              ${activeTab === topic.name 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'}`}
              title={!isNavOpen ? topic.name : ''}
            >
              <div className='flex items-center'>
                {topic.icon}
                {isNavOpen && (
                  <span className='ml-3 text-sm font-medium'>
                    {topic.name}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 pt-20 p-6 overflow-y-auto'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='mb-8 p-6 border border-cyan-500/30 rounded-xl bg-gray-900/50 backdrop-blur-sm'>
            <h1 className='text-2xl font-semibold text-cyan-400 mb-2'>Education Portal</h1>
            <p className='text-gray-400'>
              {activeTab === 'Videos' && 'Browse our library of security training videos'}
              {activeTab === 'Courses' && 'Enroll in comprehensive cybersecurity courses'}
              {activeTab === 'Tutorials' && 'Step-by-step guides for security practices'}
              {activeTab === 'Documents' && 'Technical documentation and whitepapers'}
              {activeTab === 'Certifications' && 'Prepare for industry certifications'}
              {activeTab === 'Profile' && 'Manage your learning profile and achievements'}
              {activeTab === 'Settings' && 'Configure your learning preferences'}
              {activeTab === 'Logout' && 'Securely sign out of your account'}
            </p>
          </div>

          {/* Content Area */}
          {activeTab === 'Courses' && !activeCourse ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {courses.map(course => (
                <div 
                  key={course.id}
                  onClick={() => setActiveCourse(course)}
                  className='p-6 border border-cyan-500/30 rounded-xl bg-gray-900/50 backdrop-blur-sm 
                  cursor-pointer hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300'
                >
                  <div className='flex justify-between items-start mb-3'>
                    <h2 className='text-lg font-medium text-cyan-400'>{course.title}</h2>
                    <span className='text-xs px-2 py-1 rounded-full bg-cyan-900/50 text-cyan-300'>
                      {course.category}
                    </span>
                  </div>
                  <p className='text-sm text-gray-400 mb-4'>{course.description}</p>
                  <div className='space-y-2'>
                    <div className='flex justify-between text-xs text-gray-500'>
                      <span>{course.lessons} lessons</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className='w-full bg-gray-800 rounded-full h-2'>
                      <div 
                        className='bg-cyan-500 h-2 rounded-full' 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className='text-right text-xs text-cyan-400'>
                      {course.progress}% complete
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === 'Courses' && activeCourse ? (
            <div className='border border-cyan-500/30 rounded-xl bg-gray-900/50 backdrop-blur-sm p-6'>
              <button 
                onClick={() => setActiveCourse(null)}
                className='text-sm text-cyan-400 hover:text-cyan-300 mb-4 flex items-center'
              >
                ← Back to courses
              </button>
              <div className='flex justify-between items-start mb-6'>
                <div>
                  <h2 className='text-2xl font-semibold text-cyan-400'>{activeCourse.title}</h2>
                  <p className='text-gray-400 mt-1'>{activeCourse.description}</p>
                </div>
                <span className='text-xs px-3 py-1 rounded-full bg-cyan-900/50 text-cyan-300'>
                  {activeCourse.category}
                </span>
              </div>
              
              <div className='mb-6'>
                <div className='flex justify-between text-sm text-gray-400 mb-1'>
                  <span>Course progress</span>
                  <span>{activeCourse.progress}%</span>
                </div>
                <div className='w-full bg-gray-800 rounded-full h-2.5'>
                  <div 
                    className='bg-cyan-500 h-2.5 rounded-full' 
                    style={{ width: `${activeCourse.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className='space-y-4'>
                <div className='p-4 border border-cyan-500/30 rounded-lg bg-gray-800/50 hover:bg-cyan-500/10 cursor-pointer transition-all'>
                  <h3 className='text-cyan-400 font-medium'>Module 1: Introduction</h3>
                  <p className='text-sm text-gray-400 mt-1'>Basic concepts and terminology</p>
                </div>
                <div className='p-4 border border-cyan-500/30 rounded-lg bg-gray-800/50 hover:bg-cyan-500/10 cursor-pointer transition-all'>
                  <h3 className='text-cyan-400 font-medium'>Module 2: Core Principles</h3>
                  <p className='text-sm text-gray-400 mt-1'>Foundational security models</p>
                </div>
                {activeCourse.progress > 0 && (
                  <div className='p-4 border border-cyan-500/30 rounded-lg bg-gray-800/50 hover:bg-cyan-500/10 cursor-pointer transition-all'>
                    <h3 className='text-cyan-400 font-medium'>Module 3: Advanced Topics</h3>
                    <p className='text-sm text-gray-400 mt-1'>In-depth security techniques</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='p-8 border-2 border-dashed border-cyan-500/30 rounded-xl bg-gray-900/20 text-center'>
              <FaGraduationCap className='mx-auto text-5xl text-cyan-400/50 mb-4' />
              <h2 className='text-xl text-cyan-400 mb-2'>Select a {activeTab.toLowerCase()} to begin</h2>
              <p className='text-gray-500 max-w-md mx-auto'>
                {activeTab === 'Videos' && 'Browse our collection of instructional videos on cybersecurity topics'}
                {activeTab === 'Tutorials' && 'Access step-by-step tutorials to enhance your security skills'}
                {activeTab === 'Documents' && 'Download technical documents and security guidelines'}
                {activeTab === 'Certifications' && 'Prepare for industry-recognized security certifications'}
                {activeTab === 'Profile' && 'View your learning progress and achievements'}
                {activeTab === 'Settings' && 'Configure your learning preferences and notifications'}
                {activeTab === 'Logout' && 'Ready to leave? Click logout to securely exit'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}