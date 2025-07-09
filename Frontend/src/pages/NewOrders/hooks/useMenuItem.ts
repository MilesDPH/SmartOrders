import {useEffect, useState} from "react";
import type {MenuItem} from "../interfaces.ts";
import {getMenuItems} from "../api";
import type {CursorPagination} from "../../../common/interfaces.ts";

export function useMenuitems() {
    const [menuItems, setMenuItems] = useState<CursorPagination<MenuItem>>({
        data: [],
        next_cursor: "",
        path: "",
        per_page: 0,
        prev_cursor: "",
        prev_page_url: ""
    });
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            try {
                const data = await getMenuItems();

                setMenuItems(data);

            } catch (e) {
                alert("No se pudo cargar: " + e);
            } finally {
                setLoading(false);
            }
        }

        loadInitialData();

    }, [])

    return {
        menuItems, loading
    }

}