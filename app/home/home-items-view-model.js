const observableModule = require("tns-core-modules/data/observable");
const frameModule = require("tns-core-modules/ui/frame");
const dialogsModule = require("ui/dialogs");
const fetchModule = require("fetch");
const config = require("~/shared/config");
const appSettings = require("application-settings");
const moment = require("moment");


function HomeItemsViewModel() {
    const viewModel = observableModule.fromObject({
        
        allSessions: [],
        WorkingDate:config.EventStartDate,
        WorkingDateEnd:"2018-12-15T23:59:00.000Z",
        CurrentEventName:"",
        CurrentEventVenue:"",
        CurrentEventDate:"",
        CurrentEventEndDate:"",
        CurrentEventImage:"",
        Username:"",
        Role:"",
        sbSelectedIndex:0,

        sbLoaded2: function(sbargs) {
            // handle selected index change
            
                const page = sbargs.object.page;
                const vm = page.bindingContext;
                const selectedIndex = sbargs.object.selectedIndex;
                
                const wdate = new Date(config.EventStartDate);
                const wdate2 = moment(config.EventStartDate);
                switch (selectedIndex) {
                    case 0:
                        vm.set("WorkingDate", config.EventStartDate);
                        vm.set("WorkingDateEnd", wdate2.add(1, "days").format());
                        break;
                    case 1:
                        
                        vm.set("WorkingDate", wdate2.add(1, "days").format());
                        vm.set("WorkingDateEnd", wdate2.add(1, "days").format());
                        //vm.set("WorkingDateEnd", wdate2.hour(23.59, "hour").format());
                        
                        break;
                    case 2:
                        vm.set("WorkingDate", wdate2.add(2, "days").format());
                        vm.set("WorkingDateEnd", wdate2.add(1, "days").format());
                       // vm.set("WorkingDateEnd", wdate2.hour(23.59, "hour").format());
                        break;
                        case 3:
                        vm.set("WorkingDate", wdate2.add(3, "days").format());
                        vm.set("WorkingDateEnd", wdate2.add(1, "days").format());
                       // vm.set("WorkingDateEnd", wdate2.hour(23.59, "hour").format());
                        break;
                    default:
                        break;
                }
               // alert(this.WorkingDate);
                viewModel.WorkingDate=this.WorkingDate;
                viewModel.CurrentEventName = "";
                viewModel.CurrentEventVenue = "";
                viewModel.CurrentEventDate = "";
                viewModel.CurrentEventImage ="";
                viewModel.CurrentEventEndDate ="";
                viewModel.allSessions=[];
            this.onload();
        },
        onload: function () {
            
            //const CurrentDate = "2018-12-15T06:30:00.000Z";
            // let CurrentEventUrl = config.azEventsTableUrl;
            // CurrentEventUrl = CurrentEventUrl.concat("?$filter=start%20eq%20'", viewModel.WorkingDate,"'");
           
            // fetchModule.fetch(CurrentEventUrl, {
            //     headers: {
            //         "ZUMO-API-VERSION":"2.0.0"
            //     }
            // })
            // .then((response) => {
            //     if (!response.ok) {
            //         console.log(JSON.stringify(response));
            //     }
            //     else {
            //         console.log(JSON.stringify(response));
    
            //         return response.json();
            //     }
            // })
            // .then((data) => {
            //    if (data !== undefined) {
            //         if (data.length === 0) {
            //                 dialogsModule.alert({
            //                     message:"No Current Event Found",
            //                     okButtonText: "OK"
            //                 });
            //             }
            //         else {
            //             data.forEach((noti) => {
            //                 viewModel.CurrentEventName = noti.name;
            //                 viewModel.CurrentEventVenue = noti.venue;
            //                 viewModel.CurrentEventDate = new Date(noti.start).toLocaleString();
            //                 viewModel.CurrentEventImage = noti.imageurl;
            //                 viewModel.CurrentEventEndDate =new Date(noti.end).toLocaleString();
                           
            //                 });
            //            // viewModel.allSessions=data;
            //            viewModel.Username = appSettings.getString("username");
            //            viewModel.Role = appSettings.getString("role");
                       
            //         }
            //     }
            //     else {
            //         dialogsModule.alert({
            //             message:"No Current Event Found",
            //             okButtonText: "OK"
            //         });
            //     }
            // });

           /* FOR LIST BINDING  */
            let Eventsurl = config.azEventsTableUrl;
            const WorkingDatseEnd=this.WorkingDateEnd;
            // Eventsurl = Eventsurl.concat("?$orderby=start&$filter=active%20eq%20true&start%20ne%20'", viewModel.WorkingDate, "'");
            
            Eventsurl = Eventsurl.concat("?$filter=start%20gt%20'", new Date(viewModel.WorkingDate).toISOString(),"'%20and%20start%20le%20 '", new Date(viewModel.WorkingDateEnd).toISOString(),"' &$orderby=start%20asc%20");

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
                        viewModel.Role = appSettings.getString("role");
                      
                        Object.keys(data).map(
                            function(object){
                                data[object]["roll"] = viewModel.Role;
                          });
                      
                          data.forEach((record) => {
                                record.start = new Date(record.start).toLocaleString();
                                //record.start= record.start.getDate()  + "-" + (record.start.getMonth()+1) + "-" + record.start.getFullYear() + " " +
                               // record.start.getHours() + ":" + record.start.getMinutes();
                                record.end = new Date(record.end).toLocaleString();
                        });
                       
                        viewModel.allSessions = data;
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

        onselection: function (WorkingDate) {
              
            //const CurrentDate = "2018-12-15T06:30:00.000Z";
            let CurrentEventUrl = config.azEventsTableUrl;
            CurrentEventUrl = CurrentEventUrl.concat("?$filter=start%20eq%20'", WorkingDate,"'");
           
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
                            viewModel.CurrentEventDate = new Date(noti.start).toLocaleString();
                            viewModel.CurrentEventImage = noti.imageurl;
                            viewModel.CurrentEventEndDate =new Date(noti.end).toLocaleString();
                           
                            });
                       // viewModel.allSessions=data;
                       viewModel.Username = appSettings.getString("username");
                       viewModel.Role = appSettings.getString("role");
                       
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
            Eventsurl = Eventsurl.concat("?$orderby=start&$filter=active%20eq%20true&start%20ne%20'", this.WorkingDate, "'");
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
                        viewModel.Role = appSettings.getString("role");
                      
                        Object.keys(data).map(
                            function(object){
                                data[object]["roll"] = viewModel.Role;
                          });
                      
                          data.forEach((record) => {
                                record.start = new Date(record.start).toLocaleString();
                                //record.start= record.start.getDate()  + "-" + (record.start.getMonth()+1) + "-" + record.start.getFullYear() + " " +
                               // record.start.getHours() + ":" + record.start.getMinutes();
                                record.end = new Date(record.end).toLocaleString();
                        });
                       
                        viewModel.allSessions = data;
                    }          
            }
            else {
                dialogsModule.alert({
                    message:"No Event Found",
                    okButtonText: "OK"
                });
            }
     });
        }
    });

    return viewModel;
}

module.exports = HomeItemsViewModel;
