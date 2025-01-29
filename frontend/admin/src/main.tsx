import {AppContextProvider} from './hooks/AppContext.tsx'
import {App} from './App.tsx'
import {createRoot} from 'react-dom/client'


const AppWrapper = () => {
    return (
        <AppContextProvider>
            <App />
        </AppContextProvider>
    )
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<AppWrapper />);