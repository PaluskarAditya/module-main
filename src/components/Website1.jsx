import React from 'react';

export default function Website1({ selectedScenario, handleElementClick }) {
  const content = selectedScenario.scene[0].content;

  return (
    <div className="flex sim flex-col gap-2">
      <div className="bg-black/50 p-3 rounded-xl border border-purple-500/30">
        <h2 className="text-purple-400 text-xs mb-1">{selectedScenario.instructions}</h2>
        <p className="text-gray-400 text-xs">Click on suspicious elements to investigate them.</p>
      </div>
      <div className="sim flex flex-col bg-gray-100 overflow-hidden rounded-lg">
        {/* Browser Chrome */}
        <div className="bg-gray-200 p-2 border-b border-gray-300">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 bg-white rounded px-3 py-1 flex items-center">
              <span
                className="font-mono text-sm text-gray-600 flex-1 cursor-pointer"
                onClick={() => handleElementClick({ ...content.url, name: 'URL' })}
              >
                {content.url.value}
              </span>
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-blue-600 p-4">
            <div className="container mx-auto flex items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg"
                alt="Windows Logo"
                className="h-8 w-8 mr-2"
              />
              <h1
                className="text-white mx-2 text-xl font-medium cursor-pointer"
                onClick={() => handleElementClick({ ...content.title, name: 'Title' })}
              >
                {content.title.value}
              </h1>
            </div>
          </header>

          <main className="flex-1 container mx-auto py-3 px-3 overflow-auto">
            <div className="max-w-3xl mx-auto">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 mb-3">
                <p className="text-yellow-700 text-sm">
                  <span
                    className="font-bold cursor-pointer"
                    onClick={() => handleElementClick({ ...content.header, name: 'Header' })}
                  >
                    {content.header.value}
                  </span>
                </p>
              </div>

              <div className="bg-white shadow-lg rounded-lg p-4">
                <h2 className="text-lg font-bold mb-2 text-black">
                  System Security Status
                </h2>

                <div className="mb-2">
                  <div className="h-2 bg-gray-200 rounded">
                    <div
                      className="h-2 bg-red-500 rounded cursor-pointer"
                      style={{ width: content.progressBar.value }}
                      onClick={() => handleElementClick({ ...content.progressBar, name: 'Progress Bar' })}
                    ></div>
                  </div>
                  <p
                    className="text-sm text-red-600 mt-2 cursor-pointer"
                    onClick={() => handleElementClick({ ...content.securityStatus, name: 'Security Status' })}
                  >
                    {content.securityStatus.value}
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-red-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span
                      className="cursor-pointer text-black text-sm"
                      onClick={() => handleElementClick({ ...content.message, name: 'Message' })}
                    >
                      {content.message.value}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition duration-200"
                    onClick={() => handleElementClick({ ...content.downloadButton, name: 'Download Button' })}
                  >
                    {content.downloadButton.value}
                  </button>
                  <p
                    className="text-sm text-gray-500 mt-2 cursor-pointer"
                    onClick={() => handleElementClick({ ...content.fileInfo, name: 'File Info' })}
                  >
                    {content.fileInfo.value}
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
