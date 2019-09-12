import React = require('react') ;
import ReactDOM = require ('react-dom')
// import React from 'react' ;
// import ReactDOM from'react-dom';
import './style.scss'
import './img/115641568280537_.pic_hd.jpg'
import catalogue = require('./catalogue.json')
console.log(catalogue,'catalogue')

interface catalogueEl { src:string ; title :string };
interface HelloProps { compiler: string; framework: string; catalogue:Array<any>};

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
let imgContainer:any;
class Hello extends React.Component<HelloProps, {}> {
    onClick=(src:any)=>{

    }
    componentDidMount(){
       let bgImg = document.createElement("img");
       bgImg.setAttribute("src",'./dist/115641568280537_.pic_hd.jpg');
       bgImg.style.width="100%";
       bgImg.style.height="100%";
       bgImg.onload=function(){
         imgContainer.appendChild(bgImg);
         imgContainer.style.zIndex='-1';
         document.getElementById('app').style.background='transparent'
       }
    }
    render() {
        return (
            <>
            <div className='bg' ref={(el)=>{imgContainer=el}}></div>
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
