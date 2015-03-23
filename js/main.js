$(function() {

    var main = document.querySelector(".main");

    fitness.on("sign:in:out", function() {
        React.render(
            React.createElement(fitness.views.InOut),
            document.querySelector(".sign-in-out")
        );
        
    });

    fitness.on("sign:in", function() {
        var user = new fitness.models.User();
        React.render(
            React.createElement(fitness.views.GoalList, {collection: user}),
            main
        );
    });

    fitness.on("sign:out", function() {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
    });


    fitness.on("new:goal", function() {
        console.log("help");
        React.render(
            React.createElement(fitness.views.GoalForm),
            main
        );
    });


    fitness.on("add:goal", function(goal) {
        var user = new fitness.models.User();
        user.add(goal);
        React.render(
            React.createElement(fitness.views.GoalList, {collection: user}),
            main
        );
    });




    fitness.fire = new Firebase(fitness.firebaseURL);

    fitness.fire.onAuth(fitness.onAuthCallback);
    
    if (fitness.currentUser) {
        var user = new fitness.models.User();

    }

});