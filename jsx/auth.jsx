(function(views){

    var Login = React.createClass({
        onSubmit: function(e) {
            e.preventDefault();
            var data = $(e.target).serializeJSON();
            fitness.login(data);
        },

        render: function() {

            return (
                <form className="login-form" onSubmit={this.onSubmit}>
                    <views.Input type="text" label="Email:" name="email"/>
                    <views.Input type="password" label="Password:" name="password"/>
                    <button>Sign In</button>
                </form>
            )
        }

    });

    var Logout = React.createClass({
        signOut: function(e) {
            e.preventDefault();
            fitness.logout();
        },

        render: function() {
            return <button onClick={this.signOut}>Sign Out</button>;
        }

    });

    var InOut = React.createClass({
        getLogInOut: function() {
            if (fitness.currentUser) {
                return <Logout />;
            }
            else {
                return <Login />;
            }
        },

        render: function() {
            return (
                <div className="login-out">
                    {this.getLogInOut()}
                </div>
            );
        }

    });


views.InOut = InOut;

})(fitness.views);