import { Component } from 'react';
import './App.css';

import { GifSearch } from './Components/GifSearch/GifSearch';
import { GifList } from './Components/GifList/GifList';

class App extends Component {
  state ={
    gifToSearch: ''
  }

  updateSearchTerm = (searchTerm) => {
    this.setState({ gifToSearch: searchTerm });
  };


  render() {
    return (
      <div className="App">
        <GifSearch searchGif={this.updateSearchTerm}/>
        <GifList searchTerm={this.state.gifToSearch}/>
      </div>
    );
  }
}

export default App;