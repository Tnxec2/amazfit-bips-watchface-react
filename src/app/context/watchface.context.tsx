import {createContext, useState} from 'react'
import { WatchFace } from '../model/watchFace.bips.model';

export const WatchfaceContext = createContext(null);

export interface IWatchContext {
    watchface: WatchFace,
    setWatchface(watchface: WatchFace): void,
}

export const WatchfaceProvider = ({ children }) => {
  const [watchface, setWatchface] = useState<WatchFace>(new WatchFace());

  const value={
    watchface,
    setWatchface,
  }

  return (
    <WatchfaceContext.Provider value={value}>
      {children}
    </WatchfaceContext.Provider>
  );
};