'use client';

import * as React from 'react';

import { SuggestionPlugin } from '@platejs/suggestion/react';
import { PencilLineIcon } from 'lucide-react';
import { useEditorPlugin, usePluginOption } from 'platejs/react';

import { cn } from '@/utils/styleutils';

import { ToolbarButton } from '@/components/atoms/Toolbar/Toolbar';

export function SuggestionToolbarButton() {
  const { setOption } = useEditorPlugin(SuggestionPlugin);
  const isSuggesting = usePluginOption(SuggestionPlugin, 'isSuggesting');

  return (
    <ToolbarButton
      className={cn(isSuggesting && 'text-brand/80 hover:text-brand/80')}
      onClick={() => setOption('isSuggesting', !isSuggesting)}
      onMouseDown={(e) => e.preventDefault()}
      tooltip={isSuggesting ? 'Turn off suggesting' : 'Suggestion edits'}
    >
      <PencilLineIcon />
    </ToolbarButton>
  );
}
