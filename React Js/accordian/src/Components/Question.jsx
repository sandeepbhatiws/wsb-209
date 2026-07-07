import React, { useState } from 'react'

export default function Question({data, i, currentIndex, setCurrentIndex}) {

    console.log(i)

    const handleQuestion = (index) => {
        setCurrentIndex(index)
    }

    return (
        <>
            <div className="accordion-item" open={ i == currentIndex ? 'open' : '' }>
                <summary className="accordion-header" onClick={ () => handleQuestion(i) }>
                    <span className="accordion-icon">▶</span>
                    <span className="accordion-title">{data.question}</span>
                </summary>
                <div className={ i == currentIndex ? 'accordion-content' : 'd-none' }>
                    {data.answer}
                </div>
            </div>
        </>
    )
}
