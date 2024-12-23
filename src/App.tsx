import { appStore, persistor } from './redux/store';

import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './providers/AuthProvider';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Redirector } from './routes/RedirectorRoutes';

const App = () => {
  return (
    <Provider store={appStore}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <AuthProvider>
          <Redirector />
          <AppRoutes />
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
