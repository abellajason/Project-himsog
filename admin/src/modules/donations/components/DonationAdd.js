import React, {
  useState,
} from 'react';
import {
  Card,
  Form,
  Input,
  Icon,
  Button,
  InputNumber,
  message,
} from 'antd';
import { CardElement, injectStripe } from 'react-stripe-elements';

function DonationAdd(props) {
  const { getFieldDecorator } = props.form;
const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
  e.preventDefault();
  props.form.validateFields(async (err, values) => {
    if (!err) {
      try {
        setIsSubmitting(true);
        const tokenDetails = {}

        if (values.name) {
          tokenDetails.name = values.name;
        }

        const result = await props.stripe.createToken();

        if (result.error) {
          throw new Error((result.error || {}).message || 'Invalid card details.');
        }

        let description = `Donation for Project Himsog`;

        if (values.name && values.organization) {
          description += ` from ${values.name} (${values.organization})`;
        } else if (values.name) {
          description += ` from ${values.name}`;
        } else if (values.organization) {
          description += ` from ${values.organization}`;
        } else {
          description += " from anonymous";
        }

        const formData = { ...values, currency: 'php', token: result.token.id, description };
        setIsSubmitting(false);
        await props.createDonation(formData);

        message.success('Donated successfully.');
        props.history.push('/');
      } catch (error) {
        message.error(error.message);
        setIsSubmitting(false);
      }
    }
  });
}


  return (
      <div>
        <center>
          <img src="/logo512.png" alt="" style={{ maxWidth: 200 }} />
        <div style={{margin: '20px 0px 40px 0px', maxWidth: '600px'}}>
          <h1 style={{marginBottom: '20px', fontWeight: 'bold'}}>Your generosity matters.</h1>
          <h3>To donate, you just need to input your name, organization/company, both can be left blank for anonimity, then your donation amount.</h3>
        </div>

        <Card style={{ margin: 'auto', maxWidth: 600 }}>
          <Form onSubmit={handleSubmit} className="login-form" style={{ margin: 'auto' }}>
            <Form.Item label="Name" style={{textAlign: 'left'}}>
            {
              getFieldDecorator('name', {})(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
              )
            }
            </Form.Item>
            <Form.Item label="Organization/Company" style={{textAlign: 'left'}}>
              {
                getFieldDecorator('organization', {})(
                  <Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Organization/Company" />
                )
              }
            </Form.Item>
            <Form.Item label="Donation Amount" style={{textAlign: 'left'}}>
              {
                getFieldDecorator('amount', {
                  rules: [{ required: true }],
                  initialValue: 1000,
                  min: 1000,
                })(
                  <InputNumber
                    style={{ width: '100%' }}
                    formatter={value => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\₱\s?|(,*)/g, '')}
                  />,
                )
              }
            </Form.Item>
            <Form.Item>
              <CardElement />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={isSubmitting}>
                Let's nourish the children!
              </Button>
            </Form.Item>
          </Form>
        </Card>
        </center>
      </div>
  )
}

export default Form.create()(injectStripe(DonationAdd));
