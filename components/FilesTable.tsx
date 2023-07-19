"use client"

import React, { useState } from 'react';
import { Table, Button, Popconfirm, Modal, message, Upload } from 'antd';
import { DeleteOutlined, EyeOutlined, PlusSquareOutlined } from "@ant-design/icons"
import { OpenAIFile } from 'openai';
import { handleCreateFineTune, handleDelete, handleView } from '@/actions/opanai';
import type { UploadProps } from 'antd';
const { Dragger } = Upload;
import { InboxOutlined } from '@ant-design/icons';



interface Props {
  files: OpenAIFile[]
}

interface FileType {
  prompt: string,
  completion: string
}

const FilesTable: React.FC<Props> = ({ files }) => {

  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [viewModalData, setViewModalData] = useState<FileType[]>();

  const handleReload = () => {
    window.location.reload();
  };
  const clickedView = async (id: string) => {
    const data = await handleView(id);
    const jsonArray = `[${data.replace(/}\s*{/g, '},{')}]`;
    const dataArray = JSON.parse(jsonArray);
    const dataArrayWithId = dataArray.map((obj: FileType, index: number) => ({ ...obj, id: index }));
    setViewModalData(dataArrayWithId);
    setViewModalVisible(true);
  };



  const handleDownloadSample = () => {
    const sampleJsonlData = `{"prompt": "<prompt text>", "completion": "<ideal generated text>"}
{"prompt": "<prompt text>", "completion": "<ideal generated text>"}
{"prompt": "<prompt text>", "completion": "<ideal generated text>"}`;

    const blob = new Blob([sampleJsonlData], { type: 'application/x-jsonlines' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'example.jsonl';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Filename',
      dataIndex: 'filename',
      key: 'filename',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: OpenAIFile) => (
        <span className="flex space-x-2">
          <Button className="flex items-center justify-center" type="text" icon={<EyeOutlined />} size="small"
            onClick={() => { clickedView(record.id) }}
          />
          <Popconfirm
            title="Delete"
            description="Are you sure to delete?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="flex items-center justify-center" danger type="text" icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
          <Popconfirm
            title="Generate fine-tune"
            onConfirm={() => handleCreateFineTune(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="flex items-center justify-center">Fine Tune</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const props: UploadProps = {
    name: 'file',
    action: '/api/file-upload',
    accept: ".jsonl",
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        setAddModalVisible(false);
        handleReload();
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

  };

  return (
    <>
      <div className="flex px-5 mt-10 space-x-5">
        <div className="w-full">
          <div className="flex justify-between px-3">
            <h2 className="mb-2 text-xl font-bold">Files</h2>
            <Button
              className="flex items-center justify-center"
              onClick={() => {
                setAddModalVisible(true)
              }}
              icon={<PlusSquareOutlined className='mt-0' />}
            >
              Add
            </Button>


          </div>
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={files}
              pagination={false}
              rowKey="id"
            />
          </div>
        </div>
      </div>

      <Modal
        title="View File Details"
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
                title: 'Prompt',
                dataIndex: 'prompt',
                key: 'prompt',
              },
              {
                title: 'Completion',
                dataIndex: 'completion',
                key: 'completion',
              }
            ]}
            dataSource={viewModalData}
            pagination={false}
            rowKey="id"
          />
        )}
      </Modal>

      <Modal
        title="Add File"
        open={addModalVisible}
        onCancel={() => {
          setAddModalVisible(false);
        }}
        footer={null}
      >
        <Button type='link' onClick={handleDownloadSample}>Download sample</Button>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Dragger>
      </Modal>
    </>
  );
};

export default FilesTable;
