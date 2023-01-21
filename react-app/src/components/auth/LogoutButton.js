import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/');
  };

  return <Button onClick={onLogout} color="inherit">Logout</Button>;
};

export default LogoutButton;
