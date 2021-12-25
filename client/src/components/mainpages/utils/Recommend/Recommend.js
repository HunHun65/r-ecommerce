import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobleState";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecommendItem from "./RecommendItem";

function Recommend(token) {
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const state = useContext(GlobalState);
  const [recommends] = state.recommendAPI.recommends;

  return (
    <div>
      <Slider {...settings}>
        {recommends.map((recommend) => {
          return <RecommendItem key={recommend._id} recommend={recommend} />;
        })}
      </Slider>
    </div>
  );
}
export default Recommend;
