import { create } from "zustand";
import { combine } from "zustand/middleware";
import * as api from '../api'
import { toast } from "@/common/components/ui/use-toast";
import { usePersonalizedNews } from "@/news/store/usePersonalizedNews";

const usePreferenceStore = create(
    combine(
        {
            loading: false,
            show: false,
            preference_sources: [] as number[],
            preference_categories: [] as number[],
            preference_authors: [] as number[],
        }, 
        (set) => ({
            init: (fields: object) => {
                set(state => ({...state, ...fields}));
            },
            onShowChange: (show: boolean) => set({ show }),
            update: async (sources: number[], categories: number[], authors: number[]) => {
                try {

                    set({ loading: true });

                    const { data } = await api.preference({
                        preference_sources: sources,
                        preference_categories: categories,
                        preference_authors: authors,
                    });

                    if (data.success) {
                        // update the state
                        set({ 
                            show: false, 
                            preference_sources: sources,
                            preference_categories: categories,
                            preference_authors: authors,
                         });
                         
                         // refresh personalized feed
                         usePersonalizedNews.getState().fetch();

                         // notify user
                        toast({
                            description: "You preferences has been saved successfully."
                        });
                    }

                } finally {
                    set({ loading: false });
                }
            }
        })
    )
);

export { usePreferenceStore };