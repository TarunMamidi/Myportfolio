import React, { useState, useRef, useEffect } from 'react';
import { Typed } from 'react-typed';
import DraggableWrapper from '../../Components/Draggable/DraggableWrapper';
import './Terminal.css';
import crossimg from '../../Assests/close.png';
import terminalimg from '../../Assests/terminal.png';

const commands = {
  help: "Available commands: help, whois, education, skills, experience, and also we can open apps from terminal",
  whois: "My name is Sriman Tarun. I am a FullStack developer.",
  education: "I have a degree in ECE from Vishnu Institute of Technology.",
  skills: "JavaScript, React, Node.js, Python, ...",
  experience: "I have worked at Greenko Company for 3 months as an Intern in ICT services.",
  profile: "Opening Profile app...",
  calculator: "Opening Calculator app...",
  about: "Opening About app...",
  browser: "Opening Browser app...",
  info: "Opening Info app...",
  exit: "closing terminal...",
  settings: "Opening Settings app..."
};

const Terminal = ({ onClose, initialPosition, onUpdatePosition, onOpenProfile, onOpenCalculator, onOpenAbout, onOpenSettings, onOpenHelp, onOpenBrowser }) => {
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [closing, setClosing] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const terminalRef = useRef(null);
  const cursorRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const updateCursorPosition = () => {
      const inputElement = inputRef.current;
      const cursorElement = cursorRef.current;

      if (inputElement && cursorElement) {
        const text = inputElement.value.substring(0, inputElement.selectionStart);
        const textWidth = getTextWidth(text, inputElement.style.fontFamily, inputElement.style.fontSize);

        cursorElement.style.left = `${textWidth}px`;
      }
    };

    const getTextWidth = (text, fontFamily, fontSize) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        context.font = `${fontSize} ${fontFamily}`;
        return context.measureText(text).width;
      }
      return 0;
    };

    updateCursorPosition();

    window.addEventListener('resize', updateCursorPosition);
    return () => {
      window.removeEventListener('resize', updateCursorPosition);
    };
  }, [input]);

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const handleMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      const newHeight = startHeight + (e.clientY - startY);
      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 500);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase();
      if (command === 'clear') {
        setOutput([]);
      } else {
        const response = commands[command] || `Command not found: ${command}`;
        const newOutput = [...output, { command, response }];
        setOutput(newOutput);

        setTimeout(() => {
          const lastIndex = newOutput.length - 1;
          const typedElement = document.getElementById(`typed-${lastIndex}`);

          if (typedElement) {
            const typedInstance = new Typed(`#typed-${lastIndex}`, {
              strings: [response],
              typeSpeed: 40,
              showCursor: false,
            });

            newOutput[lastIndex].typedInstance = typedInstance;
          }

          if (command === 'profile') {
            onOpenProfile(); 
          }
          if (command === 'calculator') {
            onOpenCalculator();
          }
          if (command === 'about') {
            onOpenAbout();
          }
          if (command === 'settings') {
            onOpenSettings();
          }
          if (command === 'info') {
            onOpenHelp();
          }
          if (command === 'exit') {
            handleClose();
          }
          if (command === 'browser') {
            onOpenBrowser();
          }

        }, 0);
      }
      setInput('');
    }
  };

  return (
    <DraggableWrapper initialPosition={initialPosition} onUpdatePosition={onUpdatePosition}>
      <div
        className={`terminal-app ${closing ? 'closing' : ''}`}
        style={{ width: size.width, height: size.height }}
        ref={terminalRef}
      >
        <div className='topbart'>
          <div className='adjtop'>
            <h2 className='app-titlet'><img src={terminalimg} alt="Terminal" /></h2>
            <h2 className='app-titlet'>Terminal</h2>
          </div>
          <p className='close-buttont' onClick={handleClose}><img src={crossimg} alt="Close" /></p>
        </div>
        <div className='contentt'>
          {output.map((item, index) => (
            <div key={index}>
              <div className="prompt">{`Tarun's-portfolio~:$ ${item.command}`}</div>
              <div id={`typed-${index}`} className="response"></div>
            </div>
          ))}
          <div className="input-line">
            
            <div className="prompt">{`Tarun's-portfolio~:$ `}</div>
            <input
              className="terminal-input"
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
              autoFocus
              ref={inputRef}
            />
            <span className="blinking-cursor" ref={cursorRef}>█</span>
          </div>
        </div>
        <div
          className='resizer'
          onMouseDown={handleMouseDown}
        />
      </div>
    </DraggableWrapper>
  );
};

export default Terminal;
