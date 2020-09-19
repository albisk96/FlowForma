import React, {useContext} from 'react';
import { UserContext } from "../../contexts/UserContext";
import UserTable from '../table/table.component';
import SwitchButton from '../button/switch-button.component';

const LandingPage = () => {
    const { matrix } = useContext(UserContext);

    const landingStyle = matrix ? {
        background: 'black', 
        color: 'lime',
        height: '100vh',
        overflow: 'hidden'
    } :  {
        background: '', 
        color: 'black',
        height: '100vh',
        overflow: 'hidden'
    }

    const tableStyle = matrix ? {
        background: 'black', 
        color: 'lime'
    } :  {
        background: 'white', 
        color: 'black'
    }

    return(
    <div style={landingStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 25px'}}>
            <h2>Users Table</h2>
            <SwitchButton />
        </div>
        <div className="container" style={landingStyle}>
          <UserTable style={tableStyle} />
        </div>
    </div>
    )
}

export default LandingPage;