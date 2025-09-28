import { Component } from "react";
import './GifSearch.scss'

export class GifSearch extends Component {
    state = {
        gifToSearch: ''
    }

    handleChange = (e) => {
        this.setState({ gifToSearch: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.searchGif(this.state.gifToSearch);
    };

    render() {
        return <>
            <h1 className="title">Введіть назву гіфки</h1>
            <form className="form" onSubmit={this.handleSubmit}>
                <label htmlFor="gif-input" className="input-wrapper">
                    <input
                        type="text"
                        id="gif-input"
                        placeholder=" "
                        className="styled-input"
                        value={this.state.searchTerm}
                        onChange={this.handleChange}
                    />
                    <span className="input-label">Назва гіфки</span>
                </label>
                <button className="button-search" type="submit">Search</button>
            </form>
        </>
    }
}