import './style.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'antd';
const ViewServices = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const storedAccessToken = localStorage.getItem('accessToken');
        const response = await fetch(
          'https://assignments.aigate.me/backend_technical_test/public/api/view-services',
          {
            headers: {
              Authorization: `Bearer ${storedAccessToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const servicesData = data[0] || [];
          setServices(servicesData);
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchServices();
  }, []);
  const handleViewTickets = () => {
    navigate('/tickets');
  };
  const columns = [
    {
      title: <span className="column-title">Title</span>,
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: <span className="column-title">Price</span>,
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
  ];
  return (
    <div className="image-flight">
      <h1 className="services">Our Services</h1>
      {services.length > 0 ? (
        <div>
          <Table
            columns={columns}
            dataSource={services}
            rowKey="id"
            pagination={false}
          />
        </div>
      ) : (
        <p>No services available</p>
      )}
      <Button
        className="view-tickets"
        type="primary"
        onClick={handleViewTickets}
      >
        View Tickets
      </Button>
    </div>
  );
};
export default ViewServices;
