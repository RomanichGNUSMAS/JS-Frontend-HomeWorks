import React from "react";
import { DataContext } from "../types/contextType";

export const Table: React.FC = function () {
    const { users, onDel, salaryDown, salaryUp } = React.useContext(DataContext);

    return users.length ? (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Salary</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {   
                    users.map(user =>
                        <tr key={user.id}>
                            <td>
                                {user.name}
                            </td>
                            <td>
                                {user.age}
                            </td>
                            <td>
                                {user.salary}
                            </td>
                            <td>
                                <button onClick={() => onDel(user.id)}>Del</button>
                                <button onClick={() => salaryUp(user.id)}>UP</button>
                                <button onClick={() => salaryDown(user.id)}>DOWN</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    ) : <p style={{fontFamily:'Cascadia Code',fontSize:'20px'}}>No Users</p>
}