import axios from "../../lib/axios.ts";
import type {AxiosResponse} from "axios";
import type {MenuItem} from "./interfaces.ts";
import type {CursorPagination} from "../../common/interfaces.ts";

export async function getMenuItems(): Promise<CursorPagination<MenuItem>> {
    try {
        const {data} = await axios.get<CursorPagination<MenuItem>>('/api/menu-items');
        return data;
    } catch (e) {
        if(axios.isAxiosError(e)){
            console.error("error petición: " + e);
        } else {
            console.error("No se");
        }

        throw e;
    }
}