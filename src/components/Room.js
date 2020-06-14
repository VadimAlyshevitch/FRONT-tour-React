import React from 'react'
import {Link} from 'react-router-dom'
import defaultImg from '../images/bg.jpg'
import PropTypes from 'prop-types';
import { RoomContext } from '../context';

export default function Room({room}) {
    const {name, slug, images, price} = room;
    return <article className="room"> 
        <div className="img-container"> 
            <img src={images[0] || defaultImg} />
            <div className="price-top">
                <h6>{price}₽</h6>
                
            </div>

            <Link to={`/rooms/${slug}`} className="btn-primary room-link" > Подробнее </Link>
        </div>

        <p className="room-info">{name}</p>
        </article>
    
}


Room.propTypes = {
    room : PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.number.isRequired
    })
}