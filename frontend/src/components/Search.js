import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Details from './Details';
const Search = () => {

    const nav = useNavigate();
    const [searchTerm,setSearchTerm] = useState("");
    const [data,setData] = useState(null);
    const handleSubmit = async (e)=>{
      e.preventDefault();
      // console.log(searchTerm)
      fetch('/api/data/search', {
        method: 'POST',
        body: JSON.stringify({searchTerm}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          console.log(response)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Parse the response as JSON
          return response.json();
        })
        .then((json) => {
          // Handle the JSON data here
          // setIsPending(false);
          // alert("Data Added Successfully!")
          // console.log('Received JSON data:', json);
          setData(json);
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error('Fetch error:', error);
        });
        // const response = await fetch(`api/data/search?input=${searchTerm}`)
        // const json = await response.json();
        // if(!json.ok){
        //     console.log(json);
        // }else{
        //     console.log('Done!')
        //     nav('/create');
        // }
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className='create search'>
            <input
              type="text"
              required
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <button>Search</button>
        </form>
  
  <table className="table-main">
    <thead >
        <tr className="table-header">
            <th >Name</th>
            <th >Age</th>
            <th >Sex</th>
            <th >Phone</th>
            <th >Email</th>
            <th >Description</th>
            <th >Last Update</th>
            <th >Edit</th>
            <th >Delete</th>
        </tr>
    </thead>
    <tbody>
        {data && data.map((d) => (
            <Details key={d._id} data={d} />
        ))}
    </tbody>
</table>
</div>
  )
}

export default Search