import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './LoginForm.css';
import Loader from './Loader';
import axios from 'axios';

const LoginForm = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [redirectToHome, setRedirectToHome] = useState(false);

    const navigate = useNavigate(); // Initialize navigate hook

    const handleModeSwitch = () => {
        setIsSignUp(prevMode => !prevMode);
        setIsForgotPassword(false);
    };

    const handleForgotPasswordSwitch = () => {
        setIsSignUp(false);
        setIsForgotPassword(prevMode => !prevMode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error state
        setError('');

        // Check if fields are empty
        if (!username || !password || (isSignUp && !confirmPassword)) {
            setError('All fields are required!');
            setLoading(false);
            return;
        }

        if (isForgotPassword) {
            if (password !== confirmPassword) {
                setError('Passwords do not match!');
                setLoading(false);
                return;
            }
            // Add logic for resetting password
            console.log('Resetting Password');
        } else if (isSignUp) {
            if (password !== confirmPassword) {
                setError('Passwords do not match!');
                setLoading(false);
                return;
            }
            // Add logic for signing up
            try {
                const response = await axios.post('http://localhost:3000/users/', {
                    username,
                    password
                });
                if (response.status === 201) {
                    setLoading(false);
                    alert('Registration successful! Please sign in.');
                    setIsSignUp(false); // Switch to Sign-In mode
                }
            } catch (err) {
                setError('Sign-Up failed. Please try again.');
                setLoading(false);
            }
        } else {
            // Add logic for signing in
            setLoading(true); // Show the loader
            try {
                const response = await axios.get('http://localhost:3000/users');
                const users = response.data;
                const user = users.find(user => user.username === username && user.password === password);

                if (user) {
                    setLoading(false);
                    setRedirectToHome(true); // Trigger redirection
                } else {
                    setError('Invalid username or password');
                    setLoading(false);
                }
            } catch (err) {
                setError('Sign-In failed. Please try again.');
                setLoading(false);
            }
        }
    };

    if (redirectToHome) {
        navigate('/HomePage');
    }

    return (
        <div>
            {loading && <Loader />}
            <form className='Form' onSubmit={handleSubmit}>
                <Typography fontSize={50}>
                    {isForgotPassword ? 'Reset Password' : isSignUp ? 'Sign-Up' : 'Sign-In'}
                </Typography>
                <Box
                    display="flex"
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {!isForgotPassword && (
                        <>
                            <TextField
                                id="username"
                                label="Username"
                                variant="standard"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                error={!!error}
                                helperText={error && username === '' ? 'Username is required' : ''}
                            />
                            <TextField
                                id="password"
                                label="Password"
                                variant="standard"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!error}
                                helperText={error && password === '' ? 'Password is required' : ''}
                            />
                            {isSignUp && (
                                <TextField
                                    id="confirm-password"
                                    label="Confirm Password"
                                    variant="standard"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    error={!!error}
                                    helperText={error && confirmPassword === '' ? 'Confirm Password is required' : ''}
                                />
                            )}
                        </>
                    )}
                    {isForgotPassword && (
                        <>
                            <TextField
                                id="username"
                                label="Username"
                                variant="standard"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                error={!!error}
                                helperText={error && username === '' ? 'Username is required' : ''}
                            />
                            <TextField
                                id="new-password"
                                label="New Password"
                                variant="standard"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!error}
                                helperText={error && password === '' ? 'New Password is required' : ''}
                            />
                            <TextField
                                id="confirm-new-password"
                                label="Confirm New Password"
                                variant="standard"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={!!error}
                                helperText={error && confirmPassword === '' ? 'Confirm New Password is required' : ''}
                            />
                        </>
                    )}
                </Box>
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems={"center"}
                    justifyContent={"center"}
                    paddingBottom={3}
                    paddingTop={3}
                    gap="10px"
                >
                    <Button variant="contained" size="small" type="submit">
                        {isForgotPassword ? 'Reset Password' : isSignUp ? 'Sign-Up' : 'Sign-In'}
                    </Button>
                    {!isForgotPassword && (
                        <Button
                            variant="contained"
                            size="small"
                            style={{ marginTop: '0px' }}
                            onClick={handleModeSwitch} // Add onClick handler to switch modes
                        >
                            {isSignUp ? 'Switch to Sign-In' : 'Sign-Up'}
                        </Button>
                    )}
                </Box>
                {!isSignUp && !isForgotPassword && (
                    <Typography
                        variant="body2"
                        onClick={handleForgotPasswordSwitch}
                        style={{ cursor: 'pointer', textAlign: 'center' }}
                    >
                        Forgot password? Try Me!
                    </Typography>
                )}
                {isForgotPassword && (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems={"center"}
                        justifyContent={"center"}
                        paddingBottom={3}
                        paddingTop={3}
                    >
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleForgotPasswordSwitch} // Add onClick handler to switch back to Sign-In
                        >
                            Switch to Sign-In
                        </Button>
                    </Box>
                )}
            </form>
        </div>
    );
};

export default LoginForm;
