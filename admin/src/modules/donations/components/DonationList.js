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

function getColumns() {
  return  [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Organization/Company',
      dataIndex: 'organization',
      key: 'organization',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    }
  ];
}

export default function AdminList(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [dataIds, setDataIds] = useState(null);
  const { getDonations } = props;

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const result = await getDonations({ $limit: 9999, $sort: { _id: -1 } });
        setDataIds(result.data.map(({ _id }) => _id));
      } catch (error) {
        message.error(error.message);
      }
      setIsFetching(false);
    }

    fetchData();
  }, [getDonations]);

  const dataSource = useMemo(() => {
    if (!dataIds) {
      return null;
    }

    return dataIds.map(_id => props.donations.byId[_id] || {});
  }, [props.donations.byId, dataIds]);

  return (
    <Card
      title={<div>List of Donations</div>}
    >
      <Table columns={getColumns()} dataSource={dataSource} rowKey="_id" size="small" loading={isFetching}/>
    </Card>
  );
}
