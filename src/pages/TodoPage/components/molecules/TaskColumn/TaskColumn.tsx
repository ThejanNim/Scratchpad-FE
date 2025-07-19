import type { Task } from "@/pages/TodoPage/TodoPage";
import * as Kanban from "../../organisms/TodoBoard/TodoBoard";
import { Button } from "@/components/atoms/Button/Button";
import { GripVertical } from "lucide-react";
import { Badge } from "@/components/atoms/Badge/Badge";
import TaskCard from "../TaskCard/TaskCard";

interface TaskColumnProps
  extends Omit<React.ComponentProps<typeof Kanban.Column>, "children"> {
  tasks: Task[];
}

const COLUMN_TITLES: Record<string, string> = {
  pending: "Pending",
  inProgress: "In Progress",
  completed: "Completed",
};

export default function TaskColumn({
  value,
  tasks,
  ...props
}: TaskColumnProps) {
  return (
    <Kanban.Column value={value} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{COLUMN_TITLES[value]}</span>
          <Badge variant="secondary" className="pointer-events-none rounded-sm">
            {tasks.length}
          </Badge>
        </div>
        <Kanban.ColumnHandle asChild>
          <Button variant="ghost" size="icon">
            <GripVertical className="h-4 w-4" />
          </Button>
        </Kanban.ColumnHandle>
      </div>
      <div className="flex flex-col gap-2 p-0.5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} asHandle />
        ))}
      </div>
    </Kanban.Column>
  );
}
