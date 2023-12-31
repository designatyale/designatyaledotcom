/*
 * utils.ts
 * Author: evan kirkiles
 * Created On Tue Sep 05 2023
 * 2023 Design at Yale
 *
 * https://github.com/algolia/doc-code-samples/blob/master/react-instantsearch/facet-dropdown/src/utils.ts
 */

import { Children, isValidElement, ReactNode } from 'react';

export function capitalize(value: string) {
  if (typeof value !== 'string') return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getFirstChildPropValue(
  children: ReactNode,
  propNameCb: (props: any) => string
): string | string[] | undefined {
  let propValue = undefined;

  Children.forEach(children, (element) => {
    if (!isValidElement(element)) return;
    const propName = propNameCb(element.props);
    if (propName in element.props) {
      propValue = element.props[propName];
      return;
    }
  });

  return propValue;
}
