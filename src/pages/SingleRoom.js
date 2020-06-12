import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import {RoomContext} from '../context'
import StyledHero from '../components/StyledHero'

export default class SingleRoom extends Component {
    constructor(props) {
        super(props)

        this.state = {
            slug : this.props.match.params.slug,
            defaultBcg
        };

    }
    static contextType = RoomContext;
    // componentDidMount() {

    // }
    render() {
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug);
        if (!room) {
            return <div className="error">
                <h3>По вашему запросу ничего не найдено</h3>
                <Link to='/' className="btn-primary">На главную</Link>
            </div>
        }

        const {name, description, capacity, size,price, extras, breakfast, pets, images} = room
        return (
            <StyledHero img={images[0] || this.state.defaultBcg}>
                <Banner title={`${name} room`} />
                <Link to='/rooms' className="btn-primary">Назад</Link>

            </StyledHero>
        )
        
    }
}
