import React from 'react';
import {
  Card,
  Form,
  Input,
  Icon,
  Button,
  InputNumber
} from 'antd';

export default function DonationAdd() {
  return (
    <div>
      <center>
        <img src="/logo512.png" alt="" style={{ maxWidth: 200 }} />
      <div style={{margin: '20px 0px 40px 0px', maxWidth: '600px'}}>
        <h1 style={{marginBottom: '20px', fontWeight: 'bold'}}>Your generosity matters.</h1>
        <h3>To add a donation, you just need to input your name, organization/company, both can be left blank for anonimity, then your donation amount.</h3>
      </div>

      <Card style={{ margin: 'auto', maxWidth: 600 }}>
        <Form className="login-form" style={{ margin: 'auto' }}>
          <Form.Item label="Name" style={{textAlign: 'left'}}>
            {
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
            }
          </Form.Item>
          <Form.Item label="Organization/Company" style={{textAlign: 'left'}}>
            {
              <Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Organization/Company" />
            }
          </Form.Item>
          <Form.Item label="Donation Amount" style={{textAlign: 'left'}}>
            {
              <InputNumber defaultValue={1000} formatter={value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Let's nourish the children!
              </Button>
          </Form.Item>
        </Form>
      </Card>
      </center>
    </div>
  )
}
