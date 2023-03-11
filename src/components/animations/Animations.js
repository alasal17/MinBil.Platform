import React, { Component } from "react";
import Lottie from "react-lottie";
import "./style.css"
import animationData from "../assets/1.json";

class Laptop extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    return (
      <div className="animations-comp">
        <Lottie className="animations-comp" options={defaultOptions}  />
      </div>
    );
  }
}

export default Laptop;
