const observableModule = require("tns-core-modules/data/observable");

function HomeItemsViewModel() {
    const viewModel = observableModule.fromObject({
        allSessions: [
            {
                title:"Test Event 1",
        start:new Date(2018, 12, 20, 8, 0),
        end:new Date(2018, 12, 20, 8, 0),
        venue:"Room 1",
        active:true,
        eventimage:""

    },
    {
        title:"Test Event 2",
start:new Date(2018, 12, 20, 9, 0),
end:new Date(2018, 12, 20, 10, 0),
venue:"Room 1",
active:true,
eventimage:""

}


        ],

        items: [
            {
                name: "Item 1",
                description: "Description for Item 1"
            },
            {
                name: "Item 2",
                description: "Description for Item 2"
            },
            {
                name: "Item 3",
                description: "Description for Item 3"
            },
            {
                name: "Item 4",
                description: "Description for Item 4"
            },
            {
                name: "Item 5",
                description: "Description for Item 5"
            },
            {
                name: "Item 6",
                description: "Description for Item 6"
            },
            {
                name: "Item 7",
                description: "Description for Item 7"
            },
            {
                name: "Item 8",
                description: "Description for Item 8"
            },
            {
                name: "Item 9",
                description: "Description for Item 9"
            },
            {
                name: "Item 10",
                description: "Description for Item 10"
            },
            {
                name: "Item 11",
                description: "Description for Item 11"
            },
            {
                name: "Item 12",
                description: "Description for Item 12"
            }
        ],
        selectedDay:"Day 2"
    });

    return viewModel;
}

module.exports = HomeItemsViewModel;
