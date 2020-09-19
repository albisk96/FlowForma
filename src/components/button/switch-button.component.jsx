import React, {useContext} from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Button } from 'react-bootstrap';

const SwitchButton = () => {
    const { matrix, toggleTheme } = useContext(UserContext);
    const render = ( matrix ?
        <Button variant="outline-success" onClick={toggleTheme}>Normal</Button> :
        <Button variant="outline-secondary" onClick={toggleTheme}>Matrix</Button> )
      
    return(
        <div>{render}</div>
    )
}

export default SwitchButton;