import { Facebook, Instagram, Mail, Phone, Pinterest, Room, Twitter } from "@material-ui/icons"
import styled from "styled-components"
// import { mobile } from "../responsive";

const Container = styled.div`
    display:flex;
    border-top: 1px solid #ddd;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column; 
    padding: 20px;    
`

const Logo = styled.h1`
color: white
`

const Desc = styled.p`
    margin: 20px 0px;
    color: white
    

`

const SocialContainer = styled.div`
    display: flex;
`

const SocialIcon = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%; 
    color: white; 
    background-color: #${props =>props.color};
    display: flex; 
    align-items: center; 
    justify-content: center;
    margin-right:20px;
    color: white
`
const Title = styled.h3`
    margin-bottom: 30px;
    color: white
`

const List = styled.ul`
    margin:0;
    padding:0;
    list-style:none;
    display:flex;
    flex-wrap:wrap;

`

const ListItem = styled.li`
    width:50%;
    margin-bottom: 10px;
    color: white
`
const Center = styled.div`
    flex: 1;
    padding:20px;

`

const Right = styled.div`
    flex: 1;
    padding:20px;


`

const ContactItem = styled.div`
    margin-bottom:20px;
    display: flex; 
    align-items: center;
    color: white
`

const Payment = styled.img`
    width:50%;
`

const Footer = () => {
    return (
        <Container style={{ backgroundColor:'black' }}>
            <Left>
                <Logo>MEME CLOTHINGS</Logo>
                <Desc style={{fontSize:'14px'}}>Because shops are so common around the world, it is possible that you could be asked about it for your next IELTS test. This could be a question like, “Do you like shopping?” but today we are not going to focus on shopping as an activity. Instead, we will mostly look at shops as places where you can buy things.</Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                        <Facebook/>
                    </SocialIcon>
                    <SocialIcon color="E4405F">
                        <Instagram/>
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                        <Twitter/>
                    </SocialIcon>
                    <SocialIcon color="E60023">
                        <Pinterest/>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title style={{textTransform:'uppercase', marginTop:'10px'}}>Useful Links</Title>
                <List style={{fontSize:'14px'}}>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Term</ListItem>
                </List>
            </Center>
            <Right style={{fontSize:'14px', marginTop:'10px'}}>
                <Title style={{textTransform:'uppercase'}}>Contact</Title>
                <ContactItem><Room style={{marginRight:"10px"}}/>126/20 Tran Cao Van Street, Tam Thuan,Thanh Khe, Da Nang</ContactItem>
                <ContactItem><Phone style={{marginRight:"10px"}}/>0905852357</ContactItem>
                <ContactItem><Mail style={{marginRight:"10px"}}/>htthung.17it1@vku.udn.vn</ContactItem>
                <Payment style={{ width:'150px' }} src="https://i.ibb.co/XxqtL9h/payment.png"/>
            </Right>
        </Container>
    )
}

export default Footer