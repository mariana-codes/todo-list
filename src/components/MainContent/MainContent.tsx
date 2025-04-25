import { Button, Form, Table, Toast, ToastContainer } from "react-bootstrap";
import { Header } from "../Header/Header";
import styles from "./MainContent.module.scss";
import { TaskRow } from "../TaskRow/TaskRow";
import { CustomPagination } from "../shared/CustomPagination";
import { useTasks } from "../../Hooks/useTasks";

export const MainContent = () => {
  const {
    newTaskDescription,
    showToast,
    toastMessage,
    currentTasks,
    pagination,
    setNewTaskDescription,
    setShowToast,
    handleAddTask,
    handleRemoveTask,
    handleToggleComplete,
    handlePreviousPage,
    handleNextPage,
    handleGoToPage,
    handleItemsPerPageChange,
    tasks,
  } = useTasks();

  return (
    <>
      <div className={`container g-0 ${styles.mainContainer}`}>
        <Header />
        <main className={styles.mainContent}>
          <h1>As minhas tarefas</h1>
          <div className={styles.formContainer}>
            <div className={styles.formHeaderPagination}>
              <Form className="input-container" onSubmit={handleAddTask}>
                <Form.Label htmlFor="add-task">Descrição da tarefa:</Form.Label>
                <div className={styles.centered}>
                  <Form.Control
                    id="add-task"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    aria-label="Adicionar uma nova tarefa à lista"
                  >
                    Adicionar Tarefa
                  </Button>
                </div>
              </Form>

              <CustomPagination
                currentPage={pagination.currentPage}
                pagesTotal={pagination.totalPages}
                onPreviousPage={handlePreviousPage}
                onNextPage={handleNextPage}
                onGoToPage={handleGoToPage}
                itemsPerPage={pagination.itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>

            <Table>
              <thead>
                <tr>
                  <th className="w-50" scope="col">
                    Tarefa
                  </th>
                  <th scope="col">Data de Criação</th>
                  <th scope="col">Data de Conclusão</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {currentTasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onRemoveTask={handleRemoveTask}
                  />
                ))}

                {tasks.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center">
                      Nenhuma tarefa adicionada.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            <div className={styles.formFooter}>
              <p>Total de tarefas: {tasks.length}</p>

              <CustomPagination
                currentPage={pagination.currentPage}
                pagesTotal={pagination.totalPages}
                onPreviousPage={handlePreviousPage}
                onNextPage={handleNextPage}
                onGoToPage={handleGoToPage}
                itemsPerPage={pagination.itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          </div>
        </main>
      </div>

      <ToastContainer position="top-end" aria-live="polite">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <div className="toast-content">
            {toastMessage}
            <Button
              className="btn-close"
              aria-label="Fechar"
              onClick={() => setShowToast(false)}
            ></Button>
          </div>
        </Toast>
      </ToastContainer>
    </>
  );
};
