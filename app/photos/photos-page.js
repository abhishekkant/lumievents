const PhotosViewModel = require("./photos-view-model");
const imagepicker = require("nativescript-imagepicker");
//const image2base64 = require("image-to-base64");
//const Crypto = require("crypto");
// const path = require("path");
// const util = require("util");
// const stream = require("stream");
// const emitter = require("emitter");
const nsAzureStorage = require("nativescript-azure-storage");
const config = require("~/shared/config");
//const platform = require("tns-core-modules/platform");
const imageSourceModule = require("tns-core-modules/image-source");
//const fileSystemModule = require("tns-core-modules/file-system");
const bghttp = require("nativescript-background-http");
const session = bghttp.session("file-upload");
const fileSystemModule = require("tns-core-modules/file-system");
var azure = require('fast-azure-storage')
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new PhotosViewModel();
}

/*function base64Encode(value) {
    if (isIOS) {
      let text = NSString.stringWithString(value);
      let data = text.dataUsingEncoding(NSUTF8StringEncoding);
      return data.base64EncodedStringWithOptions(0);
    } else {
      let text = new java.lang.String(value);
      let data = text.getBytes("UTF-8");
      return android.util.Base64.encodeToString(data, android.util.Base64.DEFAULT);
    }

const uploadLocalFile = async (mycontainer, filePath) => {
    return new Promise((resolve, reject) => {
        const fullPath = path.resolve(filePath);
        const blobName = path.basename(filePath);
        blobService.createBlockBlobFromLocalFile(containerName, blobName, fullPath, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Local file "${filePath}" is uploaded` });
            }
        });
    });
};*/
    

