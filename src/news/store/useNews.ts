import { create } from "zustand";
import * as api from '@/news/api';
import { combine, persist } from "zustand/middleware";
import { subDays } from "date-fns";
import { Filter, News, OptionType, ServerOption } from "../types";

const initialState = {
    loading: false,
    cursor: null,
    filterOptions: {
        categories: [] as OptionType[],
        sources: [] as OptionType[],
        authors: [] as OptionType[],
    },
    filters: {
        search: '',
        source: '',
        date: {
            from: subDays(new Date, 30),
            to: new Date,
        },
        category: '',
    } as unknown as Filter,
    data: [] as News[],
}

const useNews = create(persist(
    combine(
        {
            ...initialState
        },
        (set, get) => ({
            initFilterOptions: async () => {
                const { data } = await api.filterOptions();
                set({ filterOptions: {
                    authors: data.authors.map((author: string) => ({ label: author, value: author })),
                    categories: data.categories.map((category: ServerOption) => ({ label: category.name, value: category.id })),
                    sources: data.sources.map((source: ServerOption) => ({ label: source.name, value: source.id }))
                } });
            },
            fetch: async (filters?: Filter, cursor:string | null = null) => {
                try {
    
                    set({ loading: true, filters: filters ?? get().filters });
        
                    const { data } = await api.news(filters ?? get().filters, cursor);
    
                    set({ data: cursor ? [ ...get().data, ...data.data  ] : data.data, cursor: data.meta.next_cursor });
                } finally {
                    set({ loading: false });
                }
            },
            fetchMore: () => {
                const { loading, cursor, filters } = get();

                if (! cursor || loading) {
                    return;
                }

                useNews.getState().fetch(filters, cursor);
            }
        })
    ),
    {
        name: '_news',
        partialize: (state) => ({ filterOptions: state.filterOptions, }),
    }
));

export { useNews }; 