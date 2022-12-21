// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
    
  constructor(props) { 
    super(props);
    this.state = { 
      searchResults: [ 
        { name: 'American Idiot', artist: 'Green Day', album: 'American Idiot', id: 1 },
        { name: 'Crawling', artist: 'Linkin Park', album: 'Hybrid Theory', id: 2 }
      ],
      playlistName: 'Awesome Playlist',
      playlistTracks: [
        { name: 'Breaking The Habit', artist: 'Linkin Park', album: 'Meteora', id: 1}
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
