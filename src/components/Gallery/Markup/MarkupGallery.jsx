import css from './MarkupGallery.module.css'

export const MarkupGallery = ({ arrResult }) => {
  console.log(arrResult);
  return arrResult.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
      id,
    }) => (
      <li key={id} className={css.galleryListItem}>
        <a className={css.galleryLink} href={largeImageURL}>
          <img
            className={css.galleryImg}
            src={webformatURL}
            alt={tags}
            title={tags}
          />
          <ul className={css.statisticsList}>
            <li className={css.statisticsItem}>
              <p className={css.statisticsItemName}>Likes</p>
              <p className={css.statisticsResult}>{likes}</p>
            </li>
            <li className={css.statisticsItem}>
              <p className={css.statisticsItemName}>Views</p>
              <p className={css.statisticsResult}>{views}</p>
            </li>
            <li className={css.statisticsItem}>
              <p className={css.statisticsItemName}>Comments</p>
              <p className={css.statisticsResult}>{comments}</p>
            </li>
            <li className={css.statisticsItem}>
              <p className={css.statisticsItemName}>Downloads</p>
              <p className={css.statisticsResult}>{downloads}</p>
            </li>
          </ul>
        </a>
      </li>
    )
  );
};
