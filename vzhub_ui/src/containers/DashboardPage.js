import React, { Component } from 'react';
import {cyan600, pink600, purple600, orange600} from 'material-ui/styles/colors';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Face from 'material-ui/svg-icons/action/face';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import InfoBox from '../components/dashboard/InfoBox';
import RecentlyProducts from '../components/dashboard/RecentlyProducts';
import globalStyles from '../styles';
import Data from '../data';

import EventsService from '../Events/EventsService';
import axios from 'axios';
import Paper from '../components/Paper'


class DashboardPage extends Component {
 

  constructor(props) {
      super(props);
      this.state = {value: '', items: [], selectedItem:{}};
      this.eventsService = new EventsService();
      this.deleteData=this.deleteData.bind(this);  
      this.clickEventHandler=this.clickEventHandler.bind(this);
      this.completeHandler=this.completeHandler.bind(this);
    }
    
    clickEventHandler(id){
      console.log(id)
      console.log(this.props)
     this.setState({ selectedItem:  this.state.items.filter((obj)=>obj._id===id)[0] });
     console.log(this.state.selectedItem)
    }
    componentDidMount(){
      this.refreshData();
    
       // this.addItemService.listData()
    }

    refreshData(){
      this.setState({ selectedItem:  ''});
      axios.get('http://localhost:4200/events/list')
      .then(response => {
        this.setState({ items: response.data });        
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    completeHandler(id){    
      event.preventDefault();    
      this.state.selectedItem.cancelled=true;
      this.eventsService.updateData(this.state.selectedItem,id).then(res => {
        this.refreshData();      
      })
      .catch(err => console.log(err));
  }

    deleteData(id) {    
      console.log("hello"+id)
      //event.preventDefault();
     this.eventsService.deleteData(id).then(response=> {
      this.refreshData();
    })
    .catch(function (error) {
      console.log(error);
    });
    }

  
    getPaper(){
      return <Paper data={this.state.selectedItem} deleteData={(id)=>this.deleteData(id)} completeHandler={(id)=>this.completeHandler(id)}/>;
    }

    getEmpty(){
      const empty=<div className="card card-1">
      <div className="container4">
      <p>
       No Event selected to display
       </p>
       </div>
      </div>
      return empty;
    }
    render() {
  return (
    <div>
      <h3 style={globalStyles.navigation}>VZHUB / Events</h3>

      <div className="row">

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={ShoppingCart}
                   color={pink600}
                   title="Total Profit"
                   value="1500k"
          />
        </div>


        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={ThumbUp}
                   color={cyan600}
                   title="Likes"
                   value="4231"
          />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={Assessment}
                   color={purple600}
                   title="Sales"
                   value="460"
          />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={Face}
                   color={orange600}
                   title="New Members"
                   value="248"
          />
        </div>
      </div>
     
      <div className="row">      
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 ">
          <RecentlyProducts data={this.state.items} key ="1" status="OPEN" header="Upcoming Events" clickEventHandler={(id)=>this.clickEventHandler(id)}/>
        </div>
        
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 ">
          <RecentlyProducts data={this.state.items} key ="2"  status="DONE" header="Closed Events" clickEventHandler={(id)=>this.clickEventHandler(id)}/>
        </div>
      
      </div>

        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
        {this.getPaper()}
         
        </div>
      </div>
    
    </div>
  );
};
}

export default DashboardPage;
