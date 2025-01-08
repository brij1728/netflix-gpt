import { appStore, persistor } from './redux/store';

import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './providers/AuthProvider';
import { Loader } from './components/ui';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={appStore}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
