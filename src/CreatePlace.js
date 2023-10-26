import React, { useState } from 'react'

const CreatePlace = ({ places, setPlaces })=>{
    const [newplace, setNewplace] = useState('')
    const [open, setOpen] = useState(false)
    const save = async(ev) => {
      ev.preventDefault()
      const response = await axios.post('/api/places', {name: newplace})
      setPlaces([...places, response.data])
      setNewplace('')
    }

    return (<>
      {
        open ?
        <div className='createplace'>
        <form onSubmit={(ev)=>save(ev)}>
          <label htmlFor='place'>Place</label>
          <input type='text' onChange={(ev)=>setNewplace(ev.target.value)} value={newplace}/>
          <button disabled={!newplace}>Create Place</button>
          <button onClick={()=>setOpen(!open)}>Cancel</button>
        </form>
        </div>
      : <button onClick={()=>setOpen(!open)}>New Place Form</button>
      }

    </>)
  }
  export default CreatePlace