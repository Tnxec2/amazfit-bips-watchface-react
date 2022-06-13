import {createContext, useReducer} from 'react'
import { IImage } from '../model/image.model';
import { imagesActionsEnum, imagesInitialState, imagesReducer } from './reducer/images.reducer';

export const ImagesContext = createContext(null);

export interface IImagesContext {
  images: IImage[],
  addImage(image: IImage): void,
  clear(): void,
}

export const ImagesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(imagesReducer, imagesInitialState);

  const value: IImagesContext = {
    images: state.images,
    addImage: (image: IImage) => {
      dispatch({ type: imagesActionsEnum.ADD_IMAGE, image });
    },
    clear: () => {
      dispatch({ type: imagesActionsEnum.CLEAR });
    }
  };

  return (
    <ImagesContext.Provider value={value}>
      {children}
    </ImagesContext.Provider>
  );
}