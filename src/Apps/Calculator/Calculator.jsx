import React, { useState, useEffect, useCallback, useRef } from 'react';
import DraggableWrapper from '../../Components/Draggable/DraggableWrapper';
import './Calculator.css';
import crossimg from '../../Assests/close.png';
import calimg from '../../Assests/calculator.png';
import BMIScale from '../../Components/Bmiscale/Bmiscale'; 

const Calculator = ({ onClose, initialPosition, onUpdatePosition }) => {
    const [display, setDisplay] = useState('');
    const [size, setSize] = useState({ width: 400, height: 550 });
    const [closing, setClosing] = useState(false);
    const calculatorRef = useRef(null);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
    const [initialSize, setInitialSize] = useState({ width: 400, height: 550 });
    const [isFocused, setIsFocused] = useState(false);
    const [zIndex, setZIndex] = useState(1);
    const [mode, setMode] = useState('regular');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [heightUnit, setHeightUnit] = useState('cm'); 
    const [weightUnit, setWeightUnit] = useState('kg'); 
    const [BMIStatus, setBMIStatus] = useState('');
    const [bmiValue, setBMIValue] = useState(0); 

    const evaluateExpression = useCallback(() => {
        try {
            const result = eval(display);
            setDisplay(result.toString());
        } catch {
            setDisplay('Error');
        }
    }, [display]);

    const clearDisplay = useCallback(() => {
        setDisplay('');
    }, []);

    const handleInput = useCallback((input) => {
        if (input === '=') {
            evaluateExpression();
        } else if (input === 'C') {
            clearDisplay();
        } else {
            setDisplay(prevDisplay => prevDisplay + input);
        }
    }, [evaluateExpression, clearDisplay]);

    const handleResizeMouseDown = (e) => {
        setResizeStart({ x: e.clientX, y: e.clientY });
        setIsResizing(true);
        setInitialSize({ ...size });
        setZIndex(1000);
    };

    const handleResizeMouseMove = useCallback((e) => {
        if (!isResizing) return;

        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;

        const newWidth = Math.max(initialSize.width + deltaX, 300);
        const newHeight = Math.max(initialSize.height + deltaY, 400);

        setSize({ width: newWidth, height: newHeight });
    }, [isResizing, resizeStart.x, resizeStart.y, initialSize]);

    const handleResizeMouseUp = useCallback(() => {
        setIsResizing(false);
        setZIndex(1);
    }, []);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleResizeMouseMove);
            document.addEventListener('mouseup', handleResizeMouseUp);
        } else {
            document.removeEventListener('mousemove', handleResizeMouseMove);
            document.removeEventListener('mouseup', handleResizeMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleResizeMouseMove);
            document.removeEventListener('mouseup', handleResizeMouseUp);
        };
    }, [isResizing, handleResizeMouseMove, handleResizeMouseUp]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!isFocused) return;

            const { key } = event;
            if (key.match(/[0-9+\-*/.=]|Enter|Backspace|Delete/)) {
                event.preventDefault();
                if (key === 'Enter') {
                    evaluateExpression();
                } else if (key === 'Delete' || key === 'Backspace') {
                    clearDisplay();
                } else {
                    handleInput(key);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isFocused, handleInput, evaluateExpression, clearDisplay]);

    const handleFocus = () => {
        setIsFocused(true);
        setZIndex(1000);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setZIndex(1);
    };

    const handleClose = () => {
        setClosing(true);
        setTimeout(onClose, 500);
    };

    const handleBMICalculate = () => {
        let heightInMeters = parseFloat(height); 
        if (heightUnit === 'cm') {
            heightInMeters = parseFloat(height) / 100; 
        } else if (heightUnit === 'ft') {
            heightInMeters = parseFloat(height) * 0.3048; 
        } 

        let weightInKg = parseFloat(weight); 
        if (weightUnit === 'lb') {
            weightInKg = parseFloat(weight) * 0.453592; 
        } 

        if (!isNaN(heightInMeters) && !isNaN(weightInKg) && heightInMeters > 0) {
            const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
            setDisplay(bmi);

            
            if (bmi < 18.5) {
                setBMIStatus('Underweight');
            } else if (bmi >= 18.5 && bmi < 24.9) {
                setBMIStatus('Normal weight');
            } else if (bmi >= 24.9 && bmi < 29.9) {
                setBMIStatus('Overweight');
            } else {
                setBMIStatus('Obese');
            }

            
            setBMIValue(bmi);
        } else {
            setDisplay('Error');
        }
    };

    return (
        <DraggableWrapper initialPosition={initialPosition} onUpdatePosition={onUpdatePosition}>
            <div
                className={`cal-app ${closing ? 'closing' : ''}`}
                style={{ width: size.width, height: size.height, zIndex }}
                ref={calculatorRef}
                onMouseDown={handleFocus}
                onBlur={handleBlur}
                tabIndex="0"
            >
                <div className='topbarc'>
                    <div className='adjtopc'>
                        <h2 className='app-titlec'><img src={calimg} alt="Calculator" /></h2>
                        <h2 className='app-titlec'>Calculator</h2>
                    </div>
                    <div className='mode-toggle'>
                        <button onClick={() => setMode('regular')} className={mode === 'regular' ? 'active' : ''}>Regular</button>
                        <button onClick={() => setMode('bmi')} className={mode === 'bmi' ? 'active' : ''}>BMI</button>
                    </div>
                    <p className='close-buttonc' onClick={handleClose}><img src={crossimg} alt="Close" /></p>
                </div>
                <div className='contentc'>
                    {mode === 'regular' ? (
                        <>
                            <div className="display">{display}</div>
                            <div className='keys'>
                                <div className="buttons">
                                    {['7', '8', '9', '/'].map((btn) => (
                                        <button onClick={() => handleInput(btn)} key={btn}>{btn}</button>
                                    ))}
                                    {['4', '5', '6', '*'].map((btn) => (
                                        <button onClick={() => handleInput(btn)} key={btn}>{btn}</button>
                                    ))}
                                    {['1', '2', '3', '-'].map((btn) => (
                                        <button onClick={() => handleInput(btn)} key={btn}>{btn}</button>
                                    ))}
                                    {['0', '.', '=', '+'].map((btn) => (
                                        <button onClick={() => handleInput(btn)} key={btn}>{btn}</button>
                                    ))}
                                    <button className="clear-button" onClick={() => handleInput('C')} key="C">C</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bmi-inputs">
                                <div className="bmi-input">
                                    <label htmlFor="height">Height:</label>
                                    <input
                                        id="height"
                                        type="number"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                    />
                                    <select value={heightUnit} onChange={(e) => setHeightUnit(e.target.value)}>
                                        <option value="m">m</option>
                                        <option value="cm">cm</option>
                                        <option value="ft">ft</option>
                                    </select>
                                </div>
                                <div className="bmi-input">
                                    <label htmlFor="weight">Weight:</label>
                                    <input
                                        id="weight"
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                    />
                                    <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
                                        <option value="kg">kg</option>
                                        <option value="lb">lb</option>
                                    </select>
                                </div>
                                <button className="calculate-button" onClick={handleBMICalculate}>Calculate BMI</button>
                            </div>
                            <div className='bmibox'>
                                <BMIScale bmiValue={parseFloat(bmiValue)} />
                                <div className="bmi-status">{BMIStatus}</div>
                            </div>
                            
                        </>
                    )}
                </div>
                <div
                    className={`resizer ${isResizing ? 'resizing' : ''}`}
                    onMouseDown={handleResizeMouseDown}
                ></div>
            </div>
        </DraggableWrapper>
    );
};

export default Calculator;
