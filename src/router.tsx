import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import App from './App'
import VehicleListPage from './pages/VehicleListPage'
import VehicleDetailsPage from './pages/VehicleDetailsPage'

// Create a root route
export const rootRoute = createRootRoute({
  component: App,
})

// Create routes
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <VehicleListPage setToast={(message) => window.__APP_STATE__.setToast(message)} />,
})

export const vehicleDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vehicles/$vehicleId',
  component: () => (
    <VehicleDetailsPage
      setToast={(message) => window.__APP_STATE__.setToast(message)}
    />
  ),
})

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  vehicleDetailsRoute,
])

// Create and export the router
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

// Add window type declaration
declare global {
  interface Window {
    __APP_STATE__: {
      setToast: (message: string | null) => void;
    };
  }
}
