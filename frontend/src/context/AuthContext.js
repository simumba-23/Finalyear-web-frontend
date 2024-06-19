import React, { createContext, useState, useEffect,useCallback } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value })
        });

        const data = await response.json();

       try {
        
       } catch (error) {
        
       } if(response.ok) {
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            navigate('/');
        } else {
            if (response.status === 401 && data.detail === "No active account found with the given credentials") {
                alert('Please check your credentials.');
            } else {
                alert('Something went wrong while logging in. Please try again later.');
            }
        }
    };

    const logoutUser = useCallback((e) => {
        e.preventDefault();
        localStorage.removeItem('authTokens');
        setAuthTokens(null);
        setUser(null);
        navigate('/login');
    }, [navigate]);

    
    const contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser
    };

    useEffect(() => {
        const REFRESH_INTERVAL = 1000 * 60 * 4; // 4 minutes
        const interval = setInterval(() => {
            if (authTokens) {
                const updateToken = async () => {
                    const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ refresh: authTokens?.refresh })
                    });
            
                    if (response.ok) {
                        const data = await response.json();
                        setAuthTokens(data);
                        setUser(jwtDecode(data.access));
                        localStorage.setItem('authTokens', JSON.stringify(data));
                    } else {
                        logoutUser();
                    }
            
                    if (loading) {
                        setLoading(false);
                    
                    }
                };
            
            }
        }, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [authTokens,loading,logoutUser]);

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
