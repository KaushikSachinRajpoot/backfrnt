import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DropdownComponent() {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const [isVersion, setVersion] = useState()
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [pos, setPos] = useState();
  const [rowData, setROwData] = useState();

  const getDatabaseList = () => {
    setLoading(true);
    axios.post('http://localhost:5000/database')
      .then(response => {
        setData(response.data.data);
        setVersion(response.data.highestVersion);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      }).then(()=>{
        setLoading(false);
      });
  }

  useEffect(() => {
    getDatabaseList();
  }, []);

  const handleDropdownChange = (event) => {
    setLoading(true);
    setSelectedValue(event.target.value);
    const dbname = event.target.value
    axios.post('http://localhost:5000/todos', { dbname })
      .then(response => {
        setROwData(response.data)
        console.log(response.data, "table data");

      })
      .catch(error => {
        console.error('Error fetching table:', error);
        // setLoading(false);
      })
      .then(()=>{
        setLoading(false);
      });


  };

  const HandleBackUp = () => {
    setLoading(true);
    const upcomingVersion = isVersion + 1;
    console.log('id Version', isVersion)
    axios.post('http://localhost:5000/createDatabase', { version: upcomingVersion })
      .then(response => {
        console.log(response, "response is here");
        console.log(response.data.highestVersion, typeof (response.data.highestVersion));
        setVersion(response.data.highestVersion);
        getDatabaseList();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      }).then(()=>{
        setLoading(false);
      });
  }

  const handleInsert = () => {
    setLoading(true);
    const payload = {
      id, name, pos
    }
    console.log(payload);
    axios.post('http://localhost:5000/insert', payload)
      .then(response => {
        console.log('inserted', response)
      }).catch(error => {
        console.log(error)
      }).then(()=>{
        setLoading(false);
      });
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
      }}><h1>Loading....</h1></div>
    )
  }

  return (
    <div >
      <div className='home'>
      <div className="formTemplate">
        <div className="form">
          <label for="id" className='label'>Enter your id: </label>
          <input type="text" name="id" id="id" value={id} onChange={(event) => { setId(event.target.value) }} />
        </div>
        <div className="form">
          <label for="email" className='label'>Enter your name: </label>
          <input type="text" name="name" id="name" value={name} onChange={(event) => { setName(event.target.value) }} />
        </div>
        <div className="form">
          <label for="pos" className='label'>Enter your position: </label>
          <input type="text" name="pos" id="pos" value={pos} onChange={(event) => { setPos(event.target.value) }} />
        </div>
        <div className="form">
          <button onClick={handleInsert}>insert row</button>
        </div>
      </div>

     <div className='versions'>
     <div className='dropdown'>
        <label htmlFor="dataDropdown">Select version</label>
        <select id="dataDropdown" value={selectedValue} onChange={handleDropdownChange}>
          <option value="">Select an option</option>
          {data.map(item => (
            <option style={{ color: 'red' }} key={item.id} value={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className='table'>
      {(rowData) ?
        
        <table>
          <thead>
            <tr className='row'>
              <th >id</th>
              <th >name</th>
              <th >pos</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map(item => (
              <tr className='row'>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.pos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      
      : <p>No data from database is available</p>}
      </div>

     </div>

      </div>
      <div>
        <div>
          <button onClick={HandleBackUp}>Copy data</button>
        </div>
      </div>

    </div>
  );
}

export default DropdownComponent;