import React, { useState, useEffect } from "react";
import '../App.css';

const DraggableBox = ({id, content, isCreatingConnection, onClick, onConnectDown, onConnectUp, onEdit, onClose}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);


    const handleMouseDown = (event) => {
        onClick()
        if (isCreatingConnection) {
            onConnectDown(event, id)
        } else {
            setIsDragging(true);
            const offsetX = event.clientX - position.x;
            const offsetY = event.clientY - position.y;
            setDragOffset({ x: offsetX, y: offsetY });
        }
    };

    const handleMouseMove = (event) => {
        if (isDragging) {
            const x = event.clientX - dragOffset.x;
            const y = event.clientY - dragOffset.y;
            setPosition({ x, y });
        };
    };

    const handleMouseUp = (event) => {
        if (isCreatingConnection) {
            onConnectUp(event, id)
        }
        setIsDragging(false);
    };

    const handleClose = () => {
        onClose(id)
    };

    return (
        <div className="draggable-box"
        style={{
            position: 'absolute',
            top: position.y,
            left: position.x,
        }}
        key={id}
        id={`box-${id}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        >
            <div className="draggable-box-header">
            {content}
            <button className="draggable-box-close-button" onClick={handleClose}>+</button>
            </div>
            <button className="button-yellow-hover" onClick={() => onEdit(id)}>
                Edit Box
            </button>
        </div>
    );
};

export default DraggableBox;
