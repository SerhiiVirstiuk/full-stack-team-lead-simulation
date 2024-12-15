import { useMemo, useState } from 'react';
import AutocompleteInput from '../../components/Autocomplete/Autocomplete';
import './CitySearch.scss';
//import citiesJson from './DataSource/cities_short.json';
import { ICity } from './DataSource/CitiesApiSuggestionsDataSource.types';
import CitiesApiSuggestionsDataSource from './DataSource/CitiesApiSuggestionsDataSource';
import StringSuggestionItem from '../../components/Autocomplete/Suggestions/Items/StringSuggestionItem';
import { SuggestionItemProps } from '../../components/Autocomplete/Suggestions/Items/SuggestionItem.types';

// export type City = {
//     name: string,
//     lat: string,
//     lng: string,
//     country: string,
//     admin1: string,
//     admin2: string,
// }

const CITY_SUGGESTION_ITEM_HEIGHT = 70;
const CitySuggestionItem = (props: SuggestionItemProps<ICity>) =>
    <div className='city-suggestion-item' style={{height: CITY_SUGGESTION_ITEM_HEIGHT + 'px'}}>
        <StringSuggestionItem className='city-suggestion-item-header' value={props.value.value} searchValue={props.searchValue}  />
        <div className='city-suggestion-item-info'>
            <span>Country code: {props.value.country ?? 'Unknown'}</span>
            <span>Latitude: {props.value.lat ?? 'Unknown'}</span>
            <span>Longtitude: {props.value.lng ?? 'Unknown'}</span>
        </div>
    </div>;

const CitySearchPage = () => {
    //const cities = (citiesJson as object[]).map(c => c as City);
    const [strictMode, setStrictMode] = useState(false);
    const [loadWhenLessThan3, setLoadWhenEmptyMode] = useState(true);
    const [autocompleteValue, setAutocompleteValue] = useState('');
    const [chosenCityName, setChosenCityName] = useState<string | null>('');

    const citiesDataSource = useMemo(() => new CitiesApiSuggestionsDataSource(), []);

    return <div className="city-search-container">
        <h2>Let's choose next city for a trip :)</h2>
        <div className="city-search-configuration">
            <label>
                <input type="checkbox" checked={strictMode} onChange={() => setStrictMode(mode => !mode)} />
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
                suggestionItemHeight={70}
                suggestionItemTemplate={(props) => <CitySuggestionItem {...props} />}
                loadSuggestionsAfterLength={!loadWhenLessThan3 ? 3 : 0}
                isStrictMode={strictMode} 
                onValueChanged={(value) => setAutocompleteValue(value)} />
            <input type="submit" value="Choose" onClick={() => setChosenCityName(autocompleteValue)} />
        </div>
        <div className="city-search-result">
            <h1>{chosenCityName ? `🏙️ ${chosenCityName}` : "No city chosen 😢"}</h1>
        </div>
    </div>;
}

export default CitySearchPage;
