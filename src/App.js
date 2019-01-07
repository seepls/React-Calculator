import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css'; 
import App2 from './orientation.js';


class App extends Component {

    constructor(props){
        super(props);
        this.inputDot=this.inputDot.bind(this);
        this.clearDisplay=this.clearDisplay.bind(this);
        this.Percent=this.Percent.bind(this);
        this.changeSign=this.changeSign.bind(this);
        this.showLast = this .showLast.bind(this);

        
    }
    state = {
		displayValue: '0',
		waitingForOperator: false ,
		operator: null,
		value: null
	}

clearDisplay(){
	this.setState({
		displayValue:'0'
	})
 }

 showLast(digit)
 {
	const { displayValue ,waitingForOperator}=this.state
         var previous ;
         if(waitingForOperator)
	{   
		this.setState({
			previous : displayValue ,
			waitingForOperator: false
		})
	}else
		{
		this.setState({
			previous : displayValue ,
			
		})
	}
   this.setState({
   	  displayValue : previous ,
   	})
		
 }
	inputDigit(digit)
 {
	const { displayValue ,waitingForOperator}=this.state
    
	if(waitingForOperator)
	{   
		this.setState({
			displayValue : String(digit),
			waitingForOperator: false
		})
	}else
		{
		this.setState({
			
			displayValue : displayValue == '0' ? String(digit) : displayValue+digit
		})
	}
 }
 changeSign(){
	const {displayValue}=this.state
	this.setState({
		displayValue : displayValue.substr(0,1)== '-' ? displayValue.substr(1) : '-'+displayValue
	})
 }


    inputDot(){
	const { displayValue , waitingForOperator}=this.state
	if(waitingForOperator)
	{
		this.setState({
			displayValue: '.',
			waitingForOperator: false
		})
	}

	else if (displayValue.indexOf('.')== -1)
	{
		this.setState({
			displayValue : displayValue + '.'
		})	
	}
  	
 }  
Percent()
 {
	const{displayValue}=this.state
	const value = parseFloat(displayValue)
	this.setState({
		displayValue : value/100
	})
 }
 performOperation(nextoperator)
 {
	const { displayValue ,operator,value}= this.state
	const nextValue = parseFloat(displayValue)
	const operations = {
		'+':(prevValue,nextValue) => prevValue+nextValue,
		'-':(prevValue,nextValue) => prevValue-nextValue,
		'*':(prevValue,nextValue) => prevValue*nextValue,
		'/':(prevValue,nextValue) => prevValue/nextValue,
		'=':(prevValue,nextValue) => nextValue,
    	
    	
	}
	if(value==null)
	{
		this.setState({
			value:nextValue
		})
	}
    else if(operator)
	{
        
		const currentValue = value || 0
		const newValue = operations[operator](currentValue,nextValue)

		this.setState({
			value:newValue,
			displayValue:String(newValue)
		})
	}
	this.setState({
		waitingForOperator : true,
		operator:nextoperator,

	})
 }
 render() {
      
      const{displayValue}=this.state
      
      var butn={
        backgroundColor:"#707070",
        color : "#000"
     };
     var butn1 = {
        backgroundColor:"#707070",
     };
     var butn2 = {
         backgroundColor : "#FFA500"
     };
     return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to My Calculator</h1>
          <table cellspacing="200" cellpadding="100">
          	<tr><td>
          			<button style={butn} onClick = {
          								ReactDOM.render(
  											<App2/>,
   										document.getElementById('root'))
									}>

   					expand▼</button>
   		 	</td></tr>
          </table>
        </header>
        <center>
		<div className="layout">
			<div className="display">
                <input type="text" id="text" value={this.state.displayValue} />
			</div>
			<div className="numpad">
				<table cellspacing="10" cellpadding="5">
				<tr>
					
					<td><button style={butn} onClick = {this.Percent}>%</button></td>
					<td><button style={butn} onClick={this.changeSign}>+/-</button></td>
					<td><button style= {butn} onClick={()=>this.performOperation('/')}>/</button></td>
					<td><button style={butn2} onClick ={this.clearDisplay}>AC</button></td>
				</tr>
				
				<tr>
					<td><button style={butn1} onClick={()=>this.inputDigit(7)}>7</button></td>
					<td><button style={butn1} onClick={()=>this.inputDigit(8)}>8</button></td>
					<td><button style={butn1} onClick={()=>this.inputDigit(9)}>9</button></td>
					<td><button style={{backgroundColor : "#FFA500"}} onClick={()=>this.performOperation('*')}>*</button></td>
				</tr>
				<tr>
					<td><button style={butn1} onClick={()=> this.inputDigit(4)}>4</button></td>
					<td><button style={butn1} onClick={() => this.inputDigit(5)}>5</button></td>
					<td><button style={butn1} onClick={()=> this.inputDigit(6)}>6</button></td>
					<td><button style={{backgroundColor : "#FFA500"}} onClick={() => this.performOperation('-')}>-</button></td>
				</tr>
				<tr>
					<td><button style={butn1} onClick={()=> this.inputDigit(3)}>3</button></td>
					<td><button style={butn1} onClick={()=> this.inputDigit(2)}>2</button></td>
					<td><button style={butn1} onClick={()=> this.inputDigit(1)}>1</button></td>
					<td><button style={{backgroundColor : "#FFA500"}} onClick={() =>this.performOperation('+')}>+</button></td>
				</tr>
				<tr>
					<td><button style={{backgroundColor: "grey" ,width : "50"}} onClick={() => this.inputDigit(0)}>0</button></td>
					<td><button style={butn1} onClick={this.inputDot}>.</button></td>
					<td><button onClick={() =>this.performOperation('=')}>=</button></td>
					<td> <button style = {butn} onClick = {this.showLast}>C</button></td>
					
				</tr>
				</table>
			</div>
		</div>
	 </center>

      </div>
     );
    }
}

export default App;

 









