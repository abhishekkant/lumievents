const HomeItemsViewModel = require("./home-items-view-model");
const frameModule = require("ui/frame");
const segmentedBarModule = require("tns-core-modules/ui/segmented-bar");

function onNavigatingTo(args) {
    const component = args.object;
    component.bindingContext = new HomeItemsViewModel();
    component.bindingContext.onload();
    
}


function sbLoaded(args) {
    const segmentedBarComponent = args.object;
    segmentedBarComponent.on("selectedIndexChange", (sbargs) => {
        const page = sbargs.object.page;
        const vm = page.bindingContext;
        const selectedIndex = sbargs.object.selectedIndex;
        vm.set("prop", selectedIndex);
        switch (selectedIndex) {
            case 0:
                vm.set("visibility1", true);
                vm.set("visibility2", false);
                vm.set("visibility3", false);
                break;
            case 1:
                vm.set("visibility1", false);
                vm.set("visibility2", true);
                vm.set("visibility3", false);
                break;
            case 2:
                vm.set("visibility1", false);
                vm.set("visibility2", false);
                vm.set("visibility3", true);
                break;
            default:
                break;
        }
    });

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
exports.sbLoaded =  sbLoaded;
exports.edit =  edit;

