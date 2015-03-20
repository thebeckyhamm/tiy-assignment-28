(function(views){

    var GoalInput = React.createClass({displayName: "GoalInput",
        render: function() {
            var htmlID = "textinput-" + name + Math.random();
            var type = this.props.type || "text";
            var label = this.props.label || this.props.name;
            var placeholder = this.props.placeholder || "";
            return (
                React.createElement("div", {className: "field"}, 
                    React.createElement("label", null, " ", label, 
                        React.createElement("input", {
                            type: type, 
                            name: this.props.name, 
                            htmlID: htmlID, 
                            placeholder: placeholder}
                        )
                    )
                )
            );
        }

    });

    var GoalSelect = React.createClass({displayName: "GoalSelect",

        makeOption: function(option, index) {
            // var defaultOption = this.props.defaultOption;

            // if (defaultOption = option) {
            //     return <option key={index} selected="selected">{option}</option>;
            // } 
            // else {
                return React.createElement("option", {key: index, value: option}, option);
            // }
        },

        render: function() {
            var htmlID = "select-" + name + Math.random();
            var label = this.props.label || this.props.name;


            return (
                React.createElement("div", {className: "field"}, 
                    React.createElement("label", null, label, 
                        React.createElement("select", {htmlID: htmlID, 
                                defaultValue: this.props.defaultValue, 
                                name: this.props.name}, 
                            this.props.options.map(this.makeOption)
                        )
                    )
                )
            );
        }

    });


    var AddGoal = React.createBackboneClass({

        units: ["miles", "minutes", "reps", "lbs", "times", "days"],
        time: ["per day", "per week", "per month", "in total"],

        onSubmit: function(e) {
            e.preventDefault();
            var goal = $(e.target).serializeJSON();
            fitness.trigger("add:goal", goal);
        },

        render: function() {
            return (

                React.createElement("form", {onSubmit: this.onSubmit}, 
                    React.createElement(GoalInput, {
                        label: "Goal Name", 
                        type: "text", 
                        name: "goalName", 
                        placeholder: "ex: Run"}), 
                    React.createElement(GoalInput, {
                        label: "Number", 
                        type: "number", 
                        name: "number", 
                        placeholder: "5"}), 
                    React.createElement(GoalSelect, {label: "Unit", 
                                options: this.units, 
                                name: "unit", 
                                defaultValue: "times"}), 
                    React.createElement(GoalSelect, {label: "Amount of Time:", 
                                options: this.time, 
                                name: "amountOfTime", 
                                defaultValue: "per week"}), 
                    React.createElement("button", null, "Add Goal")
                )

            );
        }

    });

views.AddGoal = AddGoal;


})(fitness.views);