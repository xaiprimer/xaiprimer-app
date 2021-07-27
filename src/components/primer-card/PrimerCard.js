import React from "react";
import { Card, Button } from "react-bootstrap";


import * as styles from "../../styles/card.module.scss";


const PrimerCard = () => {
  const cardInfo = [
    { image: "https://raw.githubusercontent.com/bea92/xaiprimer-app/beatgo-restart/src/images/tour0.png", title: "Guided Tour 1", text: "Lorem Ipsum" },
    { image: "https://raw.githubusercontent.com/bea92/xaiprimer-app/beatgo-restart/src/images/tour2.png", title: "Guided Tour 2", text: "Lorem Ipsum" },
    { image: "https://raw.githubusercontent.com/bea92/xaiprimer-app/beatgo-restart/src/images/tour3.png", title: "Guided Tour3", text: "Lorem Ipsum" },
  ];

  const renderCard = (card, index) => {
    return (
      <Card style={{ width: "18rem", display:"flex" }} className={styles.box} key={index}>
        <Card.Img variant="top" src={card.image} />
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Text>{card.text}</Card.Text>
          <Button variant="primary">Take the tour</Button>
        </Card.Body>
      </Card>
    );
  };

  return <div className={styles.grid}>{cardInfo.map(renderCard)}</div>;
};

export default PrimerCard;
