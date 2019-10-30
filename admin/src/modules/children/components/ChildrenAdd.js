import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Icon,
  Button,
  message,
  Select,
} from 'antd';

function AdminAdd(props) {
  const { getFieldDecorator } = props.form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          setIsSubmitting(true);
          await props.createChild({
            ...values,
          });
          message.success('Child added successfully.');
          props.history.push('/children/list');
        } catch (error) {
          message.error(error.message);
          setIsSubmitting(false);
        }
      }
    });
  }, [props]);

  return (
    <Card
      title={<div>Add Child <Link to="/children/list" style={{ float: 'right' }}>Back To List</Link></div>}
    >
      <form onSubmit={handleSubmit}>
        <Form.Item label="First Name">
          {
            getFieldDecorator('firstname', {
              rules: [{ required: true, message: 'Please input firstname.' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />,
            )
          }
        </Form.Item>

        <Form.Item label="Middle Name">
          {
            getFieldDecorator('middlename', {
              rules: [{ required: true, message: 'Please input middlename.' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Middle Name" />,
            )
          }
        </Form.Item>

        <Form.Item label="Last Name">
          {
            getFieldDecorator('lastname', {
              rules: [{ required: true, message: 'Please input lastname.' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />,
            )
          }
        </Form.Item>

        <Form.Item label="Gender">
          {
            getFieldDecorator('gender', {
              rules: [{ required: true, message: 'Please input gender.' }],
            })(
              <Select
                placeholder="Select gender"
              >
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            )
          }
        </Form.Item>

        <Button type="primary" loading={isSubmitting} htmlType="submit">Save</Button>
      </form>
    </Card>
  );
}

export default Form.create()(AdminAdd);
