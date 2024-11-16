import React, { useState, useEffect, useRef, useCallback } from 'react';
import DraggableWrapper from '../../Components/Draggable/DraggableWrapper';
import './Snakegame.css';
import crossimg from '../../Assests/close.png';
import profileimg from '../../Assests/rattlesnake.png';

const Snakegame = ({ onClose, initialPosition, onUpdatePosition }) => {
    const [size, setSize] = useState({ width: 400, height: 400 });
    const [closing, setClosing] = useState(false);
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [direction, setDirection] = useState({ x: 0, y: 1 });
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0); // State for the score
    const profileRef = useRef(null);

    // Reset the game state
    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setDirection({ x: 0, y: 1 });
        setFood({ x: 15, y: 15 });
        setScore(0);
        setGameOver(false);
    };

    // Move snake logic
    const moveSnake = useCallback(() => {
        setSnake((prevSnake) => {
            const newHead = {
                x: (prevSnake[0].x + direction.x + 20) % 20,
                y: (prevSnake[0].y + direction.y + 20) % 20,
            };

            const newSnake = [newHead, ...prevSnake];
            if (newHead.x === food.x && newHead.y === food.y) {
                setFood({
                    x: Math.floor(Math.random() * 20),
                    y: Math.floor(Math.random() * 20),
                });
                setScore((prevScore) => prevScore + 1); // Increase score when food is eaten
            } else {
                newSnake.pop();
            }

            if (newSnake.some((segment, idx) => idx !== 0 && segment.x === newHead.x && segment.y === newHead.y)) {
                setGameOver(true);
            }

            return newSnake;
        });
    }, [direction, food]);

    // Handle keyboard input for snake direction
    const handleKeyDown = useCallback(
        (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    if (direction.y === 0) setDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                    if (direction.y === 0) setDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                    if (direction.x === 0) setDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                    if (direction.x === 0) setDirection({ x: 1, y: 0 });
                    break;
                default:
                    break;
            }
        },
        [direction]
    );

    useEffect(() => {
        const interval = setInterval(moveSnake, 200);
        return () => clearInterval(interval);
    }, [moveSnake]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Resize handling
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

    // Close game
    const handleClose = () => {
        setClosing(true);
        setTimeout(onClose, 500);
    };

    // Handle game restart
    const handleRestart = () => {
        resetGame();  // Reset game state when restarting
    };

    return (
        <DraggableWrapper initialPosition={initialPosition} onUpdatePosition={onUpdatePosition}>
            <div
                className={`myai-app ${closing ? 'closing' : ''}`}
                style={{ width: size.width, height: size.height }}
                ref={profileRef}
            >
                <div className="topbarm">
                    <div className="adjtopm">
                        <h2 className="app-titlem">
                            <img src={profileimg} alt="Snake" />
                        </h2>
                        <h2 className="app-titlem">Snake Game</h2>
                    </div>
                    <p className="close-buttonm" onClick={handleClose}>
                        <img src={crossimg} alt="Close" />
                    </p>
                </div>
                <div className="contentm">
                    <div className="score">
                        <h3>Score: {score}</h3> {/* Display score here */}
                    </div>
                    {gameOver ? (
                        <div className="game-over">
                            <h1>Game Over</h1>
                            <p>Final Score: {score}</p> {/* Display final score */}
                            <button onClick={handleRestart}>Restart</button> {/* Restart game */}
                        </div>
                    ) : (
                        <div className="game-board">
                            {Array.from({ length: 20 }, (_, y) =>
                                Array.from({ length: 20 }, (_, x) => (
                                    <div
                                        key={`${x}-${y}`}
                                        className={`cell ${
                                            snake.some((segment) => segment.x === x && segment.y === y)
                                                ? 'snake'
                                                : food.x === x && food.y === y
                                                ? 'food'
                                                : ''
                                        }`}
                                    ></div>
                                ))
                            )}
                        </div>
                    )}
                </div>
                <div className="resizer" onMouseDown={handleMouseDown} />
            </div>
        </DraggableWrapper>
    );
};

export default Snakegame;
