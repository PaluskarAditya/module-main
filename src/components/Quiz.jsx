import React, { useState, useEffect } from "react";
import { quizData } from "./data/data";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import Education from "./Education";

const Quiz = () => {
  const navigate = useNavigate();
  const { dept } = useParams();
  const { mode } = useOutletContext(); // Get the mode from context
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showBonus, setShowBonus] = useState(false);

  useEffect(() => {
    // Reset quiz state when mode changes
    setCurrentQuestion(0);
    setSelectedOption(null);
    setFeedback(null);
    setScore(0);
    setQuizCompleted(false);
    setStreak(0);
    setShowBonus(false);
  }, [mode]); // Depend on mode to reset the quiz state

  const handleAnswerClick = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);

    const isCorrect = index === quizData[currentQuestion].correct;

    if (isCorrect) {
      const basePoints = 10;
      let bonusPoints = 0;

      if (streak >= 2) {
        bonusPoints = Math.min(streak * 5, 20);
        setShowBonus(true);
        setTimeout(() => setShowBonus(false), 1000);
      }

      setScore(score + basePoints + bonusPoints);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    setFeedback(quizData[currentQuestion].aiResponse[index]);

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setFeedback(null);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const progressPercentage = ((currentQuestion + 1) / quizData.length) * 100;

  return mode === 'gaming' ? (
    <div className="min-h-screen w-full flex flex-col items-center justify-center pt-[4.5rem] text-gray-300 tracking-widest bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-7xl h-full flex flex-col gap-6 items-center px-8">
        <div className="w-full flex flex-col gap-2 p-6 border border-emerald-500/30 rounded-xl bg-black/70 backdrop-blur-sm hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:text-emerald-500/50 transition-all duration-300">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-xl text-emerald-400">Quiz</h1>
            <button
              onClick={() => navigate(`/home/${dept}`)}
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors border border-emerald-400/30 px-4 py-2 rounded-lg hover:border-emerald-400/50 hover:bg-emerald-400/5 bg-black/50"
            >
              ← Back to Hub
            </button>
          </div>
        </div>

        {!quizCompleted ? (
          <div className="w-full p-6 border border-emerald-500/30 rounded-xl bg-black/70 backdrop-blur-sm hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300">
            <div className="flex justify-between items-center mb-8">
              <div className="text-emerald-400 text-sm tracking-wider">
                Question {currentQuestion + 1}/{quizData.length}
              </div>
              <div className="flex items-center gap-6">
                <div className="text-emerald-500 text-sm">Score: {score}</div>
                {streak > 1 && (
                  <div className="text-amber-500 text-sm animate-pulse flex items-center gap-2">
                    <span className="text-lg">🔥</span> x{streak}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full bg-gray-800/70 h-1 rounded-full mb-8">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <h1 className="text-emerald-400 text-sm mb-8 leading-relaxed">
              {quizData[currentQuestion].question}
            </h1>

            <div className="grid grid-cols-2 gap-4">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-xl text-xs transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm
                  ${selectedOption === index
                      ? index === quizData[currentQuestion].correct
                        ? "border-2 border-emerald-500 bg-emerald-500/20 text-emerald-400"
                        : "border-2 border-rose-500 bg-rose-500/20 text-rose-400"
                      : "border border-gray-700/50 hover:border-emerald-500/50 hover:bg-emerald-500/10 bg-black/70"}`}
                  onClick={() => handleAnswerClick(index)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </button>
              ))}
            </div>

            {feedback && (
              <div className="mt-8 bg-black/80 p-6 rounded-xl border-2 border-rose-500/30 backdrop-blur-sm transform transition-all duration-300 hover:border-rose-500/50">
                <p className="text-lg text-rose-400 font-medium tracking-wide">{feedback}</p>
                {showBonus && (
                  <div className="mt-4 bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
                    <p className="text-amber-400 text-base flex items-center gap-3 font-medium">
                      <span className="text-2xl">✨</span>
                      <span>Streak Bonus! +{Math.min(streak * 5, 20)} points</span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full p-6 border border-emerald-500/30 rounded-xl bg-black/70 backdrop-blur-sm text-center">
            <h1 className="text-emerald-400 mb-4">Quiz Completed! 🎉</h1>
            <p className="text-emerald-500 mb-3">Final Score: {score}</p>
            <p className="text-gray-400 text-xs">
              You answered {Math.floor(score / 10)} out of {quizData.length} questions correctly
            </p>
            <button
              onClick={() => navigate(`/home/${dept}`)}
              className="mt-6 px-4 py-2 border border-emerald-500/30 text-emerald-400 text-xs rounded-lg hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-colors bg-black/70"
            >
              Return to Hub
            </button>
          </div>
        )}
      </div>
    </div>
  ) : <Education />;
};

export default Quiz;
