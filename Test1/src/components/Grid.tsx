import React from "react"
import { DataContext } from "../types/contextType"

export const Grid:React.FC = function() {
    const { users,onDel,salaryUp,salaryDown } = React.useContext(DataContext);

    return (
        <div>
            {
                users.length ? 
                users.map(user => 
                    <div key={user.id}>
                        <img width={100} src="https://static.vecteezy.com/system/resources/thumbnails/022/014/184/small/user-icon-member-login-isolated-vector.jpg" alt="image" />
                        <h3>{user.name}</h3>
                        <p>{user.age}</p>
                        <p>{user.salary}</p>
                        <button onClick={() => salaryUp(user.id)}>Salary Up</button>
                        <button onClick={() => salaryDown(user.id)}>Salary Down</button>
                        <button onClick={() => onDel(user.id)}>Delete</button>
                    </div>
                ) :
                <p style={{fontFamily:'Cascadia Code',fontSize:'20px'}}>No Users</p>
            }
        </div>
    )
}