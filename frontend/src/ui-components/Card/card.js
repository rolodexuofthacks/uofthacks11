import React, { Component } from "react";
import VerticalCarousel from "./VerticalCarousel";
import { config } from "react-spring";

const slides = [
  {
    key: 0,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="card"
      />
    ),
  },
  {
    key: 1,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="card"
      />
    ),
  },
  {
    key: 2,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dg"
        alt="card"
      />
    ),
  },
  {
    key: 3,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="card"
      />
    ),
  },
  {
    key: 4,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?q=80&w=2953&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="card"
      />
    ),
  },
  {
    key: 5,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="card"
      />
    ),
  },
  {
    key: 6,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="card"
      />
    ),
  },
  {
    key: 7,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dg"
        alt="card"
      />
    ),
  },
  {
    key: 8,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="card"
      />
    ),
  },
];

export default class Card extends Component {
  state = {
    goToSlide: 0,
    offsetRadius: 4,
    showNavigation: false,
    config: config.gentle,
  };

  render() {
    return (
      <div
        style={{
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
          margin: "0 auto",
        }}
      >
        <VerticalCarousel
          slides={slides}
          offsetRadius={this.state.offsetRadius}
          showNavigation={this.state.showNavigation}
          animationConfig={this.state.config}
        />
      </div>
    );
  }
}
