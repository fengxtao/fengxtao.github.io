import React = require('react') ;
import ReactDOM = require ('react-dom')
// import React from 'react' ;
// import ReactDOM from'react-dom';
import './style.scss'
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
        return (
            <>
            <div className='head'></div>
            <div className='catalogue-container'>
                {this.props.catalogue.map((el:catalogueEl,index)=>{
                    return <h3 key={index}> <a href={`${el.src}`}> {el.title} </a> </h3>
                })}
            </div>
            </>
        )
    }
}
ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" catalogue={catalogue} />
  , document.getElementById('app')
);
