import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function M1() {
  const { mode } = useOutletContext();
  const navigate = useNavigate();
  const params = useParams();
  const [foundElements, setFoundElements] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStatus, setGameStatus] = useState('playing');
  const [hintVisible, setHintVisible] = useState(null);
  const buttonsRef = useRef([]);

  // Define suspicious elements with precise positioning
  const suspiciousElements = [
    {
      id: 1,
      name: "Suspicious Link",
      hint: "Check for mismatched URLs in links",
      position: "top-[1%] left-[12.5%] w-[270px] h-[28px]",
      className: "border-red-500"
    },
    {
      id: 2,
      name: "Credential Harvesting",
      hint: "Phishing often creates false urgency",
      position: "top-[45%] left-[29%] w-[385px] h-[94px]",
      className: "border-yellow-500"
    },
    {
      id: 3,
      name: "Fake Login Button",
      hint: "Unexpected attachments are dangerous",
      position: "top-[68%] left-[29%] w-[384px] h-[44px]",
      className: "border-purple-500"
    },
  ];

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && gameStatus === 'playing') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameStatus('lost');
    }
  }, [timeLeft, gameStatus]);

  // Check win condition
  useEffect(() => {
    if (foundElements.length === suspiciousElements.length) {
      setGameStatus('won');
    }
  }, [foundElements, suspiciousElements.length]);

  const handleElementClick = (id) => {
    if (!foundElements.includes(id)) {
      setFoundElements([...foundElements, id]);
      setHintVisible(id);
      setTimeout(() => setHintVisible(null), 2000);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const returnToMissions = () => {
    console.log(params.dept);
    navigate(`/home/${params.dept}`); // Fixed navigation path
  };

  const restartMission = () => {
    setFoundElements([]);
    setTimeLeft(60);
    setGameStatus('playing');
    setHintVisible(null);
  };

  return (
    <div className='h-full w-full flex flex-col lg:flex-row items-center justify-center gap-4 p-4 pt-0 bg-gray-900'>
      {/* Game Area */}
      <div className='w-full lg:w-3/4 relative'>
        {/* Win/Lose Overlays */}
        {gameStatus === 'won' && (
          <div className='absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 backdrop-blur-md'>
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className='flex flex-col gap-4 bg-white/10 p-8 rounded-2xl border border-cyan-400 shadow-lg'
            >
              <h1 className='text-2xl text-cyan-400 font-bold'>Mission Complete!</h1>
              <p className='text-cyan-300'>You found all suspicious elements!</p>
              <button
                onClick={returnToMissions}
                className='mt-3 px-5 border-2 border-purple-600 py-3 hover:bg-purple-900/50 hover:shadow-purple-900/50 shadow-lg rounded-lg text-white transition-all transform hover:scale-105'
              >
                Return to Missions
              </button>
            </motion.div>
          </div>
        )}

        {gameStatus === 'lost' && (
          <div className='absolute inset-0 z-50 bg-black/70 flex items-center justify-center'>
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className='flex flex-col gap-3 bg-gray-900 p-6 rounded-xl border border-red-500/30'
            >
              <h1 className='text-xl text-red-400'>Time's Up!</h1>
              <p className='text-gray-400'>
                Found {foundElements.length}/{suspiciousElements.length} elements
              </p>
              <button
                onClick={restartMission}
                className='mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white'
              >
                Try Again
              </button>
            </motion.div>
          </div>
        )}

        {/* Email Image */}
        <div className='relative overflow-hidden rounded-lg border border-gray-700'>
          <img
            src="https://www.mailguard.com.au/hs-fs/hubfs/Blog_Post_Images/MailGuadr_Fake_eBay_Email_Phishing_Scam_Feature.jpg?width=750&height=456&name=MailGuadr_Fake_eBay_Email_Phishing_Scam_Feature.jpg"
            className='w-full h-auto max-h-[80vh] object-contain'
            alt="Phishing Email Example"
          />

          {/* Clickable Elements */}
          {suspiciousElements.map((element, index) => (
            <React.Fragment key={element.id}>
              <button
                ref={el => buttonsRef.current[index] = el}
                className={`absolute ${element.position} border-2 ${element.className} transition-all
                  ${foundElements.includes(element.id) ? 'opacity-70' : 'opacity-0 hover:opacity-70'}
                  ${gameStatus !== 'playing' ? 'pointer-events-none' : ''}
                `}
                onClick={() => handleElementClick(element.id)}
              >
                {foundElements.includes(element.id) && (
                  <div className="absolute -bottom-6 left-0 bg-black text-white text-xs px-2 py-1 rounded flex items-center">
                    <span className="mr-1">✓</span> {element.name}
                  </div>
                )}
              </button>

              {/* Hint Popup */}
              {hintVisible === element.id && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`absolute ${element.position.split(' ')[0]} -top-20 left-0 bg-gray-800 text-white p-2 rounded-lg text-sm shadow-lg z-50 w-64`}
                >
                  {element.hint}
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Dashboard */}
      <div className='w-full lg:w-1/4 bg-gray-800/80 p-4 rounded-lg border border-gray-700'>
        <h2 className='text-xl text-indigo-400 mb-4'>Phishing Inspector</h2>
        
        <div className='space-y-4'>
          {/* Timer */}
          <div className='bg-gray-900/50 p-3 rounded-lg'>
            <div className='flex justify-between items-center mb-1'>
              <span className='text-gray-400 text-sm'>Time Remaining</span>
              <span className={`font-mono ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className='w-full bg-gray-700 h-2 rounded-full overflow-hidden'>
              <div 
                className='h-full bg-indigo-600 transition-all duration-1000'
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Progress */}
          <div className='bg-gray-900/50 p-3 rounded-lg'>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-gray-400 text-sm'>Elements Found</span>
              <span className='font-mono text-white'>
                {foundElements.length}/{suspiciousElements.length}
              </span>
            </div>
            <div className='grid grid-cols-1 gap-2'>
              {suspiciousElements.map(element => (
                <div
                  key={element.id}
                  className={`p-2 rounded text-xs flex items-center ${foundElements.includes(element.id) ? 'bg-green-900/50 text-green-400' : 'bg-gray-700/50 text-gray-400'}`}
                >
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${foundElements.includes(element.id) ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                  {element.name}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={restartMission}
            className='w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300'
          >
            Restart Mission
          </button>
        </div>
      </div>
    </div>
  );
}