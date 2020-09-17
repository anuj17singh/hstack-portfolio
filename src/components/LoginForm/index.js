import React, {useState, useEffect} from 'react'
import {Grid, 
    TextField,
    Paper,
    makeStyles,
    Typography, 
    Button} from '@material-ui/core';

import {Redirect} from 'react-router-dom';
import { useHistory } from "react-router-dom";


    const useStyles = makeStyles(theme =>({
        root: {
            '& .MuiFormControl-root': {
                width:'80%',
                margin:theme.spacing(1)
            }
        },
        container: {
            padding: 10,
            // margin:theme.spacing()
        },
        loginButton : {
            margin: 10
        }
        
    }))

    const intialValues = {
        username: '',
        password: ''
    }

export default function LoginForm() {
    
    const [values, setValues] = useState(intialValues);
    const classes = useStyles();
    let history = useHistory();

    const handleUsernameChange = e => {
        const {name , value } = e.target
        setValues({
            ...values,
            [name] : value
        })
    }

    const handlePasswordChange = e => {
        const {name , value } = e.target
        setValues({
            ...values,
            [name] : value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(values.username=="house.stack"&&values.password=="house.stack"){
            history.push('/dashboard');
        }
        
    }

    return(
        <form className={classes.root} onSubmit= {handleSubmit}>
            <Grid container>
                <Grid item >
                    <Paper elevation={3} className={classes.container} >
                        <TextField 
                            id = "outlined-basic" 
                            label = "Username" 
                            variant = "outlined"
                            name = "username"
                            value = {values.username} 
                            onChange = {handleUsernameChange}
                            required/>
                        <TextField 
                            id = "outlined-basic" 
                            label = "Password" 
                            variant = "outlined" 
                            name = "password"
                            type = 'password'
                            value = {values.password}
                            onChange = {handlePasswordChange} 
                            required/>
                            <br/>
                        <Button variant="contained" 
                                color="primary"
                                className={classes.loginButton}
                                type= "submit">
                            Login
                        </Button>
                    </Paper>
                </Grid>
            </Grid>

        </form>
    )
}