export default function UserTableBody({persons,onDel}) {
    return (
        <tbody>
            {
              persons.map((person) => {
                return (
                  <tr key={person.id}>
                    <td>{person.name}</td>
                    <td>{person.age}</td>
                    <td>{person.id}</td>
                    <td><button onClick={() => onDel(person.id)}>delete</button></td>
                  </tr>
                )
              })
            }
          </tbody>
    )
}