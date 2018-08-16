import React, {Component} from 'react';
import PlacesAutoComplete from 'react-places-autocomplete';
import './SearchModal.css';
import {GithubPicker} from 'react-color';

class SearchModal extends Component {
    state = {
        address: ''
    }
    handleLocationTextChange = (address) => this.setState({address})
    render() {
        const { handleLocationSelection, searchModalOpened, toggleSearchModal, changeThemeColor } = this.props
        const { address } = this.state
        let searchModalclass = searchModalOpened ? "search-modal search-modal-opened" : "search-modal search-modal-closed" 
        return (
            <div className={searchModalclass}>
                <button className="close" onClick={toggleSearchModal}>X</button>
                <div className="search-form">
                <p className="h4">Select a City</p>
                <PlacesAutoComplete
                    value={address}
                    onChange={this.handleLocationTextChange}
                    onSelect={handleLocationSelection}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className="search-form-container">
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
                </div>
                <div className="color-picker">
                    <p className="h4">Theme</p>
                    <GithubPicker onChangeComplete={changeThemeColor}/>
                </div>
        </div>
        )
    }
}
export default SearchModal;