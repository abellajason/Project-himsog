import React, { useState } from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  Card,
  message,
} from 'antd';
import { Link } from 'react-router-dom';
// import logo from '/lib/assets/images/logo.png';

function Signup(props) {
  const { createUser, form } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmDirty, setConfirmDirty] = useState(false);

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback("Passwords don't match.");
    } else {
      callback();
    }
  };

  const handleConfirmBlur = (e) => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const handleSubmit = (e) => {
    if (isSubmitting) {
      return;
    }

    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          setIsSubmitting(true);
          const formData = { ...values };
          delete formData.confirm;
          await createUser(formData);
          setIsSubmitting(false);
          message.success('Registered successfully!');
          props.history.push('/login');
        } catch (error) {
          setErrorMessage(error.message);
          setIsSubmitting(false);
        }
      }
    });
  };

  const { getFieldDecorator } = form;

  return (
      <div style={{ paddingTop: '5%', textAlign: '' }}>
        <Card style={{ margin: 'auto', maxWidth: 400 }}>
          <div style={{ padding: 15 }}>
            {/* <img src={logo} style={{ maxWidth: 200 }}/> */}
          </div>
          <h3>
            <center>
              Signup
            </center>
          </h3>
          <div>
            <small style={{ color: 'red', textAlign: 'center' }}>
              <center>
                {!isSubmitting && errorMessage}
              </center>
            </small>
          </div>
          <Form onSubmit={handleSubmit} className="login-form" style={{ margin: 'auto' }}>
            <Form.Item label="Name">
              {
                getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your name.' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />,
                )
              }
            </Form.Item>
            <Form.Item label="Email">
              {
                getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your email.' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />,
                )
              }
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password.',
                    },
                    {
                      validator: validateToNextPassword,
                    },
                  ],
                })(<Input.Password placeholder="******" />)}
              </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password.',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={handleConfirmBlur} placeholder="******" />)}
          </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={isSubmitting}>
                Log In
              </Button>
              <Link to="/login">Login Here</Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
  );
}

export default Form.create()(Signup);
