import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import EnvelopesIndex from '../features/envelopes/EnvelopesIndex.jsx';
import NewEnvelope from '../features/envelopes/NewEnvelope.jsx';
import Transfer from '../features/envelopes/Transfer.jsx';
import DistributeAmount from '../features/envelopes/DistributeAmount.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <EnvelopesIndex />
      },
      {
        path: '/envelopes',
        element: <EnvelopesIndex />
      },
      {
        path: '/envelopes/:id/edit',
        element: <NewEnvelope />
      },
      {
        path: '/envelopes/new',
        element: <NewEnvelope />
      },
      {
        path: '/envelopes/transfer',
        element: <Transfer />
      },
      {
        path: '/envelopes/distribution',
        element: <DistributeAmount />
      },
    ]
  }
]);

export default router;
