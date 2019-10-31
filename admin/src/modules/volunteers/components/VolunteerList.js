import React, {
  useState,
  useEffect,
  useMemo,
} from 'react';

import {
  Card,
  message,
  Table,
  Button,
  Modal,
} from 'antd';

import { Link } from 'react-router-dom';

const getColumns = function(setApproval) {
  return [
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
    {
      title: 'Organization/Company',
      dataIndex: 'organization',
      key: 'organization',
    },
    {
      title: 'Status',
      dataIndex: 'isApproved',
      key: 'isApproved',
      render(isApproved) {
        return isApproved ? 'Approved' : 'Pending'
      }
    },
    {
      title: '',
      dataIndex: '_id',
      key: 'actions',
      render: (_id, { isApproved } = {}) => {
        return (
          <Button type="primary" size="small" disabled={isApproved} onClick={() => { setApproval(_id); }}>Approve</Button>
        );
      },
    }
  ]
};

export default function VolunteerList(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [userIds, setUserIds] = useState(null);
  const [isModalShown, setIsModalShown] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { getUsers } = props;

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const users = await getUsers({ $limit: 9999, $sort: { _id: -1 }, role: 'volunteer' });
        setUserIds(users.data.map(({ _id }) => _id));
      } catch (error) {
        message.error(error.message);
      }
      setIsFetching(false);
    }

    fetchData();
  }, [getUsers]);

  const dataSource = useMemo(() => {
    if (!userIds) {
      return null;
    }

    return userIds.map(_id => props.users.byId[_id] || {});
  }, [props.users.byId, userIds]);

  function setApproval(_id) {
    setSelectedId(_id);
    setIsModalShown(true);
  }

  const confirmApprove = async function () {
    if (!selectedId) {
      message.error("A volunteer is not selected.");
      return;
    }

    try {
      await props.patchUser(selectedId, { isApproved: true });
      message.success("Volunteer approved successfully.");
      setIsModalShown(false);
    } catch(error) {
      message.error(error.message);
    }
  }

  return (
    <Card
      title={<div>List of Volunteers <Link to="/volunteers/add" style={{ float: 'right' }}></Link></div>}
    >
      <Table columns={getColumns(setApproval)} dataSource={dataSource} rowKey="_id" size="small" loading={isFetching}/>

      <Modal
          title="Approve Volunteer"
          visible={isModalShown}
          onCancel={() => {setIsModalShown(false)}}
          onOk={confirmApprove}
        >
          <p>Are you sure you want to approve this volunteer?</p>
        </Modal>
    </Card>
  );
}
