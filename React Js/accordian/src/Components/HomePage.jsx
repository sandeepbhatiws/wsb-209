import React, { useState } from 'react'
import Accordian from './Accordian'

export default function HomePage() {

    var [htmlTitle, setHtmlTile] = useState('HTML Question');
    var [cssTitle, setCssTile] = useState('CSS Question');
    var [description, setDescription] = useState('Asperiores obcaecati deserunt tempore mollitia unde iure sapiente praesentium repellat accusantium blanditiis est voluptates temporibus, illum et culpa pariatur, explicabo hic possimus.');

  return (
    <>
      {/* <Accordian title='HTML Question' description='Asperiores obcaecati deserunt tempore mollitia unde iure sapiente praesentium repellat accusantium blanditiis est voluptates temporibus, illum et culpa pariatur, explicabo hic possimus.'/>

      <Accordian title='CSS Question'></Accordian> */}

      <Accordian title={htmlTitle} description={description}/>

      {/* <Accordian title={cssTitle} description={description}>
        <p>Asperiores obcaecati deserunt tempore mollitia unde iure sapiente praesentium. </p>
        <p>Asperiores obcaecati deserunt tempore mollitia unde iure sapiente praesentium. </p>
      </Accordian> */}
    </>
  )
}
