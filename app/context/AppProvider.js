'use client';

import React, { useContext, useReducer, useEffect, useState } from 'react';
import AppContext from './AppContext';
import AppReducer from './AppReducer';
import { ADD_DATA, GET_DATA } from './AppTypes';
import { api } from '../api';
import { getAllLocation } from '@/firebase/services';

const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState([]);

  const initialState = {
    location: [],
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const results = (await api.get()).data.results;
        setData(results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApi();
  }, []);

  return (
    <AppContext.Provider
      value={{
        data,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('UseCartContext must be used within a CartProvider');
  }
  return context;
}
