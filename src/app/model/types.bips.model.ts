export class JsonType {
    constructor(public index: number, public json: string) {}
  }
  
 
  export class AlignmentType {
    static Default = new JsonType(0, "Default");
    static Left = new JsonType(2, "Left");
    static Right = new JsonType(4, "Right");
    static HCenter = new JsonType(8, "HCenter");

    static Top = new JsonType(16, "Top");
    static Bottom = new JsonType(32, "Bottom");
    static VCenter = new JsonType(64, "VCenter");
    
    static TopCenter = new JsonType(AlignmentType.Top.index | AlignmentType.HCenter.index, "TopCenter");
    static TopLeft = new JsonType(AlignmentType.Top.index | AlignmentType.Left.index, "TopLeft");
    static TopRight = new JsonType(AlignmentType.Top.index | AlignmentType.Right.index, "TopRight");
    
    static Center  = new JsonType(AlignmentType.VCenter.index | AlignmentType.HCenter.index, "Center");
    static CenterLeft  = new JsonType(AlignmentType.VCenter.index | AlignmentType.Left.index, "CenterLeft");
    static CenterRight  = new JsonType(AlignmentType.VCenter.index | AlignmentType.Right.index, "CenterRight");
    
    static BottomCenter  = new JsonType(AlignmentType.Bottom.index | AlignmentType.HCenter.index, "BottomCenter");
    static BottomLeft  = new JsonType(AlignmentType.Bottom.index | AlignmentType.Left.index, "BottomLeft");
    static BottomRight  = new JsonType(AlignmentType.Bottom.index | AlignmentType.Right.index, "BottomRight");
 
    static toJson(index: number): string {
      if (index === undefined) return this.Default.json;
      return Object.values(AlignmentType).find((val) => val.index === index).json;
    }
    static fromJson(json: string): number {
      if (json === undefined) return this.Default.index;
      return Object.values(AlignmentType).find((val) => val.json === json).index;
    }

    static hasFlag(alignment: number, flag: number) {
      return (alignment & flag) !== 0
    }
  }

  
  export class ShortcutType {
    static Workout  = new JsonType(5, "Workout");
    static CycleTracking  = new JsonType(10, "CycleTracking");
    static Music  = new JsonType(16, "Music");
    static Countdown  = new JsonType(17, "Countdown");
    static StopWatch  = new JsonType(18, "StopWatch");
    static Pomodoro  = new JsonType(19, "Pomodoro");
    static Voice  = new JsonType(25, "Voice");

    static findByIndex(index: number) {
      if (index === undefined) return this.Workout;
      return Object.values(ShortcutType).find((val) => val.index === index);
    }
    static toJson(index: number) {
      if (index === undefined) return this.Workout.json;
      return Object.values(ShortcutType).find((val) => val.index === index).json;
    }
    static findByJson(json: string) {
      if (json === undefined) return this.Workout;
      return Object.values(ShortcutType).find((val) => val.json === json);
    }
    static fromJson(json: string) {
      if (json === undefined) return this.Workout.index;
      return Object.values(ShortcutType).find((val) => val.json === json).index;
    }
  }
  
  