(function (db) {
    db.cement$users.remove();

    db.cement$users.insert({
        _id: "konst",
        password: "1234",
        roles: "admin"
    });
    
    db.cement$users.insert({
        _id: "anton",
        password: "1234",
        roles: "admin"
    });

    db.cement$users.ensureIndex("roles");
    
})(db);
