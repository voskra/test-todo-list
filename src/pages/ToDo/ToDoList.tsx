import * as React from 'react';
import { Button, Card } from 'antd';
import { CheckCircleTwoTone, DeleteTwoTone } from '@ant-design/icons';
import css from '../../App.module.css';
import type { Tasks } from './interface';

interface ToDoListOwnProps {
  tasks: Tasks;
  onTasksChange: (tasks: Tasks) => void;
}

export const ToDoList = React.memo<ToDoListOwnProps>(
  ({ tasks, onTasksChange }) => {
    const onTaskComplete = React.useCallback(
      (completeIndex: number) => {
        onTasksChange(
          tasks.map((task, index) => {
            if (index === completeIndex) {
              return { ...task, completed: true };
            }

            return task;
          })
        );
      },
      [onTasksChange, tasks]
    );

    const onTaskDelete = React.useCallback(
      (deleteIndex: number) => {
        onTasksChange(tasks.filter((_task, index) => index !== deleteIndex));
      },
      [onTasksChange, tasks]
    );

    return (
      <div className={css.todoTasksContainer}>
        {tasks.map((task, index) => (
          <Card
            key={index}
            className={css.todoTaskCard}
            extra={
              <div>
                {task.completed ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <Button type="text" onClick={() => onTaskComplete(index)}>
                    Complete this task
                  </Button>
                )}
                <Button
                  className={css.todoTaskDeleteButton}
                  icon={<DeleteTwoTone />}
                  type="text"
                  onClick={() => onTaskDelete(index)}
                />
              </div>
            }
            title={`Task #${index + 1}`}
          >
            {task.task}
          </Card>
        ))}
      </div>
    );
  }
);

ToDoList.displayName = nameof(ToDoList);
