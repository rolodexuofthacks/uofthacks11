import React, { Component } from "react";
import VerticalCarousel from "./VerticalCarousel";
import { config } from "react-spring";
import CardContent from "./CardContent";
import "./card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";



const slides = [
  {
    key: 0,
    content: (
      <CardContent 
        name="John Micheal"
        image="./avatar/avatar1.png"
    />
    ),
  },
  {
    key: 1,
    content: (
      <CardContent 
        name="Jane John"
        image="./avatar/avatar2.png"
    />
    ),
  },
  {
    key: 2,
    content: (
      <CardContent
        name="Jun Ye"
        image="./avatar/avatar3.png"
    />
    ),
  },
  {
    key: 3,
    content: (
      <CardContent 
      name="Jane John"
      image="./avatar/avatar4.png"
  />
    ),
  },
  {
    key: 4,
    content: (
      <CardContent 
        name="Jane John"
        image="./avatar/avatar5.png"
    />
    ),
  },
  {
    key: 5,
    content: (
      <CardContent 
        name="Jane John"
        image="./avatar/avatar6.png"
    />
    ),
  },
  {
    key: 6,
    content: (
      <CardContent 
        name="Jane John"
        image="./avatar/avatar7.png"
    />
    ),
  },
  {
    key: 7,
    content: (
      <CardContent 
        name="Jane John"
        image="./avatar/avatar8.png"
    />
    ),
  },
  {
    key: 8,
    content: (
      <CardContent 
        name="Jane John"
        image="./avatar/avatar9.png"
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
    searchInput: "", // State to hold the search input
  };
   // Function to handle search and update goToSlide state
   handleSearch = () => {
    const { searchInput } = this.state;
    const index = slides.findIndex(
      (slide) =>
        slide.content.props.name.toLowerCase() === searchInput.toLowerCase()
    );

    if (index !== -1) {
      this.setState((prevState) => ({
        goToSlide: index,
        showCarousel: !prevState.showCarousel, 
      }));
    }
  };

  // Function to handle changes in the search input
  handleInputChange = (e) => {
    console.log(e.target.value)
    this.setState({ searchInput: e.target.value });
  };
  
  render() {
    return (
      <div className="main select-none w-full">
         {/* Search bar */}
         <input className='searchBar ' 
            type="text"
            placeholder="Search for a friend..."
            value={this.state.searchInput}
            onChange={this.handleInputChange} />
          <button className="searchbtn" onClick={this.handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>

        <div className="flex flex-row justify-center space-x-96 min-h-screen items-center">
          <img className="rolodexleft" src="./rolodex/rolodex-left1.png"></img>

          <img
            className="rolodexright"
            src="./rolodex/rolodex-right1.png"
          ></img>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">

          {/* VerticalCarousel */}
          <VerticalCarousel
            slides={slides}
            offsetRadius={this.state.offsetRadius}
            showNavigation={this.state.showNavigation}
            animationConfig={this.state.config}
            goToSlide={this.state.goToSlide}
          />
        </div>
      </div>
      
    );
  }
}
