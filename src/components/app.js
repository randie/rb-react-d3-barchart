import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Chart from './chart';
import '../styles/app.css'; // TODO: remove
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <React.StrictMode>
      <Navbar bg="light">
        <Navbar.Brand>Barchart</Navbar.Brand>
      </Navbar>
      <Container>
        <Chart />
      </Container>
    </React.StrictMode>
  );
}

export default App;
