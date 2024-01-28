import VerticalCarousel from "./VerticalCarousel";
import { config } from "react-spring";
import React, { useState, useEffect, Component } from "react";
import CardContent from "./CardContent";
import "./card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// const [Cards, setCards] = new useState({});

// const slides = [
//   {
//     key: 0,
//     content: <CardContent name="John Micheal" image="/avatar/avatar1.png" />,
//   },
//   {
//     key: 1,
//     content: <CardContent name="Jane John" image="/avatar/avatar2.png" />,
//   },
//   {
//     key: 2,
//     content: <CardContent name="Jun Ye" image="/avatar/avatar3.png" />,
//   },
// ];
const slides = [];
export default class Card extends Component {
  state = {
    Cards: [],
    goToSlide: 0,
    offsetRadius: 4,
    showNavigation: false,
    config: config.gentle,
    searchInput: "", // State to hold the search input
  };
  //
  fetchData = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/user_test/friends"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      this.setState({ Cards: data });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
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
    console.log(e.target.value);
    this.setState({ searchInput: e.target.value });
  };
  componentDidMount() {
    this.fetchData();
    this.forceUpdate();
  }

  render() {
    const slides = this.state.Cards.map((card, index) => ({
      key: card.ID || index, // Using ID as key, fallback to index
      content: (
        <CardContent name={card.Data.name} image={card.Data.image || ""} />
      ),
    }));
    if (this.state.Cards.length === 0) {
      return <div>Loading...</div>;
    }
    console.log("Cards:", this.state.Cards[0]["Data"]["name"]);
    return (
      <div className="main select-none w-full">
        {/* Search bar */}
        <input
          className="searchBar "
          type="text"
          placeholder="Search for a friend..."
          value={this.state.searchInput}
          onChange={this.handleInputChange}
        />
        <button className="searchbtn" onClick={this.handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>

        <div className="flex flex-row justify-center space-x-96 min-h-screen items-center">
          <img className="rolodexleft" src="/rolodex/rolodex-left.png"></img>

          <img className="rolodexright" src="/rolodex/rolodex-right.png"></img>
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
