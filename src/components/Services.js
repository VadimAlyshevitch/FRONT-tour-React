import React, { Component } from 'react'
import Title from './Title'
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa'

export default class Services extends Component {
    state = {
        servives : [
           
            {
                icon : <FaHiking />,
                title : "Hiking",
                info : "some info"
                
            },
            {
                icon : <FaShuttleVan />,
                title : "Shutt",
                info : "some info"
                
            }
        ]
    }
    render() {
        return (
            <section className="services">
                <Title title='Преимущества'/>
                <div className="services-center">
                    {this.state.servives.map((item, index) => {
                        return <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    })}

                </div>
                
                
            </section>
        )
    }
}
