import apiGoogleConfig from "./apiGoogleConfig"

export const gapi = window.gapi
export const initGapi = () =>{
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => {
        gapi.load('client:auth2', () => {
            gapi.client.init({...apiGoogleConfig})
            gapi.client.load('calendar', 'v3', () => console.log(gapi.auth2.getAuthInstance()))
            gapi.auth2.getAuthInstance().signIn().then(()=>{
                console.log("hello")
            })
        })
    }
    document.body.appendChild(script);
}

export const getAllEvent = (cid = "jss8882@gmail.com") =>{
    // console.log(cid)
    return new Promise(function(resolve,reject){
        console.log(gapi.client)
        // calendarId
        var request = gapi.client.calendar.events.list({'calendarId':cid})

        request.execute(response=>{
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
