import { useMemo, useState } from 'react';
import AutocompleteInput from '../../components/Autocomplete/Autocomplete';
import './CitySearch.scss';
//import citiesJson from './DataSource/cities_short.json';
import { ICity } from './DataSource/CitiesApiSuggestionsDataSource.types';
import CitiesApiSuggestionsDataSource from './DataSource/CitiesApiSuggestionsDataSource';

export type City = {
    name: string,
    lat: string,
    lng: string,
    country: string,
    admin1: string,
    admin2: string,
}

const CitySearchPage = () => {
    //const cities = (citiesJson as object[]).map(c => c as City);
    const [strictMode, setStrictMode] = useState(false);
    const [loadWhenLessThan3, setLoadWhenEmptyMode] = useState(true);
    const [autocompleteValue, setAutocomplateValue] = useState('');
    const [chosenCityName, setChosenCityName] = useState<string | null>('');

    const citiesDataSource = useMemo(() => new CitiesApiSuggestionsDataSource(), []);

    return <div className="city-search-container">
        <h2>Let's choose next city for a trip :)</h2>
        <div className="city-search-configuration">
            <label>
                <input type="checkbox" checked={strictMode} onChange={() => setStrictMode(!strictMode)} />
                Strict mode
            </label>
            <label>
                <input type="checkbox" checked={loadWhenLessThan3} onChange={() => setLoadWhenEmptyMode(!loadWhenLessThan3)} />
                Load when less than 3 symbols
            </label>
        </div>
        <div className="city-search-search-form">
            <AutocompleteInput<ICity>
                placeholder="Start typing city name here"
                initialValue={autocompleteValue}
                suggestionsSource={citiesDataSource}
                loadSuggestionsAfterLength={!loadWhenLessThan3 ? 3 : 0}
                isStrictMode={strictMode} 
                onValueChanged={(value) => setAutocomplateValue(value)} />
            <input type="submit" value="Choose" onClick={() => setChosenCityName(autocompleteValue)} />
        </div>
        <div className="city-search-result">
            <h1>{chosenCityName ? `🏙️ ${chosenCityName}` : "No city chosen 😢"}</h1>
        </div>
    </div>;
}

export default CitySearchPage;
