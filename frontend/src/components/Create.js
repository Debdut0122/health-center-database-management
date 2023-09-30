import { useState } from "react";
// import { useHistory } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("Name");
  const [age, setAge] = useState(18);
  const [email, setEmail] = useState("xyz@iitj.ac.in");
  const [sex, setSex] = useState("Male");
  const [phone, setPhone] = useState("xyz");
  const [description, setDescription] = useState("Description");

  const [isPending, setIsPending] = useState(false);
  // const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const data = { name, age, sex, email, phone, description};
    // Send the POST request and handle the response asynchronously
fetch('/api/data', {
  method: 'POST',
  body: JSON.stringify(data),
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
    setIsPending(false);
    alert("Data Added Successfully!")
    console.log('Received JSON data:', json);
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });
  };
  return (
    

    <div className="create">
      <h2>Add New Data</h2>
      <form onSubmit={handleSubmit}>
        
        <label>Name:</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        

        <label>Age:</label>
        <input
          type="text"
          required
          value={age}
          onChange={(e) => setAge(e.target.value)}
        ></input>



        <label>Sex:</label>
        <select
          required
          value={sex}
          onChange={(e) => setSex(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        


        <label>Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>



        <label>Phone:</label>
        <input
          type="text"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></input>



        <label>Description:</label>
        <textarea
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        >
          Description
        </textarea>
        
        
        {!isPending && <button>Add Data</button>}
        {isPending && <button disabled>Adding Data...</button>}
        

      </form>

      {/* <p>{name}</p> */}
      </div>
    
  );
};

export default Create;