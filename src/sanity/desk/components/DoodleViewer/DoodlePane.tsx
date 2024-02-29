/*
 * DoodlePane.tsx
 * Author: evan kirkiles
 * Created On Fri Nov 17 2023
 * 2023 Design at Yale
 */

import { Sketch } from '@/lib/kysely';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import s from './DoodleViewer.module.scss';
import { API_BACKEND_SECRET } from '@/env';
import { ImSpinner2 } from 'react-icons/im';
import { VscHeart, VscHeartFilled, VscTrash } from 'react-icons/vsc';

export default function Doodle({ sketch }: { sketch: Sketch }) {
  const queryClient = useQueryClient();
  // OK. I KNOW THIS IS SUPER INSECURE. BUT IDC. AUTH IS HARD.
  const { mutate: deleteDoodle, isPending: deleteLoading } = useMutation<Sketch>(
    {
      mutationFn: async () =>
        await fetch(`/api/sketches/${sketch.id}?SECRET=${API_BACKEND_SECRET}`, {
          method: 'DELETE',
        }).then((r) => r.json()),
      onSuccess: () => {
        queryClient.setQueryData(
          ['sketches:unfavorited', `prompt:${sketch.prompt_id}`],
          (oldData: Sketch[] | undefined) =>
            oldData?.filter(({ id }) => id !== sketch.id) || []
        );
        queryClient.setQueryData(
          ['sketches:favorited', `prompt:${sketch.prompt_id}`],
          (oldData: Sketch[] | undefined) =>
            oldData?.filter(({ id }) => id !== sketch.id) || []
        );
      },
    }
  );
  const { mutate: favoriteDoodle, isPending: favLoading } = useMutation<Sketch>({
    mutationFn: async () =>
      await fetch(`/api/sketches/${sketch.id}?SECRET=${API_BACKEND_SECRET}`, {
        method: 'PUT',
        body: JSON.stringify({
          favorited: !sketch.favorited,
        }),
      }).then((r) => r.json()),
    onSuccess: (data) => {
      // add to new category
      queryClient.setQueryData(
        [
          `sketches:${data.favorited ? 'favorited' : 'unfavorited'}`,
          `prompt:${sketch.prompt_id}`,
        ],
        (oldData: Sketch[] | undefined) =>
          oldData ? [...oldData, data] : [data]
      );
      // remove from opposite category
      queryClient.setQueryData(
        [
          `sketches:${!data.favorited ? 'favorited' : 'unfavorited'}`,
          `prompt:${sketch.prompt_id}`,
        ],
        (oldData: Sketch[] | undefined) =>
          oldData?.filter(({ id }) => id !== data.id) || []
      );
    },
  });

  return (
    <article
      className={s.doodle}
      key={sketch.id}
      data-scheme={sketch.dark_mode ? 'dark' : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={sketch.image_url} alt="A sketch." />
      <div className={s.info}>
        <h4>{sketch.name}</h4>
        <div>{sketch.email}</div>
        <div>
          {new Date(sketch.createdAt as any as string).toLocaleDateString(
            'en-us',
            { dateStyle: 'long' }
          )}
        </div>
        <div className={s.action_bar}>
          <button onClick={() => (!favLoading ? favoriteDoodle() : undefined)}>
            {favLoading ? (
              <ImSpinner2 className={s.spinner} />
            ) : sketch.favorited ? (
              <VscHeartFilled />
            ) : (
              <VscHeart />
            )}
          </button>
          <button onClick={() => (!deleteLoading ? deleteDoodle() : undefined)}>
            {deleteLoading ? <ImSpinner2 className={s.spinner} /> : <VscTrash />}
          </button>
        </div>
      </div>
    </article>
  );
}
