import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Education from './Education';

export default function Home() {
  const { mode } = useOutletContext();
  const navigate = useNavigate();

  const departments = [
    { name: 'HR', color: 'indigo', icon: '👥' },
    { name: 'Finance', color: 'purple', icon: '💰' },
    { name: 'IT', color: 'cyan', icon: '💻' },
    { name: 'Marketing', color: 'pink', icon: '📢' }
  ];

  return (
    <>
      {mode === 'gaming' ? (
        <div className='min-h-screen w-full flex flex-col items-center justify-center pt-[4.5rem] text-gray-300 tracking-widest bg-gradient-to-b from-gray-900 to-black'>
          <div className='w-full max-w-4xl flex flex-col gap-6 items-center px-6'>
            {/* Header Card */}
            <div className='w-full p-6 border border-indigo-500/30 rounded-xl bg-black/50 backdrop-blur-sm hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-300'>
              <div className="flex flex-col items-center text-center">
                <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-2'>
                  CYBER GUARD
                </h1>
                <p className='text-sm text-gray-400 max-w-md'>
                  Select your department to access specialized cybersecurity training modules
                </p>
              </div>
            </div>

            {/* Department Grid */}
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
              {departments.map((dept) => (
                <div
                  key={dept.name}
                  onClick={() => navigate(`/home/${dept.name.toLowerCase()}`)}
                  className={`p-6 border rounded-xl bg-black/50 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] group
                    ${dept.color === 'indigo' ? 'border-indigo-500/30 hover:border-indigo-500 hover:bg-indigo-500/10 hover:shadow-[0_0_25px_rgba(79,70,229,0.2)]' : 
                      dept.color === 'purple' ? 'border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]' :
                      dept.color === 'cyan' ? 'border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]' :
                      'border-pink-500/30 hover:border-pink-500 hover:bg-pink-500/10 hover:shadow-[0_0_25px_rgba(236,72,153,0.2)]'}
                  `}
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <span className="text-3xl">{dept.icon}</span>
                    <h2 className={`text-lg font-medium group-hover:text-white ${
                      dept.color === 'indigo' ? 'text-indigo-400' :
                      dept.color === 'purple' ? 'text-purple-400' :
                      dept.color === 'cyan' ? 'text-cyan-400' : 'text-pink-400'
                    }`}>
                      {dept.name} Department
                    </h2>
                    <p className='text-xs text-gray-400 group-hover:text-gray-300'>
                      {dept.name}-specific security protocols and training
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Note */}
            <div className="text-xs text-gray-500 mt-4 text-center">
              [ SYSTEM: ALL DEPARTMENTS OPERATIONAL ]
            </div>
          </div>
        </div>
      ) : (
        <Education />
      )}
    </>
  );
}