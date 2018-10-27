const HomeItemsViewModel = require("./home-items-view-model");
const frameModule = require("ui/frame");
const segmentedBarModule = require("tns-core-modules/ui/segmented-bar");
const config = require("~/shared/config");

function onNavigatingTo(args) {
    const component = args.object;
    component.bindingContext = new HomeItemsViewModel();
    component.bindingContext.onload();
    
}

function edit(args) {
    var target = args.object;
    var index = target.index;
   
    //var homemodel = new HomeItemsViewModel();
   // homemodel.edit(index);
     var navigationOptions={
       moduleName:'editEvent/editEvent-page',
      context:index
        }

        frameModule.topmost().navigate(navigationOptions);
   // alert(index);
};
function onAddTap(args) {
    const button = args.object;
    const page = button.page;
    page.frame.navigate("addEvents/addEvents-page");
}
function onItemTap(args) {
    const view = args.view;
    const page = view.page;
    const tappedItem = view.bindingContext;

    page.frame.navigate({
        moduleName: "home/home-item-detail/home-item-detail-page",
        context: tappedItem,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}
exports.onAddTap = onAddTap;
exports.onItemTap = onItemTap;
exports.onNavigatingTo = onNavigatingTo;
exports.edit = edit;

