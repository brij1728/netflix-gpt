import { OPENAI_KEY } from '../utils/constants';
import OpenAI from 'openai';

export const client = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});
