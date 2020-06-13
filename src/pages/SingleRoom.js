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

        const {name, description, capacity, size,price, extras, breakfast, pets, images} = room;
        const [mainImg, ...defaultImg] = images;
        return (
            <>
            <StyledHero img={mainImg || this.state.defaultBcg}>
                <Banner title={`${name} room`} />
                <Link to='/rooms' className="btn-primary">Назад</Link>

            </StyledHero>
            <section className="single-room">
                <div className="single-room-images">
                {defaultImg.map((item, index) => {
                   return <img key={index} src={item} alt={name} />
                })}
                </div>
                <div className="single-room-info">
                    <article className="desc">
                        <h3>Подробнее</h3>
                        <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>Инфо</h3>
                            <h6>Цена : ${price}</h6>
                            <h6>Размер : {size} SQFT</h6>
                            <h6>Количество : {capacity > 1 ?`${capacity} человек` : `${capacity} людей`}</h6>
                           
                            <h6>Что есть : {extras}</h6>
                            
                            <h6> {pets ? "C животными" : "Без животных"}</h6>
                            <h6> {breakfast ? "Охуенный хавчик" : "Петушки ебаные вы все"}</h6>
                            
                        </article>
                </div>
            </section>
            <section className="room-extrass">  
                <h6>Включено</h6>
                <ul className="extrass">
                    {extras.map((item, index) => {
                        return <li key={index}>- {item} </li>
                    })}
                </ul>
            </section>
            </>
        )
        
    }
}
