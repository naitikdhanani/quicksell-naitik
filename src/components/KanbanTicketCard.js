// KanbanTicketCard.js
import React from 'react';

const KanbanTicketCard = ({ ticket }) => {
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px', // Add curved border
    padding: '8px',
    marginBottom: '8px', // Add space between cards
  };

  return (
    <div style={cardStyle}>
      <h4>{ticket.title}</h4>
      <p>ID: {ticket.id}</p>
      <p>Status: {ticket.status}</p>
      {/* Add more ticket details as needed */}
    </div>
  );
};

export default KanbanTicketCard;
