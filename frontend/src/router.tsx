import { Suspense, lazy } from 'react';
import {
  Navigate,
  createBrowserRouter,
  redirect
} from 'react-router-dom';

import SidebarLayout from './layouts/SidebarLayout';
import BaseLayout from './layouts/BaseLayout';

import SuspenseLoader from './components/SuspenseLoader';
import Login from './content/overview/Login';
import Register from './content/overview/Register';
import getCurrentUser from './services/utils/getCurrentUser';
import getToken from './services/utils/getToken';
import projectsLoader from './services/loaders/projectsLoader';
import sprintsLoader from './services/loaders/sprintsLoader';
import useCasesLoader from './services/loaders/useCasesLoader';
import ScenarioDetails from './content/applications/Scenarios/ScenarioDetails';
const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import('./content/overview')));

// Dashboards

const Projects = Loader(lazy(() => import('./content/dashboards/Projects')));

const Sprints = Loader(lazy(() => import('./content/dashboards/Sprints')));
const UseCases = Loader(lazy(() => import('./content/dashboards/UseCases')));
const TestCases = Loader(
  lazy(() => import('./content/dashboards/TestCases'))
);
const Scenarios = Loader(
  lazy(() => import('./content/dashboards/Scenarios'))
);
const Users = Loader(lazy(() => import('./content/dashboards/Users')));
// Components
// Status

const Status404 = Loader(
  lazy(() => import('./content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('./content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('./content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('./content/pages/Status/Maintenance'))
);

const currentUser: any = getCurrentUser();
const token: any = getToken();

const routes = createBrowserRouter([
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Overview />,
        children: [
          {
            index: true,
            element: <Navigate to="login" />
          },

          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          }
        ]
      },

      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    loader: () => projectsLoader(currentUser?.id),
    children: [
      {
        index: true,
        element: <Navigate to="projects" replace />
      },
      {
        path: 'projects',
        element: <Projects />,
        loader: () => projectsLoader(currentUser?.id)
      },
      {
        path: '/dashboards/projects/:projectId/sprints',
        element: <Sprints />,
        loader: ({ params }) => {
          return sprintsLoader(params?.projectId);
        }
      },
      {
        path: 'projects/:projectId/sprints/:sprintId/use-cases',
        element: <UseCases />,
        loader: ({ params }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          return useCasesLoader(params?.sprintId);
        }
      },
      {
        path: 'projects/:projectId/sprints/:sprintId/use-cases/:useCaseId/test-cases',
        element: <TestCases />,
        loader: ({ params }) => {
          return { sprintId: params?.sprintId, useCaseId: params?.useCaseId };
        }
      },
      {
        path: 'scenarios',
        element: <Scenarios />
      },
      {
        path: 'scenarios/:scenarioId/use-cases',
        element: <ScenarioDetails />,
        loader: ({ params }) => {
          return params?.scenarioId;
        }
      },
      {
        path: 'users',
        element: <Users />,
        loader: () => {
          if (getCurrentUser().roles[0] != 'ROLE_ADMIN') {
            return redirect('*');
          }
          return currentUser;
        }
      }
    ]
  },

  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
        ]
      }
    ]
  },
]);

export default routes;
