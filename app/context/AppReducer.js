import { addLocation } from '@/firebase/services';
import { api } from '../api';
import { GET_DATA, ADD_DATA } from './AppTypes';
import { getAllLocation } from '@/firebase/services';

export default function AppReducer(state, action) {
  switch (action.type) {
    case GET_DATA:
      state.location = action.payload;
      break;

    case ADD_DATA:
      addLocation(action.payload);
      break;

    default:
      break;
  }
}
