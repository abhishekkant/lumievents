const observableModule = require("tns-core-modules/data/observable");
const dialogsModule = require("ui/dialogs");
const fetchModule = require("fetch");
const config = require("~/shared/config");
const appSettings = require("application-settings");
const moment = require("moment");

function BrowseViewModel() {
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
        url: "",
        allSessions: [],
        WorkingDate:config.EventStartDate,
        WorkingDateEnd:"2018-12-16T23:59:00.000Z",
        CurrentEventName:"",
        CurrentEventVenue:"",
        CurrentEventDate:"",
        CurrentEventEndDate:"",
        CurrentEventImage:"",
        onload: function () {
            
            // const page = sbargs.object.page;
            // const vm = page.bindingContext;
            // const wdate2 = moment(config.EventStartDate);
            // vm.set("WorkingDateEnd", wdate2.add('23:59', "hour").format());
            //CurrentEventUrl = CurrentEventUrl.concat("?$filter=start%20eq%20'", viewModel.WorkingDate,"'");
            
            let CurrentEventUrl = config.azEventsTableUrl;
            CurrentEventUrl = CurrentEventUrl.concat("?$filter=start%20gt%20'", viewModel.WorkingDate,"'%20and%20start%20le%20 '", viewModel.WorkingDateEnd,"' &$orderby=start%20asc%20&$top=1");
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
        },
    });

    return viewModel;
}

module.exports = BrowseViewModel;
