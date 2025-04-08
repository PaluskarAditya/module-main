import { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import scenes from './data/scene-data';
import Education from './Education';

const PhishingTraining = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { mode } = useOutletContext();

  const [selectedMail, setSelectedMail] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [scenarioState, setScenarioState] = useState({});
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [score, setScore] = useState(0);
  const [susAnswer, setSusAnswer] = useState(null);
  const [levelCleared, setLevelCleared] = useState(false);
  const [levelFailed, setLevelFailed] = useState(false);
  const [clickedElements, setClickedElements] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [selections, setSelections] = useState({
    from: null,
    body: null,
    link: null
  });

  const handleSelection = (key, value) => {
    setSelections(prev => ({
      ...prev,
      [key]: value
    }));
  };

  useEffect(() => {
    setScenarios(scenes);
  }, []);

  const getClickableItems = (scenario) => {
    if (!scenario) return 0;

    let count = 0;
    if (scenario.type === 'phishing') {
      scenario.scene.forEach(mail => {
        if (mail?.phishing) {
          mail.from?.options && count++;
          mail.body?.options && count++;
          mail.sus?.options && count++;
          mail.urgency?.options && count++;
          mail.attachment?.options && count++;
          mail.contact?.options && count++;
        }
      });
    } else if (scenario.type === 'malware') {
      const scene = scenario.scene[0];
      if (scene?.phishing) {
        count = Object.keys(scene.content).length;
      }
    } else if (scenario.type === 'usb-drop') {
      const steps = scenario.scene[0]?.steps || [];
      count = steps.filter(step => step.options && step.options.length > 0).length;
    } else if (scenario.type === 'credential-theft') {
      const scene = scenario.scene[0];
      if (scene?.phishing) {
        count = Object.keys(scene).length - 2;
      }
    } else if (scenario.type === 'social-engineering') {
      const scene = scenario.scene[0];
      if (scene?.phishing) {
        count = ['phoneNumber', 'initialMessage', 'urgencyTactic', 'fraudulentLink']
          .filter(key => scene[key]?.options).length;
        if (scene.sus?.options) {
          count++;
        }
      }
    } else if (scenario.type === 'password-security') {
      count = Object.keys(scenario.scene[0].requirements).length;
    } else if (scenario.type === 'cryptocurrency-scam') {
      const scamEmail = scenario.scene.find(mail => mail.scam);
      if (scamEmail) {
        if (scamEmail.from?.options) count++;
        if (scamEmail.body?.options) count++;
        if (scamEmail.link?.options) count++;
        if (scenario.sus?.options) count++;
      }
    } else if (scenario.type === 'business-email-compromise') {
      const phishingScene = scenario.scene.find(s => s.phishing);
      if (phishingScene) {
        count += phishingScene.from?.options ? 1 : 0;
        count += phishingScene.body?.options ? 1 : 0;
        count += phishingScene.sus?.options ? 1 : 0;
      }
    }
    return count;
  };

  useEffect(() => {
    if (selectedScenario && selectedScenario.type !== 'password-security' && selectedScenario.type !== 'usb-drop') {
      const clickableItems = getClickableItems(selectedScenario);
      const allElementsClicked = clickedElements.length === clickableItems;

      if (allElementsClicked) {
        if (score === clickableItems) {
          setLevelCleared(true);
          const timer = setTimeout(() => {
            setLevelCleared(false);
            setSelectedScenario(null);
          }, 3000);
          return () => clearTimeout(timer);
        } else {
          setLevelFailed(true);
          const timer = setTimeout(() => {
            setLevelFailed(false);
            setSelectedScenario(null);
          }, 3000);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [score, selectedScenario, clickedElements]);

  const handleScenarioClick = (scenario) => {
    setSelectedScenario(scenario);
    setSelectedMail(null);
    setScore(0);
    setLevelCleared(false);
    setLevelFailed(false);
    setClickedElements([]);
    setSusAnswer(null);
    setSelectedElement(null);
    setScenarioState({
      sus: {
        resp: false,
        clicked: false,
        ...scenario.sus
      }
    });
  };

  const handleMailClick = (mail) => {
    setSelectedMail(mail);
    setSelectedElement(null);
    setSusAnswer(null);
  };

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const handleSusClick = (answer) => {
    const susData = selectedScenario?.sus || selectedScenario?.scene[0]?.sus;
    if (!susData) return;

    setScenarioState(prev => {
      const currentSus = prev.sus || { resp: false, clicked: false, ...susData };

      // Only process if not already answered
      if (!currentSus.resp) {
        const isCorrect = answer === susData.answer;

        setSusAnswer(answer);

        if (!clickedElements.includes('sus')) {
          setClickedElements(prev => [...prev, 'sus']);
          if (isCorrect) {
            setScore(prev => prev + 1);
          }
        }

        return {
          ...prev,
          sus: {
            ...currentSus,
            resp: true,
            clicked: true
          }
        };
      }
      return prev;
    });
  };

  const handleAnswerClick = (answer) => {
    if (!selectedElement) return;

    const alreadyAnswered = clickedElements.includes(selectedElement.name);
    if (!alreadyAnswered) {
      const isCorrect = answer === selectedElement.answer;
      if (isCorrect) setScore(prev => prev + 1);

      if (selectedMail) {
        if (selectedElement.name === 'subject' && selectedMail.subject) {
          selectedMail.subject.clicked = true;
        } else if (selectedElement.name === 'from' && selectedMail.from) {
          selectedMail.from.clicked = true;
        } else if (selectedElement.name === 'body' && selectedMail.body) {
          selectedMail.body.clicked = true;
        }
      } else if (selectedScenario?.scene[0]) {
        const scene = selectedScenario.scene[0];
        if (scene[selectedElement.name]) {
          scene[selectedElement.name].clicked = true;
        }
      }

      setClickedElements(prev => [...prev, selectedElement.name]);
    }
    setSelectedElement(null);
  };

  return mode === 'gaming' ? (
    <div className='w-full z-50 min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-[5rem] px-8 pb-8 tracking-wider overflow-hidden'>
      {/* Level cleared/failed modals remain unchanged */}
      {levelCleared && (
        <div className='h-screen fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/70 backdrop-blur-sm'>
          {/* Modal content */}
        </div>
      )}

      {levelFailed && (
        <div className='h-screen fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/70 backdrop-blur-sm'>
          {/* Modal content */}
        </div>
      )}

      <div className='h-full flex flex-col gap-3 max-w-7xl mx-auto'>
        {/* Back button remains unchanged */}
        <button
          onClick={() => navigate(`/home/${params.dept}`)}
          className='text-xs text-blue-400 hover:text-blue-300 transition-colors border border-blue-400/30 px-4 py-2 rounded-lg hover:border-blue-400/50 hover:bg-blue-400/5 mt-2'
        >
          ← Back to Hub
        </button>

        {/* Scenario header remains unchanged */}
        <div className='flex items-center justify-between'>
          {selectedScenario && (
            <div className='flex gap-5 items-center'>
              <h1 className='text-base text-purple-400'>{selectedScenario.name}</h1>
              <button
                onClick={() => setSelectedScenario(null)}
                className='text-xs text-blue-400 hover:text-blue-300 transition-colors border border-blue-400/30 px-4 py-2 rounded-lg hover:border-blue-400/50 hover:bg-blue-400/5'
              >
                ← Back to Scenarios
              </button>
            </div>
          )}
        </div>

        <div className='flex items-center gap-3 justify-end mb-3'>
          {/* View mode toggle removed if a scenario is selected */}
          {!selectedScenario && (
            <div className='flex items-center'>
              <button
                onClick={() => setViewMode(prev => (prev === 'grid' ? 'list' : 'grid'))}
                className='flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 transition-colors border border-purple-400/30 px-3 py-2 rounded-lg hover:border-purple-400/50 hover:bg-purple-400/5'
              >
                {viewMode === 'grid' ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    List View
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Grid View
                  </>
                )}
              </button>
            </div>
          )}
          {/* Profile image */}
          <div className="relative group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center cursor-pointer">
              <img src="https://github.com/shadcn.png" alt="Profile" className="w-full h-full rounded-full" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-gray-900"></div>
            </div>
          </div>
        </div>


        {/* Main content area */}
        {selectedScenario ? (
          /* Scenario view - fixed layout regardless of viewMode */
          <div className="flex-1 flex flex-col lg:flex-row gap-6">
            {/* Scenario component */}
            {selectedScenario.component && (
              <selectedScenario.component
                selectedScenario={selectedScenario}
                selectedMail={selectedMail}
                handleMailClick={handleMailClick}
                handleElementClick={handleElementClick}
                clickedElements={clickedElements}
                setLevelCleared={setLevelCleared}
                setLevelFailed={setLevelFailed}
                handleAnswerClick={handleAnswerClick}
                selectedElement={selectedElement}
                setSelectedElement={setSelectedElement}
                handleSusClick={handleSusClick}
                susAnswer={susAnswer}
                handleSelection={handleSelection}
                selections={selections}
              />
            )}

            {/* Investigation panel - always appears on right side on lg screens */}
            {selectedScenario.type !== 'password-security' && (selectedScenario.scene[0]?.phishing || selectedScenario.scene[0]?.scam) && (
              <div className='w-full lg:w-1/4 bg-black/50 rounded-xl border border-purple-500/30'>
                <div className='flex flex-col p-4 border-b border-purple-500/20'>
                  <h1 className='text-purple-400 text-sm'>Actions</h1>
                  <p className='text-gray-400 text-xs mt-1'>Select elements to perform Investigation</p>
                </div>

                {/* Panel content remains unchanged */}
                {!scenarioState?.sus?.resp && !selectedElement && (selectedScenario?.sus?.options || selectedScenario?.scene[0]?.sus?.options) ? (
                  <div className='flex-1 flex flex-col gap-3 p-4'>
                    <h1 className='text-xs text-gray-300'>What do you think about this scenario?</h1>
                    <div className='flex flex-col gap-2'>
                      {(selectedScenario?.sus?.options || selectedScenario?.scene[0]?.sus?.options).map((el, index) => (
                        <div
                          key={index}
                          onClick={() => handleSusClick(el)}
                          className='p-3 text-xs text-gray-300 border border-purple-500/30 rounded-lg cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300'
                        >
                          {el}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : selectedElement && (
                  <div className='flex-1 p-4 flex flex-col gap-3'>
                    <h1 className='text-xs text-gray-300'>Investigation options for {selectedElement.name}</h1>
                    <div className='flex flex-col gap-2'>
                      {selectedElement.options?.map((el, index) => (
                        <div
                          key={index}
                          onClick={() => !clickedElements.includes(selectedElement.name) && handleAnswerClick(el)}
                          className={`p-3 text-xs text-gray-300 border ${clickedElements.includes(selectedElement.name) ?
                            'border-gray-500 cursor-default' :
                            'border-purple-500/30 cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5'
                            } rounded-lg transition-all duration-300`}
                        >
                          {el}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(selectedScenario.scene[0]?.phishing || selectedScenario.scene[0]?.scam) && (
                  <div className='p-4 border-t border-purple-500/20'>
                    <div className='flex flex-col gap-3'>
                      <div className='flex justify-between text-xs text-gray-400'>
                        <span>Clickable Items:</span>
                        <span>{getClickableItems(selectedScenario)}</span>
                      </div>
                      <div className='flex justify-between text-xs text-green-400'>
                        <span>Score:</span>
                        <span>{score}</span>
                      </div>
                      <div className='flex justify-between text-xs text-purple-400'>
                        <span>Investigated:</span>
                        <span className='truncate ml-2'>
                          {[...new Set(clickedElements)].join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Scenarios list - affected by viewMode */
          <div className={`flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400/20 scrollbar-track-transparent hover:scrollbar-thumb-purple-400/30 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-6'}`}>
            {scenarios.map((scenario) => (
              <div
                onClick={() => handleScenarioClick(scenario)}
                key={scenario.id}
                className={`transform-gpu p-6 border border-purple-500/30 rounded-xl bg-black/50 backdrop-blur-sm cursor-pointer hover:border-purple-500 hover:bg-purple-500/20 group hover:text-white hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-300 ${viewMode === 'list' ? 'flex flex-col' : ''}`}
              >
                <h1 className='text-base text-purple-400 mb-2 group-hover:text-white'>{scenario.name}</h1>
                <p className='text-gray-400 text-xs leading-relaxed group-hover:text-white'>{scenario.description}</p>
                <p className='text-xs text-green-400 mt-3 group-hover:text-white'>Difficulty: {scenario.difficultyStars || scenario.difficulty}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <Education />
  );
};

export default PhishingTraining;