import { BaseSuggestionPlugin } from '@platejs/suggestion';

import { SuggestionLeafStatic } from './suggestion-node-static';

export const BaseSuggestionKit = [
  BaseSuggestionPlugin.withComponent(SuggestionLeafStatic),
];
