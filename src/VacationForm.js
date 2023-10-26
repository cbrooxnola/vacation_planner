import React, { useState } from "react";

const VacationForm = ({ places, users, bookVacation })=> {
    const [placeId, setPlaceId] = useState('');
    const [userId, setUserId] = useState('');
    const [note, setNote] = useState('');
    const [open, setOpen] = useState(false)

    const save = (ev)=> {
      ev.preventDefault();
      const vacation = {
        user_id: userId,
        place_id: placeId,
        note
      };
      bookVacation(vacation);
      setPlaceId('')
      setUserId('')
      setNote('')
    }
    return (<>
    {
      open ?
      <form onSubmit={ save }>
        <select value={ userId } onChange={ ev => setUserId(ev.target.value)}>
          <option value=''>-- choose a user --</option>
          {
            users.map( user => {
              return (
                <option key={ user.id } value={ user.id }>{ user.name }</option>
              );
            })
          }
        </select>
        <select value={ placeId } onChange={ ev => setPlaceId(ev.target.value)}>
          <option value=''>-- choose a place --</option>
          {
            places.map( place => {
              return (
                <option key={ place.id } value={ place.id }>{ place.name }</option>
              );
            })
          }
        </select>
        <label htmlFor='note'>
          Enter Vacation Notes*
        </label>
        <input id='note' type='text' value={note} onChange={(ev)=>setNote(ev.target.value)} />
        <button disabled={ !placeId || !userId || !note }>Book Vacation</button>
        <button onClick={()=>setOpen(!open)}>Cancel</button>
      </form>
      : <button onClick={()=>setOpen(!open)}>Plan A Vacation!</button>
    }

    </>);
  }
  export default VacationForm