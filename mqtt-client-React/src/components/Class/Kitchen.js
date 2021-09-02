import React from "react";
import { Card } from "antd";

class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {
        topic: "testtopic/temp",
        qos: 1,
      },
      luminousIntensity:0,
      temperature: 0,
    };
  }
  handlePublish = (record) => {
    this.props.publish(record);
  };

  componentDidMount(){
    let self = this;
    let  temperatureSensor= setInterval(self.publishTemp, 4000,self);
    let  lightSensor= setInterval(self.publishLightSensor, 4000,self);
  }

  publishTemp(self){
    let randomNumber1 = Math.floor((Math.random() * 45) + 1);

    let kitchen = {
      topic: "topic/kitchen/temp",
      qos: 1,
      payload: randomNumber1 +""
    }
    self.setState({temperature:randomNumber1});
    self.handlePublish(kitchen);
  }
  
  publishLightSensor(self){
    let randomNumber = Math.floor((Math.random() * 100000) + 1);
   
    let kitchen = {
      topic: "topic/kitchen/luminousIntensity",
      qos: 1,
      payload: randomNumber +""
    }
    self.setState({luminousIntensity:randomNumber});
    self.handlePublish(kitchen);

  }

  render() {
    let color = this.props.connection ? "palegreen" : "#fff";
    let iconColor = this.props.connection ? "red": "";
    return <div className="flex-1">
    <Card  style={{backgroundColor:color}} className="border height-fix" title="Publisher Kitchen"> 
      <div className="flex-row">
        <span className="flex-one" >
          <i className="bi bi-thermometer-sun icon-font" style={{color:iconColor}}></i>
        </span>
        <span className="flex-two">
          <div>Topic: topic/kitchen/temp</div>
          <div>Payload : {this.props.connection && this.state.temperature} </div>
        </span>
      </div>

      

      <div className="flex-row">
        <span className="flex-one" >
          <i className="bi bi-lightbulb-fill icon-font" style={{color:iconColor}}></i>
        </span>
        <span className="flex-two">
          <div>Topic: topic/kitchen/luminousIntensity</div>
          <div>Payload : {this.props.connection && this.state.luminousIntensity} </div>
        </span>
      </div>

      
     

      

    
 
    </Card>
  </div>
  }
}

export default Kitchen;

