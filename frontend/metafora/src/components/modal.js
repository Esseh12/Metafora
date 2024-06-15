import '../styles/modal.css'

export const Modal = ({ show, handleClose}) => {
    return (
        <>
            <div className={`modal ${show ? 'show' : ''}`}>
                <div className="modal-content">
                    <span className="close" onClick={handleClose}>&times;</span>
                <h2 className="modal-heading">Welcome back</h2>
                <form>
                    <label htmlFor="username" class="modal-label">Email or Phone Number</label>
                    <input type="text" id="username" name="username" className="modal-input" required/>
                    <label htmlFor="password" class="modal-label" >Password</label>
                    <input type="password" id="password" name="password" className="modal-input" required />
                    <button type="submit" className="modal-button">Login</button>
                </form>
            </div>
            </div>
        </>
    )
}

export default Modal;