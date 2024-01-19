// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import KanbanColumn from './KanbanColumn';

// const KanbanBoard = () => {
//   const [data, setData] = useState([]);
//   const [groupingOption, setGroupingOption] = useState('status'); // Set the default grouping option
//   const [sortingOption, setSortingOption] = useState('priority'); // Set the default sorting option
//   const [sortingOrder, setSortingOrder] = useState('asc');

//   useEffect(() => {
//     fetchData();
//   }, []); // Fetch data when the component mounts

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
//       setData(response.data || { tickets: [] });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleSortingChange = (option) => {
//     if (sortingOption === option) {
//       setSortingOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
//     } else {
//       setSortingOption(option);
//       setSortingOrder('asc');
//     }
//   };

//   const renderColumns = () => {
//     let groupedTickets = [];

//     if (groupingOption === 'status' && data.tickets) {
//       // Group by status
//       groupedTickets = data.tickets.reduce((acc, ticket) => {
//         const status = ticket.status;
//         if (!acc[status]) {
//           acc[status] = [ticket];
//         } else {
//           acc[status].push(ticket);
//         }
//         return acc;
//       }, {});
//     } else if (groupingOption === 'user' && data.tickets) {
//       // Group by user
//       groupedTickets = data.tickets.reduce((acc, ticket) => {
//         const userId = ticket.userId;
//         if (!acc[userId]) {
//           acc[userId] = [ticket];
//         } else {
//           acc[userId].push(ticket);
//         }
//         return acc;
//       }, {});
//     } else if (groupingOption === 'priority' && data.tickets) {
//       // Group by priority
//       groupedTickets = data.tickets.reduce((acc, ticket) => {
//         const priority = ticket.priority;
//         if (!acc[priority]) {
//           acc[priority] = [ticket];
//         } else {
//           acc[priority].push(ticket);
//         }
//         return acc;
//       }, {});
//     }

//     // Sort tickets inside each group based on the selected sorting option
//     Object.keys(groupedTickets).forEach((groupKey) => {
//       groupedTickets[groupKey] = groupedTickets[groupKey].sort((a, b) => {
//         if (sortingOption === 'priority') {
//           return sortingOrder === 'asc' ? a.priority - b.priority : b.priority - a.priority;
//         } else if (sortingOption === 'title') {
//           return sortingOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
//         }
//         return 0;
//       });
//     });

//     // Render KanbanColumns based on groupingOption
//     return Object.keys(groupedTickets).map((groupKey) => (
//       <KanbanColumn key={groupKey} title={groupKey} tickets={groupedTickets[groupKey]} />
//     ));
//   };

//   // Render UI
//   return (
//     <div>
//       <button onClick={fetchData}>Refresh Data</button>
//       <div>
//         {/* Add radio buttons for grouping options */}
//         <input
//           type="radio"
//           id="status"
//           name="groupingOption"
//           value="status"
//           onChange={() => setGroupingOption('status')}
//           checked={groupingOption === 'status'}
//         />
//         <label htmlFor="status">By Status</label>

//         <input
//           type="radio"
//           id="user"
//           name="groupingOption"
//           value="user"
//           onChange={() => setGroupingOption('user')}
//           checked={groupingOption === 'user'}
//         />
//         <label htmlFor="user">By User</label>

//         <input
//           type="radio"
//           id="priority"
//           name="groupingOption"
//           value="priority"
//           onChange={() => setGroupingOption('priority')}
//           checked={groupingOption === 'priority'}
//         />
//         <label htmlFor="priority">By Priority</label>
//       </div>

//       {groupingOption !== '' && (
//         <div>
//           {/* Add radio buttons for sorting options */}
//           <input
//             type="radio"
//             id="sortPriority"
//             name="sortingOption"
//             value="priority"
//             onChange={() => handleSortingChange('priority')}
//             checked={sortingOption === 'priority'}
//           />
//           <label htmlFor="sortPriority">Sort by Priority</label>

//           <input
//             type="radio"
//             id="sortTitle"
//             name="sortingOption"
//             value="title"
//             onChange={() => handleSortingChange('title')}
//             checked={sortingOption === 'title'}
//           />
//           <label htmlFor="sortTitle">Sort by Title</label>
//         </div>
//       )}

//       {renderColumns()}
//     </div>
//   );
// };

// export default KanbanBoard;

