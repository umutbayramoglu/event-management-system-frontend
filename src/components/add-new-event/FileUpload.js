import React, {Component} from "react"

export default class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventPoster: "Choose file..."
        }
    }

    onFileUpload = (e) => {
        this.props.load(e.target.value)
        this.setState({[e.target.name]: [e.target.value]})
    }

    render() {
        return (
            <div className="custom-file mb-3">
                <input type="file" name="eventPoster" onChange={e => this.onFileUpload(e)} className="custom-file-input"
                       id="customFile2"/>
                <label className="custom-file-label" htmlFor="customFile2">
                    {this.state.eventPoster}
                </label>
            </div>
        )
    }

}
  