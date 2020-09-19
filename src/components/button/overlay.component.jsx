import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Overlay = props => (
    <OverlayTrigger
    key="top"
    placement="top"
    overlay={
      <Tooltip id='tooltip-top'>
       Try to sort!
      </Tooltip>
    }
  >
  {props.children}
  </OverlayTrigger>
)

export default Overlay;