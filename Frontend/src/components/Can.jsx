import { useAuth } from "../hooks/useAuth";

export function Can({ admin = false, notAuthenticated = false, cliente = false, children }) {
    const { user, isAuthenticated } = useAuth();

    let userCanSeeComponent = isAuthenticated; //notAuthenticated ? (!isAuthenticated) : (isAuthenticated && (admin ? user?.admin : true) || (cliente ? !user?.admin : false));

    if (notAuthenticated) {
        userCanSeeComponent = !isAuthenticated;
    }

    if (admin) { //so adm
        userCanSeeComponent = isAuthenticated && user?.admin;
    }

    if (cliente) { //so cliente
        userCanSeeComponent = isAuthenticated && !user?.admin;
    }

    if (cliente && notAuthenticated) {//cliente e visitante
        userCanSeeComponent = !user?.admin || notAuthenticated;
    }

    // if (isAuthenticated && !admin && !cliente) { //tanto admin quanto cliente
    //     userCanSeeComponent = true;
    // }

    if (!userCanSeeComponent) {
        return null;
    }

    return (
        <>
            {children}
        </>
    )
}