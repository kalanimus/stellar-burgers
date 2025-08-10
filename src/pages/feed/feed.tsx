import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/feedSlice';
import { useEffect } from 'react';

export const Feed: FC = () => {
  const { orders, loading } = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  const handleGetFeeds = () => dispatch(getFeeds());

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
