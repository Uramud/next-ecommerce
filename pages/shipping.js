import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../utils/Store';
import Layout from '../components/Layout';

export default function Shipping() {
  const router = useRouter();
  const { state, dispatch } = useContext(StoreContext);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
  }, []);
  return <Layout title="Shipping">Welcome to shipping part</Layout>;
}
