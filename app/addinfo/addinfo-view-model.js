const observableModule = require("data/observable");
const dialogsModule = require("ui/dialogs");
const fetchModule = require("fetch");
const config = require("~/shared/config");

function AddinfoViewModel() {
    const viewModel = observableModule.fromObject({
        message:"",
        addinfo:function(){
            
          let CurrentNotificationsUrl=config.azNotificationsTableUrl;
        
             fetch(CurrentNotificationsUrl, {
                 method: "POST",
                 headers: { "Content-Type": "application/json","ZUMO-API-VERSION":"2.0.0" },
                 body: JSON.stringify({
                    message:this.message,
                 })
             }).then((r) => r.json())
                 .then((response) => {
                    
                     //const result = response;
                     if (response !== undefined) {
                        if (response.length === 0) {
                            dialogsModule.alert({
                                message:"Notifications not send",
                                okButtonText: "OK"
                            }); 
                               
                        } else {
                            dialogsModule.alert({
                                message:"Notifications Send successfully!",
                                okButtonText: "OK"
                            }); 
                           this.message="";
                        } 
                     }
                     else {
                        dialogsModule.alert({
                            message:"Notifications not send",
                            okButtonText: "OK"
                        }); 
                    }
                 })
                 .catch((e) => {
                     alert(e);
                 });

            
     },

    });

    return viewModel;
}

module.exports = AddinfoViewModel;
