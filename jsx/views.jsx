(function(views){

    var GoalInput = React.createClass({
        render: function() {
            var htmlID = "textinput-" + name + Math.random();
            var type = this.props.type || "text";
            var label = this.props.label || this.props.name;
            var placeholder = this.props.placeholder || "";
            return (
                <div className="field">
                    <label for={htmlID}>{label}</label>
                    <input 
                        type={type} 
                        name={this.props.name}
                        htmlID={htmlID}
                        placeholder={placeholder} 
                    />
                </div>
            );
        }

    });

    var GoalSelect = React.createClass({

        makeOption: function(option, index) {

            return <option key={index} value={option}>{option}</option>;

        },

        render: function() {
            var htmlID = "select-" + name + Math.random();
            var label = this.props.label || this.props.name;


            return (
                <div className="field field-select">
                    <label>{label}</label>
                    <select htmlID={htmlID}
                            defaultValue={this.props.defaultValue}
                            name={this.props.name}>
                        {this.props.options.map(this.makeOption)}
                    </select>
                    
                </div>
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

                <form onSubmit={this.onSubmit} className="goal-form">
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
                    <GoalSelect label="Time Interval" 
                                options={this.time}
                                name="amountOfTime"
                                defaultValue="per week" />
                    <div className="text-right"><button>Add Goal</button></div>
                    
                </form>

            );
        }

    });


    var GoalList = React.createBackboneClass({

        makeGoal: function(model, index) {
            return (
                <div className="goal" key={index}>
                    <span>{index + 1} </span>
                    <span className="goal-name">{model.get("goalName")}&nbsp;</span>
                    <span>{model.get("number")} &nbsp;</span>
                    <span>{model.get("unit")} &nbsp;</span>
                    <span>{model.get("amountOfTime")}</span>
                </div>
            );


        },

        render: function() {
            return (
                <div className="goal-view">
                    <header className="goal-header">
                        <h4>Goals</h4>
                        <button onClick={this.onAdd}>+ New</button>
                    </header>
                    <div className="goal-list">{this.props.collection.map(this.makeGoal)}</div>
                </div>

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