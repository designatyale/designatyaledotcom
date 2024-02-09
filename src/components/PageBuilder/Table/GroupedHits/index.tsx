/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Tue Sep 05 2023
 * 2023 Design at Yale
 */

import { Event, PeTable } from '@/sanity/schema';
import { useInfiniteHits } from 'react-instantsearch';
import s from './GroupedHits.module.scss';
import { useMemo } from 'react';
import { PortableText } from '@portabletext/react';
import components from '@/components/PortableText';
import { FiCalendar, FiMapPin, FiCheckSquare } from 'react-icons/fi';
import unwrapReference from '@/util/unwrapReference';
import TagPillHoverable from '@/components/TagPill/hoverable';

type BaseHit = { [x: string]: unknown };

type TabledHitsProps<K extends BaseHit = BaseHit, T = PeTable['asset_type']> = {
  value: Omit<PeTable, 'asset_type'> & { asset_type: T };
} & Parameters<typeof useInfiniteHits<K>>[0];

const now = new Date();
now.setHours(0, 0, 0);

function EventHitDisplay({ event }: { event: Event }) {
  let title: React.ReactNode = event.title;
  if (event.title.includes('DAY Speaker Series: ')) {
    title = (
      <>
        <span style={{ display: 'inline-block' }}>DAY Speaker Series:</span>{' '}
        <span style={{ display: 'inline-block' }}>
          {event.title.replace('DAY Speaker Series: ', '')}
        </span>
      </>
    );
  }

  return (
    <div className={s.event}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={(event as { pictureUrl?: string }).pictureUrl}
        alt={`Promo for event ${event.title}`}
      />
      <h3>{title}</h3>
      {event.date && (
        <div className={s.field}>
          <FiCalendar />
          <p>
            {new Date(event.date).toLocaleString('en-us', {
              dateStyle: 'long',
              timeStyle: 'short',
            })}
          </p>
        </div>
      )}
      {event.location && (
        <div className={s.field}>
          <FiMapPin />
          <div>
            <PortableText components={components} value={event.location} />
          </div>
        </div>
      )}
      {event.date && new Date(event.date) >= now && (
        <div className={s.upcoming} role="presentation">
          UPCOMING!
        </div>
      )}
      <br />
      <PortableText components={components} value={event.about ?? []} />
      <br />
      <div style={{ flex: 1 }} />
      {event.design_tags && event.design_tags.length && (
        <ul className={s.field}>
          {event.design_tags?.map((design_tag) => {
            const tag = unwrapReference(design_tag);
            return <TagPillHoverable key={tag._id} tag={tag} />;
          })}
        </ul>
      )}
      {/* {event.location && (
        <div className={s.field}>
          <FiMapPin />
          <div>
            <PortableText components={components} value={event.location} />
          </div>
        </div>
      )}
      {event.date && (
        <div className={s.field}>
          <FiCalendar />
          <p>
            {new Date(event.date).toLocaleString('en-us', {
              dateStyle: 'long',
              timeStyle: 'short',
            })}
          </p>
        </div>
      )} */}
      {event.calendar_link && (
        <div className={s.field}>
          <FiCheckSquare />
          <p>
            <a
              href={event.calendar_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Add to Calendar {'->'}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default function GroupedHits<T = 'event'>({
  value,
  ...props
}: TabledHitsProps<Event & BaseHit, T>) {
  const { hits: data } = useInfiniteHits(props);
  const groupedData = useMemo(() => {
    const vals = Object.entries(
      data.reduce<{ [k: string]: typeof data }>(
        (acc, curr) => {
          const year = curr.date
            ? new Date(curr.date).getFullYear().toString()
            : 'Unknown';
          acc[year.toString()] = [...(acc[year.toString()] ?? []), curr];
          return acc;
        },
        {} as { [k: string]: typeof data }
      )
    );
    vals.sort(([key1], [key2]) =>
      key2 === 'Unknown'
        ? -Infinity
        : key1 === 'Unknown'
        ? Infinity
        : parseInt(key2) - parseInt(key1)
    );
    return vals;
  }, [data]);

  return (
    <div role="list" className={s.container}>
      {groupedData.map(([key, hits]) => (
        <section role="listitem" className={s.group} key={key}>
          <hgroup>
            <h2>{key}</h2>{' '}
            <small>
              {hits.length} event{hits.length === 1 ? '' : 's'}
            </small>
          </hgroup>
          <div className={s.group_items}>
            {hits.map((event) => (
              <EventHitDisplay key={event._id} event={event} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
