import React, {useState} from 'react';

const Budget = () => {
    const [costs, setCosts] = useState();
    const [countries, setCountries] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(`submitted ${costs}`)

        setCountries(await getCountries())
    }

    const getCountries = async () => {
        const url = '/getCountriesBasedOnBudget';
        const param = {val: costs};
        const setting = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        }

        const response = await fetch(`http://localhost:3000${url}`, setting);
        const data = await response.json();

        for(let i = 0; i < data.length; i++) {
            setCountries(countries.push(data[i].name))
        }
        
        return countries
    }

    const handleChange = (e) => {
        setCosts(e.target.value)
    }

    return (
        <div>
            <h1>Budget</h1>
            <p>Cost of living</p>
            <form onSubmit={handleSubmit}>
                <select onChange={handleChange}>
                    <option value="select">Select</option>
                    <option value="expensive">Expensive</option>
                    <option value="middle">Middle</option>
                    <option value="cheap">Cheap</option>
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
 
export default Budget;