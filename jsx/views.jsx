(function(views){

    var GoalInput = React.createClass({
        render: function() {
            var htmlID = "textinput-" + name + Math.random();
            var type = this.props.type || "text";
            var label = this.props.label || this.props.name;
            var placeholder = this.props.placeholder || "";
            return (
                <div className="field">
                    <label> {label}
                        <input 
                            type={type} 
                            name={this.props.name}
                            htmlID={htmlID}
                            placeholder={placeholder} 
                        />
                    </label>
                </div>
            );
        }

    });

    var GoalSelect = React.createClass({

        makeOption: function(option, index) {
            // var defaultOption = this.props.defaultOption;

            // if (defaultOption = option) {
            //     return <option key={index} selected="selected">{option}</option>;
            // } 
            // else {
                return <option key={index} value={option}>{option}</option>;
            // }
        },

        render: function() {
            var htmlID = "select-" + name + Math.random();
            var label = this.props.label || this.props.name;


            return (
                <div className="field">
                    <label>{label}
                        <select htmlID={htmlID}
                                defaultValue={this.props.defaultValue}
                                name={this.props.name}>
                            {this.props.options.map(this.makeOption)}
                        </select>
                    </label>
                </div>
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

                <form onSubmit={this.onSubmit}>
                    <GoalInput 
                        label="Goal Name" 
                        type="text" 
                        name="goalName"
                        placeholder="ex: Run" />
                    <GoalInput 
                        label="Number" 
                        type="number" 
                        name="number"
                        placeholder="5" />
                    <GoalSelect label="Unit" 
                                options={this.units} 
                                name="unit"
                                defaultValue="times" />
                    <GoalSelect label="Amount of Time:" 
                                options={this.time}
                                name="amountOfTime"
                                defaultValue="per week" />
                    <button>Add Goal</button>
                </form>

            );
        }

    });

views.AddGoal = AddGoal;


})(fitness.views);