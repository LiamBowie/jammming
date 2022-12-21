import React from "react";
import { Track } from "../Track/Track";
import './TrackList.css'

export class TrackList extends React.Component { 

    displayTracks() {
        if(this.props.tracks !== undefined){
            this.props.tracks.map(track => {
                console.log(track.name);
                return <li key={track.id}>{track.name}</li>
            })
        }
    }

    render() { 
        return (
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {
                        return <Track track={track} 
                                    key={track.id} 
                                    onAdd={this.props.onAdd}
                                    onRemove={this.props.onRemove}
                                    isRemoval={this.props.isRemoval}
                                />
                    })
                }
            </div>
        )
    }
}