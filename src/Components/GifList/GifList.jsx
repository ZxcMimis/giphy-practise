import { Component } from "react";
import debounce from "lodash.debounce";
import './GifList.scss'

export class GifList extends Component {
    state = {
        suitableGifs: [],
        page: 0,
        loading: false
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

    search = (gif, loadMore = false) => {
        const key = 'WsgYAy3OcFxLXshKqQFdSd00InghV7tD';
        const { page } = this.state;
        const limit = 10;
        const offset = loadMore ? (page + 1) * limit : 0;

        this.setState({ loading: true });

        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${gif}&limit=${limit}&offset=${offset}`)
            .then(data => data.json())
            .then(data => {
                this.setState(prevState => ({
                    suitableGifs: loadMore ? [...prevState.suitableGifs, ...data.data] : data.data,
                    page: loadMore ? prevState.page + 1 : 0,
                    loading: false
                }));
            }).catch((error) => {
                console.error("Error fetching gifs:", error);
                this.setState({ loading: false });
            });
    };

    componentWillUnmount() {
        this.debouncedSearch.cancel();
    }

    render() {
        const { suitableGifs, loading } = this.state;

        return (
            <div>
                <ul className="gif-list">
                    {suitableGifs.map(gif => (
                        <li className="gif-item" key={gif.id}>
                            <img className="gif" src={gif.images.fixed_height.url} alt={gif.title} />
                        </li>
                    ))}
                </ul>

                {suitableGifs.length > 0 && !loading && (
                    <button
                        className="load-more-btn"
                        onClick={() => this.search(this.props.searchTerm, true)}
                    >
                        Загрузить ещё
                    </button>
                )}


            </div>
        )
    }
}
