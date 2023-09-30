import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const Update = () => {
    var {id}= useParams();
    console.log("data",id);
    const [curr,setCurr] = useState({});
    useEffect(() => {
        fetch("/api/data/" + id, {
          method: "GET",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            // Parse the response as JSON
            return response.json();
          })
          .then((json) => {
            setCurr(json);
            setName(json.name || "");
            setAge(json.age || "");
            setEmail(json.email || "");
            setSex(json.sex || "");
            setPhone(json.phone || "");
            setDescription(json.description || "");
            console.log("curr:", curr);
          })
          .catch((err) => {
            console.error(err);
          });
      }, []);
    // console.log("name",curr['name'])
    const [name, setName] = useState(curr['name']);
  const [age, setAge] = useState(curr['age']);
  const [email, setEmail] = useState(curr['email']);
  const [sex, setSex] = useState(curr['sex']);
  const [phone, setPhone] = useState(curr['phone']);
  const [description, setDescription] = useState(curr["description"]);

  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const data = { name, age, sex, email, phone, description};
    fetch('/api/data/'+id, {
    method: 'PATCH',
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
        return response.json();
    })
    .then((json) => {
        setIsPending(false);
        alert("Data Updated Successfully!")
        console.log('Received JSON data:', json);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });
  };
  return ( 

    <div className="create">
      <h2>Update Data</h2>
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

        {!isPending && <button >Update</button>}
        {isPending && <button disabled>Updating Data...</button>}
      </form>
      </div>
    
  );
};

export default Update;