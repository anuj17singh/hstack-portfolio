import { PinDropSharp } from '@material-ui/icons';
import React from 'react';
import LoginForm from '../LoginForm';

export default function Login(props){
    return(
        <div style={{display:'flex',
                    justifyContent:'center',
                    alignItems: 'center',
                    height: '70vh'}}>
            <LoginForm handleLogin = {props.handleLogin} />
        </div>
    );
}