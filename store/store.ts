import { create } from "zustand"

type preLoaderState = {
    isLoaded : boolean,
    
}
type navTypeState = {
    navType: string
    pendingPath: string | null
}
type navTypeActions = {
    setNavType: (value: string) => void
    setPendingPath: (value:string|null) => void
}
type preLoaderActions = {
    setIsLoaded: (value: boolean) => void
    
}
type projectLoaderState = {
    isLoaded: boolean
}

type projectLoaderActions = {
    setIsLoaded: (value: boolean) => void
}


export const preLoaderStore = create<preLoaderState & preLoaderActions>()((set)=>({
    isLoaded:false,
    setIsLoaded: (value: boolean)=>set({
        isLoaded: value
    }),
    
}))

export const projectLoaderStore = create<projectLoaderState & projectLoaderActions>()((set)=> ({
    isLoaded:false,
    setIsLoaded:(value: boolean) => set({
        isLoaded:value
    })
}))

export const navTypeStore = create<navTypeState & navTypeActions>()((set) => ({
    navType:"initial",
    pendingPath:null,
    setNavType:(value: string) => set({
        navType: value
    }),
    setPendingPath:(value: string | null) => set({
        pendingPath: value
    })
}))