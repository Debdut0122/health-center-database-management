import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import Details from '../components/Details';
// import Page from "../components/Page";

const Home = () => {
    
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`api/data?page=${page}`);
            const json = await response.json();
            if (response.ok) {
                setData(json);
            }
        }

        fetchData();
    }, [page]);

    const handleLeftButtonClick = () => {
        if(page>1)
        setPage(page - 1);
    }

    const handleRightButtonClick = () => {
        setPage(page + 1);
    }

    return (
        <div>
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
                    {data.map((d) => (
                        <Details key={d._id} data={d} />
                    ))}
                </tbody>
            </table>
            <div className="page-counter">
                <button onClick={handleLeftButtonClick}>Prev</button>
                <p>{page}</p>
                <button onClick={handleRightButtonClick}>Next</button>
            </div>
        </div>
    );
}

export default Home;
