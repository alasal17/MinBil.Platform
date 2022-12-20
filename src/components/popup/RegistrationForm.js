import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function RegistrationForm() {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => setPage(page - 1);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Open Form
      </Button>

      <Modal show={show} onHide={handleClose}>
        {page === 1 && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Registration Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* First page of the form */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleNextPage}>
                Next
              </Button>
            </Modal.Footer>
          </>
        )}
        {page === 2 && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Registration Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Second page of the form */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlePrevPage}>
                Previous
              </Button>
              <Button variant="primary" onClick={handleNextPage}>
                Next
              </Button>
            </Modal.Footer>
          </>
        )}
        {page === 3 && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Registration Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Third page of the form */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlePrevPage}>
                Previous
              </Button>
              <Button variant="primary">
                Submit
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
}
export default RegistrationForm;
