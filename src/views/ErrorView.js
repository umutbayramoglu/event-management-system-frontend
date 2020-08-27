import { Container, Button } from "shards-react";
import { withRouter } from "react-router"
import React, { Component } from 'react'

export class ErrorView extends Component {
  
  goBack = () => {
    this.props.history.push("/");
  }

  render() {
    const {error} = this.props.history.location.state;
    return (
      <Container fluid className="main-content-container px-4 pb-4">

      <div className="error">
        <div className="error__content">
          <h2>500</h2>
          { error ? <h3>{error}</h3>
            : <h3>Something went wrong!</h3>}
          {/* {<p>There was a problem on our end. Please try again later.</p>} */}
          <Button pill onClick={this.goBack}>Return to home page</Button>
        </div>
      </div>
    </Container>
    )
  }
}

export default withRouter(ErrorView);
