
export interface FormField {
    label: string;
    value: string;
    title: string;
  }
  
 export interface BoxData {
    id: string;
    title: string;
    form: FormField[];
    type: string;
    x: number;
    y: number;
    position: { x: number; y: number };
    width: number;
    height: number;
    stateId: string;
    prasentStatues: string;
    initialState: boolean;
    endState: boolean;
  }
  
 export interface Connection {
    id: string;
    start: string;
    end: string;
  }
  
 export interface ConnectionPoint {
    box: string;
    side: "top" | "right" | "bottom" | "left";
  }
  
 export interface BoxProps {
  type:string,
    id: string;
    position: { x: number; y: number };
    width: number;
    height: number;
    children: React.ReactNode;
    className?: string;
    onSelect: () => void;
    isSelected: boolean;
    onConnectionStart: (point: ConnectionPoint) => void;
    isConnecting: boolean;
  }
  
 export interface ConnectionButtonProps {
    side: "top" | "right" | "bottom" | "left";
    boxId: string;
    onConnectionStart: (point: ConnectionPoint) => void;
    isConnecting: boolean;
  }