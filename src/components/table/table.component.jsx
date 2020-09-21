import React, { useContext, Fragment, useState } from 'react';
import { UserContext } from "../../contexts/UserContext";
import { Table } from 'react-bootstrap';
import Overlay from '../button/overlay.component';
import Spinner from '../spinner/spinner.component';

const UserTable = ({ style }) => {
    const { data, isLoading } = useContext(UserContext);
    const [sort, setSort] = useState([]);

    const onSort = (event, sortKey) => {
        const sortData = data;
        sortData.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
        setSort({sortData})
      }

    const sortInt = (event, sortKey) => {
        const sortData = data;
        sortData.sort((a, b) => a[sortKey] - b[sortKey]);
        setSort({sortData});
    }

    const render = isLoading ? <Spinner /> 
        : <Table striped bordered size="sm" style={style}>
            <thead>
                <tr>
                <Overlay>
                    <th style={{ onHover: '' }} onClick={e => onSort(e, 'name')}>Name</th>
                </Overlay>
                <Overlay>
                    <th onClick={e => onSort(e, 'tech')}>Technology</th>
                </Overlay>
                <Overlay>
                    <th onClick={e => sortInt(e, 'years')}>Age</th>
                </Overlay>
                </tr>
            </thead>
            <tbody>
                {data.map((x, index) => (
                    <tr key={index}>
                        <Fragment>
                            <td>{x.name}</td>
                            <td>{x.tech}</td>
                            <td>{x.years}</td>
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