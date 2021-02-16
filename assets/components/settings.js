import { useState, useContext, useMemo, createContext } from "react"

const SettingsContext = createContext()

const useSettings = () => {
    const context = useContext(SettingsContext)
    if(!context) {
        throw new Error("Settings must be within a SettingsProvider")
    }
    return context
}

const SettingsProvider = ({settings={}, ...props}) => {
    const [_settings, setSettings] = useState(settings)
    const value = useMemo(() => [_settings, setSettings], [_settings])

    return (
        <SettingsContext.Provider value={value} {...props} />
    )
}

export {
    SettingsProvider,
    useSettings
}