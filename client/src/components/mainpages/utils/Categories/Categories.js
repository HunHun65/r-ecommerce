// import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// const Container = styled.div`
//   display: flex;
//   padding: 20px;
//   justify-content: space-between;
// `;

const categories = [
  {
    id: 1,
    img: "7.jpg",
    title: "WELCOME TO MEMECOTHING",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    cat: "women",
  },
  {
    id: 2,
    img: "6.jpg",
    title: "LOUNGEWEAR LOVE",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    cat: "coat",
  },
  {
    id: 3,
    img: "3.jpg",
    title: "AUTUMN COLLECTION",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    cat: "jeans",
  },
  {
    id: 4,
    img: "4.jpg",
    title: "LIGHT JACKETS",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    cat: "jeans",
  },
  {
    id: 5,
    img: "8.jpg",
    title: "SPRING COLLECTION",
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    cat: "jeans",
  },
];

const Categories = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    cssEase: "linear",
  };
  return (
    // <Container>
    //   {categories.map((item) => (
    //     <CategoryItem item={item} key={item.id} />
    //   ))}
    // </Container>
    <Slider {...settings} style={{ marginBottom: "50px" }}>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Slider>
  );
};

export default Categories;
