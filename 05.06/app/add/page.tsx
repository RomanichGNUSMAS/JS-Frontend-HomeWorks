import Link from "next/link";

export default function AddUser() {
    const [form,setForm] = React.useState<

   return (
    <div>
        <Link href={'/'}>back to Home</Link>
        <form>
            <label>Name</label>
            <input 
                name="name"
                placeholder="Valod"
            />
            <label>Surname</label>
            <input type="text"
                name="surname"
                placeholder="Hovsepyan"
            />
            <label>Salary</label>
            <input 
                type="number"
                name="salary"
            />
        </form>
        
    </div>
   ) 
}