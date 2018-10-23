const PhotosViewModel = require("./photos-view-model");
const imagepicker = require("nativescript-imagepicker");
//const image2base64 = require('image-to-base64');
//const Crypto = require('crypto');
// const path = require('path');
// const util = require("util");
// const stream = require("stream");
// const emitter = require("emitter");
const nsAzureStorage  = require('nativescript-azure-storage');
const config = require("~/shared/config");
//const platform = require("tns-core-modules/platform");
const imageSourceModule = require("tns-core-modules/image-source");
//const fileSystemModule = require("tns-core-modules/file-system");


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
    let azureNSStorage = new nsAzureStorage.NativeScriptAzureStorage(config.AZURE_STORAGE_CONNECTION_STRING);
    const blobName = "sample.jpg";
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
            
           let base64string = imageFromLocalFile.toBase64String('jpg');
           azureNSStorage.uploadBlob(mycontainer, blobName, base64string)
           .then(() => console.log(`Uploaded successfuly`))
           .catch((err) => console.log(`Error uploading: ${err}`));
           
            


        //     const execute = async () => {
        //     response = await uploadLocalFile(mycontainer, localFilePath);
        //     }

        //     execute().then(() => console.log("Done")).catch((e) => console.log(e));
         });
       // list.items = selection;
    }).catch((e) => {
        // process error
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.selectPhoto = selectPhoto;
