import React, {useState} from 'react';

const Activities = () => {
    const [activities, setActivities] = useState();
    const [countries, setCountries] = useState([]);

    const getCountries = async () => {
        const url = '/getCountriesBasedOnActivities';
        const param = { val: activities };

        const response = await fetch(`http://localhost:3000${url}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        })
        const data = await response.json();
        
        for(let i = 0; i < data.length; i++) {
            setCountries(countries.push(data[i].name))
        }

        return countries
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`submitted ${activities}`);

        setCountries(await getCountries()) 
    }

    const handleChange = (e) => {
        setActivities(e.target.value)
    }
    return (
        <div>
            <h1>Activities</h1>
            <p>What type of activities do you want to do?</p>
            <form onSubmit={handleSubmit}>
                <select onChange={handleChange}>
                    <option value="select">Select</option>
                    <option value="Safari">Safari</option>
                    <option value="Mountain sports">Mountain sports</option>
                    <option value="Water sports">Water sports</option>
                    <option value="Winter sports">Winter sports</option>
                    <option value="Historical sites">Historical sites</option>
                </select>
                <input type="submit" value="Submit"></input>
            </form>
            <div>
                <ul>
                    {countries.length > 0 ? 
                    countries.map((data) => {
                    return <li key={Math.random()}>{data}</li>
                    })
                    : <div>Loading...</div>}
                </ul>
            </div>
        </div>
    );
}
 
export default Activities;