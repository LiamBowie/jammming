import React from 'react'
import { TrackList } from '../TrackList/TrackList'

import './Playlist.css'

export class Playlist extends React.Component { 
    render() { 
        return ( 
            <div className='Playlist'>
                <input defaultValue={'New Playlist'} />
                <TrackList 
                    playlistName={this.props.playlistName} 
                    tracks={this.props.playlistTracks} 
                    onAdd={this.props.onAdd}
                    isRemoval={false}
                />
                <button className='Playlist-save'>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}