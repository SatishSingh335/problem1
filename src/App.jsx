import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // State to store selected item for details view

  const fetchData = async () => {
    setLoading(true);
    setError('');
    setIsEmpty(false);

    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc');
      const result = await response.json();

      if (result.length === 0) {
        setIsEmpty(true);
      } else {
        setData(result); 
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (item) => {
    setSelectedItem(item); // Set selected item when a card is clicked
  };

  const closeModal = () => {
    setSelectedItem(null); // Close modal by setting selected item to null
  };

  return (
    <div className="container">
      <button onClick={fetchData} className="fetch-button">
        Fetch Data
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {isEmpty && <p>No data available.</p>}

      <div className="grid">
        {data.map((item) => (
          <div key={item.id} className="card" onClick={() => handleCardClick(item)}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>

      {/* Modal for showing details */}
      {selectedItem && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p> id : {selectedItem.id}</p>
            <p> url : {selectedItem.url}</p>
            <p> Height: {selectedItem.height}</p>
            <p> Width : {selectedItem.width}</p>

          </div>

        </div>
        
      )}

    </div>
  );
}

export default App;
