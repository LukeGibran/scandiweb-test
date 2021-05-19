import React, { Component } from 'react'

import './Stepper.styles.scss';

export class index extends Component {
    constructor(){
        super()
        this.stepper = React.createRef()
    }
    renderSteps = () => {
        const {length} = this.props
        const leftProperty = Math.floor(100 / length)
        let items = []

        for(let x = 1;x < length;x++){
            items.push(
                <div className="stepper-number-container" key={x}  style={{left: `${leftProperty * x}%`}}>
                    <div className="stepper-number ">
                        {x}
                    </div>
                </div>
            )
        }
        return items
    }

    toggleSteps = () => {

        const { stepCount, length } = this.props

        const nodes = [...this.stepper.current.childNodes]

        const width = Math.floor(100 / length)
        let totalStep = Math.ceil(stepCount * width)

        // Highlight the number according to the stepCount Props
        for(let x = 0; x < stepCount; x++){
            nodes[x].classList.add('active')
        }

        // if on final stepcount, set totalStep to 100%
        if(stepCount === length) totalStep = 100;

        // Increase the overlay line width to give the stepper an
        // illusion of progress
        nodes[nodes.length - 1].style.width = `${totalStep}%`
    }

    componentDidMount(){
        this.toggleSteps()
    }

    componentDidUpdate(prevProps){
        if(prevProps.stepCount !== this.props.stepCount) this.toggleSteps()
    }


    render() {
        return (
            <div className="stepper" ref={this.stepper}>
                {this.renderSteps()}
                <div className="stepper-overlay"/>
            </div>
        )
    }
}

export default index
