(function(models){

    var Goal = Backbone.Model.extend({
        onCheck: function() {
            if(!!this.get("completed_at")) {
                this.set("completed_at", null)
            }
            else {
                this.set("completed_at", new Date().toString());
            }
        }
    })

    var User = Backbone.Firebase.Collection.extend({
        url: function() {
            if (!fitness.currentUser) {
                throw new Error ("No one is logged in.");
            }
            else {
                var uid = encodeURIComponent(fitness.currentUser.uid);
                return fitness.firebaseURL + uid + "/goals/";
            }

        },
        model: Goal

    });

    models.User = User;

})(fitness.models);