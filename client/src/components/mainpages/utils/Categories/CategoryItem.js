import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 85vh;
  position: relative;
  margin-top: 0px;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px #4d4e4f;
`;
const Desc = styled.p`
  margin: 10px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 2px;
  color: #fff;
  text-shadow: 2px 2px 4px #4d4e4f;
`;
// const Button = styled.button`
//   border: none;
//   border-radius: 2px;
//   width: 115px;
//   background-color: #fbb72c;
//   color: white;
//   cursor: pointer;
//   font-weight: 600;
// `;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to="">
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          {/* <Button>SHOP NOW</Button> */}
          <Desc>{item.desc}</Desc>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
