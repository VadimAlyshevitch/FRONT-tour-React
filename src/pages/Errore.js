import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import { Link} from 'react-router-dom';


export default function Errore() {
    return (
       <Hero >
           <Banner title='404' subtitle="Страница не найдена">
                <Link to='/' className="btn-primary">На главную</Link>
           </Banner>
        </Hero>
    )
}
