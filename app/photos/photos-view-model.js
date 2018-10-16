const observableModule = require("data/observable");

function PhotosViewModel() {
    const viewModel = observableModule.fromObject({});

    return viewModel;
}

module.exports = PhotosViewModel;
