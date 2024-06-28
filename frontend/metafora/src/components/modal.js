import '../styles/modal.css';
import { useState } from 'react';


const Modal = ({ show, handleClose}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // let formJson = JSON.stringify(email);
        // alert(formJson);
        // const headerBody = {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ name: companyName }),
        //   }

        fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          }
        )
        .then(response => response.json())
        .then(data => {
            if (data['status'] !== 200){
                throw new Error(data['error']);
            }
            console.log(data['tokens']['access'])
            localStorage.setItem("accessToken", data['tokens']['access'])
            console.log(data['msg'])                
            // setCompanies(data['data']['companies'])
            }
        )
        .catch(error => {
            console.log(error);
            }
        );
        // console.log(`Email: ${email}`);
        // console.log(`${password}`);        
    }

    return (
        <>
            <div className={`modal ${show ? 'show' : ''}`}>
                <div className="modal-content">
                    <span className="close" onClick={handleClose}>&times;</span>
                
                <h2 className="modal-heading">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <label htmlFor="username" class="modal-label">Email</label>
                    <input type="email"  name="email" onChange={(e) => setEmail(e.target.value)} value={email} className="modal-input" required/>
                    <label htmlFor="password" class="modal-label" >Password</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} className="modal-input" required />
                    <a href="#forgot" className="password-recovery link">Forgot password</a>
                    <button type="submit" className="modal-button">Login</button>
                    <p className="modal-text">Don't have an account&nbsp;?</p>
                    <a href="#signup" className="signup link">sign up</a>
                </form>
            </div>
            </div>
        </>
    )
}

export default Modal;