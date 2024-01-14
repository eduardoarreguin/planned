
export interface NewBudgetI{
    handleNewBudget: (newBudget: number) => void;
    budget:          number;
    setBudget:       React.Dispatch<React.SetStateAction<number>>;
    firstBudget:     boolean;
    setAddBudget:    React.Dispatch<React.SetStateAction<boolean>>;

}

export interface ControlBudgetI{
    budget:       number;
    available:    number;
    spent:        number;
    percentaje:   number;
    setAddBudget: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ListBillsI{
    bills:         FormDataI[]
    setModal:      React.Dispatch<React.SetStateAction<boolean>>;
    setBill:       React.Dispatch<React.SetStateAction<FormDataI|undefined>> ;
    filter:        string;
    filteredBills: FormDataI[];
}

export interface FormSpentI{ 
    setModal:      React.Dispatch<React.SetStateAction<boolean>>;
    handleSpent:   (newBudget: FormDataI) => void;
    bill:          FormDataI | undefined;
    setBill:       React.Dispatch<React.SetStateAction<FormDataI|undefined>> ;
    deleteSpent:   (id: string) => void;
    setAmountItem: React.Dispatch<React.SetStateAction<number>>

    
}

export interface FormDataI{
    id?:       string;
    name:      string;
    amount:    number | null;
    category:  string;
    date?:     Date;
    setModal?: React.Dispatch<React.SetStateAction<boolean>>;
    setBill?:  React.Dispatch<React.SetStateAction<FormDataI|undefined>> ;
}

export interface BudgetI{
    id?:       string;
    amount:    number | null;
    date?:     Date;
}

export interface CategoriesI {
    save:          NodeRequire;
    food:          NodeRequire;
    home:          NodeRequire;
    miscellaneous: NodeRequire;
    leisure:       NodeRequire;
    health:        NodeRequire;
    subscriptions: NodeRequire;
    [key: string]: any; // Firma de índice
  }

  export interface PickerI{
    selectedValue: string
    onValueChange: React.Dispatch<React.SetStateAction<string>>
  }

  export interface FilterI {
    filter:           string;
    setFilter:        React.Dispatch<React.SetStateAction<string>>;
    bills:            FormDataI[];
    setFilteredBills: React.Dispatch<React.SetStateAction<FormDataI[]>>;
  }
