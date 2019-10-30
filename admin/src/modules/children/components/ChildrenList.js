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

const columns = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
];

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

    return dataIds.map(_id => props.users.byId[_id] || {});
  }, [props.users.byId, dataIds]);

  return (
    <Card
      title={<div>List of Children <Link to="/children/add" style={{ float: 'right' }}>New</Link></div>}
    >
      <Table columns={columns} dataSource={dataSource} rowKey="_id" size="small" loading={isFetching}/>
    </Card>
  );
}
