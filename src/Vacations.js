import React from 'react'


const Vacations = ({ vacations, places, cancelVacation, users })=> {
    let mostPopId = 0
    const VacaObj = vacations.reduce((acc, curr)=>{
      if(acc[curr.place_id] === undefined){ acc[curr.place_id] = 0; }
      acc[curr.place_id]++
      return acc
    }, {})
    for(let [key, val] of Object.entries(VacaObj)){
      if(val > mostPopId){
        mostPopId = key
      }
    }
    const place = places.find(place=>place.id === mostPopId*1)
    return (
      <div>
        { place ? <h3>Most Popular Place: { place.name }</h3> : null}
        <h2>Vacations ({ vacations.length })</h2>
        <ul>
          {
            vacations.map( vacation => {
              const place = places.find(place => place.id === vacation.place_id);
              const user = users.find(user=>user.id === vacation.user_id)
              // console.log(user)
              return (
                <li key={ vacation.id }>
                  { new Date(vacation.created_at).toLocaleString() }
                  <div>
                    To: { place && user ?
                    <>
                      {place.name}
                      <div>With: {user.name}</div>
                      <div>Notes: { vacation.note }</div>
                    </>
                    : '' }
                  </div>
                  <button onClick={()=> cancelVacation(vacation)}>Cancel</button>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  };
  export default Vacations