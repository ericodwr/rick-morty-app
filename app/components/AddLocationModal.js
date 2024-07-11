'use client';

import React, { useState, useEffect } from 'react';
import { Button, Dropdown, DropdownButton, Form, Modal } from 'react-bootstrap';
import { addCharacter, addLocation, getAllLocation } from '@/firebase/services';

function ModalComponent(props) {
  const [locationData, setlocationData] = useState([]);

  const [selectedLocation, setselectedLocation] = useState(locationData[0]);

  const [isCreateLocation, setisCreateLocation] = useState(false);

  const [newLocation, setNewLocation] = useState('');

  const fetchLocation = async () => {
    const results = await getAllLocation();
    setlocationData(results);
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchLocation();
    };
    fetch();
  }, []);

  const onCreateLocation = async (e) => {
    e.preventDefault();
    try {
      await addLocation(newLocation);
      const newData = await getAllLocation();
      setlocationData(newData);
      setNewLocation('');
      setisCreateLocation(false);
    } catch (error) {}
  };

  const onSavingModal = async () => {
    try {
      await addCharacter(selectedLocation.id, props.characterid);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Location
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Select Location</h4>
          {isCreateLocation ? (
            <Button
              onClick={() => setisCreateLocation(false)}
              variant="secondary"
            >
              Cancel
            </Button>
          ) : (
            <Button onClick={() => setisCreateLocation(true)}>&#43; New</Button>
          )}
        </div>

        {isCreateLocation && (
          <div className="mb-5">
            <Form onSubmit={onCreateLocation}>
              <div className="row">
                <div className="col-8">
                  <Form.Group>
                    <Form.Control
                      value={newLocation}
                      type="text"
                      placeholder="Enter Location"
                      onChange={(e) => setNewLocation(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                </div>
                <div className="col">
                  <Button
                    disabled={!newLocation}
                    variant="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        )}

        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {selectedLocation ? selectedLocation.name : 'Select One'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {locationData?.map((data) => (
              <Dropdown.Item
                onClick={() => {
                  setselectedLocation({
                    name: data.data().name,
                    id: data.id,
                  });
                }}
                key={data.id}
              >
                {data.data().name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSavingModal}>Save</Button>
        <Button onClick={props.onHide} className="btn-secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const AddLocationModal = ({ id }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add Location
      </Button>

      <ModalComponent
        characterid={id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default AddLocationModal;
