import React, { useState } from 'react';
import { Typography, Snackbar, Alert } from '@mui/material';
import { logoutUser } from '../../api/userService';
import { userAtom, checkUser as checkUserAtom } from '../../Store/atoms/userAtoms';
import { useRecoilState } from 'recoil';

function Logout() {
    const [currentUser, setCurrentUser] = useRecoilState(userAtom);
    const [checkUserState, setCheckUser] = useRecoilState(checkUserAtom);

    const handleLogout = async () => {
        try {
            const response = await logoutUser();
            console.log(response);
            localStorage.removeItem("userID");
            setCurrentUser(null);
            setCheckUser(false);
            // onLogout(); // Trigger the parent component's state update for Snackbar
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Typography onClick={handleLogout} sx={{ cursor: 'pointer' }}>
            Logout
        </Typography>
    );
}

export default Logout;
