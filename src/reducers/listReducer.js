import { CONSTANTS } from "../actions";

let listId = 2;
let cardID = 6;
const initialState = [
  {
    title: "List 1",
    id: `list-${0}`,
    cards: [
      {
        id: `card-${0}`,
        text: "card 1",
      },
      {
        id: `card-${1}`,
        text: "card 2",
      },
    ],
  },
  {
    title: "List 2",
    id: `list-${1}`,
    cards: [
      {
        id: `card-${2}`,
        text: "card 1",
      },
      {
        id: `card-${3}`,
        text: "card 2",
      },
      {
        id: `card-${4}`,
        text: "card 3",
      },
      {
        id: `card-${5}`,
        text: "card 4",
      },
    ],
  },
];

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        cards: [],
        id: `list-${listId}`,
      };
      listId += 1;
      return [...state, newList];

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`,
      };
      cardID += 1;

      console.log(">>>---Arjun--->>> action", action);

      const newState = state.map((list) => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });
      return newState;
    }
    case CONSTANTS.DRAG_HAPPENED:
      const newState = [...state];

      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        type,
        // draggableId,
      } = action.payload;

      if (type === "list") {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);

        return newState;
      }

      if (droppableIdStart === droppableIdEnd) {
        const list = newState.find(
          (list) => droppableIdStart === list.id.toString()
        );
        const card = list.cards.splice(droppableIndexStart, 1);

        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      if (droppableIdStart !== droppableIdEnd) {
        const listStart = newState.find(
          (list) => droppableIdStart === list.id.toString()
        );
        const card = listStart.cards.splice(droppableIndexStart, 1);

        const listEnd = newState.find(
          (list) => droppableIdEnd === list.id.toString()
        );
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newState;
    default:
      return state;
  }
};

export default listReducer;