function selectPhoto() {
    // Use SharedKeyCredential with storage account and account key
    //const blobService = azure.createBlobService();
    const mycontainer = config.AzureContainer;
    const azureNSStorage = new nsAzureStorage.NativeScriptAzureStorage(config.AZURE_STORAGE_CONNECTION_STRING);
    const blobName = "sample.png";
    const context = imagepicker.create({ mode: "single" }); // use "multiple" for multiple selection
    context
    .authorize()
    .then(() => {
        return context.present();
    })
    .then((selection) => {
        selection.forEach((selected) => {
            // process the selected image
            // Create a blob
            let path = selected.android;
            //const folder = fileSystemModule.knownFolders.currentApp();
            //const path = fileSystemModule.path.join(folder.path, "images/logo.png");
            const imageFromLocalFile = imageSourceModule.fromFile(path);
            
           let base64string = imageFromLocalFile.toBase64String('png');
           
          // var buffer = new Buffer(base64string, 'base64');
           azureNSStorage.uploadBlob(mycontainer, blobName, base64string)
           .then(() => alert(`Uploaded successfuly`))
           .catch((err) => alert(`Error uploading: ${err}`));
           
            
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
        alert(e);
    });
}


function selectPhoto2() {
 
//     //Generating Unique Image Name Using Time.
// vard=newDate();
// vart=d.getTime();
// this.picName="Upload"+t.toString()+".jpg";
  



    const mycontainer = config.AzureContainer;
    const azURL = "https://lumievents.blob.core.windows.net/" + mycontainer;
    const blobName = "sample2.jpg";
    const context = imagepicker.create({ mode: "single" }); // use "multiple" for multiple selection
    context
    .authorize()
    .then(() => {
        return context.present();
    })
    .then((selection) => {
        selection.forEach((selected) => {

            // Check file size is lower than 256MB
            // process the selected image
            // Create a blob

          

            let path = selected.android;
            let imageFromLocalFile = imageSourceModule.fromFile(path);
            let base64string = imageFromLocalFile.toBase64String('png');
// Common options using shared key authentication
var options = {
    accountId:"eventresources",
    accessKey:"gZJNy2J0LnZYKN+jhbs0ZjrFhCIRhX4/LBQtwv96+V0TO+x/OazEF7zQ3EWNnBYYi7oVYH1JdWNIwDZsoonw1A=="
  };
  var blob  = new azure.Blob(options);
  var buffer = new Buffer(base64string, 'base64');
  var blobContent = buffer;//'Sample content'; // The content can be a string or a Buffer
// Create container and upload a blob
blob.createContainer(mycontainer).then(function() {
  return blob.putBlob(mycontainer, blobName, {
    type:  'BlockBlob',     // Type of the blob 
  }, blobContent);
});







            var blobService = azure.createBlobService();
 
blobService.createBlockBlobFromLocalFile(mycontainer, blobName, path, function(error, result, response) {
  if (!error) {
    // file uploaded
    
  }
  else {
    alert(error);
  }
});
            
        //     let imageFromLocalFile = imageSourceModule.fromFile(path);
        //     let imageFile = fileSystemModule.File.fromPath(path);
            
        //     let binarySource = imageFile.readSync((err) => {
        //         console.log(err);
        //     });

        //     var stats = fileSystemModule.statSync(path);
        //     var fileSizeInBytes = stats["size"];
        //    // let filesize = imageFile.filesize; //binarySource.size;
        //    let base64string = imageFromLocalFile.toBase64String("jpg");

        //     let constrequest =
        //             {
        //             url:azURL,
        //             method:"PUT",
        //             headers:
        //             {
        //             "cache-control":"no-cache",
        //             "x-ms-blob-content-disposition":"attachment;",
        //             "x-ms-meta-m2":"v2",
        //             "x-ms-meta-m1":"v1",
        //             "x-ms-blob-type":"BlockBlob",
        //             "Content-Type":"application/octet-stream",
        //             "File-Name":"abhi.jpg",
        //             "x-ms-date":"2018-10-24", //Provide date
        //             "x-ms-version":"2018-03-28",
        //             "Content-Length": ileSizeInBytes,
        //             "Authorization": "SharedKey eventresources:gZJNy2J0LnZYKN+jhbs0ZjrFhCIRhX4/LBQtwv96+V0TO+x/OazEF7zQ3EWNnBYYi7oVYH1JdWNIwDZsoonw1A=="
        //             },
        //             description:{ "uploading": '+ path +"' },
        //             };

        //             const task = session.uploadFile(path, constrequest);
        //             task.on("complete", (event) => {
        //                 alert(path);
        //             console.log("Uploaded `"+  path +"`");
        //             });

        //             task.on("error", event=> {
        //             console.log(event);
        //             console.log("Could not upload `"+ path +"`. "+event.eventName);
        //             });         
        //                     });
                      
                      
                      
                            // list.items = selection;
                        }).catch((e) => {
                            alert(e);
                        });
}

function selectPhoto3() {
    // var folder = fs.knownFolders.documents();
    //         var pathOfImage = fs.path.join(folder.path, "Test.png");
    //       // var saved = image.saveToFile(path,".png");
    //        var request = 
    //                {
    //                    url : azURL,
    //                        method : "POST",
    //                        headers : {
    //                    "Content-Type" : "application/octet-stream",
    //                    "Authorization": "SharedKey eventresources:gZJNy2J0LnZYKN+jhbs0ZjrFhCIRhX4/LBQtwv96+V0TO+x/OazEF7zQ3EWNnBYYi7oVYH1JdWNIwDZsoonw1A=="
    //                }
    //            };
    //        var task1 = session.uploadFile(path,request);

    //        function onEvent(e) {
    //         console.log("event: " + e.eventName);
    //         if(e.object.description){
    //           console.log(e.object.description);
    //         }
    //         if(e.error){
    //           console.log(e.error);
    //         }
    //         if(e.currentBytes){
    //           console.log(e.currentBytes + " of " + e.totalBytes);
    //         }
    //         if(e.data){
    //           console.log(e.data);
    //         }
               
    //         if(e.eventName == "complete"){
    //              // mark blob as uploaded on QuickBlox side
    //             alert('OK');
    //         }
    //     }
    //        task1.on("complete", onEvent.bind(this));
}

exports.onNavigatingTo = onNavigatingTo;
exports.selectPhoto = selectPhoto;
exports.selectPhoto2 = selectPhoto2;
