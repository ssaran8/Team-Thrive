import { React, Component } from 'react';
import './registerPage.css'
import { Link } from 'react-router-dom'

class registerPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            passowrd:'',
            name: '',
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

    updateName = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    handleSubmit = (e) =>{
        e.preventDefault()
        console.log(this.state.email, this.state.passowrd, this.state.name)
        // this.setState({username:""})
    }

    render(){
        return(
            <div className='register-container'>
                <form className ='register-form' onSubmit={this.handleSubmit}>
                <label htmlFor="name">Full Name</label>
                    <input  placeholder="Full Name" 
                            id="name" 
                            name="name"
                            value={this.state.name}
                            onChange={this.updateName}/>

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
                <Link to='/'>Already have an account? Log in</Link>
                {/*Might want to replace above with MUI <Button component={Link} to='/'/> */}
            </div>
        )
    }

}

export default registerPage