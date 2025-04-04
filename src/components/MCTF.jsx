import React, { useState } from 'react';
import M1 from './M1';
import Education from './Education';
import { useOutletContext, useNavigate, useParams } from "react-router-dom";

export default function MCTF() {
  const { mode } = useOutletContext();
  const navigate = useNavigate();
  const params = useParams();
  const [activeMission, setActiveMission] = useState(null);
  const [missionStatus, setMissionStatus] = useState({
    '1': { completed: false, score: 0 },
    '2': { completed: false, score: 0 },
    '3': { completed: false, score: 0 }
  });

  const missions = [
    {
      id: '1',
      comp: <M1 onComplete={(score) => handleMissionComplete('1', score)} />,
      name: 'Mission 1: Phishing Detection',
      description: 'Identify phishing attempts by spotting suspicious elements in emails and websites.',
      difficulty: 'Easy',
    },
    {
      id: '2',
      comp: null,
      name: 'Mission 2: Network Intrusion',
      description: 'Analyze network traffic to identify suspicious activity and prevent a breach.',
      difficulty: 'Medium',
    },
    {
      id: '3',
      comp: null,
      name: 'Mission 3: Cryptic Vault',
      description: 'Decrypt the secret message to access the secured vault and retrieve the flag.',
      difficulty: 'Hard',
    }
  ];

  const handleClick = (mission) => {
    if (mission.comp) {
      setActiveMission(mission.comp);
    }
  };

  const handleMissionComplete = (id, score) => {
    setMissionStatus(prev => ({
      ...prev,
      [id]: { completed: true, score }
    }));
  };

  return mode === 'gaming' ? (
    <div className='min-h-screen w-full flex flex-col items-center justify-center text-gray-300 tracking-widest bg-gradient-to-b from-gray-900 to-black'>
      <div className='w-full max-w-7xl h-full flex flex-col gap-6 items-center px-8'>
        <div className='w-full flex flex-col gap-2 p-6 border border-indigo-500/30 rounded-xl bg-black/50 backdrop-blur-sm'>
          <div className="flex items-center justify-between w-full">
            <h1 className='text-xl text-indigo-400'>Missions</h1>
            <button
              onClick={() => {
                navigate(`/home/${params.dept}`);
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors border border-indigo-400/30 px-4 py-2 rounded-lg hover:border-indigo-400/50 hover:bg-indigo-400/5"
            >
              ← Back to Hub
            </button>
          </div>
          <p className='text-sm text-gray-400 mt-2'>
            Complete missions to earn points and unlock new challenges. Each mission tests different cybersecurity skills.
          </p>
        </div>

        {activeMission ? (
          <div className="w-full">
            {activeMission}
          </div>
        ) : (
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {missions.map((mission) => (
              <div
                key={mission.id}
                onClick={() => handleClick(mission)}
                className={`p-6 border rounded-xl bg-black/50 backdrop-blur-sm cursor-pointer group transition-all duration-300 hover:scale-[1.02] 
                  ${mission.difficulty === 'Easy' ?
                    'border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/20 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]' :
                    mission.difficulty === 'Medium' ?
                      'border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/20 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]' :
                      'border-rose-500/30 hover:border-rose-500 hover:bg-rose-500/20 hover:shadow-[0_0_25px_rgba(244,63,94,0.3)]'
                  }`}
              >
                <div className="flex items-start justify-between">
                  <h2 className={`text-lg mb-2 group-hover:text-white ${mission.difficulty === 'Easy' ? 'text-purple-400' :
                      mission.difficulty === 'Medium' ? 'text-amber-400' :
                        'text-rose-400'
                    }`}>
                    {mission.name}
                  </h2>
                  <span className={`text-xs px-2 py-1 rounded-full ${mission.difficulty === 'Easy' ? 'bg-purple-900/50 text-purple-300' :
                      mission.difficulty === 'Medium' ? 'bg-amber-900/50 text-amber-300' :
                        'bg-rose-900/50 text-rose-300'
                    }`}>
                    {mission.difficulty}
                  </span>
                </div>
                <p className='text-xs text-gray-400 group-hover:text-white mb-3'>
                  {mission.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500 group-hover:text-gray-300">
                    {missionStatus[mission.id].completed ?
                      `✓ Completed (${missionStatus[mission.id].score}%)` :
                      '⌛ Pending'}
                  </span>
                  <button
                    className={`text-xs px-3 py-1 rounded-lg border ${missionStatus[mission.id].completed ?
                        'border-green-500 text-green-400' :
                        'border-gray-600 hover:border-white hover:text-white'
                      } transition-colors`}
                  >
                    {missionStatus[mission.id].completed ? 'Replay' : 'Start'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : <Education />;
}