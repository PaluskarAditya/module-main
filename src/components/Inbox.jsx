import React from 'react';

export default function Inbox({
  selectedScenario,
  selectedMail,
  handleMailClick,
  handleElementClick,
  clickedElements,
}) {
  const getElementObject = (element, defaultName) => {
    if (!element) return null;
    if (typeof element === 'object') {
      return {
        ...element,
        name: element.name || defaultName,
        options: element.options || [],
        answer: element.answer || '',
        clicked: element.clicked || false,
      };
    }
    return {
      name: defaultName,
      value: element,
      options: [],
      answer: '',
      clicked: false,
    };
  };

  const renderClickableText = (text, elementName) => {
    const element = getElementObject(selectedMail[elementName], elementName);
    if (!element || !element.options.length) return text;
    return (
      <span
        className={`cursor-pointer ${clickedElements.includes(elementName) ? 'text-blue-600 underline' : 'hover:underline'}`}
        onClick={(e) => {
          e.stopPropagation();
          handleElementClick(element);
        }}
      >
        {text}
      </span>
    );
  };

  const getPlaceholderInstructions = () => {
    switch (selectedScenario?.type) {
      case 'phishing':
        return "Analyze this email for potential phishing indicators. Click on suspicious elements to investigate them.";
      case 'malware':
        return "Look for signs of malware distribution in this message. Pay attention to attachments and links.";
      case 'credential-theft':
        return "Check for attempts to steal login credentials. Be wary of requests for sensitive information.";
      case 'social-engineering':
        return "Identify social engineering tactics being used in this communication.";
      default:
        return "Carefully review this message for any security concerns.";
    }
  };

  return (
    <div className="flex sim flex-col gap-2 w-3/4 h-full">
      <div className="bg-black/50 p-3 font-thin rounded-xl border border-purple-500/30">
        <h2 className="text-purple-400 text-xs mb-1 font-thin">{selectedScenario.instructions ? selectedScenario.instructions : getPlaceholderInstructions()}</h2>
        <p className="text-gray-400 text-xs font-thin">Click on suspicious elements to investigate them.</p>
      </div>
      <div className="w-full h-full h-[400px] sim tracking-normal">
        <div className="bg-black p-3 flex flex-col gap-2 rounded-t-lg">
          <p className="text-white font-light text-md">Inbox</p>
        </div>
        <div className="bg-white w-full h-[calc(100%-48px)] rounded-b-lg flex gap-3 p-3">
          {/* Mail List */}
          <div className="w-1/4 flex flex-col gap-2 overflow-y-auto border-r border-gray-200">
            {selectedScenario?.scene?.map((mail, index) => (
              <div
                key={index}
                onClick={() => handleMailClick(mail)}
                className={`p-3 border-2 rounded-lg text-black text-sm cursor-pointer ${selectedMail === mail ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-100'
                  }`}
              >
                <p className="font-medium truncate">{mail.subject?.value || mail.subject}</p>
                <p className="text-xs text-gray-500 truncate">{mail.from?.value || mail.from}</p>
              </div>
            ))}
          </div>

          {/* Mail Content */}
          <div className="w-3/4 border-2 border-gray-200 rounded-lg text-black overflow-y-auto">
            {selectedMail ? (
              <div className="flex flex-col gap-5 p-6">
                {/* Subject and From */}
                <div className="flex flex-col gap-1">
                  <h1
                    className={`text-2xl font-bold cursor-pointer ${clickedElements.includes('subject') ? 'text-blue-600' : ''}`}
                    onClick={() => {
                      const element = getElementObject(selectedMail.subject, 'subject');
                      element && handleElementClick(element);
                    }}
                  >
                    {selectedMail.subject?.value || selectedMail.subject}
                  </h1>
                  <p
                    className={`text-sm text-gray-700 cursor-pointer ${clickedElements.includes('from') ? 'text-blue-600' : ''}`}
                    onClick={() => {
                      const element = getElementObject(selectedMail.from, 'from');
                      element && handleElementClick(element);
                    }}
                  >
                    From: {selectedMail.from?.value || selectedMail.from}
                  </p>
                  <p className="text-xs text-gray-500">
                    Date: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                  </p>
                </div>

                {/* Body with Clickable Elements */}
                <div
                  className={`flex flex-col gap-3 text-sm ${clickedElements.includes('body') ? 'text-blue-600' : ''}`}
                  onClick={() => {
                    const element = getElementObject(selectedMail.body, 'body');
                    element && handleElementClick(element);
                  }}
                >
                  <div className="email-body font-[Arial,sans-serif]">
                    <p>Dear Emma,</p>
                    <p>
                      Our security monitoring system has detected unusual activity on your workstation that requires immediate attention. To prevent any potential data loss or system compromise, we need to perform an emergency security audit.
                    </p>
                    <p>Please follow these steps immediately:</p>
                    <ol>
                      <li>
                        Download and run the attached {renderClickableText('anti-virus software', 'attachment')}.
                      </li>
                      <li>Enter your network credentials when prompted.</li>
                      <li>Allow full system access when requested.</li>
                    </ol>
                    <p style={{ color: 'red' }}>
                      WARNING: Failure to comply within {renderClickableText('30 minutes', 'urgency')} may result in automatic system lockdown as per security protocol Section 5.2
                    </p>
                    <p>
                      If you have any questions, do not reply to this email. Instead, call our emergency support line at {renderClickableText('+1 (555) 123-4567', 'contact')}.
                    </p>
                    <p>
                      Best regards,<br />
                      James Wilson<br />
                      Senior IT Security Specialist<br />
                      Corporate IT Department
                    </p>
                    <div style={{ color: 'gray', fontSize: '10px', borderTop: '1px solid #ccc', marginTop: '20px', paddingTop: '10px' }}>
                      Confidential: This email contains sensitive information and is intended only for the addressed recipient.
                    </div>
                  </div>
                </div>

                {/* Attachment Display */}
                {selectedMail.attachment && (
                  <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 mt-4">
                    <p className="text-sm font-medium">Attachment:</p>
                    <div
                      className={`p-2 rounded cursor-pointer flex items-center gap-2 ${clickedElements.includes('attachment') ? 'bg-blue-100 border border-blue-500' : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'
                        }`}
                      onClick={() => {
                        const element = getElementObject(selectedMail.attachment, 'attachment');
                        element && handleElementClick(element);
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      {selectedMail.attachment.value}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center h-full text-sm text-gray-500">
                Select an email to view its contents
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}