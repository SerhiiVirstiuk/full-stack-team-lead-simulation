import { ISuggestion } from "../../../components/Autocomplete/Autocomplete.types";

export interface ICity extends ISuggestion {
    lat: string | null,
    lng: string | null,
    country: string | null
}