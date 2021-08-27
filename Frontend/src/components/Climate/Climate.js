import React, {useState} from 'react';

const Climate = () => {
    const [climate, setClimate] = useState()
    const [countries, setCountries] = useState([])

    const getCountries = async() => {
        const url = '/getCountriesBasedOnClimate'
        const param = { val: climate }
        const response = await fetch(`http://localhost:3000${url}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        });
        const data = await response.json();
        console.log(data)

        for(let i = 0; i < data.length; i++) {
            setCountries(countries.push(data[i].name))
        }

        return countries
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(`submitted: ${climate}`)

        setCountries(await getCountries())
    }

    const handleChange = (e) => {
        setClimate(e.target.value)
    }
    
    return (
        <div>
            <h1>Climate</h1>
            <div>What kind of climate do you prefer?</div>
            <form onSubmit={handleSubmit}>
                <select name="climate" onChange={handleChange}>
                    <option value="select">Select</option>
                    <option value="tropical">Tropical</option>
                    <option value="dry">Dry</option>
                    <option value="temperate">Temperate</option>
                    <option value="continental">Continental</option>
                    <option value="polar">Polar</option>
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
 
export default Climate;