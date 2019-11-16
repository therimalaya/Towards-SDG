import React, { Component } from 'react'

export default class Car extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mycar: ""
        }
        this.selectHandeler = this.selectHandeler.bind(this)
    }
    selectHandeler = (event) => {
        this.setState({mycar: event.target.value});
    }
    render() {
        return (
            <form>
                <select value={this.state.mycar} onChange={this.selectHandeler}>
                    <option value="" default disabled hidden>Select your car</option>
                    <option value="Volvo">Volvo</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Toyota">Toyota</option>
                </select>
            </form>
        )
    }
}
