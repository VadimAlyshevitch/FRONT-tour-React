import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import {RoomContext} from '../context'
import StyledHero from '../components/StyledHero'
import StyledFooter from '../components/StyledFooter'

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
                <Banner title={`${name}`} >
                    <Link to='/rooms' className="btn-primary">Назад</Link>
                </Banner>

            </StyledHero>
            <section className="single-room">
                <div className="single-room-images">
                {defaultImg.map((item, index) => {
                   return <img key={index} src={item} alt={name} title={name} className="PicturesInside"/>
                })}
                </div>
                <div className="single-room-info">
                    <article className="desc">
                        <h3>Подробнее</h3>
                        <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>Инфо</h3>
                            <h6><b>Итого</b> : {price} рублей</h6>
                           
                            <h6> <b>Количество</b> : {capacity > 1 ?`${capacity} человека` : `${capacity} человек`}</h6>
                            <h6> <b>Отель</b> : {pets}</h6>
                            <h6> <b>Цена за сутки </b>: {size} рублей</h6>
                            
                            <h6> <b>Что посетить </b>: {breakfast }</h6>
                            <h6> <b>Какие события</b> : {extras}</h6>  
                        </article>
                </div>
            </section>
            <StyledFooter />
            </>
        )
        
    }
}
