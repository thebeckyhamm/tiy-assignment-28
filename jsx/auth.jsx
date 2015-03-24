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

        register: function(e) {
            e.preventDefault();
            $(".login-form").hide();
            fitness.trigger("start:register");
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
                            <a href="" onClick={this.register}>Need to Register?</a>
                        <button>Sign In</button>
                    </form>
                </div>
            )
        }

    });

    var Register = React.createClass({
        onSubmit: function(e) {
            e.preventDefault();
            var data = $(e.target).serializeJSON();
            fitness.register(data);
        },

        render: function() {

            return (
                <div className="register">
                    <form className="register-form" onSubmit={this.onSubmit}>
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
                        <div className="text-right">
                            <button>Register</button>
                        </div>
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
views.Register = Register;

})(fitness.views);