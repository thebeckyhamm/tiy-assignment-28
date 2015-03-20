(function(models){

    var User = Backbone.Firebase.Collection.extend({
        url: function() {
            if (!fitness.currentUser) {
                throw new Error ("No one is logged in.");
            }
            else {
                var uid = encodeURIComponent(fitness.currentUser.uid);
                return fitness.firebaseURL + uid + "/goals/";
            }

        }

    });

    models.User = User;

})(fitness.models);