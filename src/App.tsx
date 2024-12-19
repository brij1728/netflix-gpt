import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './providers/AuthProvider';
import { Provider } from 'react-redux';
import { Redirector } from './routes/RedirectorRoutes';
import { appStore } from './redux/store';

const App = () => {
  return (
    <Provider store={appStore}>
      <AuthProvider>
        <Redirector />
        <AppRoutes />
      </AuthProvider>
    </Provider>
  );
};

export default App;
