// recreate all pages
db.pages.remove();

db.pages.insert({
    _id: "/",
    layout: "MainLayout",
    settings:
    {
        placeholder: [{name: "testmodule",settings: {title: "Title 1"}}, {name: "testmodule",settings: {title: "Title 2"}}],
        placeholder2: [{ name: "testmodule", settings: { title: "Title 1" } }, { name: "testmodule", settings: { title: "Title 2" } }],
    }
});

db.pages.insert({
    _id: "/home",
    layout: "MainLayout",
    settings:
    {
        placeholder: [{ name: "testmodule", settings: { title: "Title 1" } }, { name: "testmodule", settings: { title: "Title 2" } }],
        placeholder2: [{ name: "testmodule", settings: { title: "Title 1" } }, { name: "testmodule", settings: { title: "Title 2" } }],
    }
});

db.pages.insert({
    _id: "/about",
    layout: "MainLayout",
    settings:
    {
        placeholder: [{ name: "testmodule", settings: { title: "Title 1" } }, { name: "testmodule", settings: { title: "Title 2" } }],
        placeholder2: [{ name: "testmodule", settings: { title: "Title 1" } }, { name: "testmodule", settings: { title: "Title 2" } }],
    }
});
