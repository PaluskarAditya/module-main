import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import Education from './Education';
const Leaderboard = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { mode } = useOutletContext();

  // Sample data - replace with your actual data source
  const [leaderboardData, setLeaderboardData] = useState([
    { id: 1, name: 'CyberNinja', score: 9850, rank: 1, department: 'Security', avatar: '👨‍💻', completed: 28 },
    { id: 2, name: 'PhishNet', score: 8720, rank: 2, department: 'Networking', avatar: '👩‍💻', completed: 24 },
    { id: 3, name: 'CryptoKing', score: 8450, rank: 3, department: 'Engineering', avatar: '🧙‍♂️', completed: 22 },
    { id: 4, name: 'Firewall', score: 8120, rank: 4, department: 'Security', avatar: '🛡️', completed: 21 },
    { id: 5, name: 'ByteMe', score: 7980, rank: 5, department: 'Development', avatar: '🤖', completed: 20 },
    { id: 6, name: 'ZeroDay', score: 7650, rank: 6, department: 'Research', avatar: '👨‍🔬', completed: 19 },
    { id: 7, name: 'SQLQueen', score: 7320, rank: 7, department: 'Database', avatar: '👸', completed: 18 },
    { id: 8, name: 'RootAccess', score: 6980, rank: 8, department: 'Operations', avatar: '👨‍🚀', completed: 17 },
  ]);

  const [timeRange, setTimeRange] = useState('all-time');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState({ id: 42, name: 'You', score: 4200, rank: 15, department: params.dept || 'Security', avatar: '😎', completed: 12 });

  // Filter and sort data
  const filteredData = leaderboardData
    .filter(user =>
      (departmentFilter === 'all' || user.department.toLowerCase() === departmentFilter) &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => b.score - a.score)
    .map((user, index) => ({ ...user, rank: index + 1 }));

  // Add current user if not in top list
  const displayData = filteredData.slice(0, 10);
  const showCurrentUser = !filteredData.some(user => user.id === currentUser.id) &&
    currentUser.department.toLowerCase() === (departmentFilter === 'all' ? currentUser.department.toLowerCase() : departmentFilter);

  // Time range effect - in a real app, this would fetch data
  useEffect(() => {
    // Simulate data change based on time range
    const multiplier = timeRange === 'weekly' ? 0.3 : timeRange === 'monthly' ? 0.7 : 1;
    setLeaderboardData(prev => prev.map(user => ({
      ...user,
      score: Math.floor(user.score * multiplier * (0.9 + Math.random() * 0.2))
    })).sort((a, b) => b.score - a.score)); // Fixed missing closing parenthesis
  }, [timeRange]);

  return mode === 'gaming' ? (
    <div className='min-h-screen w-full flex flex-col items-center justify-center pt-[6.5rem] text-gray-300 tracking-widest bg-gradient-to-b from-gray-900 to-black'>
      <div className='w-full max-w-7xl h-full flex flex-col gap-6 items-center px-4 pb-8'> {/* Adjusted padding for horizontal scroll */}
        {/* Header */}
        <div className='w-full flex flex-col gap-2 p-6 border border-indigo-500/30 rounded-xl bg-black/50 backdrop-blur-sm hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-300'>
          <div className="flex items-center justify-between w-full">
            <h1 className='text-xl text-indigo-400'>Leaderboard</h1>
            <button
              onClick={() => navigate(`/home/${params.dept}`)}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors border border-indigo-400/30 px-4 py-2 rounded-lg hover:border-indigo-400/50 hover:bg-indigo-400/5"
            >
              ← Back to Hub
            </button>
          </div>
          <p className='text-sm text-gray-400 mt-2'>
            Track your progress and compete with colleagues across departments
          </p>
        </div>

        {/* Controls */}
        <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* Time Range Filter */}
          <div className='p-4 border border-blue-500/30 rounded-xl bg-black/50 backdrop-blur-sm'>
            <h3 className='text-sm text-blue-400 mb-2'>Time Range</h3>
            <div className='flex gap-2'>
              {['weekly', 'monthly', 'all-time'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`text-xs px-3 py-1 rounded-lg border transition-all duration-300 ${timeRange === range
                      ? 'border-blue-500 bg-blue-500/20 text-white'
                      : 'border-blue-500/30 text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5'
                    }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Department Filter */}
          <div className='p-4 border border-purple-500/30 rounded-xl bg-black/50 backdrop-blur-sm'>
            <h3 className='text-sm text-purple-400 mb-2'>Department</h3>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className='w-full text-xs bg-gray-900/50 border border-purple-500/30 rounded-lg px-3 py-1.5 text-gray-300 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50'
            >
              <option value="all">All Departments</option>
              {Array.from(new Set(leaderboardData.map(user => user.department))).map(dept => (
                <option key={dept} value={dept.toLowerCase()}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className='p-4 border border-emerald-500/30 rounded-xl bg-black/50 backdrop-blur-sm'>
            <h3 className='text-sm text-emerald-400 mb-2'>Search</h3>
            <input
              type="text"
              placeholder="Search users or departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full text-xs bg-gray-900/50 border border-emerald-500/30 rounded-lg px-3 py-1.5 text-gray-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50'
            />
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className='w-full border border-gray-700/50 rounded-xl overflow-hidden bg-black/50 backdrop-blur-sm'>
          {/* Table Header */}
          <div className='grid grid-cols-12 gap-2 p-4 bg-gray-900/30 border-b border-gray-700/50'> {/* Adjusted gap for horizontal scroll */}
            <div className='col-span-1 text-xs text-gray-400 font-medium'>Rank</div>
            <div className='col-span-3 text-xs text-gray-400 font-medium'>User</div>
            <div className='col-span-2 text-xs text-gray-400 font-medium'>Department</div>
            <div className='col-span-2 text-xs text-gray-400 font-medium text-right'>Score</div>
            <div className='col-span-2 text-xs text-gray-400 font-medium text-right'>Completed</div>
            <div className='col-span-2 text-xs text-gray-400 font-medium text-right'>Actions</div>
          </div>

          {/* Table Body */}
          <div className='divide-y divide-gray-700/50'>
            {displayData.map(user => (
              <div
                key={user.id}
                className={`grid grid-cols-12 gap-2 p-4 items-center transition-all duration-300 ${user.id === currentUser.id ? 'bg-indigo-900/10 hover:bg-indigo-900/20' : 'hover:bg-gray-800/30'
                  }`}
              >
                <div className='col-span-1 flex items-center'>
                  <span className={`text-sm ${user.rank === 1 ? 'text-amber-400 font-bold' :
                      user.rank === 2 ? 'text-gray-300 font-bold' :
                        user.rank === 3 ? 'text-amber-600 font-bold' : 'text-gray-400'
                    }`}>
                    {user.rank}
                  </span>
                  {user.rank <= 3 && (
                    <span className='ml-1 text-xs'>
                      {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                    </span>
                  )}
                </div>
                <div className='col-span-3 flex items-center gap-3'>
                  <span className='text-lg'>{user.avatar}</span>
                  <span className={`text-sm truncate ${user.id === currentUser.id ? 'text-indigo-300' : 'text-gray-200'
                    }`}>
                    {user.name}
                  </span>
                </div>
                <div className='col-span-2'>
                  <span className={`text-xs px-2 py-1 rounded-full ${user.department === 'Security' ? 'bg-purple-900/50 text-purple-300' :
                      user.department === 'Engineering' ? 'bg-blue-900/50 text-blue-300' :
                        user.department === 'Networking' ? 'bg-emerald-900/50 text-emerald-300' :
                          'bg-gray-700/50 text-gray-300'
                    }`}>
                    {user.department}
                  </span>
                </div>
                <div className='col-span-2 text-right'>
                  <span className='text-sm font-mono text-emerald-400'>{user.score.toLocaleString()}</span>
                </div>
                <div className='col-span-2 text-right'>
                  <span className='text-sm text-gray-300'>{user.completed}</span>
                </div>
                <div className='col-span-2 text-right'>
                  <button
                    onClick={() => console.log(`View ${user.name}'s profile`)}
                    className='text-xs text-blue-400 hover:text-blue-300 border border-blue-400/30 px-2 py-1 rounded hover:border-blue-400/50 hover:bg-blue-400/5 transition-colors'
                  >
                    View
                  </button>
                </div>
              </div>
            ))}

            {/* Current User (if not in top 10) */}
            {showCurrentUser && (
              <div className='grid grid-cols-12 gap-2 p-4 items-center bg-indigo-900/10 hover:bg-indigo-900/20 border-t-2 border-indigo-500/30'>
                <div className='col-span-1 text-sm text-indigo-300'>{currentUser.rank}</div>
                <div className='col-span-3 flex items-center gap-3'>
                  <span className='text-lg'>{currentUser.avatar}</span>
                  <span className='text-sm text-indigo-300'>{currentUser.name}</span>
                </div>
                <div className='col-span-2'>
                  <span className='text-xs px-2 py-1 rounded-full bg-indigo-900/50 text-indigo-300'>
                    {currentUser.department}
                  </span>
                </div>
                <div className='col-span-2 text-right'>
                  <span className='text-sm font-mono text-emerald-400'>{currentUser.score.toLocaleString()}</span>
                </div>
                <div className='col-span-2 text-right'>
                  <span className='text-sm text-gray-300'>{currentUser.completed}</span>
                </div>
                <div className='col-span-2 text-right'>
                  <button className='text-xs text-blue-400 border border-blue-400/30 px-2 py-1 rounded cursor-default'>
                    You
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* User Ranking */}
          <div className='p-4 border border-indigo-500/30 rounded-xl bg-black/50 backdrop-blur-sm hover:border-indigo-500/50 transition-all duration-300'>
            <h3 className='text-sm text-indigo-400 mb-2'>Your Position</h3>
            <div className='flex items-end gap-2'>
              <span className='text-3xl text-indigo-300'>{currentUser.rank}</span>
              <span className='text-xs text-gray-400 mb-1'>out of {leaderboardData.length} users</span>
            </div>
            <div className='mt-2 h-2 w-full bg-gray-800 rounded-full overflow-hidden'>
              <div
                className='h-full bg-indigo-500'
                style={{ width: `${100 - ((currentUser.rank - 1) / (leaderboardData.length - 1) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Score Progress */}
          <div className='p-4 border border-emerald-500/30 rounded-xl bg-black/50 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300'>
            <h3 className='text-sm text-emerald-400 mb-2'>Your Score</h3>
            <div className='flex items-end gap-2'>
              <span className='text-3xl text-emerald-300'>{currentUser.score.toLocaleString()}</span>
              {displayData.length > 0 && (
                <span className='text-xs text-gray-400 mb-1'>
                  {Math.round((currentUser.score / displayData[0].score) * 100)}% of top score
                </span>
              )}
            </div>
            <div className='mt-2 h-2 w-full bg-gray-800 rounded-full overflow-hidden'>
              <div
                className='h-full bg-emerald-500'
                style={{ width: `${displayData.length > 0 ? (currentUser.score / displayData[0].score) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          {/* Department Ranking */}
          <div className='p-4 border border-purple-500/30 rounded-xl bg-black/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 overflow-hidden'>
            <h3 className='text-sm text-purple-400 mb-2'>Department Rank</h3>
            <div className='flex items-end gap-2'>
              <span className='text-3xl text-purple-300'>
                {Array.from(new Set(leaderboardData.map(u => u.department))).length}
              </span>
              <span className='text-xs text-gray-400 mb-1'>departments competing</span>
            </div>
            <div className='my-2 flex gap-2 overflow-x-auto'>
              {Array.from(new Set(leaderboardData.map(u => u.department)))
                .slice(0, 3)
                .map(dept => (
                  <span key={dept} className='text-xs px-2 py-1 rounded-full bg-purple-900/50 text-purple-300'>
                    {dept}
                  </span>
                ))}
              {Array.from(new Set(leaderboardData.map(u => u.department))).length > 3 && (
                <span className='text-xs px-2 py-1 rounded-full bg-gray-800/50 text-gray-400'>
                  +{Array.from(new Set(leaderboardData.map(u => u.department))).length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : <Education />;
};

export default Leaderboard;