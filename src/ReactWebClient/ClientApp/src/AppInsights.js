import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory({ basename: '' });
const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
  // https://docs.microsoft.com/en-us/azure/azure-monitor/app/javascript
  config: {
    instrumentationKey: '',
    enableDebug: true,
    extensions: [reactPlugin],
    loggingLevelConsole: 2,
    loggingLevelTelemetry: 2,
    samplingPercentage: 100,
    enableAutoRouteTracking: false,
    enableCorsCorrelation: true,
    enableRequestHeaderTracking: true,
    enableResponseHeaderTracking: true,
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory }
    }
  }
});
appInsights.loadAppInsights();
export { reactPlugin, appInsights };