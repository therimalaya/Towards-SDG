import React, { Component } from 'react'
import PersonalDetails from './PersonalDetails'
import SDGGoalsSelect from './SDGGoalsSelect'
import SDGTargets from './SDGTargets'
import Summary from './Summary'
import Confirmation from './Confirmation'

export default class FormWrapper extends Component {
    render() {
        return (
            <div>
                <h1>I am from Form Wrapper.</h1>
                <p>I am consist of following components.</p>
                <ul>
                    <li><PersonalDetails /></li>
                    <li><SDGGoalsSelect /></li>
                    <li><SDGTargets /></li>
                    <li><Summary /></li>
                    <li><Confirmation /></li>
                </ul>
            </div>
        )
    }
}
