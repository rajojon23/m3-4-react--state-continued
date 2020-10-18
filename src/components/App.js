import React, {useState} from 'react';

import data from '../data';

import styled from "styled-components";

import GlobalStyles from './GlobalStyles';

import Typeahead from './Typeahead';

import Suggestion from './Suggestion';

import './App.css';



let textInput = React.createRef();//ref created inside App component to get value of input inside Typehead component

const App = (props) => {

const [search, setSearch] = useState("");
let [result, setResult] = useState([]);
const [inputValue, setInputValue] = useState("");
const [isMounted, setIsMounted] = useState(false);
const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);//initially -1 because nothing is selected at the beginning 

let books = data.books;

let keySelected = '';//title of the book selected, used for key events only 


const handleTyped = (event) =>{
		
		

	
		let search_term = (event.target.value).toLowerCase();

		setSearch(search_term);
		result = [];



		if(search_term.length >= 2){
			books.forEach((book)=>{
				
				let book_title= book.title.toLowerCase();
				if(book_title.indexOf(search_term) > -1 ){
					result.push(book);
				}



			});				
		}


		
		setResult(result);	
		
}

const handleKeyDown = (event) =>{
		

	let maxIndex = result.length-1;
	let minIndex = 0;

	
	let currIndex = selectedSuggestionIndex;

	//the selection will loop on 'key' navigationn
	//if user presses on arrowup but the currently selected 
	//suggestion is the first one, select the last suggestion instead
	//
	//if user presses on arrowdown but the currently selected suggestion 
	//is the last one, select the first suggestion instead
	switch(event.key){
		case "Enter": {
	        handleOnSelectEnter();//Enter has been pressed, BUT is there a suggestion element that has been chosen? 
	        
	        return;
	      }
		case "ArrowUp": {

			if(currIndex > 0){
				setSelectedSuggestionIndex(selectedSuggestionIndex-1);
			}
			else{
				setSelectedSuggestionIndex(maxIndex);
			}
			return;
		}
		case "ArrowDown": {
			if(currIndex < maxIndex){
				setSelectedSuggestionIndex(selectedSuggestionIndex+1);
			}
			else{
				setSelectedSuggestionIndex(minIndex);
			}
			return;
		}


	}
		
}

const handleOnHover = (event) =>{
		
	setSelectedSuggestionIndex(-1);	//reset the selection state after each typing (prevents any preselected suggestion component)
}



const handleOnClick = (event) =>{
		
	setSelectedSuggestionIndex(-1);	//reset the selection state after each typing (prevents any preselected suggestion component)

	alert(`Selected:  ${event.target.dataset.bookTitle}`);
}


const handleOnSelect = (title) =>{//will be called by the Suggestion component, to give a value to keySelected

	keySelected = title;

}


const handleOnSelectEnter = () =>{
	
	console.log('handleOnSelectEnter called');

	//only alert when keySelected exists, meaning that there is a suggestion selected currently, 
	//we don't want to do anything if Enter has been pressed but no suggestion selected
	if(keySelected !== ''){
		alert(`Selected:  ${keySelected}`);
	}

	keySelected = '';//has to be emptied every time handleOnSelectEnter has been called, so that it doesn't save its previous value
}






const clearInput = () =>{//this is a function that is implemented on an element inside the Typeahead component, linked to the 'Clear' button 
			
		textInput.current.value = "";


		result = [];	

		setResult(result);
		setSelectedSuggestionIndex(-1);	
}


  return (
    <>
      <GlobalStyles />
      	{/* <Wrapper> */}
           <Typeahead
	       suggestions={data.books}
	       handleTyped={handleTyped}
	       handleKeyDown={handleKeyDown}
	       setSearch={setSearch}
	       textInput={textInput}
	       clearInput={clearInput}
	     	/>

	     	<Result 
	     		textInput={textInput}
	     		result={result}	
	     		selectedSuggestionIndex={selectedSuggestionIndex}
	     		handleOnHover={handleOnHover}
	     		handleOnClick={handleOnClick}
	     		handleOnSelect={handleOnSelect}

	     	/>
	    {/* </Wrapper> */}
    </>
  );
};





const Result = (props) => {


let result = props.result;
let textInput = props.textInput;
const isSelected = '';
let suggestionID = -1;//the index of the suggested element that is about to be rendered
let selectedSuggestionIndex = props.selectedSuggestionIndex;
let handleOnHover= props.handleOnHover;
let handleOnClick= props.handleOnClick;
let handleOnSelect= props.handleOnSelect;


if(result.length > 0){ //check if there is any suggestion to be displayed, else don't display anything (not even the ul element) 
  return <ul className="suggestion_list">{

    		result.map((item) =>{


    			suggestionID++;


    			return <Suggestion  key={item.id} suggestionID={suggestionID} selectedSuggestionIndex={selectedSuggestionIndex} item={item} textInput={textInput} handleOnHover={handleOnHover} handleOnClick={handleOnClick} handleOnSelect={handleOnSelect}>{item}</Suggestion>


    		})	
    		
    		

    	}</ul>;	
}
else{
	return null;
}
    	


};









export default App;
