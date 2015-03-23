(function(views){

    var Login = React.createClass({
        onSubmit: function(e) {
            e.preventDefault();
            var data = $(e.target).serializeJSON();
            fitness.login(data);
        },

        onClick: function(e) {
            e.preventDefault();
            $(".login-form").show();
        },

        render: function() {

            return (
                <div className="login">
                    <button className="button-header" onClick={this.onClick}>Login &#x25BC;</button>
                    <form className="login-form" onSubmit={this.onSubmit}>
                        <views.Input 
                            type="text" 
                            label="Email:" 
                            name="email"
                            required="required" />
                        <views.Input 
                            type="password" 
                            label="Password:" 
                            name="password"
                            required="required"/>
                        <button>Sign In</button>
                    </form>
                </div>
            )
        }

    });

    var Logout = React.createClass({
        signOut: function(e) {
            e.preventDefault();
            fitness.logout();
        },

        render: function() {
            return <button className="button-header" onClick={this.signOut}>Sign Out</button>;
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