import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Layout, Menu, Breadcrumb, message,
} from 'antd';

const { Header, Content, Footer } = Layout;

export default function MainLayout(props) {
  let defaultPath = props.path || '/';

  if (defaultPath === '/dashboard') {
    defaultPath = '/';
  }

  const menuItems = useMemo(() => {
    async function handleLogout(e) {
      try {
        e.preventDefault();
        await props.logout();
        props.history.push('/');
      } catch (error) {
        message.error(error.message);
      }
    }

    return (
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={[defaultPath]}
        style={{ lineHeight: '62px', borderBottom: 'none' }}
      >
        <Menu.Item key="/">
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Item key="/admins/list">
          <Link to="/admins/list">Admins</Link>
        </Menu.Item>

        <Menu.Item key="/volunteers/list">
          <Link to="/volunteers/list">Volunteers</Link>
        </Menu.Item>

        <Menu.Item key="logout" style={{ float: 'right' }}>
          <a href="logout" onClick={handleLogout}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }, [defaultPath, props]);

  return (
    <Layout>
      <Header style={{
        position: 'fixed', zIndex: 1, width: '100%', backgroundColor: 'white', boxShadow: '0px 2px 5px #555555',
      }}>
        <div className="logo" />
        {
          menuItems
        }
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {/*
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          */}
        </Breadcrumb>

        <div style={{ minHeight: '80vh' }}>
          {props.children}
        </div>
        {
          /*
            <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
              {props.children}
            </div>
          */
        }
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}
