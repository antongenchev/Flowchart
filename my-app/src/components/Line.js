import React from "react";
import '../App.css';



const Line = ({id, from, to, toCoordinate=[0,0] }) => {
    const [fromX, fromY] = getPosition(from);
    let toX, toY;
    if (typeof to !== 'undefined') {
        [toX, toY] = getPosition(to);
    } else {
        [toX, toY] = toCoordinate;
    }

    return (
        <line
            x1={fromX}
            y1={fromY}
            x2={toX}
            y2={toY}
            stroke="yellow"
            strokeWidth="2"
        />
    );
 }

 export const getPosition = (index) => {
    const box = document.getElementById(`box-${index}`);
    if (!box) return [0,0];
    const { left, top, width, height } = box.getBoundingClientRect();
    return [left + width / 2, top + height / 2];
 }

export default Line