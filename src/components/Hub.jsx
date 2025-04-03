import React from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import Education from './Education';

export default function Hub() {
  const navigate = useNavigate();
  const params = useParams();
  const { mode } = useOutletContext();

  return (
    <>
      {mode === 'gaming' ? (
        <div className='min-h-screen w-full flex flex-col items-center justify-center pt-[4.5rem] text-gray-300 tracking-widest bg-gradient-to-b from-gray-900 to-black'>
          <div className='w-full max-w-7xl h-full flex flex-col gap-6 items-center px-8'>
            <div className='w-full flex flex-col gap-2 p-6 border border-indigo-500/30 rounded-xl bg-black/50 backdrop-blur-sm hover:border-indigo-500/50 hover:bg-indigo-500/5 hover:text-indigo-500/50 transition-all duration-300 text-center'>
              <div className="flex items-center justify-between w-full">
                <h1 className='text-xl text-indigo-400'>Hub</h1>
                <button
                  onClick={() => navigate('/home')}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors border border-indigo-400/30 px-4 py-2 rounded-lg hover:border-indigo-400/50 hover:bg-indigo-400/5"
                >
                  ← Back to Departments
                </button>
              </div>
            </div>
            <div className='w-full flex flex-col gap-4'>
              <div className='grid grid-cols-3 gap-4'>
                <div
                  onClick={() => navigate(`/home/${params.dept}/ctf`)}
                  className='p-6 border border-purple-500/30 rounded-xl bg-black/50 backdrop-blur-sm cursor-pointer hover:border-purple-500 hover:bg-purple-500/20 group hover:text-white hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-300 hover:scale-[1.02] text-center'
                >
                  <h2 className='text-lg text-purple-400 mb-2 group-hover:text-white'>CTF</h2>
                  <p className='text-xs text-gray-400 group-hover:text-white'>
                    Capture The Flag - Test your cybersecurity skills by finding hidden flags in various challenges
                  </p>
                </div>

                <div
                  onClick={() => navigate(`/home/${params.dept}/quiz`)}
                  className='p-6 border border-emerald-500/30 rounded-xl bg-black/50 backdrop-blur-sm cursor-pointer hover:border-emerald-500 hover:bg-emerald-500/20 group hover:text-white hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-[1.02] text-center'
                >
                  <h2 className='text-lg text-emerald-400 mb-2 group-hover:text-white'>Quiz</h2>
                  <p className='text-xs text-gray-400 group-hover:text-white'>
                    Quiz - Test your cybersecurity knowledge with a series of questions
                  </p>
                </div>

                <div
                  onClick={() => navigate(`/home/${params.dept}/mission`)}
                  className='p-6 border border-amber-500/30 rounded-xl bg-black/50 backdrop-blur-sm cursor-pointer hover:border-amber-500 hover:bg-amber-500/20 group hover:text-white hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all duration-300 hover:scale-[1.02] text-center'
                >
                  <h2 className='text-lg text-amber-400 mb-2 group-hover:text-white'>Mission</h2>
                  <p className='text-xs text-gray-400 group-hover:text-white'>
                    Mission - Complete a series of missions to earn points and unlock new challenges
                  </p>
                </div>

              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div
                  onClick={() => navigate(`/home/${params.dept}/leaderboard`)}
                  className='p-6 border border-blue-500/30 rounded-xl bg-black/50 backdrop-blur-sm cursor-pointer hover:border-blue-500 hover:bg-blue-500/20 group hover:text-white hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] transition-all duration-300 hover:scale-[1.02] text-center'
                >
                  <h2 className='text-lg text-blue-400 mb-2 group-hover:text-white'>Leaderboard</h2>
                  <p className='text-xs text-gray-400 group-hover:text-white'>
                    Leaderboard - Check your ranking and compete with others
                  </p>
                </div>
                <div className='w-full flex justify-center'>
                  <div
                    onClick={() => navigate(`/home/${params.dept}/tournament`)}
                    className='w-full p-6 border border-rose-500/30 rounded-xl bg-black/50 backdrop-blur-sm cursor-pointer hover:border-rose-500 hover:bg-rose-500/20 group hover:text-white hover:shadow-[0_0_25px_rgba(244,63,94,0.3)] transition-all duration-300 hover:scale-[1.02] text-center'
                  >
                    <h2 className='text-lg text-rose-400 mb-2 group-hover:text-white'>Tournament</h2>
                    <p className='text-xs text-gray-400 group-hover:text-white'>
                      Compete against other cybersecurity enthusiasts in time-based challenges
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Education />
      )}
    </>
  );
}
