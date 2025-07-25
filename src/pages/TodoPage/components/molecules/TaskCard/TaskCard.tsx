import type { Task } from "@/pages/TodoPage/TodoPage";
import * as Kanban from "../../organisms/TodoBoard/TodoBoard";
import { CheckCircle2, Circle, CircleDotDashed } from "lucide-react";

interface TaskCardProps
  extends Omit<React.ComponentProps<typeof Kanban.Item>, "value"> {
  task: Task;
}

export default function TaskCard({ task, ...props }: TaskCardProps) {
  return (
    <Kanban.Item key={task.id} value={task.id} asChild {...props}>
      <div className="rounded-md border bg-card p-3 shadow-xs">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {task.status === 2 ? (
              <CheckCircle2 className="min-w-fit h-4 w-4 text-green-500" />
            ) : task.status === 1 ? (
              <CircleDotDashed className="min-w-fit h-4 w-4 text-blue-500" />
            ) : (
              <Circle className="min-w-fit text-muted-foreground h-4 w-4" />
            )}
            <span className="line-clamp-1 font-medium text-sm">
              {task.title}
            </span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            {task.assignee && (
              <div className="flex items-center gap-1">
                <div className="size-2 rounded-full bg-primary/20" />
                <span className="line-clamp-1">{task.assignee}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Kanban.Item>
  );
}
