import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './LoginForm.css';
import Loader from './Loader'; // Import the Loader component

const LoginForm = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleModeSwitch = () => {
        setIsSignUp((prevMode) => !prevMode);
        setIsForgotPassword(false);
    };

    const handleForgotPasswordSwitch = () => {
        setIsSignUp(false);
        setIsForgotPassword((prevMode) => !prevMode);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Show the loader
        setTimeout(() => {
            // Simulate async operation
            if (isForgotPassword) {
                if (password !== confirmPassword) {
                    console.error('Passwords do not match!');
                    setLoading(false);
                    return;
                }
                console.log('Resetting Password');
                // Add Forgot Password logic here
            } else if (isSignUp) {
                if (password !== confirmPassword) {
                    console.error('Passwords do not match!');
                    setLoading(false);
                    return;
                }
                console.log('Signing Up');
                // Add Sign-Up logic here
            } else {
                console.log('Signing In');
                // Add Sign-In logic here
            }
            setLoading(false); // Hide the loader after processing
        }, 2000); // Simulate 2 seconds of loading time
    };

    return (
        <div>
            {loading && <Loader />} {/* Show loader when loading */}
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
                            />
                            <TextField
                                id="password"
                                label="Password"
                                variant="standard"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {isSignUp && (
                                <TextField
                                    id="confirm-password"
                                    label="Confirm Password"
                                    variant="standard"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                            />
                            <TextField
                                id="new-password"
                                label="New Password"
                                variant="standard"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <TextField
                                id="confirm-new-password"
                                label="Confirm New Password"
                                variant="standard"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                        <Button variant="contained" size="small" onClick={handleModeSwitch} style={{ marginTop: '0px' }}>
                            {isSignUp ? 'Switch to Sign-In' : 'Sign-Up'}
                        </Button>
                    )}
                </Box>
                {!isSignUp && !isForgotPassword && (
                    <Typography variant="body2" onClick={handleForgotPasswordSwitch} style={{ cursor: 'pointer', textAlign: 'center' }}>
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
                        <Button variant="contained" size="small" onClick={() => setIsForgotPassword(false)}>
                            Switch to Sign-In
                        </Button>
                    </Box>
                )}
            </form>
        </div>
    );
};

export default LoginForm;



