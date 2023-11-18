import React from 'react';
import './confirmation_modal.scss'; 

const ConfirmationModal = ({ isOpen, onClose, onAccept, text }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <p>{text}</p>
        <div className="modal-actions">
          <button onClick={onAccept} className="btn-accept">Accept</button>
          <button onClick={onClose} className="btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;