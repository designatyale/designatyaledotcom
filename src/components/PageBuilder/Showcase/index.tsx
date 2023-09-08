/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Wed Sep 06 2023
 * 2023 Design at Yale
 */

import {
  PeShowcase,
  Project,
  SanityKeyed,
  SocialWebsite,
} from '@/sanity/schema';
import unwrapReference from '@/util/unwrapReference';
import s from './Showcase.module.scss';
import SanityImage from '@/components/SanityImage';
import classNames from 'classnames';
import { PortableText } from '@portabletext/react';
import components from '@/components/PortableText';
import Link from 'next/link';

function ShowcaseProject({ project }: { project: Project }) {
  const image = unwrapReference(project.picture.asset);
  const website = project.socials?.find(
    (arg): arg is SanityKeyed<SocialWebsite> => arg._type === 'social_website'
  );
  return (
    <div className={s.project} id={project._id}>
      <SanityImage image={image} className={s.project_image} />
      <div>{project.name}</div>
      <div>{project.client}</div>
      {website && (
        <div>
          <a href={website.link} target="_blank" rel="noopener noreferrer">
            {new URL(website.link).hostname}
          </a>
        </div>
      )}
    </div>
  );
}

export default function Showcase({ value }: { value: PeShowcase }) {
  if (!value.assets?.length) {
    return (
      <div>
        <ul className={classNames(s.temp_class)}>
          <li>Oops, this isn&apos;t ready yet!</li>
        </ul>
      </div>
    );
  }

  return (
    <div className={s.container}>
      {(value.copy || value.show_legend) && (
        <div className={s.copy}>
          <div className={s.copy_inner}>
            {value.copy && (
              <PortableText value={value.copy} components={components} />
            )}
            {value.show_legend && (
              <ol className={s.legend}>
                {value.assets.map((assetRef) => {
                  const asset = unwrapReference(assetRef);
                  switch (asset._type) {
                    case 'project':
                      return (
                        <li key={asset._id}>
                          <Link href={`#${asset._id}`}>
                            {asset.client || asset.name}
                          </Link>
                        </li>
                      );
                  }
                })}
              </ol>
            )}
          </div>
        </div>
      )}
      <ul className={s.assets}>
        {value.assets.map((assetRef) => {
          const asset = unwrapReference(assetRef);
          switch (asset._type) {
            case 'project':
              return (
                <li key={asset._id}>
                  <ShowcaseProject project={asset} />
                </li>
              );
          }
        })}
      </ul>
    </div>
  );
}
