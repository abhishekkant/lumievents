const InfoViewModel = require("./info-view-model");
const Page = require("tns-core-modules/ui/page").Page;

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize the page binding context.
*************************************************************/
function onNavigatingTo(args) {
    const page = args.object;
    const notificationList = new InfoViewModel();
    page.bindingContext = notificationList;
    notificationList.emptyNotifications();
    notificationList.getNotifications();
    const lView = page.getViewById("notificationsListView");
    lView.animate({
        opacity: 1,
        duration: 1000
    });
}

function onAddTap(args) {
    const button = args.object;
    const page = button.page;
    page.frame.navigate("addinfo/addinfo-page");
}

exports.onAddTap = onAddTap;

exports.onNavigatingTo = onNavigatingTo;
