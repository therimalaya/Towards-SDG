import React, { Component } from 'react'
import Gallery from 'react-grid-gallery'

export default class SDGImageGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: this.props.images,
            selectionEnable: true
         }
         this.onSelectImage = this.onSelectImage.bind(this);
         this.getSelectedGoals = this.getSelectedGoals.bind(this);
    }
    onSelectImage = (index) => {
        const {updateGoals} = this.props
        const images = this.state.images
        const current_selection = images.filter(x=>x.isSelected)
        const select_new = current_selection.length < 2
        const disselect_old = current_selection.map(x=>x.index).includes(index)

        if (select_new) {
            images[index].isSelected = true
        }
        if (disselect_old) {
            images[index].isSelected = false
        }
        this.setState({
            images: images
        })
        updateGoals(this.getSelectedGoals())
    }
    getSelectedGoals = () => this.state.images.filter(x => x.isSelected).map(x => x.index+1)
    selectedGoals = () => {
        const { goals } = this.props
        return(
            <React.Fragment>
            {/* <h3>{this.getSelectedGoals().length > 0 ? "Selected Goals" : ""}</h3> */}
            <table width="100%">
                <tbody>
                {this.getSelectedGoals().map((goal_id) => {
                    var selected_goal = goals.filter(x=>x.goal===goal_id)
                    /* Goals.filter(x=>x.goal===goal_id).map(x=>x.title) */
                    return(
                        <tr key={goal_id}>
                            <th><strong>Goal: {goal_id}</strong></th><td><em>{selected_goal.map(x=>x.title).toString()}</em></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </React.Fragment>
        )
    }

    render() {
        return (
            <div style={{
                display: "block",
                minHeight: "1px",
                width: "100%",
                border: "1px solid #ddd",
                overflow: "auto"}}>
            <Gallery
                enableImageSelection={this.state.selectionEnable}
                images={this.state.images}
                onSelectImage={this.onSelectImage}
                onClickThumbnail={this.onSelectImage}
                enableLightbox={false}
                rowHeight={120}/>
            {this.selectedGoals()}
            </div>
        )
    }
}
