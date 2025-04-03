import React, { useState, useEffect } from 'react';

export default function Pwd({ selectedScenario, setLevelCleared, setLevelFailed }) {
  const scene = selectedScenario?.scene[0] || {};
  const requirements = scene.requirements || {
    minLength: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  };
  const feedbackMessages = scene.feedback || {
    tooShort: "Password must be at least 12 characters long",
    noUppercase: "Include at least one uppercase letter",
    noLowercase: "Include at least one lowercase letter",
    noNumbers: "Include at least one number",
    noSymbols: "Include at least one special character",
    strong: "This is a strong password!",
  };
  const passwordTips = scene.passwordTips || [
    "Use a mix of letters, numbers, and symbols",
    "Make it at least 12 characters long",
    "Don't use personal information",
    "Avoid common substitutions",
    "Use a unique password for each account",
  ];
  const strengthLevels = scene.strengthLevels || {
    0: "Very Weak",
    1: "Weak",
    2: "Medium",
    3: "Strong",
    4: "Very Strong",
  };
  const strengthColors = scene.strengthColors || {
    0: "red",
    1: "orange",
    2: "yellow",
    3: "light-green",
    4: "green",
  };

  const [password, setPassword] = useState('');
  const [requirementsMet, setRequirementsMet] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const checkRequirements = {
      length: password.length >= requirements.minLength,
      uppercase: requirements.uppercase ? /[A-Z]/.test(password) : true,
      lowercase: requirements.lowercase ? /[a-z]/.test(password) : true,
      numbers: requirements.numbers ? /\d/.test(password) : true,
      symbols: requirements.symbols ? /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) : true,
    };
    setRequirementsMet(checkRequirements);

    const unmet = Object.entries(checkRequirements).find(([key, met]) => !met);
    if (submitted && password) {
      if (!unmet) {
        setFeedback(feedbackMessages.strong);
      } else {
        const requirementKey = unmet[0]; // Get the key from the unmet requirement
        setFeedback(feedbackMessages[`no${requirementKey.charAt(0).toUpperCase() + requirementKey.slice(1)}`] || feedbackMessages.tooShort);
      }
    }
  }, [password, submitted, requirements, feedbackMessages]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (submitted) {
      setSubmitted(false);
      setFeedback('');
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const allMet = Object.values(requirementsMet).every(Boolean);
    if (allMet) {
      setFeedback(feedbackMessages.strong);
      setLevelCleared(true);
      setTimeout(() => setLevelCleared(false), 1500); // Reset after showing success
    } else {
      setLevelFailed(true);
      setTimeout(() => setLevelFailed(false), 1500); // Reset after showing failure
    }
  };

  const getStrengthScore = () => {
    return Object.values(requirementsMet).filter(Boolean).length;
  };

  const renderRequirements = () => {
    return (
      <>
        <p className={requirementsMet.length ? 'text-green-600' : 'text-gray-600'}>
          At least {requirements.minLength} characters {requirementsMet.length && '✓'}
        </p>
        {requirements.uppercase && (
          <p className={requirementsMet.uppercase ? 'text-green-600' : 'text-gray-600'}>
            One uppercase letter {requirementsMet.uppercase && '✓'}
          </p>
        )}
        {requirements.lowercase && (
          <p className={requirementsMet.lowercase ? 'text-green-600' : 'text-gray-600'}>
            One lowercase letter {requirementsMet.lowercase && '✓'}
          </p>
        )}
        {requirements.numbers && (
          <p className={requirementsMet.numbers ? 'text-green-600' : 'text-gray-600'}>
            One number {requirementsMet.numbers && '✓'}
          </p>
        )}
        {requirements.symbols && (
          <p className={requirementsMet.symbols ? 'text-green-600' : 'text-gray-600'}>
            One special character {requirementsMet.symbols && '✓'}
          </p>
        )}
      </>
    );
  };

  return (
    <div className="flex sim w-full flex-col gap-2">
      <div className="bg-black/50 p-3 rounded-xl border border-purple-500/30">
        <h2 className="text-purple-400 text-xs mb-1">Fullfil all the requirements to clear this level</h2>
        <p className="text-gray-400 text-xs">Enter a password that meets all the requirements.</p>
      </div>
      <div className="w-full h-full bg-gray-50 flex items-center justify-center p-8 font-sans">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg flex overflow-hidden">
          {/* Left Section: Requirements and Tips */}
          <div className="w-1/2 p-8 flex flex-col justify-between bg-gradient-to-b from-gray-50 to-white">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Create a Secure Password
              </h1>
              <p className="mt-2 text-gray-500 text-sm">
                Test your skills by crafting a password that meets modern security standards.
              </p>
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800">Requirements</h2>
                <div className="mt-2 space-y-2 text-sm">{renderRequirements()}</div>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800">Tips</h2>
              <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc list-inside">
                {passwordTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Section: Input and Feedback */}
          <div className="w-1/2 p-8 flex flex-col justify-center bg-white">
            <div className="space-y-6">
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-gray-900 placeholder-gray-400"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
              {password && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Password Strength:</span>
                    <span className={`font-medium text-${strengthColors[getStrengthScore()]}-600`}>
                      {strengthLevels[getStrengthScore()]}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-${strengthColors[getStrengthScore()]}-500 transition-all duration-300`}
                      style={{ width: `${(getStrengthScore() / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              {submitted && (
                <div
                  className={`p-3 rounded-lg text-sm ${Object.values(requirementsMet).every(Boolean)
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                    }`}
                >
                  {feedback}
                </div>
              )}
              <button
                onClick={handleSubmit}
                className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-200 ${password && Object.values(requirementsMet).every(Boolean)
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-300 cursor-not-allowed'
                  }`}
                disabled={!password}
              >
                Submit Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}