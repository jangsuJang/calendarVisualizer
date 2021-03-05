import P5Wrapper from 'react-p5-wrapper';
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
//   p.rect(x,30,100,100);
   m_star.updateStar();
   
//   x++;
   }
   
  
 }