import { DateRange } from "react-day-picker";

export type News = {
    id: string;
    title: string;
    image_url: string;
};

export type PersonalizedFilter = {
    search: string; 
    date: DateRange; 
};

export type Filter = {
    source?: string; 
    category?: string;
} & PersonalizedFilter;


export type ToolbarProps = {    
    filters: Filter,
    onFilterChange: (filters: Filter) => void;
    showCategory?: boolean;
    showSource?: boolean;
}

export type OptionType = {
    label: string;
    value: number;
}

export type ServerOption = { name: string; id: number; }