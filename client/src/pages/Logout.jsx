import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Logout = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        localStorage.removeItem('expiration')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/')
    },[])

    return (
        <div>
            
        </div>
    );
};

export default Logout;