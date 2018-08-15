import React, {Component} from 'react';
import PlacesAutoComplete from 'react-places-autocomplete';

class SearchModal extends Component {
    state = {
        address: ''
    }
    handleLocationTextChange = (address) => this.setState({address})
    render() {
        const { handleLocationSelection } = this.props
        const { address } = this.state
        return (
        <PlacesAutoComplete
            value={address}
            onChange={this.handleLocationTextChange}
            onSelect={handleLocationSelection}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <input
                {...getInputProps({
                    placeholder: 'Search Location ...',
                    className: 'location-search-input',
                })}
                />
                <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                    const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                    // call fetchForecast onClick for each element
                    const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                    <div
                        {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                        })}
                    >
                        <span>{suggestion.description}</span>
                    </div>
                    );
                })}
                </div>
            </div>
            )}
        </PlacesAutoComplete>
        )
    }
}
export default SearchModal;