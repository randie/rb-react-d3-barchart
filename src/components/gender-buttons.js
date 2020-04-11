import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

export default ({ onGenderSelected }) => (
  <ButtonGroup aria-label="Basic example">
    <Button variant="primary" onClick={() => onGenderSelected('men')}>
      Men
    </Button>
    <Button variant="primary" onClick={() => onGenderSelected('women')}>
      Women
    </Button>
  </ButtonGroup>
);
