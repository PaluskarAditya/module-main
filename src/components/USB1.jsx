import React, { useState, useEffect } from 'react';

export default function USB1({
  selectedScenario,
  handleAnswerClick,
  clickedElements,
  score,
  setScore,
  setLevelCleared,
  setLevelFailed,
  selectedElement,
  setSelectedElement
}) {
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState(1); // 1=init, 2=mounted, 3=scanned
  const [mounted, setMounted] = useState(false);
  const [scanned, setScanned] = useState(false);
  const usbData = selectedScenario?.scene?.[0];

  useEffect(() => {
    // Initialize terminal with welcome message
    addToHistory('=== USB SECURITY TERMINAL ===');
    addToHistory('Type "help" for available commands');
    addToHistory(`Found: ${usbData?.title?.value || 'Unknown Device'}`);
  }, [usbData]);

  const addToHistory = (text) => {
    setTerminalHistory(prev => [...prev, text]);
  };

  const showHelp = () => {
    addToHistory('Available commands:');
    if (!mounted) {
      addToHistory('mount - Mount the USB device');
      addToHistory('eject - Safely remove device');
    } else {
      addToHistory('ls    - List contents');
      addToHistory('scan  - Analyze for threats');
      if (scanned) {
        addToHistory('rm install.sh - Delete malicious file');
        addToHistory('./install.sh - Execute file (DANGER)');
      }
    }
    addToHistory('clear - Clean terminal');
    addToHistory('help  - Show this message');
  };

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputValue.trim().toLowerCase();
    if (!cmd) return;

    addToHistory(`$ ${cmd}`);

    if (cmd === 'help') {
      showHelp();
      setInputValue('');
      return;
    }

    if (cmd === 'clear') {
      setTerminalHistory([]);
      setInputValue('');
      return;
    }

    if (!mounted) {
      handleUnmountedCommands(cmd);
    } else {
      handleMountedCommands(cmd);
    }

    setInputValue('');
  };

  const handleUnmountedCommands = (cmd) => {
    switch (cmd) {
      case 'mount':
        mountUSB();
        break;

      case 'eject':
        addToHistory('Device safely ejected');
        handleAnswerClick(usbData.mount);
        setScore(prev => prev + 1);
        setLevelCleared(true);
        break;

      default:
        addToHistory('Command not available (try mount or eject)');
    }
  };

  const handleMountedCommands = (cmd) => {
    switch (cmd.split(' ')[0]) {
      case 'ls':
        if (clickedElements.includes('ls')) {
          addToHistory('Contents: documents/ payroll.xls install.sh');
        } else {
          addToHistory('Scanning contents...');
          setTimeout(() => {
            addToHistory('Contents:');
            addToHistory('- documents/');
            addToHistory('- payroll.xls');
            addToHistory('- install.sh');
            setSelectedElement(usbData.contents);
          }, 800);
        }
        break;

      case 'scan':
        if (clickedElements.includes('scan')) {
          addToHistory('Already scanned - install.sh is malicious');
        } else {
          addToHistory('Scanning for threats...');
          setTimeout(() => {
            addToHistory('THREAT FOUND: install.sh');
            addToHistory('This file matches known ransomware patterns!');
            setSelectedElement(usbData.scan);
            setScanned(true);
          }, 1500);
        }
        break;

      case 'rm':
        if (cmd === 'rm install.sh') {
          if (clickedElements.includes('rm')) {
            addToHistory('File already deleted');
          } else if (!scanned) {
            addToHistory('Scan files first to identify threats');
          } else {
            addToHistory('Deleting install.sh...');
            setTimeout(() => {
              addToHistory('Malicious file removed!');
              handleAnswerClick(usbData.action);
              setScore(prev => prev + 1);
              setLevelCleared(true);
            }, 800);
          }
        } else {
          addToHistory('Usage: rm install.sh');
        }
        break;

      case './install.sh':
        executeMalware();
        break;

      default:
        addToHistory('Command not recognized');
    }
  };

  const mountUSB = () => {
    addToHistory('Mounting device...');
    setTimeout(() => {
      addToHistory('Mounted at /media/usb0');
      addToHistory('WARNING: Suspicious files detected!');
      setMounted(true);
      handleAnswerClick(usbData.mount);
    }, 1000);
  };

  const executeMalware = () => {
    addToHistory('Executing install.sh...');
    setTimeout(() => {
      addToHistory('Initializing payload...');
      addToHistory('Establishing connection...');
      setTimeout(() => {
        addToHistory('ENCRYPTING FILES...');
        addToHistory('Your files are now locked!');
        addToHistory('Send 0.5 BTC to unlock');
        setLevelFailed(true);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="flex sim w-full flex-col gap-2">
      <div className="bg-black/50 p-3 rounded-xl border border-purple-500/30">
        <h2 className="text-purple-400 text-xs mb-1">{selectedScenario.instructions}</h2>
        <p className="text-gray-400 text-xs">Click on suspicious elements to investigate them.</p>
      </div>
      <div className="usb-terminal w-full">
        <div className="terminal-header">
          <h3>USB Threat Analysis</h3>
          <div className="score">Score: {score}</div>
        </div>

        <div className="terminal-output">
          {terminalHistory.map((line, i) => (
            <div key={i} className="terminal-line">
              {line}
            </div>
          ))}
        </div>

        <form onSubmit={handleCommand} className="input-area">
          <span className="prompt">$</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
            disabled={setLevelCleared || setLevelFailed}
            placeholder={mounted ? "Enter command..." : "Type mount or eject"}
          />
        </form>

        <style jsx>{`
        .usb-terminal {
          background: #0d0d0d;
          border-radius: 8px;
          padding: 20px;
          color: #e0e0e0;
          font-family: 'Courier New', monospace;
          margin: 0 auto;
        }
        .terminal-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          align-items: center;
        }
        .score {
          background: #333;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 0.9em;
        }
        .terminal-output {
          height: 300px;
          overflow-y: auto;
          margin-bottom: 15px;
          border: 1px solid #333;
          padding: 10px;
          background: #000;
        }
        .terminal-line {
          margin: 3px 0;
          white-space: pre-wrap;
        }
        .input-area {
          display: flex;
          align-items: center;
          background: #000;
          padding: 8px;
          border: 1px solid #333;
        }
        .prompt {
          margin-right: 8px;
          color: #4CAF50;
        }
        input {
          background: transparent;
          border: none;
          color: white;
          font-family: inherit;
          flex-grow: 1;
          outline: none;
          font-size: 1em;
        }
        input:disabled {
          opacity: 0.5;
        }
      `}</style>
      </div>
    </div>
  );
}