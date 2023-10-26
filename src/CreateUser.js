import React, { useState } from 'react'


const CreateUser = ({ users, setUsers })=>{
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)

    const save = async(ev) => {
      ev.preventDefault()
      const response = await axios.post('/api/users', {name})
      console.log(response.data)
      setUsers([...users, response.data])
      setName('')
    }

    return (<>
      { open ?
          <form onSubmit={ save }>
            <label htmlFor='name'>Name</label>
            <input id='name' type='text' onChange={(ev)=>setName(ev.target.value)} value={name}/>
            <button disabled={!name}>Create User</button>
            <button onClick={()=>setOpen(!open)}>Cancel</button>
          </form>
      : <button onClick={()=>setOpen(!open)}>New User Form</button> }
    </>)
  }
  export default CreateUser