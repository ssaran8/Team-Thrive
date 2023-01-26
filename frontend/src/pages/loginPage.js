import { React, Component, useState } from 'react';
import './loginPage.css'


class loginPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            passowrd:'',
        };
    }

    updateEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    };

    updatePW = (e) => {
        this.setState({
            passowrd: e.target.value
        });
    };

    handleSubmit = (e) =>{
        e.preventDefault()
        //console.log(this.state.email, this.state.passowrd)
        // this.setState({username:""})
    }

    render(){
        return(
            <div className='login-container'>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input  type="email" 
                            placeholder="NETid@uw.edu" 
                            id="email" 
                            name="email"
                            value={this.state.email}
                            onChange={this.updateEmail}/>

                    <label htmlFor="passowrd">Password</label>
                    <input  type="passowrd" 
                            placeholder="********" 
                            id="passowrd" 
                            name="passowrd" 
                            value={this.state.passowrd}
                            onChange={this.updatePW}/>

                    <button type="sumbit">Log In </button>
                </form>
                <button onClick={() => this.newuser}>Don't have an account? Sign Up </button>
            </div>
        )
    }

}

export default loginPage