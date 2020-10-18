import React from 'react';

import data from '../data';


import styled from "styled-components";

import './Suggestion.css';



const Suggestion = (props) => {
		let item = props.item;
		let textInput = props.textInput;
		let itemTitle = item.title.toLowerCase();
		let itemOrig = item.title;//the original title, ALONG with uppercase characters
		let textValue = textInput.current.value;
		let suggestionID = props.suggestionID;//
		let selectedSuggestionIndex = props.selectedSuggestionIndex;
		let handleOnHover = props.handleOnHover;
		let handleOnClick = props.handleOnClick;
		let handleOnSelect = props.handleOnSelect;

		let suggested = false;
		// console.log("received suggestionID", suggestionID);
		// console.log("received selectedSuggestionIndex", selectedSuggestionIndex);
		// console.log('item is', itemTitle);
		// console.log('genre is', getCategory(item));
		// console.log('textInput is',textInput.current.value);

		// console.log('item.title', item.title);
		// console.log('itemTitle',itemTitle);
		// console.log('index_start is', index_start);
		// console.log('index_end is', index_end);

		let str_rr = itemTitle.split(textValue);
		// console.log('str_rr is', str_rr);

		let str_test = str_rr;

	

		let index = 0;

		// console.log("str_test" , str_test);
		for (let str in str_test) {


			if(index%2 == 0){
				str_test.splice(index+1, 0, textValue);
				// console.log("adding th at index " , index+1);
			}
			index++;


		}

		// console.log("str_test" , str_test);
		// console.log("str_test.length" , str_test.length);




  // return 	<>{
  		if(suggestionID == selectedSuggestionIndex){
  			return <List key={item.id} str_test={str_test} itemOrig={itemOrig} textValue={textValue} handleOnHover={handleOnHover} handleOnClick={handleOnClick}  handleOnSelect={handleOnSelect} suggested={true} book={item}></List>
  		}
  		else{
  			return <List key={item.id} str_test={str_test} itemOrig={itemOrig} textValue={textValue}  color={'black'} handleOnHover={handleOnHover}  handleOnSelect={handleOnSelect} handleOnClick={handleOnClick}  suggested={false} book={item}></List>
  		}

  				
  			// }</>;
};



const List = (props) =>{

 let handleOnHover=props.handleOnHover;
 let handleOnClick=props.handleOnClick;
 let handleOnSelect=props.handleOnSelect;
 let suggested =   props.suggested;
 let  itemOrig =   props.itemOrig;
 let  book =   props.book;

 let arr_caps = [];

 // console.log("str_test",props.str_test);
 // console.log("props.str_test[0].charAt(0)",props.str_test[0].charAt(0));
 // console.log("console logging characters");

 let str_index = 0;




 props.str_test.forEach((str) =>{

 	let temp_str = '';

 	for (let j = 0; j < str.length; j++) {
// 
//  		console.log(`itemOrig ${str_index}`, itemOrig.charAt(str_index));
//  		console.log(`str.charAt(${str_index})`, str.charAt(j));

 		if(str.charAt(j).toUpperCase() === itemOrig.charAt(str_index)){
 			// console.log("uppercase difference detected");
 			temp_str = temp_str.concat('', itemOrig.charAt(str_index));

 		}
 		else{
 			temp_str = temp_str.concat('',str.charAt(j));
 		}

 		str_index++;
 	}

 	arr_caps.push(temp_str);

 });


 // console.log("arr_caps", arr_caps);


if(suggested == true){
	console.log("currently selected ", itemOrig);
	handleOnSelect(itemOrig);
}
	
	//conditionnally give the the list a classname based depending on if suggested or not
  return <li onMouseOver={handleOnHover}  onClick={handleOnClick} className={`suggestion ${suggested ? 'suggested' : 'hidden'}`}   data-book-title={itemOrig}>  

			{

		  		// props.str_test.map((part) =>{
				arr_caps.map((part) =>{


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


const getCategory = (book) =>{
	let category_id = book.categoryId;

	let categories = data.categories; 

	return categories[category_id]['name'];

}




export default Suggestion;