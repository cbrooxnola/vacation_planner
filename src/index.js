import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import VacationForm from './VacationForm';
import CreateUser from './CreateUser';
import Vacations from './Vacations';
import Users from './Users';
import Places from './Places';
import CreatePlace from './CreatePlace';


const App = ()=> {
  const [users, setUsers] = useState([]);
  const [vacations, setVacations] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(()=> {
    const fetchData = async()=> {
      const response = await axios.get('/api/vacations');
      setVacations(response.data);
    }
    fetchData();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      const response = await axios.get('/api/places');
      setPlaces(response.data);
    }
    fetchData();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    }
    fetchData();
  }, []);

  const bookVacation = async(vacation)=> {
    const response = await axios.post('/api/vacations', vacation);
    setVacations([...vacations, response.data]);
  }

  const cancelVacation = async(vacation)=> {
    await axios.delete(`/api/vacations/${vacation.id}`);
    setVacations(vacations.filter(_vacation => _vacation.id !== vacation.id));
  }

  return (
    <div>
      <h1>Vacation Planner</h1>
      <VacationForm places={ places } users={ users } bookVacation={ bookVacation }/>
      <CreateUser setUsers={setUsers} users={users}/>
      <CreatePlace setPlaces={setPlaces} places={places} />
      <main>
        <Vacations
          vacations={ vacations }
          places={ places }
          cancelVacation={ cancelVacation }
          users={ users }
        />
        <Users users={ users } vacations={ vacations }/>
        <Places places={ places } vacations={ vacations }/>
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
