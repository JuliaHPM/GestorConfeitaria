import { useQuery } from "react-query";
import userService from "../services/user.service";

async function getAdmins() {
    const { data } = await userService.getAllAdministradores();
    return data;
}

export function useAdmins() {
    return useQuery(['administradores'], () => getAdmins(), {
        staleTime: 1000 * 60 // 1min
    })
}