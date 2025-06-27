import { useState } from 'react';
import '../components/searchbar.css'

function SearchBar({ onSearch }) {

    const [city, setCity] = useState([])

    const handleSearch = (e) => {
        e.preventDefault();
        if (city.trim() !== "") {
            onSearch(city);
        }
    };
    return (
        <>
            <form className='search-bar' onSubmit={handleSearch}>
                <input
                    onChange={(event) => {
                        setCity(event.target.value);
                        console.log(event.target.value);
                    }}
                    value={city}
                    type="text"
                    placeholder='Search by country name...'
                />
                <button type='submit'>Search</button>
            </form>

        </>
    )
}

export default SearchBar