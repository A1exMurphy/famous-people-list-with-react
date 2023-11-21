import React, { useState, useEffect } from 'react';
import './FamousSection.css';
import axios from 'axios';


function FamousSection() {
  useEffect(() => {
    fetchPeople()
  }, [])
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);

  // TODO: on load, call the fetchPeople() function

  const fetchPeople = () => {
    // TODO: fetch the list of people from the server
    axios({
      method: "GET",
      url: "/people"
    }).then((response) => {
      setPeopleArray(response.data)
    })
      .catch((error) => {
        console.log('error in GET reqeust', error);
      })

    
  }

  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);
    
    // TODO: create POST request to add this new person to the database
    axios({
      method: 'POST',
      url: "/people",
      data: {
      name:famousPersonName,
      role: famousPersonRole
  }
    }).then((response) => {
      fetchPeople()
      setPersonName('')
      setPersonRole('')
    })
    // HINT: the server is expecting a person object 
    //       with a `name` and a `role` property

  }

    return (
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input id="name-input" onChange={e => setPersonName(e.target.value)} value={famousPersonName}/>
          <label htmlFor="role-input">Famous for:</label>
          <input id="role-input" onChange={e => setPersonRole(e.target.value)} value={famousPersonRole} />
          <button type="submit">Done</button>
        </form>
        <ul>
          {
            famousPeopleArray.map((people) => {
              return<li key={people.id}> {people.name} is famous for {people.role}</li>
            })
          }
        </ul>
        <ul>
          {/* TODO: Render the list of famous people */}
        </ul>
      </section>
    );
}

export default FamousSection;
