import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

function editQuizModal() {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button className='dash-edit-quiz-modal' onClick={() => setShowModal(true)}>add</button>
            {showModal && (
                <Modal className='edit-quiz-modal' onClose={() => setShowModal(false)}>
                    <AddFriendForm onClose={() => setShowModal(false)}/>
                </Modal>
            )}
        </>
    )
}

export default editQuizModal;