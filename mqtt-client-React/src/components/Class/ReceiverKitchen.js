import React from "react";
import { Card, List } from "antd";

class ReceiverKitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let color = "#fff"
    let temp = this.props.messages.temp;
    let illumination =this.props.messages.luminousIntensity;
    switch (true) {
      case this.props.messages.temp >= 40:
        color = "turquoise";
        //temp = "High";
        //instructions = "Turn on the Air conditioner in the temperature Range of 20-24."
        break;
      case this.props.messages.temp >= 28:
        color = "paleturquoise";
        //temp="Normal";
        //instructions = "Bring Air conditioner to Room temperature."
        break;
      case this.props.messages.temp > 0:
        color = "coral";
        //temp = "low";
        //instructions ="Turn off the Air Conditioner . Turn On the Heater."
        break;
    }

    

    /* let illumination =""
    switch (true) {
      case this.props.messages.luminousIntensity >= 40000:
        illumination = "Pretty Bright"
        break;
      case this.props.messages.luminousIntensity >= 10000:
        illumination = "Bright"
        break;
      case this.props.messages.luminousIntensity > 0:
        illumination = "Lesser Bright"
        break;
    } */

    /* let crowdy =""
    switch (true) {
      case this.props.messages.people >= 5:
        crowdy = "Very crowdy"
        break;
      case this.props.messages.people >= 2:
        crowdy = "Handfull of people"
        break;
      case this.props.messages.people > 0:
        crowdy = "Just few of them"
        break;
    }
 */
    return (
      <div className="flex-1 margin-bottom min-width">
        <Card  style={{backgroundColor:color}} className="border width-fix" title="Subscriber 2"> 
         
          <div className="flex-row">
             <span className="font-weight-l flex-one">Temperature:</span> 
             <span className="flex-one">{temp? temp + " °C": "Fetching..."}</span>
          </div>

          

          
          <div className="flex-row">
             <span className="font-weight-l flex-one">Topics: </span> 
             <span className="flex-one">
               <div>{this.props.messages.topics? this.props.messages.topics[0]: "Fetching..."}</div>
               <div>{this.props.messages.topics? this.props.messages.topics[1]: "Fetching..."}</div>
              </span>
          </div>

          <div className="flex-row">
             <span className="font-weight-l flex-one">Brightness: </span> 
             <span className="flex-one" >{illumination? illumination + " lux" : "Fetching..."}</span>
          </div>

        
     
        </Card>
      </div>
    );
  }
}

export default ReceiverKitchen;
