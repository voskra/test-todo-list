import * as React from 'react';
import { Form, Modal, Input } from 'antd';
import type { TaskItem } from './interface';

const { TextArea } = Input;

interface ToDoFormOwnProps {
  open: boolean;
  onCreate: (task: TaskItem) => void;
  onCancel: () => void;
}

export const ToDoForm = React.memo<ToDoFormOwnProps>(
  ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    const handleCreateTask = React.useCallback(() => {
      form
        .validateFields()
        .then((values) => {
          form.resetFields();
          onCreate({ ...values, completed: false });
        })
        .catch((info) => {
          console.error('Validate Failed:', info);
        });
    }, [form, onCreate]);

    return (
      <Modal
        cancelText="Cancel"
        okText="Create"
        open={open}
        title="Create a new task"
        onCancel={onCancel}
        onOk={handleCreateTask}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="task"
            rules={[
              {
                required: true,
                message: 'Please input the description of task!'
              }
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);

ToDoForm.displayName = nameof(ToDoForm);
