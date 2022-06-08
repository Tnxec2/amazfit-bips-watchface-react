const colorRegex: RegExp = /^#[0-9A-F]{6}$/i;


export default class Color {
  
  static readonly DEFAULT_COLOR = '#000000';
  
  static hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  static rgbToHex(r: number, g: number, b: number) {
    return (
      "#" +
      r.toString(16).padStart(2, "0") +
      g.toString(16).padStart(2, "0") +
      b.toString(16).padStart(2, "0")
    );
  }

  /**
   * Read amazfit hex color from Json to HTML-HEX-String
   */
  static colorRead(color: string) {
    if (!color) return null;
    if (color.length === 18)
      color = color.substring(0, 2) + color.substring(10, 18);
    if (color.length === 10) color = "#" + color.substring(4);
    //let old_color = this.hexToRgb(color);
    //let new_color = this.rgbToHex(old_color.r, old_color.g, old_color.b);
    return color;
  }

  /*
    from html hex 32 bit color to 32 bit amazfit json hex color
  */
  static colorWrite(hex: string): string {
    if (hex == null) return null
    let h = this.hexToRgb(hex);
    if (h == null) return null
    let r = h.r;
    let g = h.g;
    let b = h.b;

    let new_color =
      "0x00" +
      r.toString(16).padStart(2, "0") +
      g.toString(16).padStart(2, "0") +
      b.toString(16).padStart(2, "0");
    return new_color.toUpperCase();
  }

  static GFG_Fun(color: any) {
    return colorRegex.test(color);
  }
}
