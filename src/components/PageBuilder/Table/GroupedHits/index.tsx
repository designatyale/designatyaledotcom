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

type BaseHit = { [x: string]: unknown };

type TabledHitsProps<K extends BaseHit = BaseHit, T = PeTable['asset_type']> = {
  value: Omit<PeTable, 'asset_type'> & { asset_type: T };
} & Parameters<typeof useInfiniteHits<K>>[0];

export default function GroupedHits<T = 'event'>({
  value,
  ...props
}: TabledHitsProps<Event & BaseHit, T>) {
  const { hits: data } = useInfiniteHits(props);
  const groupedData = useMemo(
    () =>
      Object.entries(
        data.reduce<{ [k: string]: typeof data }>(
          (acc, curr) => {
            const year = curr.date
              ? new Date(curr.date).getFullYear().toString()
              : 'Unknown';
            acc[year.toString()] = [...(acc[year.toString()] ?? []), curr];
            return acc;
          },
          {} as { [k: number]: typeof data }
        )
      ).toSorted(([key1], [key2]) =>
        key2 === 'Unknown'
          ? -Infinity
          : key1 === 'Unknown'
          ? Infinity
          : parseInt(key1) - parseInt(key2)
      ),
    [data]
  );

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
              <article key={event._id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.pictureUrl as string}
                  alt={`Promo for event ${event.title}`}
                />
                <h3>{event.title}</h3>
                <PortableText
                  components={components}
                  value={event.about ?? []}
                />
                <br />
                {event.location && (
                  <div className={s.field}>
                    <FiMapPin />
                    <div>
                      <PortableText
                        components={components}
                        value={event.location}
                      />
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
                )}
                <div className={s.field}>
                  <FiCheckSquare />
                  <p>RSVP {'->'}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
