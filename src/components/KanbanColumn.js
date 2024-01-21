// KanbanColumn.js
import React from 'react';
import KanbanTicketCard from './KanbanTicketCard';

const KanbanColumn = ({ title, tickets }) => {
  const flexStyle = {
    // display: 'flex',
    // flexDirection: title === 'Todo' ? 'column' : 'row',
    gap: '8px',
    borderRadius: '8px', // Add curved border
    // border: '1px solid #ccc', // Add border
    padding: '8px',
    marginBottom: '16px', // Add space between columns
  };

  return (
    <div style={{ flex: '1' }}>
      <h3>{title}</h3>
      <div style={flexStyle}>
        {tickets.map((ticket) => (
          <KanbanTicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
