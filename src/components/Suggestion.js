import React from 'react';

import data from '../data';


import styled from "styled-components";

import './Suggestion.css';



const Suggestion = (props) => {
		let item = props.item;
		let textInput = props.textInput;
		let itemTitle = item.title.toLowerCase();//the original title, WITHOUT uppercase characters
		let itemOrig = item.title;//the original title, ALONG with uppercase characters
		let textValue = textInput.current.value;//the input value typed by the user
		let suggestionID = props.suggestionID;//the index of the current Suggestion component, will be ued later on  for matching with  selectedSuggestionIndex
		let selectedSuggestionIndex = props.selectedSuggestionIndex;
		let handleOnHover = props.handleOnHover;
		let handleOnClick = props.handleOnClick;
		let handleOnSelect = props.handleOnSelect;//not naturally an event triggered function, will only send data to App component 

		let suggested = false;

		let str_rr = itemTitle.split(textValue); //the title (all lowercase) will be split into words array,based on the text that is typed by the user

		let str_test = str_rr;

		

		//just testing on how to create new array based on string 
		let index = 0;
		for (let str in str_test) {
			if(index%2 == 0){//insert the typed value into the words array
				str_test.splice(index+1, 0, textValue);
			}
			index++;


		}


		//check if index of the Suggestion component and the state selectedSuggestionIndex matches
		//if it's cae then give a backgroudn color
  		if(suggestionID == selectedSuggestionIndex){
  			return <List key={item.id} str_test={str_test} itemOrig={itemOrig} textValue={textValue} handleOnHover={handleOnHover} handleOnClick={handleOnClick}  handleOnSelect={handleOnSelect} suggested={true} book={item}></List>
  		}
  		else{
  			return <List key={item.id} str_test={str_test} itemOrig={itemOrig} textValue={textValue}  color={'black'} handleOnHover={handleOnHover}  handleOnSelect={handleOnSelect} handleOnClick={handleOnClick}  suggested={false} book={item}></List>
  		}


};



const List = (props) =>{

 let handleOnHover=props.handleOnHover;
 let handleOnClick=props.handleOnClick;
 let handleOnSelect=props.handleOnSelect;
 let suggested =   props.suggested;
 let  itemOrig =   props.itemOrig;
 let  book =   props.book;

 let arr_caps = [];//the final array, the one to be used in the UI, containing even the uppercase characters


 let str_index = 0;//the index value to be used by iterating through the array of string



//first, iterate through the words array where the value typed is a separated item along with the rest of the title 
 props.str_test.forEach((str) =>{
 	//temporary string to be pushed into arr_caps, will be concatenated based on character by character
 	let temp_str = '';

 	//then iterate through the string containing single characters
 	for (let j = 0; j < str.length; j++) {

 		//is this a character that has to be uppercased? (tricky because we compare an array of string with a plain string, based on the index)
 		if(str.charAt(j).toUpperCase() === itemOrig.charAt(str_index)){
 			temp_str = temp_str.concat('', itemOrig.charAt(str_index));

 		}
 		else{
 			temp_str = temp_str.concat('',str.charAt(j));
 		}

 		str_index++;//essential because the only for us to keep track of the process, NEEDS to ++ until end of the string of array iteration
 	}

 	arr_caps.push(temp_str); // finally push the string where the uppercase character has been added (f there is any)

 });



if(suggested == true){//the current component is selected while the 'Enter' key  has been pressed, send that message to App.js
	handleOnSelect(itemOrig);
}
	
	//conditionnally give the the list a classname based depending on if suggested or not
  return <li onMouseOver={handleOnHover}  onClick={handleOnClick} className={`suggestion ${suggested ? 'suggested' : 'hidden'}`}   data-book-title={itemOrig}>  

			{

				arr_caps.map((part) =>{

					//compare one last time the typed value and the string to be displayed in the UI
					//if they match ten make that string bolder in the UI
					//also, pointerEvents: 'none' to not propagate click event of the parent to this html element
		  			if(part.toLowerCase() == props.textValue.toLowerCase()){
		  				return <span style={{ fontWeight: 'bold', pointerEvents: 'none' }}  >{part}</span>
		  			}
		  			else{
		  				return <span  style={{pointerEvents: 'none'}}>{part}</span>
		  			}
		  			

		  		})
    
  			}

  		<span style={{ pointerEvents: 'none' }} className="category"> <span className="in">in</span> {getCategory(book)}</span></li>;

}

//function specifically to find the category of the 'book' selected

const getCategory = (book) =>{
	let category_id = book.categoryId;

	let categories = data.categories; 

	return categories[category_id]['name'];

}




export default Suggestion;