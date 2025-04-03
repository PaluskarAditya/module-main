import React, { useState, useEffect } from 'react';

export default function Wallet1({
  selectedScenario,
  selectedMail,
  handleMailClick,
  handleElementClick,
  clickedElements,
  selectedElement,
  handleAnswerClick,
  susAnswer,
  handleSusClick,
}) {
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Outlook', content: 'mailbox', active: true },
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [mailbox, setMailbox] = useState([]);

  useEffect(() => {
    if (selectedScenario?.scene) {
      setMailbox(selectedScenario.scene);
    }
  }, [selectedScenario]);

  const scamMail = mailbox.find(m => m.scam) || null;

  const openTab = (content, title) => {
    const newTabId = Math.max(...tabs.map(t => t.id), 0) + 1;
    setTabs(prev => [
      ...prev.map(t => ({ ...t, active: false })),
      { id: newTabId, title, content, active: true }
    ]);
    setActiveTab(newTabId);
  };

  const closeTab = (id) => {
    if (tabs.length <= 1) return;
    const newTabs = tabs.filter(t => t.id !== id);
    const wasActive = tabs.find(t => t.id === id)?.active;

    if (wasActive) {
      const index = tabs.findIndex(t => t.id === id);
      const newActiveTab = tabs[index - 1]?.id || tabs[index + 1]?.id;
      setActiveTab(newActiveTab);
      setTabs(newTabs.map(t => ({
        ...t,
        active: t.id === newActiveTab
      })));
    } else {
      setTabs(newTabs);
    }
  };

  const renderTabContent = () => {
    const tab = tabs.find(t => t.id === activeTab);
    if (!tab) return null;

    switch (tab.content) {
      case 'mailbox':
        return (
          <div className="flex flex-col h-full bg-white shadow-sm" style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}>
            <div className="flex items-center justify-between p-3 bg-[#0078D4] text-white">
              <div className="text-[15px] font-light tracking-wide">Outlook</div>
              <div className="text-[11px] font-light opacity-90">user@company.com</div>
            </div>
            <div className="flex h-full">
              <div className="w-48 bg-[#F8F7F6] border-r border-[#EDEBE9]">
                <div className="p-2 space-y-0.5">
                  <div className="flex items-center p-2 bg-[#E1EFF9] rounded text-[#0078D4]">
                    <span className="text-[13px] font-light">Inbox</span>
                  </div>
                  <div className="flex items-center p-2 hover:bg-[#EDEBE9] rounded cursor-pointer">
                    <span className="text-[13px] font-light text-gray-700">Sent</span>
                  </div>
                  <div className="flex items-center p-2 hover:bg-[#EDEBE9] rounded cursor-pointer">
                    <span className="text-[13px] font-light text-gray-700">Deleted</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="border-b border-[#EDEBE9] p-2 bg-[#F8F7F6]">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 text-[12px] bg-[#0078D4] text-white rounded hover:bg-[#106EBE] font-light">
                      New Email
                    </button>
                    <button className="px-3 py-1 text-[12px] border border-[#D2D0CE] rounded hover:bg-[#F3F2F1] font-light">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {mailbox.map((mail, index) => (
                    <div
                      key={`${mail.subject}-${index}`}
                      className={`flex p-2 border-b border-[#EDEBE9] cursor-pointer ${selectedMail?.subject === mail.subject ? 'bg-[#E1EFF9]' : 'hover:bg-[#F8F7F6]'
                        } ${mail.scam ? 'border-l-2 border-red-400' : ''}`}
                      onClick={() => {
                        handleMailClick(mail);
                        if (mail.scam) openTab('scam-site', 'CryptoWallet');
                      }}
                    >
                      <div className="w-1/4 truncate text-[12px] font-light text-gray-700">{mail.from?.value}</div>
                      <div className="flex-1 overflow-hidden">
                        <div className="truncate text-[12px] font-light">{mail.subject}</div>
                        <div
                          className="text-[11px] text-gray-500 truncate font-light"
                          dangerouslySetInnerHTML={{
                            __html: mail.body?.value?.split('<p>')[1]?.replace('</p>', '') || ''
                          }}
                        />
                      </div>
                      <div className="ml-2 text-[11px] text-gray-400 whitespace-nowrap font-light">11:23 AM</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'scam-site':
        return (
          <div className="p-4 bg-gray-50 min-h-full">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-[#EDEBE9]">
              <div className="bg-[#FF5733] text-white p-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-[16px] font-light tracking-wide">CryptoWallet Security Portal</h1>
                  <div className="text-[11px] bg-[#C70039] px-2 py-1 rounded">SECURE CONNECTION</div>
                </div>
                <div className="text-[11px] font-light opacity-90 mt-1">https://verify.cryptowallet-support.com</div>
              </div>
              <div className="p-5 space-y-4">
                <div className="text-center">
                  <div className="inline-block p-2 bg-red-100 rounded-full mb-2">
                    <svg className="w-6 h-6 text-[#FF5733]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h2 className="text-[15px] font-light mb-1">URGENT: Account Verification Required</h2>
                  <p className="text-[12px] text-gray-600 font-light leading-snug">
                    We've detected suspicious login attempts from a new device. Verify your identity to prevent account lock.
                  </p>
                </div>
                <div className="space-y-4">
                  <div
                    className="p-3 border border-gray-100 rounded cursor-pointer hover:bg-gray-50"
                    onClick={() => handleElementClick({
                      name: 'from',
                      value: scamMail.from.value,
                      options: scamMail.from.options,
                      answer: scamMail.from.answer,
                      clicked: scamMail.from.clicked
                    })}
                  >
                    <h3 className="text-[12px] font-light text-gray-600 mb-1">Verification Request From</h3>
                    <p className="font-mono bg-gray-50 p-2 rounded text-[11px] font-light">
                      {scamMail.from.value}
                    </p>
                  </div>
                  <div
                    className="p-3 border border-gray-100 rounded cursor-pointer hover:bg-gray-50"
                    onClick={() => handleElementClick({
                      name: 'body',
                      value: scamMail.body.value,
                      options: scamMail.body.options,
                      answer: scamMail.body.answer,
                      clicked: scamMail.body.clicked
                    })}
                  >
                    <h3 className="text-[12px] font-light text-gray-600 mb-1">Security Notice</h3>
                    <div className="bg-gray-50 p-2 rounded text-[11px] font-light">
                      <p>Your account will be suspended within 24 hours if not verified.</p>
                      <p className="mt-1 text-[#FF5733]">⚠️ Unverified accounts may lose access to funds.</p>
                    </div>
                  </div>
                  <div
                    className="p-3 border border-gray-100 rounded cursor-pointer hover:bg-gray-50"
                    onClick={() => handleElementClick({
                      name: 'link',
                      value: scamMail.link.value,
                      options: scamMail.link.options,
                      answer: scamMail.link.answer,
                      clicked: scamMail.link.clicked
                    })}
                  >
                    <h3 className="text-[12px] font-light text-gray-600 mb-1">Verification Method</h3>
                    <div className="bg-gray-50 p-2 rounded text-[11px] font-light">
                      <p>Click the button below to complete verification:</p>
                      <button className="mt-2 w-full py-2 bg-[#FF5733] text-white rounded text-[12px] font-light">
                        Verify Wallet Now
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 font-light mt-4 p-2 border-t border-gray-100">
                  <p>© 2023 CryptoWallet Support. All rights reserved.</p>
                  <p className="mt-1">This is an automated message - please do not reply.</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-3 sim text-black">
      <div className="bg-gray-900/50 p-3 rounded-lg border border-purple-500/20">
        <h2 className="text-purple-400 text-[12px] font-light mb-1">{selectedScenario.instructions}</h2>
        <p className="text-gray-400 text-[11px] font-light">Click on suspicious elements to investigate them.</p>
      </div>
      <div className="flex flex-col w-full h-full bg-gray-100 overflow-hidden rounded-lg">
        <div className="flex bg-gray-200 px-1 pt-1 border-b border-gray-300">
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={`flex items-center px-3 py-1 max-w-xs rounded-t mr-0.5 cursor-pointer text-[12px] ${tab.active
                ? 'bg-white text-gray-700 border-t border-l border-r border-gray-300'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-50'
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="truncate font-light">{tab.title}</span>
              <button
                className="ml-1 text-gray-400 hover:text-gray-600 text-[13px]"
                onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-white overflow-auto">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}