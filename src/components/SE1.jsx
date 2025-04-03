import React, { useState, useEffect } from 'react';

export default function SE1({ selectedScenario, handleElementClick, handleSusClick, susAnswer, selectedElement }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (selectedScenario?.scene?.[0]) {
      setContent(selectedScenario.scene[0]);
      setSelectedChat('whatsappScam');
    }
  }, [selectedScenario]);

  // In SE1.jsx, update the handleClick function to prevent unintended clicks
  const handleClick = (element) => {
    const elementData = content?.[element];
    // Only allow click if it's one of our intended elements
    const clickableElements = ['phoneNumber', 'initialMessage', 'urgencyTactic', 'fraudulentLink'];
    if (elementData && elementData.options && clickableElements.includes(element)) {
      handleElementClick({ ...elementData, name: element });
    }
  };

  return (
    <div className="flex sim w-full flex-col gap-2">
      <div className="bg-black/50 p-3 rounded-xl border border-purple-500/30">
        <h2 className="text-purple-400 text-xs mb-1">{selectedScenario.instructions}</h2>
        <p className="text-gray-400 text-xs">Click on suspicious elements to investigate them.</p>
      </div>
      <div className="sim flex flex-col bg-gray-100 w-full h-full rounded-lg text-black shadow-lg overflow-hidden text-sm font-light">
        {/* Browser Chrome */}
        <div className="bg-[#2b2b2b] p-2 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
            </div>
            <div className="flex-1 bg-[#404040] rounded-md px-3 py-1 flex items-center justify-center">
              <span className="font-mono text-xs text-gray-300 flex items-center gap-1.5 font-light">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                web.whatsapp.com
              </span>
            </div>
          </div>
        </div>

        {/* WhatsApp Interface */}
        <div className="flex h-full">
          {/* Left Sidebar */}
          <div className="w-1/3 bg-[#111b21] border-r border-[#222e35] flex flex-col">
            <div className="p-3 bg-[#202c33] text-white flex justify-between items-center">
              <div className="w-9 h-9 rounded-full bg-gray-600 flex-shrink-0"></div>
              <div className="flex gap-5 text-[#aebac1]">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"></path>
                </svg>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"></path>
                </svg>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
                </svg>
              </div>
            </div>

            <div className="px-3 py-2 bg-[#111b21]">
              <div className="bg-[#202c33] rounded-lg flex items-center px-3 py-1.5">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#aebac1" className="mr-3">
                  <path d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search or start new chat"
                  className="bg-transparent text-xs text-[#d1d7db] placeholder-[#8696a0] outline-none w-full font-light"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-3 border-b border-[#222e35] hover:bg-[#202c33] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2a3942] flex-shrink-0"></div>
                  <div className="flex-1 min-w-0 border-b border-[#222e35] pb-3">
                    <div className="flex justify-between">
                      <span className="font-light truncate text-[#e9edef] text-xs">Mom ❤️</span>
                      <span className="text-xs text-[#8696a0] font-light">Yesterday</span>
                    </div>
                    <p className="text-xs text-[#8696a0] truncate font-light">Don't forget to call grandma!</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-b border-[#222e35] hover:bg-[#202c33] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2a3942] flex-shrink-0"></div>
                  <div className="flex-1 min-w-0 border-b border-[#222e35] pb-3">
                    <div className="flex justify-between">
                      <span className="font-light truncate text-[#e9edef] text-xs">🏢 Work Team</span>
                      <span className="text-xs text-[#8696a0] font-light">10:30 AM</span>
                    </div>
                    <p className="text-xs text-[#8696a0] truncate font-light">Sarah: Meeting at 2pm today</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-b border-[#222e35] bg-[#2a3942]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center text-white flex-shrink-0">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                      <path d="M12 1.95c-5.52 0-10 4.48-10 10s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57v-1.43c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57v-1.43c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0 border-b border-[#222e35] pb-3">
                    <div className="flex justify-between">
                      <span className="font-light truncate text-white cursor-pointer text-xs" onClick={() => handleClick('phoneNumber')}>
                        {content?.phoneNumber?.value || "Bank Security"}
                      </span>
                      <span className="text-xs text-[#8696a0] font-light">
                        {content?.messageTime?.value || "Now"}
                      </span>
                    </div>
                    <p className="text-xs text-[#8696a0] truncate font-light">
                      {content?.initialMessage?.value || "Important message about your account"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-b border-[#222e35] hover:bg-[#202c33] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2a3942] flex-shrink-0"></div>
                  <div className="flex-1 min-w-0 border-b border-[#222e35] pb-3">
                    <div className="flex justify-between">
                      <span className="font-light truncate text-[#e9edef] text-xs">Alex 🎮</span>
                      <span className="text-xs text-[#8696a0] font-light">Yesterday</span>
                    </div>
                    <p className="text-xs text-[#8696a0] truncate font-light">Game night on Friday?</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-b border-[#222e35] hover:bg-[#202c33] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2a3942] flex-shrink-0"></div>
                  <div className="flex-1 min-w-0 border-b border-[#222e35] pb-3">
                    <div className="flex justify-between">
                      <span className="font-light truncate text-[#e9edef] text-xs">👨‍👩‍👧‍👦 Family Group</span>
                      <span className="text-xs text-[#8696a0] font-light">9:15 AM</span>
                    </div>
                    <p className="text-xs text-[#8696a0] truncate font-light">Dad: BBQ this weekend!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Chat Area */}
          <div className="flex-1 flex flex-col bg-[#0b141a] relative">
            {/* Chat background pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABSklEQVRoge3ZMU4DMRRF0WMKF0jFIljZ2QpbQRAVNKEgGyAFGrGJHRKJRDwz9vx/pJTp/OzneN4kTVNTU1NTU1MymNkSOAE2iT/9Bs7d/XbUbma2Ao7d/WbUNzN2ADaJoqmJgEvgfmR+KdG8/PrsnHMFbJOXcQVcALtRW+niL0a2BLbuvruXWLr4i5EtgZ27784Sjd8T92zd/WnUNzN2wDPwkPg1H4CNu7+O2s3sCDi5l1iy+Lj9OOvMrDmSZs2RNGuOpFn8jpjZM/A0aPrh7q+j9iJ3xMwOgfWg6cPdX0btRe5IbqJEkTuSmygxxx3JSpSY446sPv9eDto+3f191J6dKDHHHclKlCh1R5ISJUrckZLvSHaihLojJYoS6o6UKEqoO1KiKKHuSMmihLgjJYsS4o6ULEpIUaKpqampqWkW/QKEEoz96WGmVAAAAABJRU5ErkJggg==')",
              backgroundRepeat: "repeat"
            }}></div>

            <div
              className="bg-[#202c33] p-3 flex items-center justify-between border-b border-[#222e35] z-10"
              onClick={() => handleClick('phoneNumber')}
            >
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-[#00a884] flex items-center justify-center text-white">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M12 1.95c-5.52 0-10 4.48-10 10s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57v-1.43c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57v-1.43c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-light text-[#e9edef] text-xs">
                    {content?.phoneNumber?.value || "Bank Security"}
                  </div>
                  <div className="text-xs text-[#8696a0] font-light">online</div>
                </div>
              </div>
              <div className="flex gap-5 text-[#aebac1]">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path>
                </svg>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
                </svg>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto z-10">
              {content && (
                <>
                  <div
                    className="flex justify-start mb-4 cursor-pointer"
                    onClick={() => handleClick('initialMessage')}
                  >
                    <div className="bg-[#202c33] rounded-lg p-3 max-w-[80%] shadow-md">
                      <p className="text-[#e9edef] text-xs font-light">{content.initialMessage?.value}</p>
                      <p className="text-[10px] text-[#8696a0] mt-1 text-right font-light">
                        {content.messageTime?.value}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex justify-start mb-4 cursor-pointer"
                    onClick={() => handleClick('urgencyTactic')}
                  >
                    <div className="bg-[#202c33] rounded-lg p-3 max-w-[80%] shadow-md">
                      <p className="text-[#e9edef] text-xs font-light">{content.urgencyTactic?.value}</p>
                      <p
                        className="text-[#53bdeb] underline mt-2 cursor-pointer text-xs font-light"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClick('fraudulentLink');
                        }}
                      >
                        {content.fraudulentLink?.value}
                      </p>
                      <p className="text-[10px] text-[#8696a0] mt-1 text-right font-light">
                        {content.messageTime?.value}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="bg-[#202c33] p-3 z-10">
              <div className="flex items-center gap-2">
                <div className="text-[#8696a0] mx-2">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path>
                  </svg>
                </div>
                <div className="text-[#8696a0] mx-2">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Type a message"
                  className="flex-1 py-1.5 px-3 rounded-lg bg-[#2a3942] text-[#d1d7db] placeholder-[#8696a0] outline-none text-xs font-light"
                  readOnly
                />
                <div className="text-[#8696a0] mx-2">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}