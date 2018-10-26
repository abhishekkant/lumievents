const observableModule = require("data/observable");
//const ObservableProperty = require("../observable-property-decorator");
const config = require("~/shared/config");
const dialogsModule = require("ui/dialogs");
const fetchModule = require("fetch");

function PhotosViewModel() {
    const viewModel = observableModule.fromObject({
        uploadStatus: "Uploading..",
        items: [
            {
                name: "Item 1",
                url: "https://c2.staticflickr.com/4/3943/15129336464_580adb8b38_k.jpg"
            },
            {
                name: "Item 2",
                url: "https://c2.staticflickr.com/4/3943/15129336464_580adb8b38_k.jpg"
            },
            {
                name: "Item 3",
                url: "https://c2.staticflickr.com/4/3943/15129336464_580adb8b38_k.jpg"
            },
            {
                name: "Item 4",
                url: "https://c2.staticflickr.com/4/3943/15129336464_580adb8b38_k.jpg"
            },
            {
                name: "Item 5",
                url: "https://c2.staticflickr.com/4/3943/15129336464_580adb8b38_k.jpg"
            },
            {
                name: "Item 6",
                url: "https://c2.staticflickr.com/4/3943/15129336464_580adb8b38_k.jpg"
            }
           
           
        ],
        items1: [
        
        ],
        onload:function(index){
            var date = new Date();
            var d = date.getTime();
            let CurrentPhotosUrl=config.azPhotosTableUrl;
            
            //var CurrentDate="2018-12-15T02:30:00.000Z";
           // CurrentEventUrl = CurrentEventUrl.concat("?$filter=id%20eq%20'", id,"'");
           
            fetchModule.fetch(CurrentPhotosUrl, {
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
                            message:"No  Photo Found",
                            okButtonText: "OK"
                        });
                    }
                    else {
                                                   
                        viewModel.items1=data;
                        
                    }          
            }
            else {
                dialogsModule.alert({
                    message:"No  Photo Found",
                    okButtonText: "OK"
                }); 
            } 
         });
    },
    });

    return viewModel;
}

module.exports = PhotosViewModel;
