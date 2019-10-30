import React, {
  useEffect,
  useState,
  useMemo
} from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Card,
  Spin,
  message,
  Button,
  Table,
  Form,
  InputNumber,
} from 'antd';

function getColumns() {
  return  [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => {
        return moment(createdAt).format('LLL')
      }
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Height',
      dataIndex: 'height',
      key: 'height',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'BMI',
      dataIndex: 'bmi',
      key: 'bmi',
      render: (bmi) => {
        return bmi ? Math.round(bmi * 100) / 100 : bmi
      }
    },
    {
      title: 'Malnourished',
      dataIndex: 'isMalnourished',
      key: 'isMalnourished',
      render: (isMalnourished) => isMalnourished ? 'Yes' : 'No',
    }
  ];
}

function ChildrenView(props) {
  const { getChildren, childDetails, getRecords, form, createRecord } = props;
  const { getFieldDecorator } = form;
  const [dataIds, setDataIds] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [iterator, setIterator] = useState(0);
  useEffect(() => {
    async function fetchDetails () {
      try {
        await getChildren({ _id: props._id }, true);
      } catch(error) {
        message.error(error.message);
      }
    }

    fetchDetails();
  }, [getChildren, props._id, iterator])


  useEffect(() => {
    (async function() {

      if (!childDetails) {
        return;
      }

      setIsFetching(true);

      try {
        const result = await getRecords({ $limit: 9999, $sort: { _id: -1 }, child_id: childDetails._id });
        setDataIds(result.data.map(({ _id }) => _id));
      } catch (error) {
        message.error(error.message);
      }

      setIsFetching(false);
    })()
  }, [childDetails, getChildren, getRecords, iterator])

  const dataSource = useMemo(() => {
    if (!dataIds) {
      return null;
    }

    return dataIds.map(_id => props.records.byId[_id] || {});
  }, [dataIds, props.records.byId]);


  if (!childDetails) {
    return (
      <div style={{textAlign: 'center' }}>
        <Spin size="large" style={{ marginTop: '15%' }}/>
      </div>
    );
  }

  const {
    _id,
    firstname,
    middlename,
    lastname,
    region,
    province,
    city,
    barangay,
    height,
    weight,
    bmi,
    age,
    isMalnourished,
  } = childDetails;

  function handleSubmit(e) {
    e.preventDefault();

    props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          setIsSubmitting(true);
          await createRecord({
            ...values,
            child_id: childDetails._id,
          });
          message.success('Record added successfully.');
          setIterator(iterator+1);
          setIsAdding(false);
          // history.push('/children/list');
        } catch (error) {
          message.error(error.message);
        }
        setIsSubmitting(false);
      }
    });
  }


  return (
    <div>
      <Card
        title={<div>Child Details <Link to="/children/list" style={{ float: 'right' }}>Back To List</Link></div>}
        style={{ maxWidth: 800, margin: 'auto' }}
      >
        <p>
          <b>ID: </b>{_id}
        </p>
        <p>
          <b>First Name: </b>{firstname}
        </p>
        <p>
          <b>Middle Name: </b>{middlename}
        </p>
        <p>
          <b>Last Name: </b>{lastname}
        </p>
        <p>
          <b>Region: </b>{region || 'Not Set'}
        </p>
        <p>
          <b>Province: </b>{province || 'Not Set'}
        </p>
        <p>
          <b>City: </b>{city || 'Not Set'}
        </p>
        <p>
          <b>Barangay: </b>{barangay || 'Not Set'}
        </p>

        <p>
          <b>Last Age Recorded: {age}</b>
        </p>

        <p>
          <b>Last Height Recorded: {height}</b>
        </p>

        <p>
          <b>Last Weight Recorded: {weight}</b>
        </p>

        <p>
          <b>Last BMI Recorded: {bmi ? Math.round(bmi * 100) / 100 : bmi}</b>
        </p>

        <p>
          <b>Malnourished: {isMalnourished ? 'Yes' : 'No'}</b>
        </p>

      </Card>

      <Card
        size="small"
        title={<div>Record History {
          !isAdding && (
            <a style={{float: 'right'}} href="#" onClick={(e) => { e.preventDefault(); setIsAdding(true); //eslint-disable-lineHeight
             }}>Add Record</a>
          )
        }</div>}
        style={{ maxWidth: 800, margin: 'auto', marginTop: 20 }}
      >

        {
          !isAdding ? (
            <div>
                <Table
                dataSource={dataSource}
                rowKey="_id"
                size="small"
                loading={isFetching}
                columns={getColumns()}
              />

            </div>
          ) : (
            <div>
              <form onSubmit={handleSubmit}>
                <Form.Item label="Height (cm)">
                  {
                    getFieldDecorator('height', {
                      rules: [{ required: true, message: 'Please input height.' }],
                    })(
                      <InputNumber min={1} />
                    )
                  }
                </Form.Item>

                <Form.Item label="Weight (kg)">
                  {
                    getFieldDecorator('weight', {
                      rules: [{ required: true, message: 'Please input weight.' }],
                    })(
                      <InputNumber min={1} />
                    )
                  }
                </Form.Item>

                <Button type="primary" loading={isSubmitting} htmlType="submit">Save</Button>
                <Button htmlType="button" onClick={() => {setIsAdding(false)}}>Cancel</Button>
              </form>
            </div>
          )
        }

      </Card>
    </div>
  )
}


export default Form.create()(ChildrenView);
