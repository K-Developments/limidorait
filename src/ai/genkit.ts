
import {genkit, ai} from '@genkit-ai/next';
import {googleAI} from '@genkit-ai/googleai';

export {ai};

genkit({
  plugins: [googleAI()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
