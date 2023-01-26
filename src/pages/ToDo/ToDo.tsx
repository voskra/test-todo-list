import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, notification } from 'antd';
import { useAuth } from '../../auth/Auth';
import css from '../../App.module.css';
import { ToDoForm } from './ToDoForm';
import { ToDoList } from './ToDoList';
import type { Tasks, TaskItem } from './interface';

interface ToDoOwnProps {}

export const ToDo = React.memo<ToDoOwnProps>(() => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [tasks, setTasks] = React.useState<Tasks>([]);
  const [openCreateTask, setOpenCreateTask] = React.useState(false);

  React.useEffect(() => {
    if (!authToken) {
      navigate('/');
    }
  }, [authToken, navigate]);

  React.useEffect(() => {
    const storageTasks = localStorage.getItem('todos');
    if (storageTasks) {
      setTasks(JSON.parse(storageTasks));
    }
  }, []);

  const updateTasks = React.useCallback((newTasks: Tasks) => {
    setTasks(newTasks);
    localStorage.setItem('todos', JSON.stringify(newTasks));
  }, []);

  const handleOpenCreateTask = React.useCallback(() => {
    setOpenCreateTask(true);
  }, []);

  const handleCloseCreateTask = React.useCallback(() => {
    setOpenCreateTask(false);
  }, []);

  const handleCreateTask = React.useCallback(
    (task: TaskItem) => {
      const findIndex = tasks.findIndex(
        (taskItem) => taskItem.task.trim() === task.task.trim()
      );

      if (findIndex !== -1) {
        api.error({
          message: 'This task already exist!'
        });

        return;
      }

      updateTasks([...tasks, task]);
      setOpenCreateTask(false);
    },
    [api, tasks, updateTasks]
  );

  return (
    <>
      {contextHolder}
      <div className={css.todoHeader}>
        <h2>My ToDo</h2>
        <Button type="primary" onClick={handleOpenCreateTask}>
          New Task
        </Button>
      </div>
      <ToDoForm
        open={openCreateTask}
        onCancel={handleCloseCreateTask}
        onCreate={handleCreateTask}
      />
      <ToDoList tasks={tasks} onTasksChange={updateTasks} />
    </>
  );
});

ToDo.displayName = nameof(ToDo);
