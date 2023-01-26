import * as React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { has } from '../utils/has';
import css from '../App.module.css';
import { useAuth } from './Auth';

interface LoginFormOwnProps {}

export const LoginForm = React.memo<LoginFormOwnProps>(() => {
  const [api, contextHolder] = notification.useNotification();
  const { setAuthToken } = useAuth();

  const onSubmit = React.useCallback(
    (data: { login: string; password: string }) => {
      fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(`Invalid response from backend!`);
          }

          return response.json();
        })
        .then((responseData) => {
          if (
            has(responseData, 'error') &&
            typeof responseData.error === 'string'
          ) {
            throw new Error(responseData.error);
          }

          if (
            has(responseData, 'access_token') &&
            typeof responseData.access_token === 'string'
          ) {
            setAuthToken(responseData.access_token);
          }
        })
        .catch((e) => {
          api.error({
            message: e.toString()
          });
        });
    },
    [api, setAuthToken]
  );

  return (
    <>
      {contextHolder}
      <Form
        autoComplete="off"
        className={css.formContainer}
        initialValues={{ remember: true }}
        labelCol={{ span: 8 }}
        name="basic"
        wrapperCol={{ span: 16 }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Login"
          name="login"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
});

LoginForm.displayName = nameof(LoginForm);
