import { useState } from "react";
import * as Kanban from "./components/organisms/TodoBoard/TodoBoard";
import TaskCard from "./components/molecules/TaskCard/TaskCard";
import TaskColumn from "./components/molecules/TaskColumn/TaskColumn";
import type { TodoStatus } from "./types/todoStatus";

export interface Task {
  id: string;
  title: string;
  status: TodoStatus;
  description?: string;
  assignee?: string;
  dueDate?: string;
}

export default function TodoPage() {
  const [columns, setColumns] = useState<Record<string, Task[]>>({
    pending: [
      {
        id: "1",
        title: "Format with proper heading structure",
        status: 0,
        assignee: "John Doe",
      },
      {
        id: "2",
        title: "Maintain consistent tone throughout",
        status: 0,
        assignee: "Jane Smith",
      },
      {
        id: "3",
        title: "Use short paragraphs and conversational tone",
        status: 0,
        assignee: "Bob Johnson",
      },
    ],
    inProgress: [
      {
        id: "4",
        title: "Verify facts and update outdated information",
        status: 1,
        assignee: "Alice Brown",
      },
      {
        id: "5",
        title: "Collect credible sources, statistics, and expert quotes",
        status: 1,
        assignee: "Charlie Wilson",
      },
    ],
    completed: [
      {
        id: "7",
        title: "Identify and define your target audience for the article",
        status: 2,
        assignee: "Eve Davis",
      },
      {
        id: "8",
        title: "Use active voice to make sentences more engaging",
        status: 2,
        assignee: "Frank White",
      },
    ],
  });
  return (
    <Kanban.Root
      value={columns}
      onValueChange={setColumns}
      getItemValue={(item) => item.id}
    >
      <Kanban.Board className="flex">
        {Object.entries(columns).map(([columnValue, tasks]) => (
          <TaskColumn key={columnValue} value={columnValue} tasks={tasks} />
        ))}
      </Kanban.Board>
      <Kanban.Overlay>
        {({ value, variant }) => {
          if (variant === "column") {
            const tasks = columns[value] ?? [];

            return <TaskColumn value={value} tasks={tasks} />;
          }

          const task = Object.values(columns)
            .flat()
            .find((task) => task.id === value);

          if (!task) return null;

          return <TaskCard task={task} />;
        }}
      </Kanban.Overlay>
    </Kanban.Root>
  );
}
