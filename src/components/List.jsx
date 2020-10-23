import React from "react";
import ListCard from "./ListCard";
import ActionButton from "./ActionButton";
import { Droppable } from "react-beautiful-dnd";

const List = ({ title, cards, listID }) => {
  return (
    <Droppable droppableId={String(listID)}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={styles.contanier}
        >
          <h4>{title}</h4>
          {cards.map((card, index) => (
            <ListCard key={card.id} index={index} text={card.text} id={card.id}>
              {" "}
            </ListCard>
          ))}
          <ActionButton listID={listID} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const styles = {
  contanier: {
    backgroundColor: "#eee",
    borderRadius: "3px",
    width: "300px",
    height: "100%",
    padding: "8px",
    marginRight: "10px",
  },
};
export default List;
