import React = require('react') ;
import ReactDOM = require ('react-dom')
// import React from 'react' ;
// import ReactDOM from'react-dom';
import './style.scss'
import './img/SAVE_20190920_140911.jpg'
import catalogue = require('./catalogue.json')
console.log(catalogue,'catalogue')

interface catalogueEl { src:string ; title :string };
interface HelloProps { compiler: string; framework: string; catalogue:Array<any>};
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
let imgContainer:any;
class Hello extends React.Component<HelloProps, {catalogue:Array<any>}> {

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
       let bgImg = document.createElement("img");
       try{
        bgImg.setAttribute("src",'./outdist/SAVE_20190920_140911.jpg');
        bgImg.style.width="100%";
        bgImg.style.height="100%";
        bgImg.onload=function(){
          imgContainer.appendChild(bgImg);
          imgContainer.style.zIndex='-1';
          document.getElementById('app').style.background='transparent'
        }
       }catch(e){
           console.log(e)
       }
       
    }
    render() {
        return (
            <>
            <div className='bg' ref={(el)=>{imgContainer=el}}></div>
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
    <Hello compiler="TypeScript" framework="React" catalogue={catalogue} />
  , document.getElementById('app')
);
