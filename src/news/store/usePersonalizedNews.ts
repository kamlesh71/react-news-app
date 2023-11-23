import { create } from "zustand";
import * as api from '@/news/api';
import { combine } from "zustand/middleware";
import { subDays } from "date-fns";
import { News, PersonalizedFilter } from "../types";

const initialState = {
    cursor: null,
    loading: false,
    filters: {
        search: '',
        date: {
            from: subDays(new Date, 30),
            to: new Date,
        },
    } as unknown as PersonalizedFilter,
    data: [] as News[],
}

const usePersonalizedNews = create(combine(
    {
        ...initialState
    },
    (set, get) => ({
        fetch: async (filters?: PersonalizedFilter, cursor:string | null = null) => {
            try {

                set({ loading: true, filters: filters ?? get().filters });
    
                const { data } = await api.personalizedNews(filters ?? get().filters, cursor);

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

            usePersonalizedNews.getState().fetch(filters, cursor);
        }
    })
));

export { usePersonalizedNews }; 