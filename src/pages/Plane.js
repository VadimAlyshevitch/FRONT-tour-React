import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import RoomContainer from '../components/RoomContainer';
import StyledFooter from '../components/StyledFooter'


// //онлайн база городов, прокси, ключ АПИ и БД по календарю цен
const CITY_API = 'http://api.travelpayouts.com/data/ru/cities.json',
PROXY = 'https://cors-anywhere.herokuapp.com/',
API_KEY = '5d2e3c92f5cbb5b20d19b432ed48fb95',

	// Получение минимальных цен на перелёт для указанных даты вылета и городов вылета и назначения
CALENDAR = 'http://min-prices.aviasales.ru/calendar_preload',

MAX_COUNT = 2,  // количество карточек самых дешевых билетов
HOTEL_API = 'http://engine.hotellook.com/api/v2/lookup.json'


const getCitiesApi = () => fetch(PROXY + CITY_API).then(res => res.json())

const getTicketsApi = (cityFrom, cityTo, date) => fetch()

/*
getData(1, (data) => {
	// выбираем только те объекты у которых не пустое поле name
	city = JSON.parse(data).filter(item => item.name);

	city.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	})

});
*/


export default function Plane() {
    const [data, setData] = useState([])
    const [isFromSelectOpened, setIsFromSelectOpened] = useState(false)
    const [isToSelectOpened, setIsToSelectOpened] = useState(false)
    
    const [fromValue, setFromValue] = useState('')
    const [toValue, setToValue] = useState('')

    const [selectedFromElem, setSelectedFromElem] = useState(null)
    const [selectedToElem, setSelectedToElem] = useState(null)
    const [date, setDate] = useState('')

    const [tickets, setTickets] = useState([])
    const [bestTicket, setBestTicket] = useState(null)

    useEffect(() => {
      getCitiesApi().then(data => setData(data.filter(elem => elem.name)))
    }, [])

    const getCityNameByCode = code => data.find(item => item.code === code).name

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('ru-Ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
      }).toString()
    }

    const getChanges = (num) => {
      if (num) {
        return num === 1 ? 'С одной пересадкой' : 'С двумя пересадками'
      } else {
        return 'Без пересадок'
      }
    }

    const getLinkAviasales = (data) => {
      let link = 'https://www.aviasales.ru/search/'
      link += data.origin
    
      const date = new Date(data.depart_date)
      const day = date.getDate()
      link += day < 10 ? '0' + day : day
      const month = date.getMonth() + 1
      link += month < 10 ? '0' + month : month
    
      link += data.destination
      link += '1'   // один взрослый билет
    
      return link
    }

    return (
        <>
            <Hero hero="roomsHero" >
              <Banner title='Спланировать свое путешествие' subtitle="Введите куда и откуда">
                    <Link to='/' className="btn-primary">На главную</Link>
              </Banner>
            </Hero>

            <main>
                <section className="wrapper">
                  <form className="form-search" onSubmit={e => {

                    e.preventDefault()
                    if (!selectedToElem || !selectedToElem || !date) return

                    fetch(CALENDAR + `?depart_date=${date}&origin=${selectedFromElem.code}&destination=${selectedToElem.code}&one_way=true&token=${API_KEY}`)
                      .then(res => res.json())
                      .then(data => {
                        const best_prices = data.best_prices
                        const bestTicket = best_prices.filter(item => item.depart_date === date)[0]
                        setBestTicket(bestTicket)
                        setTickets(best_prices.filter(item => item !== bestTicket))
                        debugger
                      })
                  
                  }}>
                    <div className="wrapper__search">
                      <div className="input" style={{ display: "block" }}>
                        <label>
                          Откуда
                          <input value={fromValue} onChange={e => {
                            setFromValue(e.target.value)
                            setSelectedFromElem(null)
                          }}  type="text" className="input__cities-from" required onFocus={() => {
                            setIsFromSelectOpened(true)
                          }} onBlur={() => {
                            setTimeout(() => {
                              setIsFromSelectOpened(false)
                            }, 200)
                          }} />
                        </label>
                        <ul className="dropdown dropdown__cities-from">
                          {
                            (isFromSelectOpened && fromValue) && data
                              .filter(elem => {
                                return elem.name.toLowerCase().startsWith(fromValue.toLowerCase())
                              })
                              .map(elem => {
                                return <li className="dropdown__city" onClick={() => {
                                  setSelectedFromElem(elem)
                                  setFromValue(elem.name)
                                }}>
                                  {elem.name}
                                </li>
                              })
                          }
                        </ul>
                      </div>
                      <div className="input">
                        <label>
                          Куда
                          <input value={toValue} onChange={e => {
                            setToValue(e.target.value)
                            setSelectedToElem(null)
                          }} onFocus={() => setIsToSelectOpened(true)}
                          onBlur={() => {
                            setTimeout(() => {
                              setIsToSelectOpened(false)
                            }, 200)
                          }}
                          type="text" className="input__cities-to" required />
                        </label>
                        <ul className="dropdown dropdown__cities-from" onClick={e => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}>
                          {
                            (isToSelectOpened && toValue) && data
                              .filter(elem => {
                                return elem.name.toLowerCase().startsWith(toValue.toLowerCase())
                              })
                              .map(elem => {
                                return <li className="dropdown__city" onClick={() => {
                                  setSelectedToElem(elem)
                                  setToValue(elem.name)
                                }}>
                                  {elem.name}
                                </li>
                              })
                          }
                        </ul>
                      </div>
                      <div className="input input__cities-from">
                        <label>
                          Отправление
                          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="input__date-depart" required />
                        </label>
                      </div>
                    </div>
                    <div className="wrapper__button">
                      <button type="submit" className="button button__search btn-primary">
                        <span>Найти билеты</span>
                      </button>
                    </div>
                  </form>
                </section>
                <section className="wrapper">
                  <section
                    className="wrapper__ticket"
                    id="cheapest-ticket"
                    style={{ display: "none" }}
                  ></section>
                  <section
                    className="block__ticket"
                    id="other-cheap-tickets"
                    style={{ display: "none" }}
                  ></section>
                </section>
                {
                  bestTicket && <div>
                  <h3 className="agent">{ bestTicket.gate }</h3>
                    <div className="ticket__wrapper">
                        <div className="left-side">
                            <a href={getLinkAviasales(bestTicket)} target="_blank" className="button button__buy">Купить за&nbsp;{ bestTicket.value }₽</a>
                          </div>
                        <div className="right-side">
                            <div className="block-left">
                                <div className="city__from">Вылет из города
                                  <span className="city__name">{ getCityNameByCode(bestTicket.origin) }</span>
                                </div>
                                <div className="date">{ formatDate(bestTicket.depart_date) }</div>
                              </div>
                            <div className="block-right">
                                  <div className="changes">{ getChanges(bestTicket.number_of_changes) }</div>
                                  <div className="city__to">Город назначения:
                                  <span className="city__name">{ getCityNameByCode(bestTicket.destination) }</span>
                                  </div>
                                  </div>
                              </div>
                        </div>
                </div>
                }
                {
                  (tickets || []).filter((e, i) => i < MAX_COUNT).map(ticket => {
                    return <div>
                    <h3 className="agent">{ ticket.gate }</h3>
                      <div className="ticket__wrapper">
                          <div className="left-side">
                              <a href={getLinkAviasales(ticket)} target="_blank" className="button button__buy">Купить за&nbsp;{ ticket.value }₽</a>
                            </div>
                          <div className="right-side">
                              <div className="block-left">
                                  <div className="city__from">Вылет из города
                                    <span className="city__name">{ getCityNameByCode(ticket.origin) }</span>
                                  </div>
                                  <div className="date">{ formatDate(ticket.depart_date) }</div>
                                </div>
                              <div className="block-right">
                                    <div className="changes">{ getChanges(ticket.number_of_changes) }</div>
                                    <div className="city__to">Город назначения:
                                    <span className="city__name">{ getCityNameByCode(ticket.destination) }</span>
                                    </div>
                                    </div>
                                </div>
                          </div>
                  </div>
                  })
                }
              </main>;

              <StyledFooter /> 
        </>
    )
}
