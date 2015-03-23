$(function() {

    fitness.fire = new Firebase(fitness.firebaseURL);

    fitness.fire.onAuth(fitness.onAuthCallback);

    var main = document.querySelector(".main");

    if (fitness.currentUser) {

        var user = new fitness.models.User();
        console.log(user);
        React.render(
            React.createElement(fitness.views.GoalList, {collection: user}),
            main
        );

        fitness.on("add:goal", function(goal) {
            user.add(goal);
            React.render(
                React.createElement(fitness.views.GoalList, {collection: user}),
                main
            );
        });

        fitness.on("new:goal", function() {
            React.render(
                React.createElement(fitness.views.GoalForm),
                main
            );
        });
    }


});