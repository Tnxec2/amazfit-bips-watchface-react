import { IImage } from '../../model/image.model';

export interface IImagesState {
    images: IImage[]
}
export const imagesInitialState = {
  images: []
};

export enum imagesActionsEnum {
  ADD_IMAGE,
  CLEAR,
};

interface IImageAction {
    type: imagesActionsEnum,
    image?: IImage
}

export const imagesReducer = (state: IImagesState, action: IImageAction): IImagesState => {
    switch (action.type) {
      case imagesActionsEnum.ADD_IMAGE:
        return {
          images: [
            ...state.images, action.image            
          ]
        };
      case imagesActionsEnum.CLEAR: {
        return { images: [] };
      }
      default:
        return state;
    }
  };

