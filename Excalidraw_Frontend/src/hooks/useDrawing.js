// import { useState } from "react";

// export function useDrawing() {

//   const [rectangles, setRectangles] = useState([]);
//   const [circles, setCircles] = useState([]);
//   const [lines, setLines] = useState([]);

//   const [isDrawing, setIsDrawing] = useState(false);

//   const [history, setHistory] = useState([]);
//   const [redoStack, setRedoStack] = useState([]);

//   const [selectedId, setSelectedId] = useState(null);

//   function handleUndo() {
//   if (history.length === 0) return;

//   const previousState = history[history.length - 1];

//   setRedoStack([
//     ...redoStack,
//     {
//       rectangles,
//       circles,
//       lines,
//     },
//   ]);

//   setRectangles(previousState.rectangles);
//   setCircles(previousState.circles);
//   setLines(previousState.lines);

//   setHistory(history.slice(0, history.length - 1));
//   setSelectedId(null);
// }

// function handleRedo() {
//   if (redoStack.length === 0) return;

//   const nextState = redoStack[redoStack.length - 1];

//   setHistory([
//     ...history,
//     {
//       rectangles,
//       circles,
//       lines,
//     },
//   ]);

//   setRectangles(nextState.rectangles);
//   setCircles(nextState.circles);
//   setLines(nextState.lines);

//   setRedoStack(redoStack.slice(0, redoStack.length - 1));
//   setSelectedId(null);
// }

//   function saveHistory() {

//     setHistory([
//       ...history,
//       {
//         rectangles,
//         circles,
//         lines,
//       },
//     ]);

//     setRedoStack([]);
//   }

//   function handleClear() {

//     saveHistory();

//     setRectangles([]);
//     setCircles([]);
//     setLines([]);

//     setSelectedId(null);
//   }

//   function handleDelete() {

//     if (!selectedId) return;

//     saveHistory();

//     setRectangles(
//       rectangles.filter(
//         (rect) => rect.id !== selectedId
//       )
//     );

//     setCircles(
//       circles.filter(
//         (circle) => circle.id !== selectedId
//       )
//     );

//     setLines(
//       lines.filter(
//         (line) => line.id !== selectedId
//       )
//     );

//     setSelectedId(null);
//   }

//   return {

//     rectangles,
//     setRectangles,

//     circles,
//     setCircles,

//     lines,
//     setLines,

//     isDrawing,
//     setIsDrawing,

//     history,
//     redoStack,

//     selectedId,
//     setSelectedId,

//     handleClear,
//     handleDelete,

//     saveHistory,

//     handleUndo,
// handleRedo,



//   };
// }


// common because backend handly undo or repo 

import { useState } from "react";

export function useDrawing() {

  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [lines, setLines] = useState([]);

  const [isDrawing, setIsDrawing] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  function handleClear() {

    setRectangles([]);
    setCircles([]);
    setLines([]);

    setSelectedId(null);
  }

  function handleDelete() {

    if (!selectedId) return;

    setRectangles(
      rectangles.filter(
        (rect) => rect.id !== selectedId
      )
    );

    setCircles(
      circles.filter(
        (circle) => circle.id !== selectedId
      )
    );

    setLines(
      lines.filter(
        (line) => line.id !== selectedId
      )
    );

    setSelectedId(null);
  }

  return {

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

  };
}