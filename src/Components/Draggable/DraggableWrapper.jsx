import React, { useRef, useState } from 'react';

const DraggableWrapper = ({ children, initialPosition, onUpdatePosition }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(initialPosition);
    const dragRef = useRef(null);

    const handleMouseDown = (e) => {
        const dragElement = dragRef.current;
        if (!dragElement) return;

        const rect = dragElement.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        setIsDragging({ x: offsetX, y: offsetY });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const newPosition = {
            x: e.clientX - isDragging.x,
            y: e.clientY - isDragging.y,
        };

        setPosition(newPosition);
        onUpdatePosition(newPosition);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            ref={dragRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ 
                position: 'absolute', 
                left: `${position.x}px`, 
                top: `${position.y}px`, 
                cursor: 'move' 
            }}
        >
            {children}
        </div>
    );
};

export default DraggableWrapper;
