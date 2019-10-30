import React, {
  useState,
  useEffect,
  useMemo,
} from 'react';

import {
  Card,
  message,
  Table,
} from 'antd';

import { Link } from 'react-router-dom';

function getColumns() {
  return  [
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Middle Name',
      dataIndex: 'middlename',
      key: 'middlename',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
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
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
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
      title: '',
      dataIndex: '_id',
      key: 'actions',
      render: _id => {
        return (
          <Link to={`/children/view/${_id}`}>View</Link>
        );
      },
    }
  ];
}

export default function AdminList(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [dataIds, setDataIds] = useState(null);
  const { getChildren } = props;

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const result = await getChildren({ $limit: 9999, $sort: { _id: -1 } });
        setDataIds(result.data.map(({ _id }) => _id));
      } catch (error) {
        message.error(error.message);
      }
      setIsFetching(false);
    }

    fetchData();
  }, [getChildren]);

  const dataSource = useMemo(() => {
    if (!dataIds) {
      return null;
    }

    return dataIds.map(_id => props.children.byId[_id] || {});
  }, [props.children.byId, dataIds]);

  return (
    <Card
      title={<div>List of Children <Link to="/children/add" style={{ float: 'right' }}>New</Link></div>}
    >
      <Table columns={getColumns()} dataSource={dataSource} rowKey="_id" size="small" loading={isFetching}/>
    </Card>
  );
}
