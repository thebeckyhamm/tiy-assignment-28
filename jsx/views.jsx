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

                <form onSubmit={this.onSubmit} className="goal-form">
                    <views.Input 
                        label="Goal Name" 
                        type="text" 
                        name="goalName"
                        placeholder="ex: Run"
                        required="required" />
                    <views.Input 
                        label="Number" 
                        type="number" 
                        name="number"
                        placeholder="5"
                        required="required" />  
                    <views.Select label="Unit" 
                                options={this.units} 
                                name="unit"
                                defaultValue="times" />
                    <views.Select label="Time Interval" 
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