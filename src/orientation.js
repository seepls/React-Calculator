import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './orientation.css';
import App from './App.js';


class App2 extends Component {

    
    constructor(props){
        super(props);
        this.inputDot=this.inputDot.bind(this);
        this.clearDisplay=this.clearDisplay.bind(this);
        this.Percent=this.Percent.bind(this);
        this.changeSign=this.changeSign.bind(this);
        this.Sin = this.Sin.bind(this);
        this.Cos = this.Cos.bind(this);
        this.Tan = this .Tan.bind(this);
        this.Log = this.Log.bind(this);
        this.Factorial = this.Factorial.bind(this);
        this.e = this.e.bind(this);
        this.pi = this.pi.bind(this);
        this.Square = this.Square.bind(this);
	    this.squareRoot = this.squareRoot.bind(this);
        this.Absolute = this.Absolute.bind(this);
        this.Ln = this.Ln.bind(this);
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
 squareRoot(){
	 const {displayValue}=this.state
	 this.setState({
		displayValue : Math.Sqrt(displayValue)
	})
 }
 changeSign(){
	const {displayValue}=this.state
	this.setState({
		displayValue : displayValue.substr(0,1)== '-' ? displayValue.substr(1) : '-'+displayValue
	})
 }
 Absolute(){
 	const {displayValue}=this.state
 	this.setState({
		displayValue : displayValue.substr(0,1)== '-' ? displayValue.substr(1) : displayValue
	})

 }

 Square(){
 	const {displayValue}=this.state
 	this.setState({
		displayValue : displayValue * displayValue
	})

 }

 Percent()
 {
	const{displayValue}=this.state
	const value = parseFloat(displayValue)
	this.setState({
		displayValue : value/100
	})
 }
 
 
 Sin()
{
	const{displayValue}= this.state
	const value = parseFloat(displayValue)
	 var n = (value/180)*Math.PI ;
		this.setState({
		displayValue : (n  - (Math.pow(n,3))/6 + (Math.pow(n,5))/120  - (Math.pow(n,7))/5040).toPrecision(3),
	})
}
 Cos()
 {
	const{displayValue}= this.state
	const value = parseFloat(displayValue)
	 var n = (value/180)*Math.PI;
	 
	 this.setState({
		displayValue : (1 - (Math.pow(n,2)/2) + (Math.pow(n,4)/24) - (Math.pow(n,6)/720 )).toPrecision(3),
 	})
 }
 Tan()
 {
	const{displayValue}= this.state
	const value = parseFloat(displayValue)
	 var n = (value/180)*Math.PI;
	 
	 this.setState({
		displayValue : (n + Math.pow(n,3)/3  + (2*Math.pow(n,5))/15 + (17*Math.pow(n,7))/315 ).toPrecision(3),
	})
 }

	
 
 Factorial(){
 	const{displayValue}=this.state
 	const value = parseFloat(displayValue)
 		function computeFactorialOfN(n) {
  			var output=1;
  				for(var i=1; i<=n; i++){
    				output*=i;
  				} return output;
		}
		this.setState({
 		displayValue :computeFactorialOfN(value) ,
 	})

 }

Ln(){

	const{displayValue}=this.state
	const value = parseFloat(displayValue)
	this.setState({
		displayValue : (Math.log(value)).toPrecision(3), 
	})
}
Log(){
	const{displayValue} = this.state
	const value = parseFloat(displayValue)
	this.setState({
		displayValue : (Math.log(value)/Math.log(10)).toPrecision(3), 
	})

}
 
 e(){
	const{displayValue}= this.state
	this.setState({
	displayValue : 2.718281,
    })

 }

 pi(){
	const{displayValue}= this.state
	this.setState({
	displayValue : (Math.PI).toPrecision(5) ,
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
    	'x^y' : (prevValue,nextValue) => Math.pow(prevValue,nextValue),
    	
	}
	
	//const operatedValue = operations[operator](prevValue,nextValue)
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
          		<tr><td><button style={butn} onClick = {ReactDOM.render(
  											<App/>,
   									document.getElementById('root'))
   								} >
   						back▲</button>
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
				     <td> <button style = {butn} onClick = {this.Sqauare}>x²</button></td>
				     <td> <button style = {butn} onClick = {this.Absolute}> |x| </button></td>
				     <td> <button style = {butn} onClick = {this.Log}> log</button></td>
				     <td> <button style = {butn} onClick = {this.squareRoot}>√</button></td>
				</tr>
				<tr>
				    <td><button style={butn} onClick = {this.Sin}>sin</button></td>
				    <td><button style={butn} onClick = {this.Cos}>cos</button></td>
				    <td><button style={butn} onClick = {this.Tan}>tan</button></td>
				    <td><button style={butn} onClick = {this.Ln}>ln</button></td>
				</tr>
				<tr>
				    <td><button style={butn} onClick = {this.e }>e</button></td>
				    <td><button style={butn} onClick = {this.pi}>п</button></td>
				    <td><button style={butn} onClick = {this.Factorial}>!</button></td>
				    <td><button style={butn} onClick = {() =>this.performOperation('^')}>x^y</button></td>
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

export default App2;

 

		



