(function(views) {

var Input = React.createClass({displayName: "Input",
    render: function() {
        var htmlID = "textinput-" + name + Math.random();
        var type = this.props.type || "text";
        var label = this.props.label || this.props.name;
        var placeholder = this.props.placeholder || "";
        var value = this.props.value || "";
        var required = this.props.required || "";
        return (
            React.createElement("div", {className: "field"}, 
                React.createElement("label", {htmlFor: htmlID}, label), 
                React.createElement("input", {
                    type: type, 
                    name: this.props.name, 
                    htmlID: htmlID, 
                    placeholder: placeholder, 
                    defaultValue: value, 
                    required: required}
                )
            )
        );
    }

});

var Select = React.createClass({displayName: "Select",

    makeOption: function(option, index) {

        return React.createElement("option", {key: index, value: option}, option);

    },

    render: function() {
        var htmlID = "select-" + name + Math.random();
        var label = this.props.label || this.props.name;


        return (
            React.createElement("div", {className: "field field-select"}, 
                React.createElement("label", {htmlFor: htmlID}, label), 
                React.createElement("select", {htmlID: htmlID, 
                        defaultValue: this.props.defaultValue, 
                        name: this.props.name}, 
                    this.props.options.map(this.makeOption)
                )
                
            )
        );
    }

});

var CheckOff = React.createClass({displayName: "CheckOff",

    render: function() {
    var status = this.props.on ? "✓" : "▢";

        return (
            React.createElement("span", {className: "check-off", onClick: this.props.onCheck}, status)
        );
    }

});

views.Input = Input;
views.Select = Select;
views.CheckOff = CheckOff;


})(fitness.views);

(function(views){

    var Login = React.createClass({displayName: "Login",
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
                React.createElement("div", {className: "login"}, 
                    React.createElement("button", {className: "button-header", onClick: this.onClick}, "Login ▼"), 
                    React.createElement("form", {className: "login-form", onSubmit: this.onSubmit}, 
                        React.createElement(views.Input, {
                            type: "text", 
                            label: "Email:", 
                            name: "email", 
                            required: "required"}), 
                        React.createElement(views.Input, {
                            type: "password", 
                            label: "Password:", 
                            name: "password", 
                            required: "required"}), 
                            React.createElement("a", {href: "", onClick: this.register}, "Need to Register?"), 
                        React.createElement("button", null, "Sign In")
                    )
                )
            )
        }

    });

    var Register = React.createClass({displayName: "Register",
        onSubmit: function(e) {
            e.preventDefault();
            var data = $(e.target).serializeJSON();
            fitness.register(data);
        },

        render: function() {

            return (
                React.createElement("div", {className: "register"}, 
                    React.createElement("form", {className: "register-form", onSubmit: this.onSubmit}, 
                        React.createElement(views.Input, {
                            type: "text", 
                            label: "Email:", 
                            name: "email", 
                            required: "required"}), 
                        React.createElement(views.Input, {
                            type: "password", 
                            label: "Password:", 
                            name: "password", 
                            required: "required"}), 
                        React.createElement("div", {className: "text-right"}, 
                            React.createElement("button", null, "Register")
                        )
                    )
                )
            )
        }

    });

    var Logout = React.createClass({displayName: "Logout",
        signOut: function(e) {
            e.preventDefault();
            fitness.logout();
        },

        render: function() {
            return React.createElement("button", {className: "button-header", onClick: this.signOut}, "Sign Out");
        }

    });

    var InOut = React.createClass({displayName: "InOut",
        getLogInOut: function() {
            if (fitness.currentUser) {
                return React.createElement(Logout, null);
            }
            else {
                return React.createElement(Login, null);
            }
        },

        render: function() {
            return (
                React.createElement("div", {className: "login-out"}, 
                    this.getLogInOut()
                )
            );
        }

    });


views.InOut = InOut;
views.Register = Register;

})(fitness.views);
(function(views){



    var GoalForm = React.createBackboneClass({

        units: ["miles", "minutes", "reps", "lbs", "times", "days"],
        time: ["per day", "per week", "per month", "in total"],

        onSubmit: function(e) {
            e.preventDefault();
            var goalItems = $(e.target).serializeJSON();
            var states = _.map(goalItems, function(item) {
                return !!item;
            });
            var containsFalse = _.contains(states, false);
            if (!containsFalse) {
                fitness.trigger("add:goal", goalItems);   
            }
        },

        render: function() {
            return (

                React.createElement("form", {onSubmit: this.onSubmit, className: "goal-form"}, 
                    React.createElement(views.Input, {
                        label: "Goal Name", 
                        type: "text", 
                        name: "goalName", 
                        placeholder: "ex: Run", 
                        required: "required"}), 
                    React.createElement(views.Input, {
                        label: "Number", 
                        type: "number", 
                        name: "number", 
                        placeholder: "5", 
                        required: "required"}), 
                    React.createElement(views.Select, {label: "Unit", 
                                options: this.units, 
                                name: "unit", 
                                defaultValue: "times"}), 
                    React.createElement(views.Select, {label: "Time Interval", 
                                options: this.time, 
                                name: "amountOfTime", 
                                defaultValue: "per week"}), 
                    React.createElement("div", {className: "text-right"}, React.createElement("button", null, "Add Goal"))
                    
                )

            );
        }

    });


    var GoalList = React.createBackboneClass({
        checking: function(model) {
            model.onCheck();
            fitness.trigger("check:goal");
        },

        makeGoal: function(model, index) {
            var checked = model.get("completed_at");
            return (
                React.createElement("div", {className: "goal", key: index}, 
                    React.createElement("span", null, index + 1, " "), 
                    React.createElement("span", {className: "goal-name"}, model.get("goalName"), " "), 
                    React.createElement("span", null, model.get("number"), "  "), 
                    React.createElement("span", null, model.get("unit"), "  "), 
                    React.createElement("span", null, model.get("amountOfTime")), 
                    React.createElement(views.CheckOff, {on: checked, onCheck: this.checking.bind(this, model)})
                )
            );


        },

        render: function() {
            return (
                React.createElement("div", {className: "goal-view"}, 
                    React.createElement("header", {className: "goal-header"}, 
                        React.createElement("h4", null, "Goals"), 
                        React.createElement("button", {onClick: this.onAdd}, "+ New")
                    ), 
                    React.createElement("div", {className: "goal-list"}, this.props.collection.map(this.makeGoal))
                )

            );
        },

        onAdd: function(e) {
            e.preventDefault();
            fitness.trigger("new:goal");
        }

    });

views.GoalForm = GoalForm;
views.GoalList = GoalList;


})(fitness.views);