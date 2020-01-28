import React, {Component} from 'react';
import './App.css';
import 'react-bootstrap/Card';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.css'
import { Container } from 'react-bootstrap/lib/Tab';

function searchingFor(term)
{
    return function(x)
    {
        return x.name.includes(term) ||!term;
    }
}

class App extends Component
{
  constructor(props){
    super(props);
      this.state={
        items:[],
        isLoaded: false,
        terms: ''
  }
  this.searchHandler = this.searchHandler.bind(this);
}
searchHandler(event)
{
    this.setState({term: event.target.value})
}
  componentDidMount(){
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(res=>res.json())
        .then(json => {
          this.setState({
            items:json,
            isLoaded:true,
          })
        })
        .catch((err)=>{
            console.log(err);
          });
        
      }
        render(){
          const {isLoaded,items}=this.state;
          if(!isLoaded)
            return <div>Loading...</div>

          return(
            <div className="App">
              <h1>Search</h1>
                <form>
                    <input type="text" placeholder="Search By Name" onChange={this.searchHandler}/>
                </form>
              <table align="center"> 
         
                {items.filter(searchingFor(this.state.term)).map(item=>(
                  <tr key={item.email}>
                   
                  <Card  bg="danger" text="white" style={{ width: '18rem' }}>
                    <Card.Text>
                    Name:{item.name} | E-mail: {item.email}
                    </Card.Text>
                  </Card>

                  <br></br>
                  </tr> 
                ))}
              </table>
            </div>
          );
        }
      }
export default App;