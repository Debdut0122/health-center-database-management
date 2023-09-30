import React from 'react';
import { useNavigate } from 'react-router-dom';
const DataDetails = ({ data }) => {
    const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await fetch('/api/data/' + data._id, {
      method: 'DELETE',
    });
    // const json = await response.json();

    if (response.ok) {
        window.location.reload()
    }
  };
  const handleEdit = async () => {
    navigate('/update/'+data._id);
  };

  return (
    <tr className="table-content">
      <th>{data.name}</th>
      <th>{data.age}</th>
      <th>{data.sex}</th>
      <th>{data.phone}</th>
      <th>{data.email}</th>
      <th>{data.description}</th>
      <th>{data.updatedAt}</th>
      <button className="material-icons edit" onClick={handleEdit}>
    edit
    </button>
      <button className="material-icons delete" onClick={handleDelete}>
        delete
      </button>
    </tr>
  );
};

export default DataDetails;
