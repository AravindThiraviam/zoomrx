import React from "react";
import List from "./List";
import zoomrx from "../img/zoomrx.png";
import { connect } from "react-redux";
import ActionButton from "./ActionButton";
import { DragDropContext } from "react-beautiful-dnd";
import { sort } from "../actions";

class App extends React.Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );
  };

  render() {
    const { lists } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">
          <h1 style={styles.heading}>
            <img style={styles.logo} alt="logo" src={zoomrx}></img> Task
          </h1>
          <div style={styles.listContainer}>
            {lists.map((list) => (
              <List
                listID={list.id}
                key={list.id}
                title={list.title}
                cards={list.cards}
              ></List>
            ))}
            <ActionButton list />
          </div>
        </div>
      </DragDropContext>
    );
  }
}

const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "row",
  },
  heading: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    fontFamily: "roboto",
    color: "#333",
    fontWeight: "400",
  },
  logo: {
    marginRight: "10px",
  },
};

const mapStateToProps = (state) => ({
  lists: state.lists,
});

export default connect(mapStateToProps)(App);
