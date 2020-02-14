import React, { useState } from 'react';


const Form = ({searchData}) => {
    //search = state, saveSearch = this.setState
    const [search,setSearch] = useState({
        city: "",
        country: ""
    })
    const handleChange = e => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    } 

    const searchWeather = e => {
        e.preventDefault();
        searchData(search)
    }
    // console.log(searh)
    return(
        <form onSubmit={searchWeather}>
            <div className="input-field">
                <input 
                    type="text"
                    name="city"
                    id="city"
                    onChange={handleChange}
                />
                <label htmlFor="city">City: </label>
            </div>
            <div className="select-country">
                <select
                    onChange={handleChange}
                    name="country"
                    >
                        <option value="">Select a country</option>
                        <option value="US">United States</option>
                        <option value="MX">México</option>
                        <option value="AR">Argentina</option>
                        <option value="CO">Colombia</option>
                        <option value="CR">Costa Rica</option>
                        <option value="ES">España</option>
                        <option value="PE">Perú</option>
                    </select>
                    <button>Search Climate</button>
            </div>
        </form>
    )
}

export default Form