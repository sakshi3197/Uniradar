import {createContext, useContext} from "react";

const AppContext = createContext();

const AppProvider = ({children}) => {

    return <AppContext.Provider value="Sakshi">{children}</AppContext.Provider>;
};

const useUniversityContext = () => {
    return useContext(AppContext);
}

export {AppProvider, AppContext, useUniversityContext};