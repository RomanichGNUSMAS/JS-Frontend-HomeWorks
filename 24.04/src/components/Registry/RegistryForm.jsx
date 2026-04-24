import Input from "../InputTag/Input";

export default function RegistryForm({ createUserHandler, person, setPerson }) {
    return (
        <div className='Registry'>
            <form onSubmit={createUserHandler}>
                <Input
                    value={person.name}
                    setPerson={setPerson}
                    hint={"name"}
                />
                <Input
                    hint={"age"}
                    value={person.age}
                    setPerson={setPerson}
                />
                <button>Save</button>
            </form>
        </div>
    )
}