import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBCol, MDBCard, MDBCardText, MDBCardBody, MDBCardTitle, MDBRow, MDBInput } from 'mdbreact';
import { Container } from 'react-bootstrap';

function searchingFor(term) {
  return function (x) {
    return x.name.includes(term) || !term;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      terms: ''
    }
    this.searchHandler = this.searchHandler.bind(this);
  }
  searchHandler(event) {
    this.setState({ term: event.target.value })
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data,
          isLoaded: true,
        })
      })
  }
  render() {
    const { isLoaded, items } = this.state;
    if (!isLoaded)
      return <div>Loading...</div>
    return (
      <Container className="App">
        {/* <Row className="justify-content-md-center">
          <Col xs lg="2"> */}
            <div className="App">
              <MDBInput label="Search by Name" onChange={this.searchHandler} />
            </div>
          {/* </Col>
        </Row> */}
        <MDBRow>
          {items.filter(searchingFor(this.state.term)).map(item => (
            <tr key={item.name}>
              <MDBCol>
                <MDBCard style={{ width: "25rem", margin: "5px"}}>
                  <MDBCardBody>
                    <MDBCardTitle>
                      Name:{item.name}
                    </MDBCardTitle>
                    <MDBCardText>
                      Email:{item.email}
                    </MDBCardText>
                    {/* <MDBBtn href="#">MDBBtn</MDBBtn> */}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </tr>
          ))}
        </MDBRow>
      </Container>
      
    );
  }
}
export default App;