import UserTableBody from "./UserTableBody"
import UserTableHead from "./UserTableHead"

export default function UserList({persons = {},onDel}) {
    return (
        <div className='table'>
        <table>
          <UserTableHead />
          <UserTableBody
            onDel={onDel}
            persons={persons}
            />
        </table>
      </div>
    )
}