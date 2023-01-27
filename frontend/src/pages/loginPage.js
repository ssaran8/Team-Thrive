import { React, Component, useState } from 'react';
import './loginPage.css'
import { Link } from 'react-router-dom'


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
                <h2>Login</h2>
                <form className ='login-form' onSubmit={this.handleSubmit}>
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
                <Link className="link-btn" to='/NewUser'>Don't have an account? Sign Up</Link>
            </div>
        )
    }

}

export default loginPage