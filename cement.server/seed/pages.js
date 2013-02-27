(function(db) {
    var pages = [
        {
            _id: "/",
            parentId: null,
            title: 'home',
            layout: "MainLayout",
            placeholders:
            {
                top: [
                    { directive: "navigation" }
                ],
                left: [
                    { directive: "text", settings: { title: "Lorem ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." } }
                ],
                content: [
                    { directive: "text", settings: { title: "Module 1", content: "<b>Phasellus</b> odio felis, tempus eget rhoncus quis, placerat sed purus. Nulla metus leo, cursus nec auctor quis, volutpat nec urna." } },
                    { directive: "text", settings: { title: "Module 2", content: "Aenean viverra ultricies sapien nec porttitor." } }
                ],
            }
        }, {
            _id: "/about",
            parentId: null,
            title: 'about',
            layout: "CustomLayout",
            placeholders:
            {
                top: [
                    { directive: "navigation" }
                ],
                content: [
                    { directive: "text", settings: { title: "Module 1" } }, { directive: "text", settings: { title: "Module 2" } }
                ],
            }
        }, {
            _id: "/contact-us",
            parentId: null,
            title: 'contact-us',
            layout: "MainLayout",
            placeholders:
            {
                top: [
                    { directive: "navigation" }
                ],
                left: [
                    { directive: "text", settings: { title: "Module 2" } }
                ],
                content: [
                    { directive: "text", settings: { title: "Module 1" } }, { directive: "text", settings: { title: "Module 2" } }
                ],
            }
        },
    ];

    db.pages.remove();

    pages.forEach(function(x) { db.pages.insert(x) });

    db.pages.ensureIndex("parentId");
})(db);