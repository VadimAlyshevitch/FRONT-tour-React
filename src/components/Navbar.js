import React, { Component } from 'react'
import logo  from '../images/logo.svg'
import {FaAlignRight} from 'react-icons/fa';
import {Link} from 'react-router-dom'
import Registration from '../pages/Registration'




export default class Navbar extends Component {

    state={
        isOpen : false
    }
    handleToggle = () => { 
        this.setState({
            isOpen : !this.state.isOpen
        })
    }
    render() {
        return (
            <nav className="navbar">
                <div className="nav-center">
                    <div className="nav-header">
                       
                        <button 
                        type="button" 
                        className="nav-btn" 
                        onClick={this.handleToggle}>
                            <FaAlignRight className="nav-icon"  />
                        </button>
                    </div>
                    <ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>

                        <li>
                             <Link to="/">Гланая </Link>
                        </li>
                        <li>
                             <Link to="/shablons">Шаблоны</Link>
                        </li>
                        <li>
                             <Link to="/plane">Спланировать путешествие</Link>
                        </li>
                        <li>
                             <Link to="/registration">Регистрация</Link>
                        </li>
                        
                       
                        
                        

                    </ul>

                </div>
                

            </nav>
        )
    }
}
