import React, { Component } from 'react'
import {RoomContext} from '../context'
import Title from '../components/Title'
import Loading from  './Loading'
import Room from './Room'
export default class FeaturedRooms extends Component {
    static contextType = RoomContext

    render() {
        let {loadnig, featuredRooms : rooms} = this.context
        rooms = rooms.map(room => {
            return <Room key={room.id} room = {room} />
        })
        

        return (
            <section className="featured-room">
                <Title title="Featrued rooms" />
                <div className="featured-rooms-center">
                    {loadnig? <Loading /> : rooms}
                </div>
               
                
             
            </section>
        )
    }
}
