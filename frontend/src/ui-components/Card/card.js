import React, { Component } from "react";
import VerticalCarousel from "./VerticalCarousel";
import { config } from "react-spring";
import CardContent from "./CardContent";
import "./card.css";


const slides = [
  {
    key: 0,
    content: (
      <CardContent 
        name="1Jane John"
        image="./avatar/avatar2.png"
    />

    ),
  },
  {
    key: 1,
    content: (
      <CardContent 
        name="2Jane John"
        image="./avatar/avatar2.png"
    />
    ),
  },
  {
    key: 2,
    content: (
      <CardContent 
        name="3Jane John"
        image="./avatar/avatar3.png"
    />
    ),
  },
  {
    key: 3,
    content: (
      <CardContent 
      name="4Jane John"
      image="./avatar/avatar4.png"
  />
    ),
  },
  {
    key: 4,
    content: (
      <CardContent 
        name="5Jane John"
        image="./avatar/avatar5.png"
    />
    ),
  },
  {
    key: 5,
    content: (
      <CardContent 
        name="6Jane John"
        image="./avatar/avatar6.png"
    />
    ),
  },
  {
    key: 6,
    content: (
      <CardContent 
        name="7Jane John"
        image="./avatar/avatar6.png"
    />
    ),
  },
  {
    key: 7,
    content: (
      <CardContent 
        name="8Jane John"
        image="./avatar/avatar6.png"
    />
    ),
  },
  {
    key: 8,
    content: (
      <CardContent 
        name="9Jane John"
        image="./avatar/avatar6.png"
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
      <div className="main select-none">
        <img className='rolodex' src='./rolodex/rolodex-left.png'></img>
        <VerticalCarousel
          slides={slides}
          offsetRadius={this.state.offsetRadius}
          showNavigation={this.state.showNavigation}
          animationConfig={this.state.config}
        />
        {/* <img className='rolodex' src='./rolodex/rolodex-right.png
        '></img> */}
       
      </div>
    );
  }
}
