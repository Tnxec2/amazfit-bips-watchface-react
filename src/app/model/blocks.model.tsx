export enum BlockType {
    Button,
    Checkbox,
    Color,
    Date,
    Empty,
    Number,
    Select,
    SelectFile,
    Time,
  }

export type IBlock = IBlockEmpty | IBlockCheckbox | IBlockSelect | IBlockColor | IBlockNumber | IBlockSelectFile | IBlockButton
  
export  interface IRow {
    blocks: IBlock[],
    disabled?: boolean,
    onDelete?(): void,
    showDelete?: boolean,
}

export interface IOption {
    value: string,
    title: string
}


export const OptionsAlignmentBipS: IOption[] =  [ 
    { value: 'TopLeft', title:'TopLeft'},
    { value: 'TopCenter', title:'TopCenter'},
    { value: 'TopRight', title:'TopRight'},
    { value: 'CenterLeft', title:'CenterLeft'},
    { value: 'Center', title:'Center'},
    { value: 'CenterRight', title:'CenterRight'},
    { value: 'BottomLeft', title:'BottomLeft'},
    { value: 'BottomCenter', title:'BottomCenter'},
    { value: 'BottomRight', title:'BottomRight'},
]

export const OptionsLineEndingCircle: IOption[] =  [ {value:'0', title: 'Flat'}, {value:'180', title: 'Round'}]


export interface IBlockButton {
    title: string;
    type: BlockType.Button;
    disabled?: boolean;
    onClick(e): any
    className?: string
    error?: string
}
export interface IBlockColor {
    title: string;
    type: BlockType.Color;
    colorString: string;
    onChange(colorString: string): any;
    error?: string
}
export interface IBlockSelect{
    title: string;
    type: BlockType.Select;
    selectedValue: string;
    selectOptions: IOption[]
    onChange(selectedValue: string): any;
    disabled?: boolean;
    error?: string
}
export interface IBlockCheckbox {
    title: string;
    type: BlockType.Checkbox;
    checked: boolean;
    onChange(checked: boolean): any;
    disabled?: boolean;
    error?: string
}
export interface IBlockEmpty {
    title: string;
    type: BlockType.Empty;
    error?: string
}

export interface IBlockNumber {
    title: string;
    type: BlockType.Number;
    numberValue?: number;
    onChange(numberValue: number): any;
    disabled?: boolean;
    min?: number
    max?: number
    error?: string
}

export interface IBlockSelectFile {
    title: string;
    type: BlockType.SelectFile;
    imageIndex?: number;
    onChange(imageIndex: number): any;
    disabled?: boolean;
    error?: string;
    imagesCount: number;
}