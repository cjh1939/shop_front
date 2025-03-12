
import React from 'react'
import './Modal.css'

const Modal = ({ title, onClose, children }) => {
  

  return (
    <div className="modal-overlay" onClick={() => onClose()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{children}</p>
        <button className="close-button" onClick={() => onClose()}>
          닫기
        </button>
      </div>
    </div>
  )
}

export default Modal