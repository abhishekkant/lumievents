const observableModule = require("data/observable");

function PhotosViewModel() {
    const viewModel = observableModule.fromObject({
        uploadStatus: "Uploading.."
    });

    return viewModel;
}

module.exports = PhotosViewModel;
