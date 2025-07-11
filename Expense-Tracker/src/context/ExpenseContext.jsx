// import { createContext, useContext, useEffect, useReducer } from "react";

// //*   By my own

// const ExpenseContext = createContext();

// const initialValue = {
//   expenses: [],
//   loading: false,
//   error: null,
// };

// const ExpenseReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_EXPENSES":
//       return { ...state, expenses: [...state.expenses, action.payload] };
//     case "DELETE_EXPENSES":
//       return {
//         ...state,
//         expenses: state.expenses.filter(
//           (expense) => expense.id !== action.payload.id
//         ),
//       };
//     case "UPDATE_EXPENSES":
//       return {
//         ...state,
//         expenses: state.expenses.map((expense) =>
//           expense.id === action.payload.id ? action.payload : expense
//         ),
//       };

//     case "SET_EXPENSES":
//       return {
//         ...state,
//         expenses: action.payload,
//       };

//     case "SET_LOADING":
//       return {
//         ...state,
//         loading: action.payload,
//       };
//     case "SET_ERROR":
//       return {
//         ...state,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const ExpenseProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(ExpenseReducer, initialValue);

//   useEffect(() => {
//     try {
//       const stored = localStorage.getItem("Expenses");
//       if (stored) {
//         dispatch({ type: "SET_EXPENSES", payload: JSON.parse(stored) });
//       }
//     } catch (error) {
//       console.error("Failed to load expenses:", error);
//       dispatch({ type: "SET_ERROR", payload: "Failed to load expenses" });
//     }
//   }, []);

//   useEffect(() => {
//     try {
//       localStorage.setItem("Expenses", JSON.stringify(state.expenses));
//     } catch (error) {
//       console.error("Failed to save expenses:", error);
//       dispatch({ type: "SET_ERROR", payload: "Failed to save expenses" });
//     }
//   }, [state.expenses]);

//   const value = {
//     ...state,
//     addExpense: (expense) => {
//       const newExpense = {
//         ...expense,
//         id: crypto.randomUUID(),
//       };

//       dispatch({ type: "ADD_EXPENSES", payload: newExpense });
//     },

//     deleteExpense: (id) => {
//       dispatch({ type: "DELETE_EXPENSES", payload: { id } });
//     },

//     updateExpense: (expense) => {
//       dispatch({ type: "UPDATE_EXPENSES", payload: expense });
//     },
//   };

//   return (
//     <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
//   );
// };

// export const useExpenses = () => {
//   const context = useContext(ExpenseContext);

//   if (context === undefined) {
//     throw new Error("useExpenses must be used within an ExpenseProvider");
//   }

//   return context;
// };

import { createContext, useContext, useEffect, useReducer } from "react";

const ExpenseContext = createContext();

const initialState = {
  expenses: JSON.parse(localStorage.getItem("expenses")) || [],
  loading: false,
  error: null,
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return { ...state, expenses: [...state.expenses, action.payload] };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };
    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case "SET_EXPENSES":
      return { ...state, expenses: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // save expenses to local storage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
    } catch (error) {
      console.error("Failed to save expenses to local storage: ", error);
      dispatch({ type: "SET_ERROR", payload: error });
    }
  }, [state.expenses]);

  const value = {
    ...state,
    addExpense: (expense) => {
      const newExpense = {
        ...expense,
        id: crypto.randomUUID(),
      };
      dispatch({ type: "ADD_EXPENSE", payload: newExpense });
    },
    deleteExpense: (id) => {
      dispatch({ type: "DELETE_EXPENSE", payload: { id } });
    },
    updateExpense: (expense) => {
      dispatch({ type: "UPDATE_EXPENSE", payload: expense });
    },
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};
