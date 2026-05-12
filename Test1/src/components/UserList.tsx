import React from "react";
import { Grid } from "./Grid";
import { Table } from "./Table";

export const UserList:React.FC = function () {
    const [mode,changeMode] = React.useState('');
    return (
        <div>
            <button onClick={() => changeMode('table')}>to table</button>
            <button onClick={() => changeMode('grid')}>to grid</button>
            {
                mode === 'grid' ? 
                <Grid /> :
                mode === 'table' ? <Table />
                : <p style={{fontFamily:'Cascadia Code',fontSize:'15px'}}>not set</p>
            }
        </div>
    )
}