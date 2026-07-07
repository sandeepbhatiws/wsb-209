import React, { useState } from 'react'
import Hero from './assets/hero.png'

export default function Counter() {

    var status = 1;
    // var count = 5;

    var [count, setCount] = useState(10);
    var [name, setName] = useState('Sandeep Bhati');


    const minus = () => {
        count--
        console.log(count)
        setCount(count)
    }

    const plus = () => {
        count++
        console.log(count)
        setCount(count)
    }

  return (
    <>
        <img src={Hero} className={`${ status == 1 ? 'd-none' : '' }`} />

        <div className="heading" style={{ textAlign: 'center', color: 'red' }}>
            <h1>Counter App</h1>
        </div>


        {
            status == 1
            ?
            <div className='buttons'>
                <button onClick={ minus } >-</button>
                <button>{ count }</button>
                <button onClick={ plus }>+</button>
            </div>
            :
            ''
        }
        
    </>
  )
}
