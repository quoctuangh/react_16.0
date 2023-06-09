import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task_id: '',
            task_name: '',
            task_level: 0
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(this.props.itemSelected);
        this.updateItem = this.updateItem.bind(this);
    }

    componentWillMount(){
        let item = this.props.itemSelected;
        this.updateItem(this.props.itemSelected)
    }

    componentWillReceiveProps(nextProps) {
        let item = nextProps.itemSelected;
        this.updateItem(nextProps.itemSelected)
    }

    updateItem(item) {
        if (item !== null) {
            this.setState({
                task_id: item.id,
                task_name: item.name,
                task_level: item.level,
            });
        }
    }
    handleChange(event) {
        const target = event.target // input selectbox
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        let item = {
            name: this.state.task_name,
            id: this.state.task_id,
            level: this.state.task_level,
        }
        this.props.onClickSubmit(item);
        e.preventDefault(); 
        
        
    }

    handleCancel() {
        this.props.onClickCancel();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-offset-7 col-md-5">
                <form onSubmit={this.handleSubmit} className="form-inline">
                    <div className="form-group">
                    <label className="sr-only" htmlFor="">
                        label
                    </label>
                    <input
                        type="text" value={this.state.task_name} onChange={this.handleChange}
                        name='task_name'
                        className="form-control"
                        placeholder="Task Name"
                    />
                    </div>
                    <div className="form-group">
                    <label className="sr-only" htmlFor="">
                        label
                    </label>
                    <select
                        name="task_level" value={this.state.task_level} onChange={this.handleChange}
                        id="inputDs"
                        className="form-control"
                        required="required"
                    >
                        Small
                        <option value={0}>Small</option>
                        <option value={1}>Medium</option>
                        <option value={2}>High</option>
                    </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                    Submit
                    </button>
                    <button onClick={this.handleCancel} type="button" className="btn btn-default">
                    Cancel
                    </button>
                </form>
                </div>
            </div>
        );
    }
}

export default Form;
