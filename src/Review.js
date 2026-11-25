import React, { useState } from "react";
import people from "./data";

import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteRight,
} from "react-icons/fa";

const Review = () => {
  const [index, setIndex] = useState(0);

  const { name, job, image, text } = people[index];

  const prevCard = () => {
  if (index === 0) {
    setIndex(people.length - 1);
  } else {
    setIndex(index - 1);
  }
};

const nextCard = () => {
  if (index === people.length - 1) {
    setIndex(0);
  } else {
    setIndex(index + 1);
  }
};

const randomCard = () => {
  if (people.length <= 1) return;

  let randomIndex = Math.floor(Math.random() * people.length);

  while (randomIndex === index) {
    randomIndex = Math.floor(Math.random() * people.length);
  }

  setIndex(randomIndex);
};

  return (
    <article className="review">
      <div className="img-container">
        <img src={image} alt={name} className="person-img" />

        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div>

      <h4 className="author">{name}</h4>
      <p className="job">{job}</p>
      <p className="info">{text}</p>

      <div className="button-container">
  <button onClick={prevCard} className="prev-btn">
    <FaChevronLeft />
  </button>

  <button onClick={nextCard} className="next-btn">
    <FaChevronRight />
  </button>
</div>

      <button onClick={randomCard} className="random-btn">
         Surprise me
      </button>
    </article>
  );
};

export default Review;