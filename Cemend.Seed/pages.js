(function (db) {
    db.pages.remove();

    db.pages.insert({
        _id: "/",
        parentId: null,
        title: 'root',
        layout: "MainLayout",
        placeholders:
        {
            top: [{ directive: "navigation" }],
            left: [{ directive: "testmodule", settings: { title: "Module 2" } }],
            content: [{ directive: "testmodule", settings: { title: "Module 1" } }, { directive: "testmodule", settings: { title: "Module 2" } }],
        }
    });

    db.pages.insert({
        _id: "/home",
        parentId: "/",
        title: 'home',
        layout: "MainLayout",
        placeholders:
        {
            top: [{ directive: "navigation" }],
            left: [{ directive: "testmodule", settings: { title: "Module 2" } }],
            content: [{ directive: "testmodule", settings: { title: "Module 1" } }, { directive: "testmodule", settings: { title: "Module 2" } }],
        }
    });

    db.pages.insert({
        _id: "/about",
        parentId: "/",
        title: 'about',
        layout: "MainLayout",
        placeholders:
        {
            top: [{ directive: "navigation" }],
            left: [{ directive: "testmodule", settings: { title: "Module 2" } }],
            content: [{ directive: "testmodule", settings: { title: "Module 1" } }, { directive: "testmodule", settings: { title: "Module 2" } }],
        }
    });
    

    db.pages.insert({
        _id: "/contact-us",
        parentId: "/",
        title: 'contact-us',
        layout: "MainLayout",
        placeholders:
        {
            top: [{ directive: "navigation" }],
            left: [{ directive: "testmodule", settings: { title: "Module 2" } }],
            content: [{ directive: "testmodule", settings: { title: "Module 1" } }, { directive: "testmodule", settings: { title: "Module 2" } }],
        }
    });

    db.pages.ensureIndex("parentId");
})(db);
