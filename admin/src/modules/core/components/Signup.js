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
      <div style={{ paddingTop: '2%', textAlign: '' }}>
        <Card style={{ margin: 'auto', maxWidth: 400 }}>
          <div style={{ padding: 15 }}>
            <center>
              <img src="/logo512.png" alt="" style={{ maxWidth: 150 }} />
            </center>
          </div>
          <h3>
            <center>
              <span style={{fontFamily: 'Arial', fontWeight: 'bold' }}> Become a Volunteer </span>
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
            <Form.Item label="Name" style={{ marginBottom: '5px' }}>
              {
                getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your name.' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />,
                )
              }
            </Form.Item>
            <Form.Item label="Email" style={{ marginBottom: '5px' }}>
              {
                getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your email.' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />,
                )
              }
            </Form.Item>
            <Form.Item label="Organization/Company" style={{ marginBottom: '5px' }}>
              {
                getFieldDecorator('organization', {
                  rules: [{ required: true, message: 'Please input your organization/company.' }],
                })(
                  <Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Organization/Company" />,
                )
              }
            </Form.Item>
            <Form.Item label="Password" hasFeedback style={{ marginBottom: '5px' }}>
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
            <Form.Item label="Confirm Password" hasFeedback style={{ marginBottom: '5px' }}>
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
              <Button type="primary" htmlType="submit" className="login-form-button" loading={isSubmitting} style={{ fontWeight: 'bold' }}>
                Join
              </Button>
              <span>Already have an account? </span><Link to="/login" style={{ fontWeight: 'bold' }}>Login Here</Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
  );
}

export default Form.create()(Signup);
