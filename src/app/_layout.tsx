import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Redirect, Stack } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <Stack/>
      {isLogin ? <Redirect href="/auth" /> : <Redirect href="/main" />}
    </>
  );
};

export default RootLayout;
