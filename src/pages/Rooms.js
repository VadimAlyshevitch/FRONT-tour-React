import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'



export default function Rooms() {
    return (
        <Hero hero="roomsHero" >
           <Banner title='Наши шаблоны' subtitle="На странице представлены шаблоны путешествия">
                <Link to='/' className="btn-primary">На главную</Link>
           </Banner>
        </Hero>
    )
}
