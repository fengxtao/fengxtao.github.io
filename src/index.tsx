import React = require('react') ;
import ReactDOM = require ('react-dom')
// import React from 'react' ;
// import ReactDOM from'react-dom';
import './style.scss'
// import './style.css'
// import './img/SAVE_20190920_140911.jpg'
import catalogue = require('./catalogue.json')
console.log(catalogue,'catalogue')

interface catalogueEl { src:string ; title :string };
interface HelloProps {  catalogue:Array<catalogueEl>};
interface HelloState {  catalogue:Array<catalogueEl>};
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
let imgContainer:any;


class Hello extends React.Component<HelloProps, HelloState> {

    constructor(props:any,context:any){
        super(props,context)
        this.state={
            catalogue:this.props.catalogue
        }
    }

    onChange=(val:string)=>{
        const catalogue = this.props.catalogue.filter((el)=>{
           return ~(el.title.indexOf(val)) ;
        })
        this.setState({
            catalogue:catalogue
        })
    }

    componentDidMount(){
    //    let bgImg = document.createElement("img");
    //    try{
    //     bgImg.setAttribute("src",'./outdist/img/EA395BB6-FBD2-40DA-B7AE-2A11DADA4223.png');
    //     bgImg.style.width="100%";
    //     bgImg.style.height="100%";
    //     // bgImg.style.transform='rotate(180deg)';
    //     bgImg.onload=function(){
    //       imgContainer.appendChild(bgImg);
    //       imgContainer.style.zIndex='-1';
    //       document.getElementById('app').style.background='transparent'
    //     }
    //    }catch(e){
    //        console.log(e)
    //    }
       
    }
    render() {
        return (
            <>
            <div className='bg' ref={(el)=>{imgContainer=el}}>
            </div>
            <div className='head'>
                <input onChange={(e)=>this.onChange(e.target.value)} />
            </div>
            <div className='catalogue-container'>
                {this.state.catalogue.map((el:catalogueEl,index)=>{
                    return <h3 key={index}> <a href={`${el.src}`}> {el.title} </a> </h3>
                })}
            </div>
            </>
        )
    }
}

ReactDOM.render(
    <Hello catalogue={catalogue} />
  , document.getElementById('app')
);
