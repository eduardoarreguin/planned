import React, { createContext, useContext, useReducer } from 'react';
import { BillInterface, BudgetInterface, UserInterface } from '../interfaces/interfaces';


export interface AppState{
    buedgetsData: BudgetInterface[];
    billsData:    BillInterface[];
    userData:     UserInterface | undefined
}

// Definir el contexto
const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<AppAction> } | undefined>(undefined)

type AppAction = 
    | { type: 'ADD_BUDGET',    payload: BudgetInterface }
    | { type: 'REMOVE_BUDGET', payload: 'string' }
    | { type: 'ADD_BILL',      payload: BillInterface }
    | { type: 'EDIT_BILL',     payload: BillInterface }
    | { type: 'REMOVE_BILL',   payload: 'string' };

// Proveedor del contexto
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initialState: AppState = {
        buedgetsData:[],
        billsData:[],
        userData: undefined
    };

    // Reducer para gestionar el estado
    const appReducer = (state: AppState, action: AppAction): AppState => {
        switch (action.type) {
            case 'ADD_BUDGET':
                return { ...state, buedgetsData: [...state.buedgetsData, action.payload] };
            case 'REMOVE_BUDGET':
                return {
                    ...state,
                    buedgetsData: state.buedgetsData.filter((budget:BudgetInterface) => budget.id !== action.payload),
                };
            default:
                return state;
        }
    };

    // Configurar el useReducer con el reducer y el estado inicial
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

// Función de conveniencia para usar el contexto
export const useAppContext = () => {
    return useContext(AppContext);
};
