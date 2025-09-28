import { Component } from "react";
import debounce from "lodash.debounce";
import './GifList.scss'

export class GifList extends Component {
    state = {
        suitableGifs: []
    }

    constructor(props) {
        super(props);
        this.debouncedSearch = debounce(this.search, 500);
    }


    componentDidUpdate(prevProps) {
        if (prevProps.searchTerm !== this.props.searchTerm && this.props.searchTerm.trim() !== "") {
            this.debouncedSearch(this.props.searchTerm);
        }
    }
    search = (gif) => {
        const key = 'WsgYAy3OcFxLXshKqQFdSd00InghV7tD';
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${gif}&limit=10`)
            .then(data => data.json())
            .then(data => {
                this.setState({ suitableGifs: data.data });
            }).catch((error) => {
                console.error("Error fetching gifs:", error);
            });
    };
    componentWillUnmount() {
        this.debouncedSearch.cancel();
    }

    render() {
        return <ul className="gif-list">
            {this.state.suitableGifs.map(gif => (
                <li className="gif-item" key={gif.id}>
                    <img className="gif" src={gif.images.fixed_height.url} alt={gif.title} />
                </li>
            ))}
        </ul>

    }
}