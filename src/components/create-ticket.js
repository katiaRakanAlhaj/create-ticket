import './style.css';
import React, { useState } from 'react';
import { Form, Input, Button, Table, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
const CreateTicket = ({ accessToken }) => {
  const [form] = Form.useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [displayData, setDisplayData] = useState([]);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await fetch(
        'https://assignments.aigate.me/backend_technical_test/public/api/create-ticket',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        setSuccessMessage('Ticket created successfully');
        setErrorMessage('');
        setDisplayData((prevData) => [...prevData, values]);
        form.resetFields();
      } else {
        setSuccessMessage('');
        setErrorMessage('Error creating ticket');
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error creating ticket');
    }
  };
  const handleNavigate = () => {
    navigate('/add-report');
  };
  const columns = [
    {
      title: <span className="column-title">Client ID</span>,
      dataIndex: 'clientId',
      key: 'clientId',
    },
    {
      title: <span className="column-title">Service ID</span>,
      dataIndex: 'serviceId',
      key: 'serviceId',
    },
  ];

  return (
    <div className="image-flight">
      <Card>
        <h1 className="create-ticket-title">Create Ticket</h1>
        <Form form={form} onFinish={onFinish}>
          <label>Clinet ID:</label>
          <Form.Item name="clientId" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <label>Service ID:</label>
          <Form.Item name="serviceId" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button className="create-ticket" type="primary" htmlType="submit">
              Create Ticket
            </Button>
          </Form.Item>
        </Form>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
        {displayData.length > 0 && (
          <Table
            columns={columns}
            dataSource={displayData}
            pagination={false}
          />
        )}
        <Button className="add-report" type="primary" onClick={handleNavigate}>
          add report
        </Button>
      </Card>
    </div>
  );
};
export default CreateTicket;
