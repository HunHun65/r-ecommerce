// import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
// import { useState } from "react";
// import styled from "styled-components";

// const Container = styled.div`
//   width: 100%;
//   height: 85vh;
//   display: flex;
//   position: relative;
//   overflow: hidden;
// `;

// const Arrow = styled.div`
//   width: 50px;
//   height: 50px;
//   background-color: #fff7f7;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: ${(props) => props.direction === "left" && "10px"};
//   right: ${(props) => props.direction === "right" && "10px"};
//   margin: auto;
//   cursor: pointer;
//   opacity: 0.5;
//   z-index: 2;
// `;

// const Wrapper = styled.div`
//   height: 100%;
//   display: flex;
//   transition: all 1.5s ease;
//   transform: translateX(${(props) => props.slideIndex * -100}vw);
// `;

// const Slide = styled.div`
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   background-color: #${(props) => props.bg};
//   autoplay: true,
//   autoplaySpeed: 2000,
// `;

// const ImgContainer = styled.div`
//   height: 90%;
//   flex: 1;
// `;

// const Image = styled.img`
//   height: 100%;
// `;

// const InfoContainer = styled.div`
//   flex: 1;
//   padding: 30px;
// `;

// const Title = styled.h1`
//   font-size: 80px;
//   letter-spacing: 2px;
// `;

// const Desc = styled.p`
//   margin: 30px 0px;
//   font-size: 20px;
//   font-weight: 500;
//   letter-spacing: 2px;
// `;

// const Button = styled.button`
//   font-weight: 500;
//   padding: 10px;
//   font-size: 20px;
//   background-color: transparent;
//   cursor: pointer;
// `;
// const sliderItems = [
//   {
//     id: 1,
//     img: "https://i.ibb.co/5TBJMpn/slide.png",
//     title: "SUMMER SALE",
//     desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
//     bg: "f5fafd",
//   },
//   {
//     id: 2,
//     img: "https://i.ibb.co/5TBJMpn/slide.png",
//     title: "AUTUMN COLLECTION",
//     desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
//     bg: "fcf1ed",
//   },
//   {
//     id: 3,
//     img: "https://i.ibb.co/cXFnLLV/3.png",
//     title: "LOUNGEWEAR LOVE",
//     desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
//     bg: "fbf0f4",
//   },
// ];
// const Slider = () => {
//   const [slideIndex, setSlideIndex] = useState(0);
//   const handleClick = (direction) => {
//     if (direction === "left") {
//       setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
//     } else {
//       setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
//     }
//   };

//   return (
//     <Container>
//       <Arrow direction="left" onClick={() => handleClick("left")}>
//         <ArrowLeftOutlined />
//       </Arrow>
//       <Wrapper slideIndex={slideIndex}>
//         {sliderItems.map((item) => (
//           <Slide bg={item.bg} key={item.id}>
//             <ImgContainer>
//               <Image src={item.img} />
//             </ImgContainer>
//             <InfoContainer>
//               <Title>{item.title}</Title>
//               <Desc style={{ width: "550px" }}>{item.desc}</Desc>
//             </InfoContainer>
//           </Slide>
//         ))}
//       </Wrapper>
//       <Arrow direction="right" onClick={() => handleClick("right")}>
//         <ArrowRightOutlined />
//       </Arrow>
//     </Container>
//   );
// };

// export default Slider;
import React from "react";

function Slide() {
  return <div></div>;
}

export default Slide;
