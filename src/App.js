import React, {Component} from 'react' 
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css'
import { fire } from './fire'
import ItemsComponent from './components/ItemComponent'
class App extends Component {
  state = {
    items: {}
  }
  itemsRef = fire.database().ref('items')

  componentWillMount(){
    this.itemsRef.on('value', data=> {
      this.setState({
        items: data.val()
      })
    })
  }

  componentWillUnmount(){
    fire.removeBinding(this.itemsRef)
  }
  completeItem=(id)=>{  
    this.itemsRef.update({
      [id]:{
        ...this.state.items[id], 
        completed: true
      }
    })
  }
  deleteItem = (id) => {
    this.itemsRef.update({
      [id]: null
    })
  }
  addItem=(e)=> {
    e.preventDefault();
    this.itemsRef.push({
      item: this.todoItem.value, 
      completed: false     
    })
  }

  render() {
    return (
      <BrowserRouter>  
        <div>
          <h2>TODO</h2>
          <ul>
            <li><Link to={'/'}>Tasks to do</Link></li>
            <li><Link to={'/completed'}>Tasks Completed</Link></li>
          </ul>
          <Route exact path="/"
            render={props => 
              <ItemsComponent  
                items={this.state.items} 
                done={false}
                action={this.completeItem}
                addItem={this.addItem}
                inputRef={elem => this.todoItem = elem}
              /> 
            }/>
          <Route exact path="/completed" 
            render={props => 
              <ItemsComponent  
                items={this.state.items} 
                done={true}
                action={this.deleteItem}  
              /> 
            }/>
        </div>
      </BrowserRouter>   
    );
  }
}
export default App;