$(function() {

    fitness.fire = new Firebase(fitness.firebaseURL);

    fitness.fire.onAuth(fitness.onAuthCallback);



    if (fitness.currentUser) {
        React.render(
            React.createElement(fitness.views.AddGoal),
            document.body
        );
    }

    fitness.on("add:goal", function(goal) {
        var user = new fitness.models.User();
        user.add(goal);
    });

});