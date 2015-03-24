(function(){
    fitness.Router = Backbone.Router.extend({


        routes: {
            "" : "showGoals",
            "goals" : "showGoals",
            "create-new-goal" : "createNewGoal"

        },

        initialize: function() {

            var main = document.querySelector(".main");

            this.listenTo(fitness, "sign:in:out", function() {
                console.log("signinout triggered");
                React.render(
                    React.createElement(fitness.views.InOut),
                    document.querySelector(".sign-in-out")
                );
                
            });

            this.listenTo(fitness, "sign:in", function() {
                console.log("signin triggered");

                var user = new fitness.models.User();
                console.log(user);
                this.showGoals();              
                this.navigate("goals");
            });

            this.listenTo(fitness, "sign:out", function() {
                console.log("signout triggered");

                while (main.firstChild) {
                    main.removeChild(main.firstChild);
                }
                this.navigate("/");

            });


            this.listenTo(fitness, "new:goal", function() {
                React.render(
                    React.createElement(fitness.views.GoalForm),
                    main
                );
                this.navigate("create-new-goal");
            });


            this.listenTo(fitness, "add:goal", function(goal) {
                var user = new fitness.models.User();
                user.add(goal);
                this.showGoals();           
                this.navigate("goals");

            });

            this.listenTo(fitness, "check:goal", function(goal) {
                var user = new fitness.models.User();
                this.showGoals();
                this.navigate("goals");

            });
            
            fitness.fire = new Firebase(fitness.firebaseURL);

            fitness.fire.onAuth(fitness.onAuthCallback);

            if (fitness.currentUser) {
                var user = new fitness.models.User();

            }
        },

        showGoals: function() {
            var main = document.querySelector(".main");

            if (fitness.currentUser) {
                var user = new fitness.models.User();

            }
            React.render(
                React.createElement(fitness.views.GoalList, {collection: user}),
                main
            );                
            
        }
    });

})();