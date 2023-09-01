/*
 * page.tsx
 * Author: evan kirkiles
 * Created On Mon Aug 28 2023
 * 2023 Design at Yale
 */

import PageBuilder from '@/components/PageBuilder';
import PreviewPageBuilder from '@/components/PageBuilder/preview';
import PreviewProvider from '@/components/PreviewProvider';
import getClient from '@/sanity/client';
import { pageQuery } from '@/sanity/groq';
import { SitePage } from '@/sanity/schema';
import getPreview from '@/util/getPreview';

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default async function Page() {
  const preview = getPreview();
  const params = { pageSlug: `/` };
  const page: SitePage | null = await getClient(preview).fetch(
    pageQuery,
    params,
    { next: { tags: [`page:${params.pageSlug}`] } }
  );

  return (
    <article>
      {preview && preview.token ? (
        <PreviewProvider token={preview.token}>
          <PreviewPageBuilder
            initialValue={page ?? { pageBuilder: undefined }}
            query={pageQuery}
            params={params}
          />
        </PreviewProvider>
      ) : (
        <PageBuilder content={page?.pageBuilder} />
      )}
    </article>
  );
}

export const revalidate = false;
