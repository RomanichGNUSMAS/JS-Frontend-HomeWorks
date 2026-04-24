export default function Input ({value,setPerson,hint}) {
    return (
        <input 
            type="text"
            value={value}    
            onChange={e => {
                switch(hint) {
                    case 'name' :
                        return setPerson(prev => ({...prev,name:e.target.value}))
                    case 'age' :
                        return setPerson(prev => ({...prev,age:e.target.value}))
                }
            }}
        />
    )
}

