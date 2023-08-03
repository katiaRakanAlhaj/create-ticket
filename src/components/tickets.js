import './style.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Modal } from 'antd';
const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [error, setError] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const storedAccessToken = localStorage.getItem('accessToken');
        const response = await fetch(
          'https://assignments.aigate.me/backend_technical_test/public/api/get-tickets',
          {
            headers: {
              Authorization: `Bearer ${storedAccessToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setTickets(data.data);
          setCurrentPage(data.current_page);
          setPrevPage(data.prev_page_url);
          setNextPage(data.next_page_url);
        } else {
          setError('Error fetching tickets');
        }
      } catch (error) {
        setError('Error fetching tickets');
      }
    };
    fetchTickets();
  }, []);
  const handlePrevPage = async () => {
    if (prevPage) {
      try {
        const storedAccessToken = localStorage.getItem('accessToken');
        const response = await fetch(prevPage, {
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTickets(data.data);
          setCurrentPage(data.current_page);
          setPrevPage(data.prev_page_url);
          setNextPage(data.next_page_url);
        } else {
          setError('Error fetching tickets');
        }
      } catch (error) {
        setError('Error fetching tickets');
      }
    }
  };
  const handleNextPage = async () => {
    if (nextPage) {
      try {
        const storedAccessToken = localStorage.getItem('accessToken');
        const response = await fetch(nextPage, {
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTickets(data.data);
          setCurrentPage(data.current_page);
          setPrevPage(data.prev_page_url);
          setNextPage(data.next_page_url);
        } else {
          setError('Error fetching tickets');
        }
      } catch (error) {
        setError('Error fetching tickets');
      }
    }
  };
  const handleCreateTicket = () => {
    navigate('/create-ticket');
  };
  const handleDeleteTicket = async (ticketId) => {
    try {
      const storedAccessToken = localStorage.getItem('accessToken');
      const response = await fetch(
        `https://assignments.aigate.me/backend_technical_test/public/api/delete-ticket/${ticketId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        }
      );
      if (response.ok) {
        setTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket.id !== ticketId)
        );
        setDeleteModalVisible(false);
      } else {
        setError('Error deleting ticket');
      }
    } catch (error) {
      setError('Error deleting ticket');
    }
  };
  const handleShowDeleteModal = (ticket) => {
    setSelectedTicket(ticket);
    setDeleteModalVisible(true);
  };
  const handleCancelDeleteModal = () => {
    setSelectedTicket(null);
    setDeleteModalVisible(false);
  };
  const handleNavigate = () => {
    navigate('/create-ticket');
  };
  const columns = [
    {
      title: <span className="column-title">Service Title</span>,
      dataIndex: ['service', 'title'],
      key: 'serviceTitle',
    },
    {
      title: <span className="column-title">Client ID</span>,
      dataIndex: ['client', 'id'],
      key: 'clientId',
    },
    {
      title: <span className="column-title">Client Name</span>,
      dataIndex: ['client', 'name'],
      key: 'clientName',
    },
    {
      title: <span className="column-title">Client Email</span>,
      dataIndex: ['client', 'email'],
      key: 'clientEmail',
    },
    {
      title: <span className="column-title">Service ID</span>,
      dataIndex: ['service', 'id'],
      key: 'serviceId',
    },
    {
      title: <span className="column-title">Service Price</span>,
      dataIndex: ['service', 'price'],
      key: 'servicePrice',
      render: (price) => `$${price}`,
    },
    {
      title: <span className="column-title">Status ID</span>,
      dataIndex: ['status', 'id'],
      key: 'statusId',
    },
    {
      title: <span className="column-title">Status Title</span>,
      dataIndex: ['status', 'title'],
      key: 'statusTitle',
    },
    {
      title: <span className="column-title">Actions</span>,
      key: 'actions',
      render: (_, ticket) => (
        <Button type="danger" onClick={() => handleShowDeleteModal(ticket)}>
          Delete
        </Button>
      ),
    },
  ];
  return (
    <div className="container">
      <h1 className="tickets">Tickets</h1>
      {error ? (
        <p>{error}</p>
      ) : tickets.length > 0 ? (
        <div>
          <Table
            columns={columns}
            dataSource={tickets}
            rowKey="id"
            pagination={false}
          />
          <div>
            <p className="current-page">Current Page: {currentPage}</p>
            <Button.Group>
              {prevPage && (
                <Button
                  className="page"
                  type="primary"
                  onClick={handlePrevPage}
                  disabled={!prevPage}
                >
                  Previous Page
                </Button>
              )}
              {nextPage && (
                <Button
                  className="page"
                  type="primary"
                  onClick={handleNextPage}
                  disabled={!nextPage}
                >
                  Next Page
                </Button>
              )}
            </Button.Group>
          </div>
          <Modal
            title="Delete Ticket"
            visible={deleteModalVisible}
            onOk={() => handleDeleteTicket(selectedTicket.id)}
            onCancel={handleCancelDeleteModal}
          >
            <p>Are you sure you want to delete this ticket?</p>
          </Modal>
        </div>
      ) : (
        <p>No tickets available</p>
      )}
      <Button className="create-ticket" type="primary" onClick={handleNavigate}>
        Create Ticket
      </Button>
    </div>
  );
};
export default Tickets;
