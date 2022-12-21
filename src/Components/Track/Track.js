import React from 'react';
import './Track.css';

export class Track extends React.Component { 

    // renderAction() { 
    //     if(isRemoval){ 
    //         return <button className='Track-action'>-</button>
    //     }
    //     else { 
    //         return<button className='Track-action'>+</button>
    //     }
    // }

    render() { 
        return (
            <div className='Track'> 
                <div className='Track-information'>
                    <h3>{/* Track name will go here */}</h3>
                    <p>{/* track artist and album will go here */}</p>
                </div>
                <button className='Track-action'>{/* isRemoval ? - : + */}</button>
            </div>
        )
    }
}