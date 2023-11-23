import axios from "axios";
import { format } from "date-fns";
import { Filter, PersonalizedFilter } from "../types";

export const news = (params: Filter, cursor: string | null) => {

    const copyParams = {...params};

    if ('date' in params) {
        
        copyParams.date = {
            // @ts-expect-error converting date to string for api
            from: format(params.date.from, 'yyyy-MM-dd'),
            // @ts-expect-error converting date to string for api
            to: format(params.date.to, 'yyyy-MM-dd'),
        };
    }

    return axios.get('/api/news', {
        params: {
            ...copyParams,
            cursor,
        }
    });
};

export const filterOptions = () => axios.get('/api/news/filter-options');

export const personalizedNews = (params: PersonalizedFilter, cursor: string | null) => {

    const copyParams = {...params};

    if ('date' in params) {
        
        copyParams.date = {
            // @ts-expect-error converting date to string for api
            from: format(params.date.from, 'yyyy-MM-dd'),
            // @ts-expect-error converting date to string for api
            to: format(params.date.to, 'yyyy-MM-dd'),
        };
    }

    return axios.get('/api/news/personalized', {
        params: {
            ...copyParams,
            cursor,
        }
    });
};