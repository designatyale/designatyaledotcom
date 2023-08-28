/*
 * defaultDocumentNode.tsx
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */

import Iframe from 'sanity-plugin-iframe-pane';
import { DefaultDocumentNodeResolver } from 'sanity/desk';

/**
 * Defines custom document views for specific document types. For example, this
 * allows viewing an iFrame of a site page in preview mode as you edit it. You
 * can also display standalone React components, or anything you want, really.
 *
 * Simply add another case to the switch statement if you want to augment the
 * document node for your own type.
 */
const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  switch (schemaType) {
    case `site_page`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(({ document, ...props }) => {
            return (
              <Iframe
                document={document}
                {...props}
                options={{
                  ...props.options,
                  url: `${window.location.origin}/api/preview?redirect=${
                    document.displayed.slug?.current || '/'
                  }`,
                }}
              />
            );
          })
          .title('Web Preview'),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};

export default defaultDocumentNode;
