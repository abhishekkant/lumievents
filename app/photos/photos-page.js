const PhotosViewModel = require("./photos-view-model");

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new PhotosViewModel();
}

exports.onNavigatingTo = onNavigatingTo;
