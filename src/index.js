import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Main component
class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        recent: [],
        alltime: [],
        select: [],
        title:'Last 30 days'
        
      };
    }
    selectData1 = () => {
      this.setState({
        select: this.state.recent,
        title:'Last 30 days'
      })
    }

    selectData2 = () => {
      this.setState({
        select: this.state.alltime,
        title:'All Time'
      })
    }
    componentWillMount() { 
      fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              recent: result,
              select: result
            }); 
          },
          
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )

        fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              alltime: result
            });
          },
          
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
        
    } 
    
    

renderList() {

if(!this.state.recent.length && !this.state.alltime.length) {
  return <div>loading...</div>
}
      return this.state.select.map((select, i) => {
        return(
          <ListItem
          key={i}
          number= {i+1}
          select={select} />
        )
      })
    }

render() {
  const { error, isLoaded } = this.state;
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return( 
    <div>
        <div>
        <h1> CAMPER LEADERBOARD</h1>
        </div>
          <div>
            <table>
              <thead>
                  <tr>
                    <th>Number</th>
                    <th className='user'>{`${this.state.title} Campers`}</th> 
                    <th className='clickTitle' onClick={this.selectData2}>Alltime</th>
                    <th className='clickTitle' onClick={this.selectData1}>last 30 days</th>
                  </tr>
              </thead>
              <tbody>          
                {this.renderList()}     
              </tbody>
            </table>
          </div>
    </div>
    )
  }
}    
}  

const ListItem = (props) => {
return (
    <tr>
      <td>{props.number}</td>
    
      <td><img className="image" src={props.select.img} /> <a href={`https://freecodecamp.com/${props.select.username}`} target="_blank">{props.select.username}</a></td> 
      <td>{props.select.recent}</td>
      <td>{props.select.alltime}</td>
    </tr>
);
};


ReactDOM.render( <App />, document.getElementById("root"));

