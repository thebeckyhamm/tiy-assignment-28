(function(views) {

var Input = React.createClass({
    render: function() {
        var htmlID = "textinput-" + name + Math.random();
        var type = this.props.type || "text";
        var label = this.props.label || this.props.name;
        var placeholder = this.props.placeholder || "";
        return (
            <div className="field">
                <label htmlFor={htmlID}>{label}</label>
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

var Select = React.createClass({

    makeOption: function(option, index) {

        return <option key={index} value={option}>{option}</option>;

    },

    render: function() {
        var htmlID = "select-" + name + Math.random();
        var label = this.props.label || this.props.name;


        return (
            <div className="field field-select">
                <label htmlFor={htmlID}>{label}</label>
                <select htmlID={htmlID}
                        defaultValue={this.props.defaultValue}
                        name={this.props.name}>
                    {this.props.options.map(this.makeOption)}
                </select>
                
            </div>
        );
    }

});

views.Input = Input;
views.Select = Select;


})(fitness.views);
