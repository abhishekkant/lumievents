const PhotosViewModel = require("./photos-view-model");
var imagepicker = require("nativescript-imagepicker");

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new PhotosViewModel();
}

function selectPhoto() {
    const context = imagepicker.create({ mode: "single" }); // use "multiple" for multiple selection
    context
    .authorize()
    .then(() => {
        return context.present();
    })
    .then((selection) => {
        selection.forEach((selected) => {
            // process the selected image
            
        });
       // list.items = selection;
    }).catch((e) => {
        // process error
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.selectPhoto = selectPhoto;
