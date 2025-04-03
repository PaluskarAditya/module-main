import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import Education from './Education';
const Tournaments = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { mode } = useOutletContext();

  // Tournament data
  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      name: 'Cyber Security Challenge',
      status: 'active',
      startDate: '2023-06-15',
      endDate: '2023-06-22',
      participants: 42,
      maxParticipants: 100,
      difficulty: 'Hard',
      prize: 'VIP Security Training',
      description: 'Compete in various security challenges including CTF, phishing detection, and system hardening',
      categories: ['CTF', 'Phishing', 'Forensics'],
      leaderboard: [
        { id: 1, name: 'SecureNinja', score: 9850, avatar: '🦹‍♂️' },
        { id: 2, name: 'PhishMaster', score: 8720, avatar: '🎣' },
        { id: 3, name: 'CryptoKing', score: 8450, avatar: '👑' }
      ]
    },
    {
      id: 2,
      name: 'Network Defense League',
      status: 'upcoming',
      startDate: '2023-07-01',
      endDate: '2023-07-08',
      participants: 28,
      maxParticipants: 50,
      difficulty: 'Medium',
      prize: 'Network Monitoring Toolkit',
      description: 'Defend against simulated network attacks and show your defensive skills',
      categories: ['Networking', 'Firewall', 'IDS/IPS'],
      leaderboard: []
    },
    {
      id: 3,
      name: 'Bug Hunters Cup',
      status: 'completed',
      startDate: '2023-05-10',
      endDate: '2023-05-17',
      participants: 35,
      maxParticipants: 50,
      difficulty: 'Easy',
      prize: 'Swag Package',
      description: 'Find and report vulnerabilities in our test applications',
      categories: ['Web App', 'API', 'Mobile'],
      winner: { id: 1, name: 'BugFinder', score: 6500, avatar: '🐛' },
      leaderboard: [
        { id: 1, name: 'BugFinder', score: 6500, avatar: '🐛' },
        { id: 2, name: 'VulnSeeker', score: 5800, avatar: '🔍' },
        { id: 3, name: 'CodeAuditor', score: 5200, avatar: '👓' }
      ]
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState({});
  const [currentUser] = useState({ id: 42, name: 'You', avatar: '😎' });

  // Filter tournaments based on active tab
  const filteredTournaments = tournaments.filter(tournament => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return tournament.status === 'active';
    if (activeTab === 'upcoming') return tournament.status === 'upcoming';
    if (activeTab === 'completed') return tournament.status === 'completed';
    return true;
  });

  // Handle registration
  const handleRegister = (tournamentId) => {
    setRegistrationStatus(prev => ({
      ...prev,
      [tournamentId]: !prev[tournamentId]
    }));
  };

  // Join tournament (in a real app, this would navigate to the tournament)
  const handleJoin = (tournamentId) => {
    console.log(`Joining tournament ${tournamentId}`);
    // navigate(`/home/${params.dept}/tournaments/${tournamentId}`);
  };

  useEffect(() => {
    // Check if the selected tournament is valid
    if (selectedTournament && !tournaments.find(t => t.id === selectedTournament.id)) {
      setSelectedTournament(null);
    }
  }, [selectedTournament, tournaments]);

  return mode === 'gaming' ? (
    <div className='min-h-screen w-full flex flex-col items-center justify-center pt-[4.5rem] text-gray-300 tracking-widest bg-gradient-to-b from-gray-900 to-black'>
      <div className='w-full max-w-7xl h-full flex flex-col gap-6 items-center px-8 pb-8'>
        {/* Header */}
        <div className='w-full flex flex-col gap-2 p-6 border border-indigo-500/30 rounded-xl bg-black/50 backdrop-blur-sm hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-300'>
          <div className="flex items-center justify-between w-full">
            <h1 className='text-xl text-indigo-400'>Tournaments</h1>
            <button
              onClick={() => navigate(`/home/${params.dept}`)}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors border border-indigo-400/30 px-4 py-2 rounded-lg hover:border-indigo-400/50 hover:bg-indigo-400/5"
            >
              ← Back to Hub
            </button>
          </div>
          <p className='text-sm text-gray-400 mt-2'>
            Compete against colleagues in time-limited security challenges
          </p>
        </div>

        {/* Tabs */}
        <div className='w-full flex border-b border-gray-700/50'>
          {['all', 'active', 'upcoming', 'completed'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-medium transition-all duration-300 border-b-2 ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {selectedTournament ? (
          /* Tournament Detail View */
          <div className='w-full flex flex-col gap-6'>
            {/* Back button */}
            <button
              onClick={() => setSelectedTournament(null)}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors border border-blue-400/30 px-4 py-2 rounded-lg hover:border-blue-400/50 hover:bg-blue-400/5 w-fit"
            >
              ← Back to Tournaments
            </button>

            {/* Tournament Header */}
            <div className='w-full p-6 border border-purple-500/30 rounded-xl bg-black/50 backdrop-blur-sm'>
              <div className='flex flex-col md:flex-row justify-between gap-4'>
                <div>
                  <h2 className='text-xl text-purple-400 mb-2'>{selectedTournament.name}</h2>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedTournament.difficulty === 'Easy' ? 'bg-emerald-900/50 text-emerald-300' :
                      selectedTournament.difficulty === 'Medium' ? 'bg-amber-900/50 text-amber-300' :
                      'bg-rose-900/50 text-rose-300'
                    }`}>
                      {selectedTournament.difficulty}
                    </span>
                    {selectedTournament.categories.map(category => (
                      <span key={category} className='text-xs px-2 py-1 rounded-full bg-gray-800/50 text-gray-300'>
                        {category}
                      </span>
                    ))}
                  </div>
                  <p className='text-sm text-gray-400'>{selectedTournament.description}</p>
                </div>
                <div className='flex flex-col items-end gap-2'>
                  <div className='text-right'>
                    <p className='text-xs text-gray-400'>Status</p>
                    <p className={`text-sm ${
                      selectedTournament.status === 'active' ? 'text-emerald-400' :
                      selectedTournament.status === 'upcoming' ? 'text-amber-400' :
                      'text-blue-400'
                    }`}>
                      {selectedTournament.status.charAt(0).toUpperCase() + selectedTournament.status.slice(1)}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='text-xs text-gray-400'>Prize</p>
                    <p className='text-sm text-purple-400'>{selectedTournament.prize}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tournament Info Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {/* Date Card */}
              <div className='p-4 border border-blue-500/30 rounded-xl bg-black/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300'>
                <h3 className='text-sm text-blue-400 mb-2'>Dates</h3>
                <div className='flex justify-between text-xs'>
                  <span className='text-gray-400'>Start:</span>
                  <span className='text-gray-300'>{new Date(selectedTournament.startDate).toLocaleDateString()}</span>
                </div>
                <div className='flex justify-between text-xs mt-1'>
                  <span className='text-gray-400'>End:</span>
                  <span className='text-gray-300'>{new Date(selectedTournament.endDate).toLocaleDateString()}</span>
                </div>
                {selectedTournament.status === 'active' && (
                  <div className='mt-3'>
                    <div className='h-1 w-full bg-gray-800 rounded-full overflow-hidden'>
                      <div 
                        className='h-full bg-blue-500' 
                        style={{ 
                          width: `${Math.min(
                            100, 
                            ((new Date() - new Date(selectedTournament.startDate)) / 
                            (new Date(selectedTournament.endDate) - new Date(selectedTournament.startDate)) * 100
                          ).toFixed(2))}%` 
                        }}
                      ></div>
                    </div>
                    <p className='text-xs text-gray-400 mt-1 text-center'>
                      {Math.ceil(
                        (new Date(selectedTournament.endDate) - new Date()) / (1000 * 60 * 60 * 24)
                      )} days remaining
                    </p>
                  </div>
                )}
              </div>

              {/* Participants Card */}
              <div className='p-4 border border-purple-500/30 rounded-xl bg-black/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300'>
                <h3 className='text-sm text-purple-400 mb-2'>Participants</h3>
                <div className='flex items-end gap-2'>
                  <span className='text-2xl text-purple-300'>{selectedTournament.participants}</span>
                  <span className='text-xs text-gray-400 mb-1'>/{selectedTournament.maxParticipants}</span>
                </div>
                <div className='mt-2 h-2 w-full bg-gray-800 rounded-full overflow-hidden'>
                  <div 
                    className='h-full bg-purple-500' 
                    style={{ width: `${(selectedTournament.participants / selectedTournament.maxParticipants) * 100}%` }}
                  ></div>
                </div>
                {selectedTournament.status !== 'completed' && (
                  <button
                    onClick={() => handleRegister(selectedTournament.id)}
                    className={`mt-3 w-full text-xs px-3 py-1.5 rounded-lg border transition-all duration-300 ${
                      registrationStatus[selectedTournament.id]
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-purple-500 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'
                    }`}
                  >
                    {registrationStatus[selectedTournament.id] ? 'Registered ✓' : 'Register Now'}
                  </button>
                )}
              </div>

              {/* Actions Card */}
              <div className='p-4 border border-indigo-500/30 rounded-xl bg-black/50 backdrop-blur-sm hover:border-indigo-500/50 transition-all duration-300'>
                <h3 className='text-sm text-indigo-400 mb-2'>Actions</h3>
                {selectedTournament.status === 'active' ? (
                  <button
                    onClick={() => handleJoin(selectedTournament.id)}
                    className='w-full text-xs text-white bg-indigo-500/90 px-3 py-1.5 rounded-lg border border-indigo-500 hover:bg-indigo-500 transition-all duration-300'
                  >
                    Join Tournament
                  </button>
                ) : selectedTournament.status === 'completed' ? (
                  <div className='text-center'>
                    <p className='text-xs text-gray-400 mb-2'>Winner:</p>
                    <div className='flex items-center justify-center gap-2'>
                      <span className='text-lg'>{selectedTournament.winner.avatar}</span>
                      <span className='text-sm text-amber-400'>{selectedTournament.winner.name}</span>
                    </div>
                  </div>
                ) : (
                  <p className='text-xs text-gray-400'>
                    Tournament starts in {Math.ceil(
                      (new Date(selectedTournament.startDate) - new Date()) / (1000 * 60 * 60 * 24)
                    )} days
                  </p>
                )}
                {selectedTournament.status !== 'completed' && (
                  <button className='w-full text-xs text-gray-400 border border-gray-600/30 px-3 py-1.5 rounded-lg mt-2 hover:border-gray-500/50 hover:bg-gray-700/10 transition-all duration-300'>
                    View Rules
                  </button>
                )}
              </div>
            </div>

            {/* Leaderboard */}
            <div className='w-full border border-gray-700/50 rounded-xl overflow-hidden bg-black/50 backdrop-blur-sm'>
              <div className='p-4 bg-gray-900/30 border-b border-gray-700/50'>
                <h3 className='text-sm text-purple-400'>Leaderboard</h3>
              </div>
              <div className='divide-y divide-gray-700/50'>
                {selectedTournament.leaderboard.length > 0 ? (
                  selectedTournament.leaderboard.map((user, index) => (
                    <div key={user.id} className='grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-800/30 transition-all duration-300'>
                      <div className='col-span-1 text-sm text-gray-400'>{index + 1}</div>
                      <div className='col-span-6 flex items-center gap-3'>
                        <span className='text-lg'>{user.avatar}</span>
                        <span className='text-sm text-gray-200'>{user.name}</span>
                        {user.id === currentUser.id && (
                          <span className='text-xs px-2 py-0.5 rounded-full bg-indigo-900/50 text-indigo-300'>You</span>
                        )}
                      </div>
                      <div className='col-span-3 text-right'>
                        <span className='text-sm font-mono text-emerald-400'>{user.score.toLocaleString()}</span>
                      </div>
                      <div className='col-span-2 text-right'>
                        <span className='text-xs text-gray-400'>{(user.score / 10000 * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='p-6 text-center'>
                    <p className='text-sm text-gray-400'>No leaderboard data available yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Tournament List View */
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredTournaments.map(tournament => (
              <div 
                key={tournament.id}
                onClick={() => setSelectedTournament(tournament)}
                className={`p-6 border rounded-xl bg-black/50 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] group ${
                  tournament.status === 'active' ? 'border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]' :
                  tournament.status === 'upcoming' ? 'border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/10 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]' :
                  'border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/10 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h2 className={`text-lg mb-2 group-hover:text-white ${
                    tournament.status === 'active' ? 'text-emerald-400' :
                    tournament.status === 'upcoming' ? 'text-amber-400' :
                    'text-blue-400'
                  }`}>
                    {tournament.name}
                  </h2>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    tournament.difficulty === 'Easy' ? 'bg-emerald-900/50 text-emerald-300' :
                    tournament.difficulty === 'Medium' ? 'bg-amber-900/50 text-amber-300' :
                    'bg-rose-900/50 text-rose-300'
                  }`}>
                    {tournament.difficulty}
                  </span>
                </div>
                <p className='text-xs text-gray-400 group-hover:text-white mb-4'>
                  {tournament.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    tournament.status === 'active' ? 'bg-emerald-900/50 text-emerald-300' :
                    tournament.status === 'upcoming' ? 'bg-amber-900/50 text-amber-300' :
                    'bg-blue-900/50 text-blue-300'
                  }`}>
                    {tournament.status}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 group-hover:text-gray-300">
                      {tournament.participants}/{tournament.maxParticipants}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegister(tournament.id);
                      }}
                      className={`text-xs px-2 py-1 rounded border transition-all duration-300 ${
                        registrationStatus[tournament.id]
                          ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                          : 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {registrationStatus[tournament.id] ? 'Registered' : 'Register'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : <Education />;
};

export default Tournaments;