import React from "react";
import { Card, Form, Input, Row, Col, Button, Select } from "antd";
import { QosOption } from "./index";

class SubscriberHall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {
        topic: "topic/hall/#",
        qos: 1,
      },
    };
  }

  handleSubscribe = () => {
    const { topic, qos } = this.state.record;
    this.props.subscribe(topic, qos);
  };

  componentDidMount(){
    //setTimeout(function(){this.handleSubscribe,3000})
    let self = this;
    setTimeout(self.handleSubscribe, 3000);
  }

  handleUnsub = () => {
    const { topic } = this.state.record;
    this.props.unsubscribe(topic);
  };

  render() {
    return <div></div>;
  }
}

export default SubscriberHall;

