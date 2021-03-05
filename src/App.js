import './App.css';
import sketch  from './P5Component'
import GoogleCalendar from './GoogleCalendar';
import P5Wrapper from 'react-p5-wrapper';
import React,{useEffect, useState} from 'react'
import { gapi, getCalendars, getAllEvent, initGapi} from './CalendarAPI/calendarAPI';
// import ApiCalendar from 'react-google-calendar-api';

export let eventList = []

function App() {
  const [calendars,setCalendars] = useState([]);
  const [calendarLoaded, setCalendarLoaded] = useState(false)
  const [selectedCalendar, setSelectedCalendar] = useState(null)
  const [events,setEvents] = useState([])

  const printCalendars = () =>{
    getCalendars().then((result)=>{
      setCalendars(result)
    })
  }
  useEffect(()=>{
    if(calendars.length===0){
      console.log("empty")
    }
    else{
      console.log(calendars)
      setCalendarLoaded(true)
    }
  },[calendars])


  useEffect(()=>{
    initGapi()
  },[])


  //handle change and set selected Calenar
  const handleChange=(event)=>{
    setSelectedCalendar(event.target.value)
  }

  useEffect(()=>{
    if(selectedCalendar !== null){
      console.log(selectedCalendar)
    }
  },[selectedCalendar])


  const CalendarSelector = ({calendar}) => {
    return(
      <div>
        <input type="radio" name="name" onChange={handleChange} value={calendar.id}/>
        <label>{calendar.summary}</label>
      </div>
    );

    // <form><input type="radio" name="fruit" value="사과"/></form>
  }


  useEffect(()=>{
    eventList = events
    console.log(eventList)

  },[events])
  const visualizeCalendar = () => {
    getAllEvent(selectedCalendar).then(events=>setEvents(events))
  }


  return (
    <div className="App">
      webVisualizer
      <GoogleCalendar/>
      <button onClick={printCalendars}>Select Calendar</button>

      {
       calendarLoaded ? (
         <>
          <form>
              <div>Please Select Calendar You Want to Visualize</div>

              {
                calendars.map((calendar)=>(
                  <CalendarSelector calendar={calendar}/>
                ))
              }
          </form>
          <button onClick={visualizeCalendar}>Visualize this calendar</button>
          <P5Wrapper sketch={sketch}/>
         </>
       ): null
      }
    </div>
  );
}

export default App;
