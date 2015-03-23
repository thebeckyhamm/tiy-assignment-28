var fitness = {

    models: {},
    views: {},
    currentUser: null,
    firebaseURL: "https://fitness-todos.firebaseio.com/",
    fire: null, // the firebase instance

    register: function(userData) {
        fitness.fire.createUser(userData, function(error, fireData){
            if (error) {
              console.log("Error creating user:", error);
              return;
            } 
            else {
              console.log("Successfully created user account with uid:", fireData.uid);
            }
        });
    },

    login: function(userData) {
        fitness.fire.authWithPassword(userData, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);  
                return;  
            } 
            else {
                console.log("Authenticated successfully with payload:", authData.password.email);
            }
        });

    },

    onAuthCallback: function(authData) {
        if (authData) {
            fitness.currentUser = authData;
            console.log("A user is logged in:", authData);
            fitness.trigger("sign:in");
        } 
        else {
            fitness.currentUser = null;
            console.log("No one is logged in");
            fitness.trigger("sign:out");
        }
        fitness.trigger("sign:in:out");
    },

    addGoal: function(goal) {
        //fitness.fire.add(goal);
        var user = new fitness.models.User();
        user.set(goal);
    },

    logout: function() {
        fitness.fire.unauth();
    },

};



_.extend(fitness, Backbone.Events);