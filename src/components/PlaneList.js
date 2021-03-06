import React from 'react'
import Room from './Plane'

export default function RoomsList({rooms}) {
    if(rooms.lenght === 0) {
        return (
            <div className="empty-search">
                <h3>По вашему запросу ничего не найдено...</h3>
            </div>
        )
    }
    return (
        <section className="roomlist">
            <div className="roomslist-center">
                {
                    rooms.map(item => {
                        return <Room key={item.id} room={item}  />
                    })
                }
            </div>

        </section>
    )
}
