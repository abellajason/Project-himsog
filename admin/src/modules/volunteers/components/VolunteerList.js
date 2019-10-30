import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
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

export default function VolunteerList(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [userIds, setUserIds] = useState(null);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    try {
      const users = await props.getUsers({ $limit: 9999, $sort: { _id: -1 }, role: 'volunteer' });
      setUserIds(users.data.map(({ _id }) => _id));
    } catch (error) {
      message.error(error.message);
    }
    setIsFetching(false);
  }, [props]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const dataSource = useMemo(() => {
    if (!userIds) {
      return null;
    }

    return userIds.map(_id => props.users.byId[_id] || {});
  }, [props.users.byId, userIds]);

  return (
    <Card
      title={<div>List of Volunteers <Link to="/volunteers/add" style={{ float: 'right' }}></Link></div>}
    >
      <Table columns={columns} dataSource={dataSource} rowKey="_id" size="small" loading={isFetching}/>
    </Card>
  );
}
