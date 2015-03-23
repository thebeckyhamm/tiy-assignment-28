(function(views){

    var GoalInput = React.createClass({displayName: "GoalInput",
        render: function() {
            var htmlID = "textinput-" + name + Math.random();
            var type = this.props.type || "text";
            var label = this.props.label || this.props.name;
            var placeholder = this.props.placeholder || "";
            return (
                React.createElement("div", {className: "field"}, 
                    React.createElement("label", {for: htmlID}, label), 
                    React.createElement("input", {
                        type: type, 
                        name: this.props.name, 
                        htmlID: htmlID, 
                        placeholder: placeholder}
                    )
                )
            );
        }

    });

    var GoalSelect = React.createClass({displayName: "GoalSelect",

        makeOption: function(option, index) {

            return React.createElement("option", {key: index, value: option}, option);

        },

        render: function() {
            var htmlID = "select-" + name + Math.random();
            var label = this.props.label || this.props.name;


            return (
                React.createElement("div", {className: "field field-select"}, 
                    React.createElement("label", null, label), 
                    React.createElement("select", {htmlID: htmlID, 
                            defaultValue: this.props.defaultValue, 
                            name: this.props.name}, 
                        this.props.options.map(this.makeOption)
                    )
                    
                )
            );
        }

    });


    var GoalForm = React.createBackboneClass({

        units: ["miles", "minutes", "reps", "lbs", "times", "days"],
        time: ["per day", "per week", "per month", "in total"],

        onSubmit: function(e) {
            e.preventDefault();
            var goal = $(e.target).serializeJSON();
            fitness.trigger("add:goal", goal);
        },

        render: function() {
            return (

                React.createElement("form", {onSubmit: this.onSubmit, className: "goal-form"}, 
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
                    React.createElement(GoalSelect, {label: "Time Interval", 
                                options: this.time, 
                                name: "amountOfTime", 
                                defaultValue: "per week"}), 
                    React.createElement("div", {className: "text-right"}, React.createElement("button", null, "Add Goal"))
                    
                )

            );
        }

    });


    var GoalList = React.createBackboneClass({

        makeGoal: function(model, index) {
            return (
                React.createElement("div", {className: "goal", key: index}, 
                    React.createElement("span", null, index + 1, " "), 
                    React.createElement("span", {className: "goal-name"}, model.get("goalName"), " "), 
                    React.createElement("span", null, model.get("number"), "  "), 
                    React.createElement("span", null, model.get("unit"), "  "), 
                    React.createElement("span", null, model.get("amountOfTime"))
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