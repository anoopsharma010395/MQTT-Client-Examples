import React, { createContext } from "react";

//broker connection
import Connection from "./Connection";

//Publishers: Hall & Kitchen
import Hall from "./Hall";
import Kitchen from "./Kitchen";

//Subscibers: Subscriber1 & Subscriber2
import SubscriberHall from "./SubscriberHall";
import SubscriberKitchen from "./SubscriberKitchen";


import ReceiverHall from "./ReceiverHall";
import ReceiverKitchen from "./ReceiverKitchen";

import mqtt from "mqtt";
import { Card} from "antd";

import '../../App.css';
import "bootstrap-icons/font/bootstrap-icons.css";


export const QosOption = createContext([]);
const qosOption = [
  {
    label: "0",
    value: 0,
  },
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
];

class Mqtt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null,
      connectStatus: "Connect",
      isSubed: false,
      messagesHall: {topics:["topic/hall/temp","topic/hall/luminousIntensity"], temp:0,people:0,luminousIntensity: 0, },
      messageKitchen: {topics: ["topic/kitchen/temp","topic/kitchen/luminousIntensity"],temp:0,people:0,luminousIntensity: 0},
      connection: false
    };
  }

  handleConnect = (host, mqttOptions) => {
    var will = { 
      topic: "topic/hall/temp",
      payload: 'Something went wrong with Hall'
    };

    this.setState({ connectStatus: "Connecting" });
    this.client = mqtt.connect(host, mqttOptions);

    if (this.client) {
      this.client.on("connect", () => {
        this.setState({ connectStatus: "Connected" });
        this.setState({connection:true});
      });
      this.client.on("error", (err) => {
        console.error("Connection error: ", err);
        this.client.end();
      });
      this.client.on("reconnect", () => {
        this.setState({ connectStatus: "Reconnecting" });
      });
      this.client.on("message", (topic, message) => {
        console.log("message",topic, message.toString());
        const payload = { topic, message: message.toString() };
        console.log(payload);
        if (payload.topic && payload.topic === "topic/hall/temp") {
          var messagesHall = {...this.state.messagesHall}
          messagesHall.temp = payload.message;
          this.setState({ messagesHall});
        }
        else if (payload.topic && payload.topic === "topic/kitchen/temp") {
          var messageKitchen = {...this.state.messageKitchen}
          messageKitchen.temp = payload.message;
          this.setState({ messageKitchen});
        }
        else if (payload.topic && payload.topic === "topic/hall/luminousIntensity") {
          var messagesHall = {...this.state.messagesHall}
          messagesHall.luminousIntensity = payload.message;
          this.setState({ messagesHall});
        }
        else if (payload.topic && payload.topic === "topic/kitchen/luminousIntensity") {
          var messageKitchen = {...this.state.messageKitchen}
          messageKitchen.luminousIntensity = payload.message;
          this.setState({ messageKitchen});
        }
      });
    }
  };

  handleSubscribe = (topic, qos) => {
    console.log(topic,qos);
    if (this.client) {
      this.client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        this.setState({ isSubed: true });
      });
    }
  };



  handlePublish = (pubRecord) => {
    if (this.client) {
      const { topic, qos, payload } = pubRecord;
      console.log(pubRecord);
      this.client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  handleDisconnect = () => {
    if (this.client) {
      this.client.end(() => {
        this.setState({ connectStatus: "Connect" });
        this.setState({connection:false});
        this.setState({ client: null });
      });
    }
  };

  render() {
    return (
      <>

      <Card title="Smart Home using MQTT & React" className="max-width ant-card-grid">
       <div className="flex-row">
      
        <div className="flex-one"> <QosOption.Provider value={qosOption}>
        {this.state.connection &&  <> <SubscriberHall
            showUnsub={this.state.isSubed}
            subscribe={this.handleSubscribe}
            unsubscribe={this.handleUnsub}
          />
          <SubscriberKitchen
            showUnsub={this.state.isSubed}
            subscribe={this.handleSubscribe}
            unsubscribe={this.handleUnsub}
          /> </> }
          <Hall connection={this.state.connection} publish={this.handlePublish} />
          <Kitchen  connection={this.state.connection} publish={this.handlePublish} />
        </QosOption.Provider>
        
       
       </div> 
       <div className="align-center border">
            <Connection
            connectBtn={this.state.connectStatus}
            connect={this.handleConnect}
            disconnect={this.handleDisconnect}
          />
        </div>
          <div className="flex flex-one grid">
            <ReceiverHall messages={this.state.messagesHall} ></ReceiverHall>
            <ReceiverKitchen  messages={this.state.messageKitchen} ></ReceiverKitchen>
          </div>
          {/* <div className="margin-top">
            <HomeTempBoard  DRTemp={this.state.messageKitchen.temp} hallTemp={this.state.messagesHall.temp} ></HomeTempBoard>
          </div> */}
          </div>
      </Card>

        
     
      </>
    );
  }
}

export default Mqtt;

 
