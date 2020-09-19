import React, { useContext, Fragment, useState } from 'react';
import { UserContext } from "../../contexts/UserContext";
import { Table } from 'react-bootstrap';
import Overlay from '../button/overlay.component';
import Spinner from '../spinner/spinner.component';
import moment from 'moment';

const UserTable = ({ style }) => {
    const { data, isLoading, date } = useContext(UserContext);
    const [sort, setSort] = useState([]);
    const dataLen = date.length

    const onSort = (event, sortKey) => {
        const sortData = data;
        sortData.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
        setSort({sortData})
      }

    const render = isLoading || dataLen === 0 ? <Spinner /> 
    : <Table striped bordered hover size="sm" style={style}>
        <thead>
            <tr>
            <Overlay>
                <th style={{ onHover: '' }} onClick={e => onSort(e, 'name')}>Name</th>
            </Overlay>
            <Overlay>
                <th onClick={e => onSort(e, 'tech')}>Technology</th>
            </Overlay>
            <th>Age</th>
            </tr>
        </thead>
        <tbody>
            {data.map((x, index) => (
                <tr key={index}>
                    <Fragment>
                        <td>{x.name}</td>
                        <td>{x.tech}</td>
                        <td>{x.year}</td>
                    </Fragment>
                </tr>
            ))}
        </tbody>
        </Table>

    return (
        <div>{render}</div>
    )
  }

  export default UserTable;