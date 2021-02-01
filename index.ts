const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 4  
const scGap : number = 0.02 / parts  
const strokeFactor : number = 90 
const delay : number = 20 
const gapDeg : number = Math.PI / 4 
const deg : number = Math.PI / 2
const backColor : string = "#bdbdbd"
const colors : Array<string> = [
    "#f44336",
    "#E65100",
    "#004D40",
    "#b71c1c",
    "#3F51B5"
]

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}