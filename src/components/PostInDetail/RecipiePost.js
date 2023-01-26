import React from "react";
import {Card, Carousel, Col} from "react-bootstrap";
import {ReactComponent as User} from "../../assets/images/icons/account.svg";
import {ReactComponent as Menu} from "../../assets/images/icons/dots-vertical.svg";
import {ReactComponent as Timer} from "../../assets/images/icons/timer.svg";


// eslint-disable-next-line react/prop-types
const RecipiePost = ({title,description,time}) => {
  return (
    <Col>
      <Card className="post">
        <Card.Header><User className="post__avatar"/>User Name<Menu className="post__menu"/></Card.Header>
        <Card.Body className = "post__body">
          <Card.Title className = "post__title"><Col><h3 style={{float:"left"}}>{title}</h3>
            <i style={{float:"right"}}>{time}<Timer style={{marginLeft: "10px"}}/></i>
          </Col>
          </Card.Title>
          <Carousel variant="dark" className="post__image">
            <Carousel.Item>
              <img
                className=""
                src="https://www.inspiredtaste.net/wp-content/uploads/2019/04/Vegetable-Baked-Pasta-Recipe-1200.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className=""
                src="https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Tomato-Spinach-Pasta-close.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className=""
                src="https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Tomato-Spinach-Pasta-V2-bowl.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
          <Card.Text className = "post__text">
            {description}
          </Card.Text>
          <Card.Text className = "post__text">
            <h4>Ingredients</h4>
            <p>qwereww weweropr wieropwer orpweor</p>
          </Card.Text>
          <Card.Text className = "post__text">
            <h4>Methods</h4>
            <p>sufiosuj uiifdueof ieioiowe iueiweio iweioweui</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RecipiePost;