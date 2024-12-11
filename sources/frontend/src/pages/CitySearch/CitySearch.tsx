import AutocompleteInput from '../../components/Autocomplete/Autocomplete';
import './CitySearch.scss';
import citiesJson from './cities_short.json';

export type City = {
    name: string,
    lat: string,
    lng: string,
    country: string,
    admin1: string,
    admin2: string,
}

const CitySearchPage = () => {
    const cities = citiesJson.map(c => c as City);

    return <div className="name-search-container">
        <h2>Let's choose next city for a trip :)</h2>
        <div className="configuration">
            
        </div>
        <div className="name-search-form">
            <form>
                <AutocompleteInput suggestionsSource={cities.map(c => c.name)} />
                <input type="submit" value="Save for a trip!" />
            </form>
        </div>
    </div>;
}

export default CitySearchPage;
