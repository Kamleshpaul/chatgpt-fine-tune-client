"use client"

import { handleCancelFineTune, handleViewFineTune } from "@/actions/opanai";
import { Button, Modal, Popconfirm, Table } from "antd";
import { CloseOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons"
import { useState } from "react";
import { timeAgo } from "@/util/helper";

interface FineTuneEvents {
  created_at: number
  level: string
  message: string
  object: string
}

export default function FineTunesTable({ fineTunes }: any) {
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewModalData, setViewModalData] = useState<FineTuneEvents[]>();


  const clickedView = async (id: string) => {
    const res = await handleViewFineTune(id);
    setViewModalVisible(true);
    const dataArray = res.data;
    const dataArrayWithId = dataArray.map((obj: FineTuneEvents, index: number) => ({ ...obj, id: index }));
    setViewModalData(dataArrayWithId);
  }
  const handleDelete = (id: string) => {
    console.log('handleDelete', id)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Fine Tuned Model',
      dataIndex: 'fine_tuned_model',
      key: 'fine_tuned_model',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <span className="flex space-x-2">
          <Button className="flex items-center justify-center" type="text" icon={<EyeOutlined />} size="small"
            onClick={() => { clickedView(record.id) }}
          />
          {record.status !== 'cancelled' ? (
            <Popconfirm
              title="Cancel"
              description="Are you sure to cancel?"
              onConfirm={() => handleCancelFineTune(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button className="flex items-center justify-center text-yellow-700" type="text" icon={<CloseOutlined />} size="small" />
            </Popconfirm>
          ) : null}
          {record.fine_tuned_model ? (
            <Popconfirm
              title="Delete"
              description="Are you sure to delete?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button className="flex items-center justify-center" danger type="text" icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          ) : null}


        </span>
      ),
    },
  ];

  return (
    <>
      <div className='flex px-5 mt-10 space-x-5'>
        <div className="w-full">
          <div className='flex justify-between px-3'>
            <h2 className="mb-2 text-xl font-bold">Fine-tune</h2>
          </div>
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={fineTunes}
              pagination={false}
              rowKey="id"
            />
          </div>
        </div>
      </div>

      <Modal
        title="All events"
        open={viewModalVisible}
        onCancel={() => {
          setViewModalVisible(false);
        }}
        width={"80%"}
        footer={null}
      >
        {viewModalData && (
          <Table
            className='pt-3'
            columns={[
              {
                title: 'Level',
                dataIndex: 'level',
                key: 'level',
              },
              {
                title: 'Object',
                dataIndex: 'object',
                key: 'object',
              },
              {
                title: 'Message',
                dataIndex: 'message',
                key: 'message',
              },
              {
                title: 'Created At',
                key: 'created_at',
                render: (record: any) => (
                  <span>{timeAgo(record.created_at)}</span>
                )
              }
            ]}
            dataSource={viewModalData}
            pagination={false}
            rowKey="id"
          />
        )}
      </Modal>
    </>
  )
}
