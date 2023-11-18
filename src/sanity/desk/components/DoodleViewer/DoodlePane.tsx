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
import { VscClose, VscHeart, VscTrash } from 'react-icons/vsc';

export default function Doodle({ sketch }: { sketch: Sketch }) {
  const queryClient = useQueryClient();
  // OK. I KNOW THIS IS SUPER INSECURE. BUT IDC. AUTH IS HARD.
  const { mutate: deleteDoodle, isLoading: deleteLoading } = useMutation<Sketch>(
    {
      mutationFn: async () =>
        await fetch(`/api/sketches/${sketch.id}?SECRET=${API_BACKEND_SECRET}`, {
          method: 'DELETE',
        }).then((r) => r.json()),
      onSuccess: () => {
        queryClient.setQueryData(
          ['sketches'],
          (oldData: Sketch[] | undefined) =>
            oldData?.filter(({ id }) => id !== sketch.id) || []
        );
      },
    }
  );
  const { mutate: favoriteDoodle, isLoading: favoriteLoading } =
    useMutation<Sketch>({
      mutationFn: async () =>
        await fetch(`/api/sketches/${sketch.id}?SECRET=${API_BACKEND_SECRET}`, {
          method: 'PUT',
          body: JSON.stringify({
            favorite: true,
          }),
        }).then((r) => r.json()),
      onSuccess: () => {
        queryClient.setQueryData(
          ['sketches'],
          (oldData: Sketch[] | undefined) =>
            oldData?.filter(({ id }) => id !== sketch.id) || []
        );
      },
    });

  return (
    <article className={s.doodle} key={sketch.id}>
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
          <button
            onClick={() => (!favoriteLoading ? favoriteDoodle() : undefined)}
          >
            {favoriteLoading ? (
              <ImSpinner2 className={s.spinner} />
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
