'use client';

import {
  addLocation,
  deleteLocation,
  getAllLocation,
} from '../../firebase/services';
import React, { useState, useEffect } from 'react';

const FormPage = () => {
  const [location, setLocation] = useState('');
  const [locationData, setLocationData] = useState([]);

  const fetching = async () => {
    const dataFetch = await getAllLocation();
    setLocationData(dataFetch);
  };

  const onDeleteLocation = async (id) => {
    await deleteLocation(id);
    fetching();
  };

  useEffect(() => {
    fetching();
  }, [locationData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addLocation(location);
      console.log(result);
      setLocation('');
      fetching();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Form Page</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <div>
        <ul>
          {locationData.map((data, i) => {
            return (
              <li key={i}>
                <p>{data.data().name}</p>
                <i onClick={() => onDeleteLocation(data.id)}>Delete</i>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FormPage;
