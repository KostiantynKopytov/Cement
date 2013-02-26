(function (db) {
    db.pages.remove();

    db.pages.insert({
        _id: "/",
        parentId: null,
        title: 'home',
        layout: "MainLayout",
        placeholders:
        {
            top: [{ directive: "navigation" }],
            left: [{ directive: "testmodule", settings: { title: "Module 2 home home home" } }],
            content: [{ directive: "testmodule", settings: { title: "Module 1" } }, { directive: "testmodule", settings: { title: "Module 2" } }],
        }
    });

    db.pages.insert({
        _id: "/about",
        parentId: null,
        title: 'about',
        layout: "CustomLayout",
        placeholders:
        {
            top: [{ directive: "navigation" }],
            left: [{ directive: "testmodule", settings: { title: "Module 2 about about" } }],
            content: [{ directive: "testmodule", settings: { title: "Module 1" } }, { directive: "testmodule", settings: { title: "Module 2" } }],
        }
    });
    

    db.pages.insert({
        _id: "/contact-us",
        parentId: null,
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
