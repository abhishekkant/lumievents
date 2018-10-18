const observableModule = require("tns-core-modules/data/observable");
const frameModule = require("tns-core-modules/ui/frame");
const dialogsModule = require("ui/dialogs");
const fetchModule = require("fetch");
const config = require("~/shared/config");

function HomeItemsViewModel() {
    const viewModel = observableModule.fromObject({
             
        allSessions: [
            ],

        items: [
            {
                name: "Item 1",
                description: "Description for Item 1"
            },
            {
                name: "Item 2",
                description: "Description for Item 2"
            },
            {
                name: "Item 3",
                description: "Description for Item 3"
            },
            {
                name: "Item 4",
                description: "Description for Item 4"
            },
            {
                name: "Item 5",
                description: "Description for Item 5"
            },
            {
                name: "Item 6",
                description: "Description for Item 6"
            },
            {
                name: "Item 7",
                description: "Description for Item 7"
            },
            {
                name: "Item 8",
                description: "Description for Item 8"
            },
            {
                name: "Item 9",
                description: "Description for Item 9"
            },
            {
                name: "Item 10",
                description: "Description for Item 10"
            },
            {
                name: "Item 11",
                description: "Description for Item 11"
            },
            {
                name: "Item 12",
                description: "Description for Item 12"
            }
        ],
        selectedDay:"Day 2",
        CurrentEventName:"",
        CurrentEventVenue:"",
        CurrentEventDate:"",
        CurrentEventEndDate:"",
        CurrentEventImage:"",
      
        // edit: function (index) {
        //     //alert(index);
        //             let EventUrl=config.azEventsTableUrl;
        //             var id=index;
        //             EventUrl = EventUrl.concat("?$filter=id%20eq%20'", id,"'");
                
        //             fetchModule.fetch(CurrentEventUrl, {
        //                 headers: {
        //                     "ZUMO-API-VERSION":"2.0.0"
        //                 }
        //             })
        //             .then((response) => {
        //                 if (!response.ok) {
        //                     console.log(JSON.stringify(response));
        //                 }
        //                 else {
        //                     console.log(JSON.stringify(response));
            
        //                     return response.json();
        //                 }
        //             })
        //             .then((data) => {
        //             if (data !== undefined) {
        //                 if (data.length === 0) {
        //                         dialogsModule.alert({
        //                             message:"No Current Event Found",
        //                             okButtonText: "OK"
        //                         });
        //                     }
        //                     else {
        //                         data.forEach((noti) => {
        //                             viewModel.CurrentEventName = noti.name;
        //                             viewModel.CurrentEventVenue = noti.venue;
        //                             viewModel.CurrentEventDate = noti.start;
        //                             viewModel.CurrentEventImage= noti.imageurl;
        //                             });
        //                     // viewModel.allSessions=data;
                            
        //                     }          
        //             }
        //             else {
        //                 dialogsModule.alert({
        //                     message:"No Current Event Found",
        //                     okButtonText: "OK"
        //                 }); 
        //             } 
        //         });
            
          
        //     },

        onload: function () {
          
            let CurrentEventUrl=config.azEventsTableUrl;
            var CurrentDate="2018-12-15T06:30:00.000Z";
            CurrentEventUrl = CurrentEventUrl.concat("?$filter=start%20eq%20'", CurrentDate,"'");
           
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
                            message:"No Current Event Found",
                            okButtonText: "OK"
                        });
                    }
                    else {
                        data.forEach((noti) => {
                            viewModel.CurrentEventName = noti.name;
                            viewModel.CurrentEventVenue = noti.venue;
                            viewModel.CurrentEventDate = noti.start;
                            viewModel.CurrentEventImage= noti.imageurl;
                            viewModel.CurrentEventEndDate=noti.end;
                            });
                       // viewModel.allSessions=data;
                       
                    }          
            }
            else {
                dialogsModule.alert({
                    message:"No Current Event Found",
                    okButtonText: "OK"
                }); 
            } 
         });
    
    
    
           /* FOR LIST BINDING  */
            let Eventsurl = config.azEventsTableUrl;
            Eventsurl = Eventsurl.concat("?$filter=start%20ne%20'", CurrentDate,"'");
            fetchModule.fetch(Eventsurl, {
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
                            message:"No Event Found",
                            okButtonText: "OK"
                        });
                    }
                    else {
                      
                        viewModel.allSessions=data;
                       
                    }          
            }
            else {
                dialogsModule.alert({
                    message:"No Event Found",
                    okButtonText: "OK"
                }); 
            }
    
           
        });
    
        },
    });

    return viewModel;
}

module.exports = HomeItemsViewModel;
