import React, { useState } from 'react'

export default function ShowHidePassword() {

    let [status, setStatus] = useState(true);

    const changePassword = () => {
        setStatus(!status);
    }

  return (
    <div>
        <input type={ status ? 'password' : 'text' }/>

        <button onClick={changePassword}>{ status ? 'Show Password' : 'Hide Password' }</button>
    </div>
  )
}
