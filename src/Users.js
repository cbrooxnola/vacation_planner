import React from 'react';


const Users = ({ users, vacations })=> {
    return (
      <div>
        <h2>Users ({ users.length })</h2>
        <ul>
          {
            users.map( user => {
              return (
                <li key={ user.id }>
                  { user.name }
                  ({ vacations.filter(vacation => vacation.user_id === user.id).length })
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  };
  export default Users