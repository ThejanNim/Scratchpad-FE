import { useState } from "react";
import * as Kanban from "./components/organisms/TodoBoard/TodoBoard";
import TaskCard from "./components/molecules/TaskCard/TaskCard";
import TaskColumn from "./components/molecules/TaskColumn/TaskColumn";

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
}

export default function TodoPage() {
  const [columns, setColumns] = useState<Record<string, Task[]>>({
    pending: [
      {
        id: "1",
        title: "Add authentication",
        assignee: "John Doe",
        dueDate: "2024-04-01",
      },
      {
        id: "2",
        title: "Create API endpoints",
        assignee: "Jane Smith",
        dueDate: "2024-04-05",
      },
      {
        id: "3",
        title: "Write documentation",
        assignee: "Bob Johnson",
        dueDate: "2024-04-10",
      },
    ],
    inProgress: [
      {
        id: "4",
        title: "Design system updates",
        assignee: "Alice Brown",
        dueDate: "2024-03-28",
      },
      {
        id: "5",
        title: "Implement dark mode",
        assignee: "Charlie Wilson",
        dueDate: "2024-04-02",
      },
    ],
    completed: [
      {
        id: "7",
        title: "Setup project",
        assignee: "Eve Davis",
        dueDate: "2024-03-25",
      },
      {
        id: "8",
        title: "Initial commit",
        assignee: "Frank White",
        dueDate: "2024-03-24",
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
