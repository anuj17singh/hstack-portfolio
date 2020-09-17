import React from 'react';
import LoginForm from '../LoginForm';

export default function Login(){
    return(
        <div style={{display:'flex',
                    justifyContent:'center',
                    alignItems: 'center',
                    height: '70vh'}}>
            <LoginForm/>
        </div>
    );
}