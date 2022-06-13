import {createContext, useReducer} from 'react'
import { IImage } from '../model/image.model';
import { imagesActions, imagesInitialState, imagesReducer } from './reducer/images.reducer';

export const ImagesContext = createContext(null);

export interface IImagesContext {
  images: IImage[],
  addImage(image: IImage),
  clear(),
}

export const ImagesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(imagesReducer, imagesInitialState);

  const value: IImagesContext = {
    images: state.images,
    addImage: (image: IImage) => {
      dispatch({ type: imagesActions.ADD_IMAGE, image });
    },
    clear: () => {
      dispatch({ type: imagesActions.CLEAR });
    }
  };

  return (
    <ImagesContext.Provider value={value}>
      {children}
    </ImagesContext.Provider>
  );
}