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
        update:function(){
                
               // alert(this.EventName);
               // alert(this.EventVenue);
              //  alert(this.EventDate);
              //  alert(this.imageurl);
                // alert(this.id);
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
                    });

               
        },
        onload:function(index){
           // var date = new Date();
           // var d = date.getTime();
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
