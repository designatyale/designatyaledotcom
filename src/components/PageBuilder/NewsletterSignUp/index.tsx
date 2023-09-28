/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Fri Sep 01 2023
 * 2023 Design at Yale
 */

import { PeNlsignup } from '@/sanity/schema';
import s from './NewsletterSignUp.module.scss';

export default function NewsletterSignUp({ value }: { value: PeNlsignup }) {
  return (
    <form
      action="https://designatyale.us20.list-manage.com/subscribe/post?u=5d9deb15439ca8c25e27f2744&amp;id=3a9365ecce&amp;f_id=00737aeaf0"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      target="_blank"
      className={s.form}
    >
      {value.copy && <legend>{value.copy}</legend>}
      <fieldset>
        <input type="hidden" name="tags" value="3479484" />
        <input
          type="email"
          name="EMAIL"
          id="mce-EMAIL"
          placeholder={value.placeholder || 'Your email...'}
          required
        />
        <div
          aria-hidden="true"
          style={{ position: 'absolute', left: '-5000px' }}
        >
          <input
            type="text"
            name="b_5d9deb15439ca8c25e27f2744_3a9365ecce"
            tabIndex={-1}
          />
        </div>
        <input
          type="submit"
          name="subscribe"
          id="mc-embedded-subscribe"
          value="Subscribe"
        />
      </fieldset>
    </form>
  );
}
