import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DropdownComponent() {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const [isVersion, setVersion] = useState()

  const handleVersion = (num) => {
    let versionNumberArray = []
    num.filter((item) => {
      if ((item.slice(0, 8)) === "version_") {
        versionNumberArray.push((item.slice(8)));
      }
    })
    const sortedVersionNumberArray = versionNumberArray.sort((a, b) => {
      return b - a;
    });
    console.log('sorted', sortedVersionNumberArray);
    console.log('highestVersion', sortedVersionNumberArray[0]);
    setVersion(parseInt(sortedVersionNumberArray[0]))
  }



  useEffect(() => {
    axios.post('http://localhost:5000/database')
      .then(response => {
        setData(response.data.data);
        handleVersion(response.data.data)
        console.log(response.data.highestVersion, 'response is herex');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  let num = 3;
  const HandleBackUp = () => {
    axios.post('http://localhost:5000/createDatabase', { version: isVersion+1})
      .then(response => {
        console.log(response, "response is here");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }


  return (
    <div>
      <label htmlFor="dataDropdown">Select version</label>
      <select id="dataDropdown" value={selectedValue} onChange={handleDropdownChange}>
        <option value="">Select an option</option>
        {data.map(item => (
          <option style={{ color: 'red' }} key={item.id} value={item}>{item}</option>
        ))}
      </select>

      <div>
        <div>
          <button onClick={HandleBackUp}>Copy data</button>
        </div>
      </div>

    </div>
  );
}

export default DropdownComponent;