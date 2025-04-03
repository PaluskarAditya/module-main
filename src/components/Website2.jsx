import { useState, useEffect } from 'react';

const Website2 = ({
  selectedScenario,
  handleElementClick,
  clickedElements,
  selectedElement,
  setSelectedElement
}) => {
  const [scene, setScene] = useState(null);

  useEffect(() => {
    if (selectedScenario?.scene) {
      setScene(selectedScenario.scene[0]);
    }
  }, [selectedScenario]);

  const handleElementSelection = (element) => {
    const isAnswered = clickedElements.includes(element.name);

    if (!isAnswered) {
      handleElementClick(element);
      setSelectedElement(element);
    }
  };

  if (!scene) return null;

  return (
    <div className="sim flex-1 flex flex-col gap-2">
      {/* Header */}
      <div className="bg-black/50 p-3 rounded-xl border border-purple-500/30">
        <h2 className="text-purple-400 text-xs mb-1">{selectedScenario.instructions}</h2>
        <p className="text-gray-400 text-xs">Click on suspicious elements to investigate them.</p>
      </div>

      {/* Browser Window */}
      <div className="flex-1 bg-white rounded-xl overflow-hidden border border-gray-300 flex flex-col">
        {/* Browser Chrome */}
        <div className="bg-gray-100 p-2 border-b border-gray-300 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          {/* URL Bar */}
          <div
            onClick={() => handleElementSelection(scene.content.downloadSource)}
            className={`flex-1 bg-white rounded-full px-3 py-1 border ${clickedElements.some(el => el.name === scene.content.downloadSource.name) ?
                'cursor-default' : 'cursor-pointer hover:border-blue-300'
              } flex items-center transition-colors border-gray-300`}
          >
            <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs truncate text-gray-700">
              {scene.content.downloadSource.value}
            </span>
          </div>

          <div className="ml-4 flex space-x-3">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>

        {/* Browser Content */}
        <div className="flex-1 bg-white p-4 h-full overflow-auto">
          <div className="max-w-md mx-auto bg-white rounded-lg p-4">
            {/* Popup Title */}
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div
                onClick={() => handleElementSelection(scene.content.popupTitle)}
                className={`${clickedElements.some(el => el.name === scene.content.popupTitle.name) ?
                    'cursor-default' : 'cursor-pointer'
                  } text-gray-800`}
              >
                <h2 className="font-bold text-sm">{scene.content.popupTitle.value}</h2>
              </div>
            </div>

            {/* Static Content */}
            <div className="mb-3 p-2 border border-gray-200 rounded-md">
              <p className="text-xs">Your Adobe Flash Player is out of date. Please update now to access video content.</p>
            </div>

            <div className="mb-3 border border-gray-200 rounded-md p-3">
              <p className="text-gray-700 text-xs mb-2">Publisher: Adobe Systems (Unverified)</p>
              <p className="text-gray-700 text-xs mb-2">flash_player_update.exe (2.1 MB)</p>
              <p className="text-gray-700 text-xs">Digital Signature: Invalid</p>
            </div>

            <div className="mb-3 p-2 bg-yellow-50 border border-yellow-300 rounded-md">
              <p className="text-yellow-800 text-xs">Windows Defender is temporarily disabled for this installation</p>
            </div>

            {/* Update Button */}
            <div
              onClick={() => handleElementSelection(scene.content.updateButton)}
              className={`p-2 text-center ${clickedElements.some(el => el.name === scene.content.updateButton.name) ?
                  'cursor-default' : 'cursor-pointer hover:bg-blue-700'
                } bg-blue-600 text-white rounded-md font-medium text-xs`}
            >
              Update Now (Required)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Website2;