import { Badge, Button, FormCheck } from "react-bootstrap";
import { formatDate } from "../../utils/formatDate";
import styles from "../MainContent/MainContent.module.scss";

interface TaskRowProps {
  task: {
    id: string;
    description: string;
    createdAt: Date;
    completedAt: Date | null;
    isCompleted: boolean;
  };
  onToggleComplete: (id: string) => void;
  onRemoveTask: (id: string) => void;
}

export const TaskRow = ({
  task,
  onToggleComplete,
  onRemoveTask,
}: TaskRowProps) => {
  return (
    <tr>
      <td>
        <span className={styles.centered}>
          <FormCheck
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggleComplete(task.id)}
            aria-labelledby={`task-description-${task.id}`}
          />
          <span
            id={`task-description-${task.id}`}
            style={{
              textDecoration: task.isCompleted ? "line-through" : "none",
            }}
          >
            {task.description}
          </span>
          {task.isCompleted && (
            <Badge pill bg="success">
              Concluída
            </Badge>
          )}
        </span>
      </td>
      <td>
        {formatDate(
          task.createdAt instanceof Date
            ? task.createdAt
            : new Date(task.createdAt)
        )}
      </td>
      <td>
        {formatDate(
          task.completedAt instanceof Date
            ? task.completedAt
            : task.completedAt
            ? new Date(task.completedAt)
            : null
        )}
      </td>
      <td>
        <Button
          variant="danger"
          onClick={() => onRemoveTask(task.id)}
          aria-label={`Excluir tarefa: ${task.description}`}
        >
          Excluir
        </Button>
      </td>
    </tr>
  );
};
