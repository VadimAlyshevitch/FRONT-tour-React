import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import Services from '../components/Services'
import FeaturedRooms from '../components/FeaturedRooms'
import StyledFooter from '../components/StyledFooter'


export default function Home() {
    return (
        <>
        <Hero>
            <Banner title="REAL Tours" subtitle="Выгодные предложения" >
                <Link to='/rooms' className="btn-primary">Наши Шаблоны</Link>
            </Banner>    
         </Hero> 

         <Services />
         <FeaturedRooms />
         <StyledFooter />
        </>
    )
}
