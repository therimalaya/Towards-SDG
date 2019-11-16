import React, { Component } from 'react'

class Garage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            size: '',
            ambiance: 'dark',
            total_cars: 2
        };
    }
    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.size === "") {
            alert("Are you sure you want to submit empty size?")
        } else {
            alert("You are submitting size as "+this.state.size+".");
        }
    }
    changeProp = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState({[name]: value});
    }
    render() {
        let description = ""
        if (this.state.size !== "") {
            description = <p>I am little {this.state.ambiance}. There are {this.state.total_cars} cars with me.</p>
        }
        return (
            <form onSubmit={this.submitHandler}>
                <h1>I am a {this.state.size} Garage.</h1>
                {description}
                <input
                    name="size"
                    onChange={this.changeProp}
                    placeholder="Set the size of the garage."
                    />
                <input
                    name="ambiance"
                    onChange={this.changeProp}
                    placeholder="Set the size of the garage."
                    />

            </form>
        );
    }
}

export default Garage;