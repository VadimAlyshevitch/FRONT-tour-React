import React from 'react'
import RoomFilter from './RoomFilter'
import RoomsList from './RoomList'
import {withRoomConsumer} from '../context';
import Loading from '../components/Loading'


function RoomContainer({context}) {
    const {loading, sortedRooms, rooms} = context;
    if(loading) {
         return <Loading />
    }
    return (
        <>
            
            <RoomFilter  rooms={rooms}/>
            <RoomsList rooms={sortedRooms}/>
        </>
    );
}


export default withRoomConsumer(RoomContainer);

// export default function RoomContainer() {
//     return (
//         <RoomConsumer>
//             {
//                 (value) => {
//                     const {loading, sortedRooms, rooms} = value
//                     if(loading) {
//                         return <Loading />
//                     }
//                     return (
//                         <div>
//                             hello from RoomContainer
//                             <RoomFilter  rooms={rooms}/>
//                             <RoomsList rooms={sortedRooms}/>
//                         </div>
//                     )
//                 }
//             }
//         </RoomConsumer>
      
//     )
// }
