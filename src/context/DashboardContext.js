import { useSession } from 'next-auth/react';
import { createContext, useState } from 'react';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [barElements, setBarElements] = useState([]);
    const { data } = useSession();

    return (
        <DashboardContext.Provider
            value={{
                barElements,
                setBarElements,
                data,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};
