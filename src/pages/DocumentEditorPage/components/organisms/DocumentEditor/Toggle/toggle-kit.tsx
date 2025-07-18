import { TogglePlugin } from '@platejs/toggle/react';

import { IndentKit } from "../BasicStyles/Indent/indent-kit";
import { ToggleElement } from "./toggle-node";

export const ToggleKit = [
  ...IndentKit,
  TogglePlugin.withComponent(ToggleElement),
];
