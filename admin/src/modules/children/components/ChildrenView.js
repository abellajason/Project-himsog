import React, {
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Spin,
  message,
  Button,
} from 'antd';

export default function ChildrenView(props) {
  const { getChildren } = props;

  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function fetchDetails () {
      try {
        await getChildren({ _id: props._id }, true);
      } catch(error) {
        message.error(error.message);
      }
    }

    fetchDetails();
  }, [getChildren, props._id])

  if (!props.childDetails) {
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
  } = props.childDetails;

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
      </Card>

      <Card
        size="small"
        title={<div>Record History</div>}
        style={{ maxWidth: 800, margin: 'auto', marginTop: 20 }}
      >
        {
          !isAdding && (
            <Button onClick={() => { setIsAdding(true) }}>Add Record</Button>
          )
        }
      </Card>
    </div>
  )
}
