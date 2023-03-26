import './App.css';
import { useState, useRef, useCallback, useEffect } from 'react';
import DraggableBox from './components/DraggableBox';
import Line from './components/Line'
import { getPosition } from './components/Line';
import BoxEditor from './components/BoxEditor';



function App() {
  const [boxCount, setBoxCount] = useState(0);
  const [boxOrder, setBoxOrder] = useState([]);

  const [isCreatingConnection, setIsCreatingConnection] = useState(false);
  const [hasStartedConnecting, setHasStartedConnecting] = useState(false);
  const [connectionFrom, setConnectionFrom] = useState();
  const [lines, setLines] = useState([]);

  const [connectionStart, setConnectionStart] = useState(null)
  const [mousePos, setMousePos] = useState(null);

  const [editingBox, setEditingBox] = useState(null)

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleAddBox = () => {
    setBoxCount(boxCount + 1);
    setBoxOrder([...boxOrder, boxCount]);
  };

  const handleCloseBox = (id) => {
    setBoxes((prevBoxes) => prevBoxes.filter((box) => box.props.id !== id));
    setBoxOrder((prevOrder) => prevOrder.filter((i) => i !==id));

    setLines((prevLines) => prevLines.filter((line) => line.from !== id && line.to !== id));
  }

  const handleCreateConnectionClick = () => {
    setIsCreatingConnection(true);
  };

  const handleBoxClick = (index) => {
    const newOrder = boxOrder.filter((j) => j !== index);
    setBoxOrder([...newOrder, index]);
  };

  const createConnection = (box1Index, box2Index) => {
    setLines([...lines, { from: box1Index, to: box2Index }]);
    //setConnections(connections => ({
    //  ...connections, [from]: [...(connections[from] || []), to], [to]: [...(connections[to] || []), from],
    //}))
  }

  const handleMouseMove = useCallback((e) => {
    setMousePos([e.clientX, e.clientY]);
  }, [])

  const  handleMouseDownConnect = (e, index) => {
    e.preventDefault();
    setConnectionFrom(index);
    setHasStartedConnecting(true)
    setConnectionStart(index)
  };

  const handleMouseUpConnect = (e, index) => {
    e.preventDefault();
    if (hasStartedConnecting) {
      createConnection(connectionFrom, index)
      setIsCreatingConnection(false);
      setHasStartedConnecting(false);
    }
  };

  const handleEditBoxClick = (boxId) => {
    setEditingBox(boxId);
  };

  const handleCloseBoxEditor = () => {
    setEditingBox(null);
  };

  const handleBoxContentSave = (newContent) => {
    const filteredBox = boxes.filter(box => box.props.id === editingBox)[0]
    const updatedBox = (
      <DraggableBox
        id={filteredBox.props.id}
        key={filteredBox.props.id}
        isCreatingConnection={filteredBox.props.isCreatingConnection}
        onClick={filteredBox.props.onClick}
        onConnectDown={filteredBox.props.onConnectDown}
        onConnectUp={filteredBox.props.onConnectUp}
        onEdit={filteredBox.props.onEdit}
        onClose={filteredBox.props.onClose}
        content={newContent}
        />
    );
    setBoxes((prevBoxes) => {
      const index = prevBoxes.findIndex((box) => box.props.id === editingBox);
      return [
        ...prevBoxes.slice(0, index),
        updatedBox,
        ...prevBoxes.slice(index + 1),
      ];
    });
    setEditingBox(null);
  };




  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    setBoxes(boxOrder.map((i) => (
    <DraggableBox id={i}  key={i}
    isCreatingConnection={isCreatingConnection}
    onClick={() => handleBoxClick(i)}
    onConnect={(toIndex) => createConnection(i, toIndex)}
    onConnectDown={handleMouseDownConnect}
    onConnectUp={handleMouseUpConnect}
    onEdit={handleEditBoxClick}
    onClose={handleCloseBox}
    content={boxes.find(box => box.props.id === i)?.props?.content}
    />)))}, [boxOrder, isCreatingConnection])

  
  const svgLines = lines.map((line, i) => (
    <Line key={i} from={line.from} to={line.to}/>
  ));



  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <button onClick={handleAddBox}>Add Box</button>
      <button onClick={handleCreateConnectionClick}>Create Connection</button>
      {boxes}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none'}}>
        {svgLines}
        {hasStartedConnecting && <Line from={connectionStart} toCoordinate={mousePos}/>}
      </svg>
      {(editingBox !== null) && 
      <BoxEditor onBoxContentSave={handleBoxContentSave} onClose={handleCloseBoxEditor}
      box={boxes.filter(box => box.props.id === editingBox)} />
      }
    </div>
  );
}

export default App;
