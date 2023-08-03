import './style.css';
import React, { useState } from 'react';
import { Form, Input, Button, Table, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
const AddReport = ({ accessToken }) => {
  const [form] = Form.useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [displayData, setDisplayData] = useState([]);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await fetch(
        'https://assignments.aigate.me/backend_technical_test/public/api/add-report',
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
        setSuccessMessage('Report Added successfully');
        setErrorMessage('');
        setDisplayData((prevData) => [...prevData, values]);
        form.resetFields();
      } else {
        setSuccessMessage('');
        setErrorMessage('Error adding report');
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error adding report');
    }
  };
  const handleNavigate = () => {
    navigate('/logout');
  };
  const columns = [
    {
      title: <span className="column-title">Ticket ID</span>,
      dataIndex: 'clientId',
      key: 'clientId',
    },
    {
      title: <span className="column-title">Report</span>,
      dataIndex: 'serviceId',
      key: 'serviceId',
    },
  ];
  return (
    <div className="image-flight">
      <Card>
        <h1 className="add-report-title">Add Report</h1>
        <Form form={form} onFinish={onFinish}>
          <label>Ticket ID:</label>
          <Form.Item name="ticket_id" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <label>Report:</label>
          <Form.Item name="report" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Report
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
        <Button className="logout" type="primary" onClick={handleNavigate}>
          Logout
        </Button>
      </Card>
    </div>
  );
};
export default AddReport;
