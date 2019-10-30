import React, { useState, useCallback } from 'react';
import cities from '../../../lib/cities.json';

import { Link } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Icon,
  Button,
  message,
  Select,
  DatePicker,
} from 'antd';

console.log(cities);

const regions = Object.keys(cities);

function AdminAdd(props) {
  const { history, createChild } = props;
  const { getFieldDecorator } = props.form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          setIsSubmitting(true);
          await createChild({
            ...values,
          });
          message.success('Child added successfully.');
          history.push('/children/list');
        } catch (error) {
          message.error(error.message);
          setIsSubmitting(false);
        }
      }
    });
  }, [createChild, history, props.form]);

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);

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

        <Form.Item label="Birthdate">
          {
            getFieldDecorator('birthdate', {
              rules: [{ required: true, message: 'Please input birthdate.' }],
            })(
              <DatePicker style={{ width: '100%' }} />
            )
          }
        </Form.Item>

        <Form.Item label="Region">
          {
            getFieldDecorator('region', {
              rules: [{ required: true, message: 'Please input region.' }],
            })(
              <Select
                placeholder="Select Region"
                showSearch={true}
                onChange={(value) => { setSelectedRegion(value); }}
              >
                {
                  regions.map((region) => <Select.Option value={region}>{cities[region].region_name}</Select.Option>)
                }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item label="Province">
          {
            getFieldDecorator('province', {
              rules: [{ required: true, message: 'Please input province.' }],
            })(
              <Select
                placeholder="Select Province"
                showSearch={true}
                onChange={(value) => { setSelectedProvince(value); }}
              >
                {
                  selectedRegion && Object.keys(cities[selectedRegion].province_list).map((province) => <Select.Option value={province}>{province}</Select.Option>)
                }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item label="City/Municipality">
          {
            getFieldDecorator('city', {
              rules: [{ required: true, message: 'Please input city.' }],
            })(
              <Select
                placeholder="Select City/Municipality"
                showSearch={true}
                onChange={(value) => { setSelectedMunicipality(value); }}
              >
                {
                  selectedRegion && selectedProvince && Object.keys(cities[selectedRegion].province_list[selectedProvince].municipality_list).map((city) => <Select.Option value={city}>{city}</Select.Option>)
                }
              </Select>
            )
          }
        </Form.Item>

        <Form.Item label="Barangay">
          {
            getFieldDecorator('barangay', {
              rules: [{ required: true, message: 'Please input barangay.' }],
            })(
              <Select
                placeholder="Select Barangay"
                showSearch={true}
              >
                {
                  selectedRegion && selectedProvince && selectedMunicipality && cities[selectedRegion].province_list[selectedProvince].municipality_list[selectedMunicipality].barangay_list.map((barangay) => <Select.Option value={barangay}>{barangay}</Select.Option>)
                }
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
