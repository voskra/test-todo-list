import * as React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/Auth';
import { LoginForm } from '../auth/LoginForm';

interface MainOwnProps {}

export const Main = React.memo<MainOwnProps>(() => {
  const { authToken, username } = useAuth();

  return (
    <>
      {authToken ? (
        <>
          <b>Hello {username}, </b>
          <Link to="/todo">
            <Button type="link">let's go to ToDo</Button>
          </Link>
        </>
      ) : (
        <LoginForm />
      )}
    </>
  );
});

Main.displayName = nameof(Main);
