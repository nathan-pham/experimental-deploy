const Modal = ({ children, onClick }) => {
    return (
        <div className="flex align-center justify-center modal-wrapper" onClick={onClick}>
            <div className="modal" onClick={(e) => e.stopPropagation()} >
                { children }
                <i onClick={onClick} className="fas fa-times close"></i>
            </div>
        </div>
    )
}

export default Modal