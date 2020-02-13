import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = props => {
  // Get item id from URL params
  const { itemId } = useParams();

  return 'Hello world';
};
