import React, { useState } from 'react'
import Question from './Question'
import { faqData } from '../data/faqques'

export default function Accordian({title, description, children}) {

  var [faqQuestions, setFaqQuestions] = useState(faqData)

  let [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="accordion-container">
      <h1>{ title }</h1>
      <p>{ description } </p>

      {children}

      {
        faqQuestions.map((v,i) => {
          return(
            <Question key={i} data={v} i={i} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
          )
        })
      }

      
      {/* <details className="accordion-item">
        <summary className="accordion-header">
          <span className="accordion-icon">▶</span>
          <span className="accordion-title">What is React?</span>
        </summary>
        <div className="accordion-content">
          React is a JavaScript library for building user interfaces with reusable components. 
          It uses a virtual DOM to efficiently update the actual DOM and manage application state.
        </div>
      </details> */}

      {/* <details className="accordion-item">
        <summary className="accordion-header">
          <span className="accordion-icon">▶</span>
          <span className="accordion-title">What is an Accordion Component?</span>
        </summary>
        <div className="accordion-content">
          An accordion component is a UI element that expands and collapses to show or hide content. 
          It's useful for organizing large amounts of information in a compact, organized way while 
          keeping the interface clean and user-friendly.
        </div>
      </details>

      <details className="accordion-item">
        <summary className="accordion-header">
          <span className="accordion-icon">▶</span>
          <span className="accordion-title">How does CSS work?</span>
        </summary>
        <div className="accordion-content">
          CSS (Cascading Style Sheets) is used to style HTML elements. It allows you to control 
          colors, layouts, spacing, fonts, and animations. CSS selectors target HTML elements 
          and apply styling rules to them.
        </div>
      </details>

      <details className="accordion-item">
        <summary className="accordion-header">
          <span className="accordion-icon">▶</span>
          <span className="accordion-title">What are HTML5 Details Elements?</span>
        </summary>
        <div className="accordion-content">
          The HTML5 &lt;details&gt; element creates an interactive disclosure widget in which 
          information is visible only when the widget is toggled into an "open" state. This 
          provides native accordion functionality without JavaScript.
        </div>
      </details> */}
    </div>
  )
}
