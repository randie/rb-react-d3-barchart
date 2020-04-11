import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GenderButtons from './gender-buttons';
import Chart from './chart';

import '../styles/app.css'; // TODO: remove

function App() {
  const [gender, setGender] = useState('men');

  const handleGenderSelected = genderSelected => setGender(genderSelected);

  return (
    <React.StrictMode>
      <Navbar bg="light">
        <Navbar.Brand>Barchart</Navbar.Brand>
      </Navbar>
      <Container>
        <p>gender: {gender}</p>
        <Row>
          <Col xs={12}>
            <GenderButtons onGenderSelected={handleGenderSelected} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Chart />
          </Col>
        </Row>
      </Container>
    </React.StrictMode>
  );
}

export default App;
