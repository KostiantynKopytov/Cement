// recreate all pages
(function (db) {
    db.pages.remove();

    db.pages.insert({
        _id: "/",
        layout: "MainLayout",
        placeholders:
        {
            left: [{ directive: "testmodule", settings: { title: "Module 1" } }, { directive: "testmodule", settings: { title: "Module 2" } }],
            content: [{ directive: "testmodule", settings: { title: "Module 1" } }, { directive: "testmodule", settings: { title: "Module 2" } }],
        }
    });

    db.pages.insert({
        _id: "/home",
        layout: "MainLayout",
        placeholders:
        {
            left: [{ directive: "testmodule", settings: { title: "Module 1" } }, { directive: "testmodule", settings: { title: "Module 2" } }],
            content: [{ directive: "testmodule", settings: { title: "Module 1" } }, { directive: "testmodule", settings: { title: "Module 2" } }],
        }
    });

    db.pages.insert({
        _id: "/about",
        layout: "MainLayout",
        placeholders:
        {
            left: [{ directive: "testmodule", settings: { title: "Module 1" } }, { directive: "testmodule", settings: { title: "Module 2" } }],
            content: [{ directive: "testmodule", settings: { title: "Module 1" } }, { directive: "testmodule", settings: { title: "Module 2" } }],
        }
    });
})(db);
