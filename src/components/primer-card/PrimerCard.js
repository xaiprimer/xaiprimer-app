import React from "react";
import { Card, Button } from "react-bootstrap";


import * as styles from "../../styles/card.module.scss";


const PrimerCard = () => {
  const cardInfo = [
    { image: "https://raw.githubusercontent.com/bea92/xaiprimer-app/beatgo-restart/src/images/tour1.png", title: "Overview", text: "Get an overview tour for familiarizing yourself with the XAI Primer" },
    { image: "https://raw.githubusercontent.com/bea92/xaiprimer-app/beatgo-restart/src/images/tour2.png", title: "Explanations for Lay Users", text: "Discover which strategies are mostly used for explaining AI to Lay Users by browsing projects coming from different domains." },
    { image: "https://raw.githubusercontent.com/bea92/xaiprimer-app/beatgo-restart/src/images/tour3.png", title: "Interactive Articles as Drivers for Deductive Explanations", text: "This tour shows collections of interactive articles dealing with explanable AI techniques." },
  ];

  const renderCard = (card, index) => {
    return (
      <Card style={{ width: "18rem", display:"flex" }} className={styles.box} key={index}>
        <Card.Img variant="top" src={card.image} className={styles.cover} />
        <Card.Body>
          <Card.Title><h3>{card.title}</h3></Card.Title>
          <Card.Text><h4>{card.text}</h4></Card.Text>
          <Button className={styles.cardButton} variant="primary"><h4>Take the tour</h4></Button>
        </Card.Body>
      </Card>
    );
  };

  return <div className={styles.grid}>{cardInfo.map(renderCard)}</div>;
};

export default PrimerCard;
