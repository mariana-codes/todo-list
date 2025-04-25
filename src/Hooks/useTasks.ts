import { useState, useCallback, useMemo, useEffect, FormEvent } from "react";

interface Task {
  id: string;
  description: string;
  createdAt: Date;
  completedAt: Date | null;
  isCompleted: boolean;
}

interface UseTasksResult {
  tasks: Task[];
  newTaskDescription: string;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
  };
  showToast: boolean;
  toastMessage: string;
  currentTasks: Task[];
  setNewTaskDescription: (description: string) => void;
  setShowToast: (show: boolean) => void;
  handleAddTask: (e: FormEvent) => void;
  handleRemoveTask: (id: string) => void;
  handleToggleComplete: (id: string) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handleGoToPage: (page: number) => void;
  handleItemsPerPageChange: (value: number) => void;
}

export const useTasks = (): UseTasksResult => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("LBC-ToDo-List");
    if (storedTasks) {
      const parsedTasks: Task[] = JSON.parse(storedTasks);
      return parsedTasks.map((task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : null,
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("LBC-ToDo-List", JSON.stringify(tasks));
  }, [tasks]);

  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 8,
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const currentTasks = useMemo(
    () => tasks.slice(startIndex, endIndex),
    [tasks, startIndex, endIndex]
  );

  const totalPages = useMemo(
    () => Math.ceil(tasks.length / pagination.itemsPerPage) || 1,
    [tasks.length, pagination.itemsPerPage]
  );

  const handleAddTask = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (newTaskDescription.trim()) {
        const newTask: Task = {
          id: Date.now().toString(),
          description: newTaskDescription.trim(),
          createdAt: new Date(),
          completedAt: null,
          isCompleted: false,
        };
        setTasks([newTask, ...tasks]);
        setNewTaskDescription("");
        setPagination((prev) => ({ ...prev, currentPage: 1 }));
        setToastMessage("Tarefa adicionada");
        setShowToast(true);
      }
    },
    [tasks, newTaskDescription]
  );

  const handleRemoveTask = useCallback(
    (id: string) => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);

      const shouldGoToPreviousPage =
        currentTasks.length === 1 && pagination.currentPage > 1;

      if (shouldGoToPreviousPage) {
        setPagination((prev) => ({
          ...prev,
          currentPage: prev.currentPage - 1,
        }));
      }

      setToastMessage("Tarefa excluída");
      setShowToast(true);
    },
    [currentTasks.length, pagination.currentPage, tasks]
  );

  const handleToggleComplete = useCallback(
    (id: string) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              isCompleted: !task.isCompleted,
              completedAt: !task.isCompleted ? new Date() : null,
            }
          : task
      );
      setTasks(updatedTasks);

      const toggledTask = updatedTasks.find((task) => task.id === id);
      if (toggledTask?.isCompleted) {
        setToastMessage("Tarefa concluída");
        setShowToast(true);
      }
    },
    [tasks]
  );

  const handlePreviousPage = useCallback(() => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  }, [pagination.currentPage]);

  const handleNextPage = useCallback(() => {
    if (pagination.currentPage < totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  }, [pagination.currentPage, totalPages]);

  const handleGoToPage = useCallback(
    (page: number) => {
      setPagination((prev) => ({ ...prev, currentPage: page }));
    },
    [setPagination]
  );

  const handleItemsPerPageChange = useCallback(
    (value: number) => {
      setPagination({ currentPage: 1, itemsPerPage: value });
    },
    [setPagination]
  );

  return {
    tasks,
    newTaskDescription,
    pagination: {
      currentPage: pagination.currentPage,
      itemsPerPage: pagination.itemsPerPage,
      totalPages,
    },
    showToast,
    toastMessage,
    currentTasks,
    setNewTaskDescription,
    setShowToast,
    handleAddTask,
    handleRemoveTask,
    handleToggleComplete,
    handlePreviousPage,
    handleNextPage,
    handleGoToPage,
    handleItemsPerPageChange,
  };
};
