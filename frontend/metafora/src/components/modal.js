import '../styles/modal.css'
export const Modal = ({ show, handleClose}) => {
    return (
        <>
            <div className={`modal ${show ? 'show' : ''}`}>
                <div className="modal-content">
                    <span className="close" onClick={handleClose}>&times;</span>
                
                <h2 className="modal-heading">Welcome Back</h2>
                <form>
                    <label htmlFor="username" class="modal-label">Email</label>
                    <input type="text" id="username" name="username" className="modal-input" required/>
                    <label htmlFor="password" class="modal-label" >Password</label>
                        <input type="password" id="password" name="password" className="modal-input" required />
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