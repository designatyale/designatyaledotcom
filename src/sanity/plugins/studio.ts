/*
 * studio.tsx
 * author: Evan Kirkiles
 * created on Sun Nov 19 2023
 * 2023 Design at Yale
 */

import { DefaultDocumentNodeResolver } from 'sanity/desk';

// export function studioLogo() {
//   return (
//     <Wordmark style={{ height: '2.5em', width: 'auto', padding: '0.5em' }} />
//   );
// }

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  // Conditionally return a different configuration based on the schema type
  // if (schemaType === "post") {
  //   return S.document().views([
  //     S.view.form(),
  //     S.view.component(WebPreview).title('Web')
  //   ])
  return S.document().views([S.view.form()]);
};
