import React, { useState } from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  Card,
} from 'antd';
import { Link } from 'react-router-dom';

function NormalLoginForm(props) {
  const { login, form } = props;
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    if (isLoggingIn) {
      return;
    }

    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          setIsLoggingIn(true);
          await login(values);
        } catch (error) {
          setErrorMessage(error.message);
          setIsLoggingIn(false);
        }
      }
    });
  };

  const { getFieldDecorator } = form;

  return (
    <div style={{ paddingTop: '5%' }}>
      <Card style={{ margin: 'auto', maxWidth: 400 }}>
        <div style={{ padding: 15 }}>
          <center>
            <img src="/logo512.png" alt="" style={{ maxWidth: 200 }} />
          </center>
        </div>
        <div>
          <small style={{ color: 'red' }}>
            <center>
              {!isLoggingIn && errorMessage}
            </center>
          </small>
        </div>
        <Form onSubmit={handleSubmit} className="login-form" style={{ margin: 'auto' }}>
          <Form.Item label="Email">
            {
              getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email.' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />,
              )
            }
          </Form.Item>
          <Form.Item label="Password">
            {
              getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password.' }],
              })(
                <Input.Password placeholder="******" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" />,
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoggingIn}>
              Log In
              </Button>
            <Link to="/signup">Signup Here</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Form.create()(NormalLoginForm);
