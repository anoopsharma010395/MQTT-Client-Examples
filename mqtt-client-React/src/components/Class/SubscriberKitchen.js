import React from "react";

class SubscriberKitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {
        topic: "topic/kitchen/#",
        qos: 1,
      },
    };
  }


  handleSubscribe = () => {
    const { topic, qos } = this.state.record;
    this.props.subscribe(topic, qos);
  };

  componentDidMount(){
    let self = this;
    setTimeout(self.handleSubscribe, 5000);
  }

  handleUnsub = () => {
    const { topic } = this.state.record;
    this.props.unsubscribe(topic);
  };

  render() {
   
    return <div></div>;
  }
}

export default SubscriberKitchen;
