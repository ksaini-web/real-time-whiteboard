import { useRef, useState, useEffect } from "react";
import { Stage, Layer, Rect, Circle, Line } from "react-konva";
import { useParams } from "react-router-dom";

import Toolbar from "./Toolbar";
import ChatSidebar from "./ChatSidebar";
import { useDrawing } from "../hooks/useDrawing";

import {
  saveShapeToBackend,
  updateShapeInBackend,
  getShapesByBoard,
  deleteShapeFromBackend,
  clearBoardShapes,
  undoBoard,
  redoBoard,
  getMessagesByBoard,
} from "../api/shapeApi";

import { getBoardAccess } from "../api/boardApi";

import {
  connectSocket,
  sendShape,
  sendChatMessage,
  subscribeBoardChat,
} from "../socket/socket";




function CanvasBoard() {

  const {boardCode} = useParams();
  const stageRef = useRef(null);



  const [boardId, setBoardId] = useState("");
const [boardRole,setBoardRole] = useState("");

  const [chatEnabled, setChatEnabled] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [chatReady, setChatReady] = useState(false);
  const [tool, setTool] = useState("select");
  const [fillColor, setFillColor] = useState("white");

  const {
    rectangles,
    setRectangles,
    circles,
    setCircles,
    lines,
    setLines,
    isDrawing,
    setIsDrawing,
    selectedId,
    setSelectedId,
    handleClear,
    handleDelete,
  } = useDrawing();

  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight);
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleScroll() {
      const bottomPosition = window.innerHeight + window.scrollY;
      const rightPosition = window.innerWidth + window.scrollX;

      setCanvasHeight((prev) =>
        bottomPosition > prev - 500 ? prev + 2000 : prev
      );

      setCanvasWidth((prev) =>
        rightPosition > prev - 500 ? prev + 2000 : prev
      );
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    async function loadBoard() {
      const user = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(user);

      if (!user) {
        alert("Please login first");
        return;
      }

      const board = await getBoardAccess(boardCode, user.id);
      setBoardId(board.id);
      setBoardRole(board.role);

setChatEnabled(board.chatEnabled);
      const savedShapes = await getShapesByBoard(board.id);

      const loadedRectangles = [];
      const loadedCircles = [];
      const loadedLines = [];

      

      savedShapes.forEach((shape) => {
        const data = JSON.parse(shape.shapeData);

        const finalShape = {
          ...data,
          backendId: shape.id,
        };

        if (shape.type === "RECTANGLE") loadedRectangles.push(finalShape);
        if (shape.type === "CIRCLE") loadedCircles.push(finalShape);
        if (shape.type === "LINE") loadedLines.push(finalShape);
      });

      setRectangles(loadedRectangles);
      setCircles(loadedCircles);
      setLines(loadedLines);

      const savedMessages = await getMessagesByBoard(board.id);
      setMessages(savedMessages);
    }

    loadBoard();
  }, [boardCode]);

  const canEdit = 
  boardRole === "OWNER"||boardRole==="EDITOR";

  async function handleUndoBoard() {
    if (!boardId) return;
      if (!canEdit) return;

    await undoBoard(boardId);

    sendShape({
      action: "REFRESH_BOARD",
      boardId,
    });

    window.location.reload();
  }

  async function handleRedoBoard() {
    if (!boardId) return;
      if (!canEdit) return;

    await redoBoard(boardId);

    sendShape({
      action: "REFRESH_BOARD",
      boardId,
    });

    window.location.reload();
  }

  function handleMouseDown(e) {
    if (!boardId) return;
    if(!canEdit)return;

    const clickedOnEmpty = e.target === e.target.getStage();

    if (!clickedOnEmpty) return;
    if (tool === "select") return;

    setIsDrawing(true);

    const stage = stageRef.current;
    const position = stage.getPointerPosition();

    if (tool === "rectangle") {
      setRectangles([
        ...rectangles,
        {
          id: Date.now(),
          backendId: null,
          x: position.x,
          y: position.y,
          width: 0,
          height: 0,
          fill: fillColor,
          stroke: "black",
          strokeWidth: 2,
        },
      ]);
    }

    if (tool === "circle") {
      setCircles([
        ...circles,
        {
          id: Date.now(),
          backendId: null,
          x: position.x,
          y: position.y,
          radius: 0,
          fill: fillColor,
          stroke: "black",
          strokeWidth: 2,
        },
      ]);
    }

    if (tool === "pencil") {
      setLines([
        ...lines,
        {
          id: Date.now(),
          backendId: null,
          points: [position.x, position.y],
          stroke: "black",
          strokeWidth: 2,
        },
      ]);
    }
  }

  function handleMouseMove() {
        if(!canEdit)return;
    if (!isDrawing) return;

    const stage = stageRef.current;
    const position = stage.getPointerPosition();

    if (tool === "rectangle") {
      const lastIndex = rectangles.length - 1;

      setRectangles(
        rectangles.map((rect, index) =>
          index === lastIndex
            ? {
                ...rect,
                width: position.x - rect.x,
                height: position.y - rect.y,
              }
            : rect
        )
      );
    }

    if (tool === "circle") {
      const lastIndex = circles.length - 1;

      setCircles(
        circles.map((circle, index) =>
          index === lastIndex
            ? {
                ...circle,
                radius: Math.abs(position.x - circle.x),
              }
            : circle
        )
      );
    }

    if (tool === "pencil") {
      const lastIndex = lines.length - 1;

      setLines(
        lines.map((line, index) =>
          index === lastIndex
            ? {
                ...line,
                points: [...line.points, position.x, position.y],
              }
            : line
        )
      );
    }
  }

  async function handleMouseUp() {
        if(!canEdit)return;
    if (!isDrawing) return;
    if (!boardId) return;

    setIsDrawing(false);

    if (tool === "rectangle") {
      const lastRectangle = rectangles[rectangles.length - 1];

      if (lastRectangle && !lastRectangle.backendId) {
        const backendId = await saveShapeToBackend(
          lastRectangle,
          "RECTANGLE",
          boardId
        );

        setRectangles(
          rectangles.map((item) =>
            item.id === lastRectangle.id ? { ...item, backendId } : item
          )
        );

        sendShape({
          id: backendId,
          boardId,
          type: "RECTANGLE",
          shapeData: JSON.stringify({ ...lastRectangle, backendId }),
        });
      }
    }

    if (tool === "circle") {
      const lastCircle = circles[circles.length - 1];

      if (lastCircle && !lastCircle.backendId) {
        const backendId = await saveShapeToBackend(
          lastCircle,
          "CIRCLE",
          boardId
        );

        setCircles(
          circles.map((item) =>
            item.id === lastCircle.id ? { ...item, backendId } : item
          )
        );

        sendShape({
          id: backendId,
          boardId,
          type: "CIRCLE",
          shapeData: JSON.stringify({ ...lastCircle, backendId }),
        });
      }
    }

    if (tool === "pencil") {
      const lastLine = lines[lines.length - 1];

      if (lastLine && !lastLine.backendId) {
        const backendId = await saveShapeToBackend(lastLine, "LINE", boardId);

        setLines(
          lines.map((item) =>
            item.id === lastLine.id ? { ...item, backendId } : item
          )
        );

        sendShape({
          id: backendId,
          boardId,
          type: "LINE",
          shapeData: JSON.stringify({ ...lastLine, backendId }),
        });
      }
    }
  }

  useEffect(() => {
    connectSocket((shape) => {
      if (shape.boardId && boardId && shape.boardId !== boardId) {
        return;
      }

      if (shape.message) {
        setMessages((prev) => [...prev, shape]);
        return;
      }

      if (shape.action === "REFRESH_BOARD") {
        window.location.reload();
        return;
      }

      if (shape.action === "DELETE") {
        setRectangles((prev) =>
          prev.filter((item) => item.backendId !== shape.id)
        );

        setCircles((prev) =>
          prev.filter((item) => item.backendId !== shape.id)
        );

        setLines((prev) =>
          prev.filter((item) => item.backendId !== shape.id)
        );

        return;
      }

      if (shape.action === "CLEAR") {
        setRectangles([]);
        setCircles([]);
        setLines([]);
        setSelectedId(null);
        return;
      }

      const data = JSON.parse(shape.shapeData);

      const finalShape = {
        ...data,
        backendId: shape.id,
        type: shape.type,
      };

      if (shape.type === "RECTANGLE") {
        setRectangles((prev) => {
          const exists = prev.some(
            (item) => item.backendId === finalShape.backendId
          );

          if (exists) {
            return prev.map((item) =>
              item.backendId === finalShape.backendId ? finalShape : item
            );
          }

          return [...prev, finalShape];
        });
      }

      if (shape.type === "CIRCLE") {
        setCircles((prev) => {
          const exists = prev.some(
            (item) => item.backendId === finalShape.backendId
          );

          if (exists) {
            return prev.map((item) =>
              item.backendId === finalShape.backendId ? finalShape : item
            );
          }

          return [...prev, finalShape];
        });
      }

      if (shape.type === "LINE") {
        setLines((prev) => {
          const exists = prev.some(
            (item) => item.backendId === finalShape.backendId
          );

          if (exists) {
            return prev.map((item) =>
              item.backendId === finalShape.backendId ? finalShape : item
            );
          }

          return [...prev, finalShape];
        });
      }
    });
  }, [boardId]);

  useEffect(() => {
    if (!boardId) return;

    let sub = null;
    let intervalId = null;
    function subscribe() {
      if (sub) return true;

      sub = subscribeBoardChat(boardId, (message) => {
        setMessages((prev) => [...prev, message]);
      });

      if (sub) setChatReady(true);

      return Boolean(sub);
    }

    if (!subscribe()) {
      intervalId = window.setInterval(() => {
        if (subscribe()) {
          window.clearInterval(intervalId);
        }
      }, 200);
    }

    return () => {
      if (intervalId) window.clearInterval(intervalId);
      if (sub) sub.unsubscribe();
      setChatReady(false);
    };
  }, [boardId]);

  async function handleDeleteShape() {
        if(!canEdit)return;
    if (!selectedId) return;
    if (!boardId) return;

    const selectedRectangle = rectangles.find((rect) => rect.id === selectedId);
    const selectedCircle = circles.find((circle) => circle.id === selectedId);
    const selectedLine = lines.find((line) => line.id === selectedId);

    const selectedShape = selectedRectangle || selectedCircle || selectedLine;

    if (!selectedShape) return;

    if (selectedShape.backendId) {
      await deleteShapeFromBackend(selectedShape.backendId);
    }

    sendShape({
      action: "DELETE",
      id: selectedShape.backendId,
      boardId,
    });

    handleDelete();
  }

  async function handleClearBoard() {
        if(!canEdit)return;
    if (!boardId) return;

    await clearBoardShapes(boardId);

    sendShape({
      action: "CLEAR",
      boardId,
    });

    handleClear();
  }

  return (
    <div className="min-h-screen bg-slate-100">
     {canEdit && (
  <Toolbar
    tool={tool}
    setTool={setTool}
    handleDelete={handleDeleteShape}
    handleClear={handleClearBoard}
    handleUndo={handleUndoBoard}
    handleRedo={handleRedoBoard}
    fillColor={fillColor}
    setFillColor={setFillColor}
  />
)}

{!canEdit && (
  <div className="fixed left-4 top-4 z-50 rounded-lg bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800 shadow">
    View only mode
  </div>
)}


      <ChatSidebar
        messages={messages}
        sendMessage={sendChatMessage}
        chatEnabled={chatEnabled}
        currentUser={currentUser}
        boardId={boardId}
        chatReady={chatReady}
      />

      <div className="bg-white">
        <Stage
          ref={stageRef}
          width={canvasWidth}
          height={canvasHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            {rectangles.map((rect) => (
              <Rect
                key={rect.id}
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                fill={rect.fill}
                stroke={selectedId === rect.id ? "#2563eb" : rect.stroke}
                strokeWidth={rect.strokeWidth}
                draggable={canEdit&&tool === "select"}
                onClick={() => setSelectedId(rect.id)}
                onDragEnd={(e) => {
                  if (!canEdit) return;
                  if (!boardId) return;

                  const updatedRectangle = {
                    ...rect,
                    x: e.target.x(),
                    y: e.target.y(),
                  };

                  setRectangles(
                    rectangles.map((item) =>
                      item.id === rect.id ? updatedRectangle : item
                    )
                  );

                  updateShapeInBackend(updatedRectangle, "RECTANGLE", boardId);

                  sendShape({
                    id: updatedRectangle.backendId,
                    boardId,
                    type: "RECTANGLE",
                    shapeData: JSON.stringify(updatedRectangle),
                  });
                }}
              />
            ))}

            {circles.map((circle) => (
              <Circle
                key={circle.id}
                x={circle.x}
                y={circle.y}
                radius={circle.radius}
                fill={circle.fill}
                stroke={selectedId === circle.id ? "#2563eb" : circle.stroke}
                strokeWidth={circle.strokeWidth}
               draggable={canEdit && tool === "select"}
                onClick={() => setSelectedId(circle.id)}
                onDragEnd={(e) => {
                  if (!canEdit) return;
                  if (!boardId) return;

                  const updatedCircle = {
                    ...circle,
                    x: e.target.x(),
                    y: e.target.y(),
                  };

                  setCircles(
                    circles.map((item) =>
                      item.id === circle.id ? updatedCircle : item
                    )
                  );

                  updateShapeInBackend(updatedCircle, "CIRCLE", boardId);

                  sendShape({
                    id: updatedCircle.backendId,
                    boardId,
                    type: "CIRCLE",
                    shapeData: JSON.stringify(updatedCircle),
                  });
                }}
              />
            ))}

            {lines.map((line) => (
              <Line
                key={line.id}
                points={line.points}
                stroke={selectedId === line.id ? "#2563eb" : line.stroke}
                strokeWidth={selectedId === line.id ? 4 : line.strokeWidth}
                hitStrokeWidth={20}
                lineCap="round"
                lineJoin="round"
                draggable={canEdit&&tool === "select"}
                onClick={() => setSelectedId(line.id)}
                onDragEnd={(e) => {
                  if (!canEdit) return;
                  if (!boardId) return;

                  const dx = e.target.x();
                  const dy = e.target.y();

                  const updatedLine = {
                    ...line,
                    points: line.points.map((point, index) =>
                      index % 2 === 0 ? point + dx : point + dy
                    ),
                  };

                  e.target.x(0);
                  e.target.y(0);

                  setLines(
                    lines.map((item) =>
                      item.id === line.id ? updatedLine : item
                    )
                  );

                  updateShapeInBackend(updatedLine, "LINE", boardId);

                  sendShape({
                    id: updatedLine.backendId,
                    boardId,
                    type: "LINE",
                    shapeData: JSON.stringify(updatedLine),
                  });
                }}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default CanvasBoard;
