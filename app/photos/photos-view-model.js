const observableModule = require("data/observable");
//const ObservableProperty = require("../observable-property-decorator");
const config = require("~/shared/config");
const dialogsModule = require("ui/dialogs");
const fetchModule = require("fetch");
const ObservableArray = require("data/observable-array").ObservableArray;
const nsAzureStorage = require("nativescript-azure-storage");
const imageSourceModule = require("tns-core-modules/image-source");
const imagepicker = require("nativescript-imagepicker");

function PhotosViewModel() {

    const viewModel = observableModule.fromObject({
        uploadStatus: "Uploading..",
        isBusy: false,
        photosList: new ObservableArray([]),


        selectPhoto: function() {
            // Use SharedKeyCredential with storage account and account key
            //const blobService = azure.createBlobService();
            const mycontainer = config.AzureContainer;
            const azureNSStorage = new nsAzureStorage.NativeScriptAzureStorage(config.AZURE_STORAGE_CONNECTION_STRING);
            const blobName = "sample.png";
            const context = imagepicker.create({ mode: "single" }); // use "multiple" for multiple selection
            context
            .authorize()
            .then(() => context.present())
            .then((selection) => {
                selection.forEach((selected) => {
                    // process the selected image
                    // Create a blob
                    let path = selected.android;
                    //const folder = fileSystemModule.knownFolders.currentApp();
                    //const path = fileSystemModule.path.join(folder.path, "images/logo.png");
                    const imageFromLocalFile = imageSourceModule.fromFile(path);
                    
                   let base64string = imageFromLocalFile.toBase64String("jpg");
                   
                  // var buffer = new Buffer(base64string, 'base64');
                   azureNSStorage.uploadBlob(mycontainer, blobName, base64string)
                   .then((data) => {
                       console.log("Uploaded successfuly");
                       // Update the image description in the photos table
                       fetchModule("CurrentPhotosUrl", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                url: "blobname",
                                uploadedby:"3701",
                                active:true,
                                description:"Beach Image"
                            })
                        }).then((r) => r.json())
                            .then((response) => {
                                const result = response.json;
                            }).catch((e) => {
                            });

                       
                   })
                   .catch((err) => console.log(`Error uploading: ${err}`));
                   
                    
                //    var blobService = nsAzureStorage.createBlobService();
                //    blobService.createBlockBlobFromLocalFile(mycontainer, blobName, path, function(error, result, response) {
                //        if (!error) {
                        
                //            // file uploaded 
                //             alert(`Uploaded successfuly`);
                //        }
                //        else{
                //            alert(error);
                //        }
                //      })
        
                //     const execute = async () => {
                //     response = await uploadLocalFile(mycontainer, localFilePath);
                //     }
        
                //     execute().then(() => console.log("Done")).catch((e) => console.log(e));
                 });
               // list.items = selection;
            }).catch((e) => {
                console.log(e);
            });
        },

        onload: function(index) {
            this.isBusy = true;

            const CurrentPhotosUrl = config.azPhotosTableUrl + "/?orderby=createdAt%20desc";
            
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
                            data.forEach((noti) => {
                                this.photosList.push({
                                    url: noti.url,
                                    description: noti.description,
                                    uploadedby: noti.uploadedby
                                });
                            });
                        }
                    }
                else {
                    dialogsModule.alert({
                        message:"No  Photo Found",
                        okButtonText: "OK"
                    });
                 }
                 this.isBusy = false;
            });
        }
    });

    return viewModel;
}

module.exports = PhotosViewModel;
