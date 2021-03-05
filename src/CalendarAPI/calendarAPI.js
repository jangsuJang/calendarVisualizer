import apiGoogleConfig from "./apiGoogleConfig"

export const gapi = window.gapi
export const initGapi = () =>{
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({...apiGoogleConfig})
            window.gapi.client.load('calendar', 'v3', () => console.log(window.gapi.auth2.getAuthInstance()))
            window.gapi.auth2.getAuthInstance().signIn().then(()=>{
                console.log("hello")
            })
        })
    }
    document.body.appendChild(script);
}

export const getAllEvent = (cid = "jss8882@gmail.com") =>{
    // console.log(cid)
    return new Promise(function(resolve,reject){
        // calendarId
        //최근 한달의 스케줄 까지만 가져오도록
        //timeMax : 오늘 부터 한달 (31일)
        //timeMin : 지금 시간j
        let minDate= new Date()
        let maxDate= new Date()
        maxDate.setDate(maxDate.getDate()+30)

        const parameter = {
            'calendarId' : cid,
            'timeMax' : maxDate.toISOString(),
            'timeMin' : minDate.toISOString(),
        }

        var request = window.gapi.client.calendar.events.list({...parameter})

        request.execute(response=>{

            let events = [...response.items]
            resolve(events.map((event)=>{
                const {start} = event;
                const {end} = event;
                const {summary} = event;
                const eventType = start.date? "allDay" : "notAllDay"
                // console.log(eventType)
            
                return {
                    start,
                    end,
                    summary,
                    'eventType' : eventType,
                }


                
            }))
            console.log(response)
        })
        

    });
}

export const getCalendars = () =>{
    return new Promise(function(resolve,reject){
    console.log(window.gapi)
    var request = window.gapi.client.calendar.calendarList.list()
    request.execute(event=>{
        let calendars = [...event.items]
        // resolve([...event.items])
        resolve(calendars.map((calendar)=>{
            const {summary} = calendar;
            const {id} = calendar;
            return {id,summary};
        }))
    })

    })

}


{/* <script src="https://apis.google.com/js/api.js" type="text/javascript"></script> */}
