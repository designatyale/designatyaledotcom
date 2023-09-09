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
  SocialInstagram,
  SocialWebsite,
} from '@/sanity/schema';
import unwrapReference from '@/util/unwrapReference';
import s from './Showcase.module.scss';
import SanityImage from '@/components/SanityImage';
import classNames from 'classnames';
import { PortableText } from '@portabletext/react';
import components from '@/components/PortableText';
import ShowcaseLink, {
  BackToTop,
} from '@/components/PageBuilder/Showcase/button';
import TagPillHoverable from '@/components/TagPill/hoverable';

function ShowcaseProject({ project }: { project: Project }) {
  const image = unwrapReference(project.picture.asset);
  const website = project.socials?.find(
    (arg): arg is SanityKeyed<SocialWebsite> => arg._type === 'social_website'
  );
  const instagram = project.socials?.find(
    (arg): arg is SanityKeyed<SocialInstagram> =>
      arg._type === 'social_instagram'
  );
  return (
    <div className={s.project} id={project._id}>
      <SanityImage image={image} className={s.project_image} />
      <div className={s.project_title}>{project.name}</div>
      <div className={s.project_dates}>{project.date}</div>
      <ul className={s.project_tags}>
        {project.design_tags?.map((assetRef) => {
          const tag = unwrapReference(assetRef);
          return <TagPillHoverable key={tag._id} tag={tag} />;
        })}
      </ul>
      {website ? (
        <div className={s.project_website}>
          <a href={website.link} target="_blank" rel="noopener noreferrer">
            {new URL(website.link).hostname}
          </a>
        </div>
      ) : instagram ? (
        <div className={s.project_website}>
          <a
            href={`https://instagram.com/${instagram.username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{instagram.username}
          </a>
        </div>
      ) : null}
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
        <>
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
                            <ShowcaseLink targetId={`showcase_${asset._id}`}>
                              {asset.name}
                            </ShowcaseLink>
                          </li>
                        );
                    }
                  })}
                </ol>
              )}
            </div>
          </div>
          <BackToTop
            className={s.backtotop}
            aria-label="Scroll back to the top of the page"
          >
            ↑ Back to top
          </BackToTop>
        </>
      )}
      <ul className={s.assets}>
        {value.assets.map((assetRef) => {
          const asset = unwrapReference(assetRef);
          switch (asset._type) {
            case 'project':
              return (
                <li key={asset._id} id={`showcase_${asset._id}`}>
                  <ShowcaseProject project={asset} />
                </li>
              );
          }
        })}
      </ul>
    </div>
  );
}
