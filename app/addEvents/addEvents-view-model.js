const observableModule = require("data/observable");
const dialogsModule = require("ui/dialogs");
const fetchModule = require("fetch");
const config = require("~/shared/config");

function AddEventsViewModel() {
    const viewModel = observableModule.fromObject({
        EventName:"",
        EventVenue:" ",
        EventDate:"",
        EventEndDate:"",
        id:"",
        imageurl:"",
        index:"",
        currentYear:"",
        currentMonth:"",
        currentDay:"",
        currentHour:"",
        currentMinute:"",
        EndYear:"",
        EndMonth:"",
        EndDay:"",
        EndHour:"",
        EndMinute:"",
        addevent:function(){
           this.EventDate= this.currentYear+"-"+this.currentMonth+"-"+this.currentDay+"T"+this.currentHour+":"+this.currentMinute+":00.000Z";
           this.EventEndDate= this.EndYear+"-"+this.EndMonth+"-"+this.EndDay+"T"+this.EndHour+":"+this.EndMinute+":00.000Z";
           let CurrentEventUrl=config.azEventsTableUrl;
             fetch(CurrentEventUrl, {
                 method: "POST",
                 headers: { "Content-Type": "application/json","ZUMO-API-VERSION":"2.0.0" },
                 body: JSON.stringify({
                     start:this.EventDate,
                     end: this.EventEndDate,
                     name: this.EventName,
                     imageurl:"https://c2.staticflickr.com/4/3943/15129336464_580adb8b38_k.jpg",
                     venue:this.EventVenue,
                     active:true,
                 })
             }).then((r) => r.json())
                 .then((response) => {
                    
                    //const result = response;
                    if (response !== undefined) {
                       if (response.length === 0) {
                           dialogsModule.alert({
                               message:"Event not Added",
                               okButtonText: "OK"
                           }); 
                              
                       } else {
                           dialogsModule.alert({
                               message:"Event add successfully!",
                               okButtonText: "OK"
                           }); 
                          this.message="";
                       } 
                    }
                    else {
                       dialogsModule.alert({
                           message:"Event not Added",
                           okButtonText: "OK"
                       }); 
                   }
                }).catch((e) => {
                     alert(e);
                 });

            
     }

    });

    return viewModel;
}

module.exports = AddEventsViewModel;
