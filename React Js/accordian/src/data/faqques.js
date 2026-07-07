
var faqData = [
  {
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces with components. It uses a virtual DOM for efficient updates and enables developers to create interactive web applications with reusable UI components."
  },
  {
    question: "What are React components?",
    answer: "React components are reusable pieces of UI that can be either functional or class-based. They return JSX that describes what should appear on the screen. Functional components are more common in modern React development."
  },
  {
    question: "What is JSX?",
    answer: "JSX is a syntax extension to JavaScript that looks similar to HTML. It allows you to write markup directly in your JavaScript code. JSX gets compiled to JavaScript function calls that create React elements."
  },
  {
    question: "What is the difference between State and Props?",
    answer: "State is data that a component manages internally and can change over time using setState. Props are data passed from a parent component to a child component and are read-only. State is mutable, props are immutable."
  },
  {
    question: "What are React Hooks?",
    answer: "React Hooks are functions that let you use state and other React features in functional components. Common hooks include useState for managing state, useEffect for side effects, useContext for context, and useReducer for complex state logic."
  },
  {
    question: "What does the useState Hook do?",
    answer: "useState is a Hook that lets you add state to functional components. It returns an array with two elements: the current state value and a function to update it. When state changes, the component re-renders."
  },
  {
    question: "What is the useEffect Hook used for?",
    answer: "useEffect is a Hook for performing side effects in functional components, such as fetching data, subscribing, or updating the DOM. It runs after every render by default, but you can control when it runs using a dependency array."
  },
  {
    question: "What is the Virtual DOM?",
    answer: "The Virtual DOM is a lightweight JavaScript representation of the real DOM. React uses it to improve performance by comparing changes and only updating the necessary parts of the actual DOM instead of re-rendering everything."
  },
  {
    question: "Why do we need keys in React lists?",
    answer: "Keys help React identify which items have changed, been added, or been removed. They improve performance and prevent bugs when rendering dynamic lists. Use unique, stable identifiers as keys, not array indexes."
  },
  {
    question: "What are controlled and uncontrolled components?",
    answer: "A controlled component has its value managed by React state and updates through onChange handlers. An uncontrolled component stores its own state in the DOM and uses ref to access values. Controlled components are generally preferred for forms."
  }
]

export { faqData }