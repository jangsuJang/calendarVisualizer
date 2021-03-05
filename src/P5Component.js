import P5Wrapper from 'react-p5-wrapper';
import { eventList } from './App';
import Star from './Star'


export default function sketch (p) {
  const p5 = p
  let rotation = 0;
  let x =0
  let m_star = new Star(p5,10,10, 20);

  p5.setup = function () {
    p5.createCanvas(600, 1200, p.WEBGL);

  };

  p5.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.rotation !== null){
      rotation = props.rotation * Math.PI / 180;
    }
  };

  p5.draw = function () {
   p5.background(100);
   //even List의 갯수만큼 m_star를 생서
   //event List의 변화가 감지되면 그거에 대해되는 스타
  //  console.log(eventList)
//   p.rect(x,30,100,100);
   m_star.updateStar();
   
//   x++;
   }
   
  
 }