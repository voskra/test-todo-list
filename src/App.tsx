import * as React from 'react';
import { Button, Layout } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import css from './App.module.css';
import { Main, ToDo } from './pages';
import { AuthContext } from './auth/Auth';

const { Header, Content } = Layout;

export const App = React.memo(() => {
  const [authToken, setAuthToken] = React.useState<string>(
    localStorage.getItem('token') || ''
  );

  const setToken = React.useCallback((data: string) => {
    localStorage.setItem('token', data);
    setAuthToken(data);
  }, []);

  const handleLogout = React.useCallback(() => {
    localStorage.removeItem('token');
    setAuthToken('');
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      <Layout className={css.siteLayout}>
        <Header className={css.siteLayoutHeader}>
          Simple TO-DO App
          {authToken && (
            <Button ghost={true} onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Header>
        <Layout className={css.siteLayout}>
          <Content className={css.siteLayoutContent}>
            <Router>
              <Routes>
                <Route element={<Main />} path="/" />
                <Route element={<ToDo />} path="/todo" />
              </Routes>
            </Router>
          </Content>
        </Layout>
      </Layout>
    </AuthContext.Provider>
  );
});

App.displayName = nameof(App);
