import axios from "axios";

export const preference = (data: unknown) => axios.patch('/api/account/preference', data);