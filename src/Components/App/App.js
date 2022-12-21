// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { TrackList } from '../TrackList/TrackList';

class App extends React.Component {
    
  constructor(props) { 
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.state = { 
      searchResults: [ 
        { name: 'American Idiot', artist: 'Green Day', album: 'American Idiot', id: 273487 },
        { name: 'Crawling', artist: 'Linkin Park', album: 'Hybrid Theory', id: 328476 }
      ],
      playlistName: 'Awesome Playlist',
      playlistTracks: [
        { name: 'Breaking The Habit', artist: 'Linkin Park', album: 'Meteora', id: 648732}
      ]
    };
  }

  addTrack(track) { 
    let tracks = this.state.playlistTracks;
    if( this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({playlistTracks: tracks});
    
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
