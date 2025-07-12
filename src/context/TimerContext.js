import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TimerContext = createContext();

const initialState = {
  timers: [],
  history: [],
};

const timerReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_STATE":
      return action.payload;
    case "ADD_TIMER":
      return { ...state, timers: [...state.timers, action.payload] };
    case "UPDATE_TIMER":
      return {
        ...state,
        timers: state.timers.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "DELETE_TIMER":
      return {
        ...state,
        timers: state.timers.filter((t) => t.id !== action.payload),
      };
    case "MARK_COMPLETE":
      return {
        ...state,
        timers: state.timers.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
        history: [...state.history, action.payload],
      };
    default:
      return state;
  }
};

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      const saved = await AsyncStorage.getItem("timerState");
      if (saved) {
        dispatch({ type: "LOAD_STATE", payload: JSON.parse(saved) });
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("timerState", JSON.stringify(state));
  }, [state]);

  const addTimer = (timer) => {
    dispatch({ type: "ADD_TIMER", payload: timer });
  };

  const updateTimer = (timer) => {
    dispatch({ type: "UPDATE_TIMER", payload: timer });
  };

  const completeTimer = (timer) => {
    dispatch({ type: "MARK_COMPLETE", payload: timer });
  };

  const deleteTimer = (id) => {
    dispatch({ type: "DELETE_TIMER", payload: id });
  };

  return (
    <TimerContext.Provider
      value={{
        timers: state.timers,
        history: state.history,
        addTimer,
        updateTimer,
        completeTimer,
        deleteTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
