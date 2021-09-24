import { State } from "../utils/state";

// example
const initialState = {
  app: {
    mounted: false
  }
};

export const { store, StateProvider } = State(initialState);

// example app function
export const onAppMount =
  (message) =>
  async ({ update, getState, dispatch }) => {
    update("app", { mounted: true });
    update("clicked", false);
    update("data", { mounted: true });

    await update("", { data: { mounted: false } });
  };
