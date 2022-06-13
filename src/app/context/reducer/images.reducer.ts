import { IImage } from '../../model/image.model';

export interface IImagesState {
    images: IImage[]
}
export const imagesInitialState = {
  images: []
};

export const imagesActions = {
  ADD_IMAGE: "ADD_IMAGE",
  CLEAR: 'CLEAR',
};

interface IImageAction {
    type: string,
    image?: IImage
}

export const imagesReducer = (state: IImagesState, action: IImageAction): IImagesState => {
    switch (action.type) {
      case imagesActions.ADD_IMAGE:
        return {
          images: [
            ...state.images, action.image            
          ]
        };
      case imagesActions.CLEAR: {
        return { images: [] };
      }
      default:
        return state;
    }
  };

