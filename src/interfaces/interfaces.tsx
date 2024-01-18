

export interface UserInterface{
    id?:       string;
    name:      string;
    email:     string;
    password:  string;
    age:       string;
    date?:     Date;
    photo:     string
}

export interface BillInterface{
    id?:       string;
    name:      string;
    amount:    number | null;
    category:  string;
    date?:     Date;
    setModal?: React.Dispatch<React.SetStateAction<boolean>>;
    setBill?:  React.Dispatch<React.SetStateAction<BillInterface|undefined>> ;
}

export interface BudgetInterface{
    id:       string;
    amount:    number;
    date?:     Date;
}

