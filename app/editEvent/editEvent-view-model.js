const observableModule = require("data/observable");
const frameModule = require("tns-core-modules/ui/frame");
const dialogsModule = require("ui/dialogs");
const fetchModule = require("fetch");
const config = require("~/shared/config");

function EditEventViewModel(id) {
    const viewModel = observableModule.fromObject({
        EventName:"test event",
        EventVenue:" Delhi",
        EventDate:"10/5/205",
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
        update:function(){
                
               // alert(this.EventName);
               // alert(this.EventVenue);
              //  alert(this.EventDate);
              //  alert(this.imageurl);
                // alert(this.id);
             //   "2018-12-15T02:30:00.000Z";
               
              this.EventDate= this.currentYear+"-"+this.currentMonth+"-"+this.currentDay+"T"+this.currentHour+":"+this.currentMinute+":00.000Z";
              this.EventEndDate= this.EndYear+"-"+this.EndMonth+"-"+this.EndDay+"T"+this.EndHour+":"+this.EndMinute+":00.000Z";
              let CurrentEventUrl=config.azEventsTableUrl;
              CurrentEventUrl = CurrentEventUrl.concat("/", this.id,"");
                fetch(CurrentEventUrl, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json","ZUMO-API-VERSION":"2.0.0" },
                    body: JSON.stringify({
                        start:this.EventDate,
                        end: this.EventEndDate,
                        name: this.EventName,
                        imageurl:this.imageurl,
                        venue:this.EventVenue
                    })
                }).then((r) => r.json())
                    .then((response) => {
                        if (!response.ok) {
                        const result = response;
                        if(this.id == result.id)
                            //alert(result.length);
                            alert("Event update Sucseefully!")
                        }
                        else {
                            alert("Event not update");
                        }
                    }).catch((e) => {
                        alert(e);
                    });

               
        },
        onload:function(index){
            var date = new Date();
            var d = date.getTime();
            let CurrentEventUrl=config.azEventsTableUrl;
            
            var CurrentDate="2018-12-15T02:30:00.000Z";
            CurrentEventUrl = CurrentEventUrl.concat("?$filter=id%20eq%20'", id,"'");
           
            fetchModule.fetch(CurrentEventUrl, {
                headers: {
                    "ZUMO-API-VERSION":"2.0.0"
                }
            })
            .then((response) => {
                if (!response.ok) {
                    console.log(JSON.stringify(response));
                }
                else {
                    console.log(JSON.stringify(response));
        
                    return response.json();
                }
            })
            .then((data) => {
               if (data !== undefined) {
                if (data.length === 0) {
                         dialogsModule.alert({
                            message:"No  Event Found",
                            okButtonText: "OK"
                        });
                    }
                    else {
                        data.forEach((noti) => {
                            viewModel.EventName = noti.name;
                            viewModel.EventVenue = noti.venue;
                            viewModel.EventDate = noti.start;
                            viewModel.imageurl= noti.imageurl;
                            viewModel.id= noti.id;
                            viewModel.EventEndDate=noti.end;
                            
                              
                            });
                           
                           
                         
                           var DateTimeArray = viewModel.EventDate.split('T');
                           var nDateArray= DateTimeArray[0].split('-');
                           var nTimeArray= DateTimeArray[1].split(':');
                           
                            viewModel.currentYear=nDateArray[0];
                            viewModel.currentMonth=nDateArray[1];
                            viewModel.currentDay=nDateArray[2];
                            viewModel.currentHour=nTimeArray[0];
                            viewModel.currentMinute=nTimeArray[1];
                           
                            // var startdate = new Date(viewModel.EventDate);
                            // startdate= new Date(startdate.toUTCString());

                            // viewModel.currentYear=startdate.getUTCFullYear();
                            // viewModel.currentMonth=startdate.getUTCMonth()+1;
                            // viewModel.currentDay=startdate.getUTCDate();
                            // viewModel.currentHour=startdate.getUTCHours();
                            // viewModel.currentMinute=startdate.getUTCMinutes();
                      
                            var EndDateTimeArray = viewModel.EventEndDate.split('T');
                            var EndnDateArray= EndDateTimeArray[0].split('-');
                            var EndnTimeArray= EndDateTimeArray[1].split(':');
                            
                             viewModel.EndYear=EndnDateArray[0];
                             viewModel.EndMonth=EndnDateArray[1];
                             viewModel.EndDay=EndnDateArray[2];
                             viewModel.EndHour=EndnTimeArray[0];
                             viewModel.EndMinute=EndnTimeArray[1];


                            // var enddate = new Date(viewModel.EventEndDate);
                            // enddate= new Date(enddate.toUTCString());
                            // viewModel.EndYear=enddate.getUTCFullYear();
                            // viewModel.EndMonth=enddate.getUTCMonth()+1;
                            // viewModel.EndDay=enddate.getUTCDate();
                            // viewModel.EndHour=enddate.getUTCHours();
                            // viewModel.EndMinute=enddate.getUTCMinutes();
                            // viewModel.allSessions=data;
                       
                    }          
            }
            else {
                dialogsModule.alert({
                    message:"No  Event Found",
                    okButtonText: "OK"
                }); 
            } 
         });
    },
        
    });
   // var id=page.navigationContext;
   // alert(id);
   
    

    return viewModel;
}

module.exports = EditEventViewModel;
