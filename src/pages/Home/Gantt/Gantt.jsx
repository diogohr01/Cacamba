import React, { useState } from "react";
import { GanttOriginal, ViewMode } from "react-gantt-chart";

const App = () => {
  const [tasks] = useState([
    {
      type: "project",
      id: "ProjectSample",
      name: "1.Project",
      start: new Date(2021, 6, 1),
      end: new Date(2021, 9, 30),
      progress: 25,
      hideChildren: false,
    },
    {
      type: "task",
      id: "Task 0",
      name: "1.1 Task",
      start: new Date(2021, 6, 1),
      end: new Date(2021, 6, 30),
      progress: 45,
      project: "ProjectSample",
    },
    {
      type: "task",
      id: "Task 1",
      name: "1.2 Task",
      start: new Date(2021, 7, 1),
      end: new Date(2021, 7, 30),
      progress: 25,
      dependencies: ["Task 0"],
      project: "ProjectSample",
    },
    {
        type: "task",
        id: "Task 10",
        name: "1.2 Task",
        start: new Date(2021, 7, 1),
        end: new Date(2021, 7, 30),
        progress: 25,
        dependencies: ["Task 1"],
        project: "ProjectSample",
      },
      {
        type: "task",
        id: "Task 11",
        name: "1.2 Task",
        start: new Date(2021, 7, 1),
        end: new Date(2021, 7, 30),
        progress: 25,
        dependencies: ["Task 10"],
        project: "ProjectSample",
      },
    {
      type: "task",
      id: "Task 2",
      name: "1.3 Task",
      start: new Date(2021, 6, 1),
      end: new Date(2021, 7, 30),
      progress: 10,
      dependencies: ["Task 1"],
      project: "ProjectSample",
    },
    {
      type: "milestone",
      id: "Task 6",
      name: "1.3.1 MileStone (KT)",
      start: new Date(2021, 6, 1),
      end: new Date(2021, 6, 30),
      progress: 100,
      dependencies: ["Task 2"],
      project: "ProjectSample",
    },
  ]);

  return (
    <GanttOriginal
      tasks={tasks}
      viewMode={ViewMode.Month}
      columnWidth={200}
      ganttHeight={200}
    />
  );
};

export default App;
