/* eslint-disable @typescript-eslint/no-explicit-any */
import Suggestion from "@tiptap/suggestion";
import type { SuggestionOptions } from "@tiptap/suggestion";
import type { Editor } from "@tiptap/core";
import { Node } from "@tiptap/core";
import type { DOMOutputSpec } from "@tiptap/pm/model";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { getSuggestionOptions } from "../../utils/get-default-suggestion-attributes";

export interface SlashNodeAttrs {
  id: string | null;
  label?: string | null;
  slashSuggestionChar?: string | null;
}

export interface SlashOptions<
  SuggestionItem = any,
  Attrs extends Record<string, any> = SlashNodeAttrs
> {
  HTMLAttributes: Record<string, any>;

  renderLabel?: (props: {
    options: SlashOptions<SuggestionItem, Attrs>;
    node: ProseMirrorNode;
    suggestion: SuggestionOptions | null;
  }) => string;

  renderText: (props: {
    options: SlashOptions<SuggestionItem, Attrs>;
    node: ProseMirrorNode;
    suggestion: SuggestionOptions | null;
  }) => string;

  renderHTML: (props: {
    options: SlashOptions<SuggestionItem, Attrs>;
    node: ProseMirrorNode;
    suggestion: SuggestionOptions | null;
  }) => DOMOutputSpec;

  deleteTriggerWithBackspace: boolean;

  suggestions: Array<Omit<SuggestionOptions<SuggestionItem, Attrs>, "editor">>;

  suggestion: Omit<SuggestionOptions<SuggestionItem, Attrs>, "editor">;
}

interface GetSuggestionsOptions {
  editor?: Editor;
  options: SlashOptions;
  name: string;
}

function getSuggestions(options: GetSuggestionsOptions) {
  return (
    options.options.suggestions.length
      ? options.options.suggestions
      : [options.options.suggestion]
  ).map((suggestion) =>
    getSuggestionOptions({
      // @ts-ignore `editor` can be `undefined` when converting the document to HTML with the HTML utility
      editor: options.editor,
      overrideSuggestionOptions: suggestion,
      extensionName: options.name,
      char: suggestion.char,
    })
  );
}

function getSuggestionFromChar(options: GetSuggestionsOptions, char: string) {
  const suggestions = getSuggestions(options);

  const suggestion = suggestions.find((s) => s.char === char);
  if (suggestion) {
    return suggestion;
  }

  if (suggestions.length) {
    return suggestions[0];
  }

  return null;
}

export const Slash = Node.create<SlashOptions>({
  name: "slash",
  priority: 101,
  addOptions() {
    return {
      HTMLAttributes: {},
      renderText() {
        return "";
      },
      deleteTriggerWithBackspace: false,
      renderHTML() {
        return ""
      },
      suggestions: [],
      suggestion: {},
    };
  },
  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

  renderText({ node }) {
    const args = {
      options: this.options,
      node,
      suggestion: getSuggestionFromChar(this, node.attrs.mentionSuggestionChar),
    };
    if (this.options.renderLabel !== undefined) {
      return this.options.renderLabel(args);
    }

    return this.options.renderText(args);
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let isMention = false;
          const { selection } = state;
          const { empty, anchor } = selection;

          if (!empty) {
            return false;
          }

          // Store node and position for later use
          let mentionNode = new ProseMirrorNode();
          let mentionPos = 0;

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              isMention = true;
              mentionNode = node;
              mentionPos = pos;
              return false;
            }
          });

          if (isMention) {
            tr.insertText(
              this.options.deleteTriggerWithBackspace
                ? ""
                : mentionNode.attrs.mentionSuggestionChar,
              mentionPos,
              mentionPos + mentionNode.nodeSize
            );
          }

          return isMention;
        }),
    };
  },

  addProseMirrorPlugins() {
    // Create a plugin for each suggestion configuration
    return getSuggestions(this).map(Suggestion);
  },
});


export default Slash;