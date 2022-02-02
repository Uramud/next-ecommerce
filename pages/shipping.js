import React from 'react';
import { useRouter } from 'next/router';
import { StoreContext } from '../utils/Store';

export default function Shipping() {
  const router = useRouter();
  const { state, dispatch } = useContext(StoreContext);
  const { userInfo } = state;
  if (!userInfo) {
    router.push('/login?redirect=/shipping');
  }
  return <div>shipping container</div>;
}
