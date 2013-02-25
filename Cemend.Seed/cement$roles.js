// recreate all pages
(function (db) {
    db.cement$roles.remove();

    db.cement$roles.insert({
        _id: "admin"
    });
})(db);
