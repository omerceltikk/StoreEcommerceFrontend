import { useState } from 'react';
import { Button, Modal } from "react-bootstrap"





const SummaryModal = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    return (
        <>

            <Modal show={show} onHide={handleClose}
             aria-labelledby="contained-modal-title-vcenter"
             centered
             variant="secondary"
            >
                <Modal.Header className='bg-dark text-light' closeButton>
                    <Modal.Title>Notice</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark text-light pb-4'>This is a test Website for development purposes. Delays and slowness is caused by Hosting servers and not related to software development. It has no commercial purpose. </Modal.Body>
                <Modal.Body className='bg-dark text-light border-1 border-bottom' closeButton>
                    <Modal.Title>Bilgi</Modal.Title>
                </Modal.Body>
                <Modal.Body className='bg-dark text-light pb-4'>Bu site yalnızca development aşaması adına test amaçlı tasarlanmıştır.Gecikme ve yavaşlıklar Hosting serverlarından kaynaklanmaktadır. Hiçbir ticari niteliği yoktur.</Modal.Body>
                <Modal.Footer className='bg-dark text-light border-0'>
                    <Button variant="dark" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SummaryModal