import React, { useState, useEffect } from "react";
import axios from "axios";
import noImage from '../assets/images/no-image.jpeg'
import './cardList.css'
import Chatbot from "../components/Chatbot";

const CardList = () => {
  const size = 20;
  const maxSearchLimit = 120;
  const endPoint = 'https://api.magicthegathering.io'
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  


  useEffect(() => {
    // Fetch cards when the component mounts
    fetchCards(page);
    window.addEventListener("scroll", handleScroll);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  const fetchCards = async (page) => {
    try {
      const response = await axios.get(
        `${endPoint}/v1/cards?page=${page}&pageSize=${size}`
      );
      const newCards = response.data.cards;
      setCards([...cards, ...newCards]);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const handleScroll = () => {
    // Check if the user has scrolled to the bottom
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // Load more cards when scrolled to the bottom
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCards = cards.filter((card) =>
    card.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render the cards in a list
  return (
    <div>
      <h3 className="header">Magic: The Gathering Cards</h3>
      <div>
        <Chatbot />
      </div>
      <div className="mainDiv">
        <div className="innerDiv">
          {filteredCards.length}/{cards.length}
        </div>
        <input
          className="form-control inputStyle"
          type="text"
          placeholder="Search cards..."
          value={searchQuery}
          onChange={handleSearch}
          maxLength={maxSearchLimit}
        />
      </div>
      <div
        className="card style"
      >
        {filteredCards?.length > 0 ? (
          filteredCards.map((card, index) => {
            return (
            //   card.imageUrl &&
               (
                <div key={index} className="col-md-3 col-sm-4 mb-2 mt-3">
                  <div
                    className="m-2 cardStyle"
                  >
                    
                    <img src={card.imageUrl ? card.imageUrl : noImage } className="card-img-top imageStyle" alt="..." />
                    <div className="card-body" style={{ textAlign: "start" }}>
                      <h6>{card.artist}</h6>
                      <span style={{ fontSize: "12px" }}>{card.flavor}</span>
                      <hr />
                      <span style={{ fontSize: "12px" }}>{card.type}</span>
                      <hr />

                      <span style={{ fontSize: "12px" }}>{card.rarity}</span>

                    </div>
                  </div>
                </div>
              )
            );
          })
        ) : (
          <div className="cardMessage" >No Cards Found</div>
        )}
      </div>
    </div>
  );
};

export default CardList;
