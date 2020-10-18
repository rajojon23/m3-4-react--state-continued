import React from 'react';


import './Typeahead.css';



const Typeahead = (props) => {

	let handleTyped = props.handleTyped; 
	let handleKeyDown = props.handleKeyDown; 
	let textInput = props.textInput;//ref created inside App component to get value of input inside Typehead component
	let clearInput = props.clearInput;

  return (
    <>
    	<input className="input_clear" type="text" name="" id="" onChange={handleTyped} onKeyDown={handleKeyDown} ref={textInput}/>
    	<Button   textInput={textInput} clearInput={clearInput}>Clear</Button>

    </>
  );
};


const Button = (props) => {
	let clearInput = props.clearInput;

  return (
    <>
    	<button className="button_clear" onClick={clearInput} >Clear</button>
    </>
  );
};




export default Typeahead;