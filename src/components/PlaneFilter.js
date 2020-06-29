import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../context'
import Title from '../components/Title'
// получение всех уникальных значений
const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]
}

export default function RoomFilter({rooms}) {
    const context = useContext(RoomContext)
    const {
        handleChange,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breafast,
        pets
    } = context;

    // получить уникальные типы
    let types = getUnique(rooms, 'type');

    // добавить все
    types = ['all' , ...types];

    // map в jsx
    types = types.map((item, index) => {
        return <option value={item} key={index}>{item}</option>
    });
    let people = getUnique(rooms, 'capacity');
    people = people.map((item, index) => {
        return <option value={item} key={index}>{item}</option>
    })

    return (
        <section className="filter-container">
            <Title title="Фильтр"/>
            <form className="filter-form">
                {/* START Выбрать тип */}
                <div className="form-group">
                    <label htmlFor="type">Тип</label>
                    <select 
                    name="type" 
                    id="type" 
                    value={type} 
                    className="form-control" 
                    onChange={handleChange}>
                        {
                            types
                        }
                    </select>
                </div>
                {/* END Выбрать тип */}
                  {/* START Выбрать количество */}
                  <div className="form-group">
                    <label htmlFor="capacity">Сколько дней</label>
                    <select 
                    name="capacity" 
                    id="capacity" 
                    value={capacity} 
                    className="form-control" 
                    onChange={handleChange}>
                        {
                            people
                        }
                    </select>
                </div>
                {/* END Выбрать количество */}

                {/* {фильтр по цене} */}
                <div className="form-group">
                    <label htmlFor="price">Стоимость {price}₽</label>
                    <input 
                    type="range" 
                    name="price" 
                    min={minPrice} 
                    max={maxPrice} 
                    id="price" 
                    value={price} 
                    onChange={handleChange}
                    className="form-control"
                    ></input>
                </div>

                {/* {фильтр по цене} */}
                

            </form>
        </section>
    )
}
