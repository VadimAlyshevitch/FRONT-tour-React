import React, { Component } from 'react'
import items from './data'
const RoomContext = React.createContext();

// <RoomContext.Provider value = {'hello'}

export default class RoomProvider extends Component {
    state = {
        rooms : [],
        sortedRooms : [],
        featuredRooms : [],
        loading : true,
        type : 'all',
        capacity : 1,
        price : 0,
        minPrice : 0,
        maxPrice: 0,
        minSize : 0,
        maxSize : 0,
        breafast : false,
        pets : false
    };
    // getData {}

    componentDidMount() {
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));

        this.setState({
            rooms : rooms,
            sortedRooms : rooms,
            featuredRooms : rooms,
            loading : false,
            price : maxPrice,
            maxPrice,
            maxSize
        })
    }

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);

            let room = {...item.fields, images, id}
            return room;
        });

        return tempItems
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug)
        return room;
    }

    handleChange = event => {
        const target = event.target;
        const value = event.type === 'checkbox' ? target.checked : target.value
        const name = event.target.name
        this.setState({
            [name] : value
        }, this.filterRooms);
    }

    filterRooms = () => {
        let {
            rooms, type, capacity, price, minSize, maxSize, breafast, pets
        } = this.state

        //все позиции
        let tempRooms = [...rooms]

        // измененеие значения
        capacity = parseInt(capacity);

        // фильтер по центе
        price = parseInt(price);
        // if (price !== 0) {
        //     tempRooms = tempRooms.filter(room => room.price === price)
        // }

        tempRooms = tempRooms.filter(room => room.price <= price);




        //фильтер по типу
        if (type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type)
        }

        //фильтер по количеству
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >=capacity )
        }
        this.setState({
            sortedRooms : tempRooms
        });
    }

    render() {
        return (
            <RoomContext.Provider value = {{ 
                ...this.state, 
                getRoom : this.getRoom, 
                handleChange : this.handleChange, 
                filterRooms: this.filterRooms }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}



const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props){
        return <RoomConsumer>
            {value => <Component {...props} context={value}/>}
        </RoomConsumer>
    }
}


export { RoomProvider, RoomConsumer, RoomContext };