// KanbanBoard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = () => {
  // Retrieve the stored grouping and sorting options from localStorage, or use default values
  const storedGroupingOption = localStorage.getItem('groupingOption') || 'status';
  const storedSortingOption = localStorage.getItem('sortingOption') || 'priority';
  const storedSortingOrder = localStorage.getItem('sortingOrder') || 'asc';

  const [data, setData] = useState([]);
  const [groupingOption, setGroupingOption] = useState(storedGroupingOption);
  const [sortingOption, setSortingOption] = useState(storedSortingOption);
  const [sortingOrder, setSortingOrder] = useState(storedSortingOrder);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
      setData(response.data || { tickets: [] });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSortingChange = (option) => {
    if (sortingOption === option) {
      setSortingOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortingOption(option);
      setSortingOrder('asc');
    }

    // Save the sorting options to localStorage
    localStorage.setItem('sortingOption', option);
    localStorage.setItem('sortingOrder', sortingOrder);
  };

  const handleGroupingChange = (option) => {
    setGroupingOption(option);

    // Save the grouping option to localStorage
    localStorage.setItem('groupingOption', option);
  };

  const renderColumns = () => {
    let groupedTickets = [];

    if (groupingOption === 'status' && data.tickets) {
      // Group by status
      groupedTickets = data.tickets.reduce((acc, ticket) => {
        const status = ticket.status;
        if (!acc[status]) {
          acc[status] = [ticket];
        } else {
          acc[status].push(ticket);
        }
        return acc;
      }, {});
    } else if (groupingOption === 'user' && data.tickets) {
      // Group by user
      groupedTickets = data.tickets.reduce((acc, ticket) => {
        const userId = ticket.userId;
        if (!acc[userId]) {
          acc[userId] = [ticket];
        } else {
          acc[userId].push(ticket);
        }
        return acc;
      }, {});
    } else if (groupingOption === 'priority' && data.tickets) {
      // Group by priority
      groupedTickets = data.tickets.reduce((acc, ticket) => {
        const priority = ticket.priority;
        if (!acc[priority]) {
          acc[priority] = [ticket];
        } else {
          acc[priority].push(ticket);
        }
        return acc;
      }, {});
    }

    // Sort tickets inside each group based on the selected sorting option
    Object.keys(groupedTickets).forEach((groupKey) => {
      groupedTickets[groupKey] = groupedTickets[groupKey].sort((a, b) => {
        if (sortingOption === 'priority') {
          return sortingOrder === 'asc' ? a.priority - b.priority : b.priority - a.priority;
        } else if (sortingOption === 'title') {
          return sortingOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        }
        return 0;
      });
    });

    // Render KanbanColumns based on groupingOption
    return Object.keys(groupedTickets).map((groupKey) => (
      <KanbanColumn key={groupKey} title={groupKey} tickets={groupedTickets[groupKey]} />
    ));
  };
  const renderGroupingDropdown = () => (
    <div style={{ marginBottom: '8px' }}>
      <label htmlFor="groupingDropdown">Ordering: </label>
      <select
        value={groupingOption}
        onChange={(e) => handleGroupingChange(e.target.value)}
      >
        <option value="status">By Status</option>
        <option value="user">By User</option>
        <option value="priority">By Priority</option>
      </select>
    </div>
  );

  const renderSortingDropdown = () => (
    <div style={{ marginBottom: '8px' }}>
      <label htmlFor="sortingDropdown">Sorting   : </label>
      <select
        value={sortingOption}
        onChange={(e) => handleSortingChange(e.target.value)}
      >
        <option value="priority">Sort by Priority</option>
        <option value="title">Sort by Title</option>
      </select>
    </div>
  );
  // Render UI
  return (
    // <div>
    //   <button onClick={fetchData}>Refresh Data</button>
    //   <div>
    //     {/* Add radio buttons for grouping options */}
    //     <input
    //       type="radio"
    //       id="status"
    //       name="groupingOption"
    //       value="status"
    //       onChange={() => handleGroupingChange('status')}
    //       checked={groupingOption === 'status'}
    //     />
    //     <label htmlFor="status">By Status</label>

    //     <input
    //       type="radio"
    //       id="user"
    //       name="groupingOption"
    //       value="user"
    //       onChange={() => handleGroupingChange('user')}
    //       checked={groupingOption === 'user'}
    //     />
    //     <label htmlFor="user">By User</label>

    //     <input
    //       type="radio"
    //       id="priority"
    //       name="groupingOption"
    //       value="priority"
    //       onChange={() => handleGroupingChange('priority')}
    //       checked={groupingOption === 'priority'}
    //     />
    //     <label htmlFor="priority">By Priority</label>
    //   </div>

    //   {groupingOption !== '' && (
    //     <div>
    //       {/* Add radio buttons for sorting options */}
    //       <input
    //         type="radio"
    //         id="sortPriority"
    //         name="sortingOption"
    //         value="priority"
    //         onChange={() => handleSortingChange('priority')}
    //         checked={sortingOption === 'priority'}
    //       />
    //       <label htmlFor="sortPriority">Sort by Priority</label>

    //       <input
    //         type="radio"
    //         id="sortTitle"
    //         name="sortingOption"
    //         value="title"
    //         onChange={() => handleSortingChange('title')}
    //         checked={sortingOption === 'title'}
    //       />
    //       <label htmlFor="sortTitle">Sort by Title</label>
    //     </div>
    //   )}

    //   {renderColumns()}
    // </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button onClick={fetchData}>Refresh Data</button>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Dropdown for grouping options */}
        {renderGroupingDropdown()}

        {/* Dropdown for sorting options */}
        {renderSortingDropdown()}
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        {renderColumns()}
      </div>
    </div>
  );
};

export default KanbanBoard;
