import React = require('react') ;
import ReactDOM = require ('react-dom')
// import React from 'react' ;
// import ReactDOM from'react-dom';

import catalogue = require('./catalogue.json')
console.log(catalogue,'catalogue')

interface catalogueEl { src:string ; title :string };
interface HelloProps { compiler: string; framework: string; catalogue:Array<any>};

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
class Hello extends React.Component<HelloProps, {}> {
    onClick=(src:any)=>{

    }
    render() {
        alert()
        return (
            this.props.catalogue.map((el:catalogueEl)=>{
                return <h1> <a href={`${el.src}`}> {el.title} </a> </h1>
            })
        )
        // return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}
alert()
ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" catalogue={catalogue} />
  , document.getElementById('app')
);
