import { BaseLinkPlugin } from '@platejs/link';
import { LinkElementStatic } from './link-node-static';

export const BaseLinkKit = [BaseLinkPlugin.withComponent(LinkElementStatic)];
