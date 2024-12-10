import {
  DEV_DATA_CREATE,
  DEV_DATA_DELETE,
  DEV_DATA_SEARCH,
  DEV_DATA_UPDATE,
  GET_DEVS_DATA,
} from "./devsTypes";

//devs reducer fucntion
export const devsReducer = (state, action) => {
  switch (action.type) {
    case GET_DEVS_DATA:
      return (state = action.payload);

    case DEV_DATA_CREATE:
      return [...state, action.payload];

    case DEV_DATA_DELETE:
      return state.filter((data) => data.id != action.payload);

    case DEV_DATA_UPDATE:
      return state.map((item) => {
        if (item.id == action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });

    case DEV_DATA_SEARCH:
      return state.filter(
        (data) =>
          data.skill.toLowerCase() == action.payload.skill.toLowerCase() ||
          (data.age >= action.payload.min && data.age <= action.payload.max)
      );

    // case DEV_PROFILE_UPLOAD:
    //   return state((prevState) => ({
    //     ...prevState,
    //     photo: action.payload,
    //   }));

    default:
      return state;
  }
};
