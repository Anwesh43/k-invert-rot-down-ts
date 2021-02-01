const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 4  
const scGap : number = 0.02 / parts  
const strokeFactor : number = 90 
const delay : number = 20 
const gapDeg : number = Math.PI / 4 
const deg : number = Math.PI / 2
const backColor : string = "#bdbdbd"
const sizeFactor : number = 4.9 
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

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawKInvertRotDown(context : CanvasRenderingContext2D, scale : number) {
        const size : number = Math.min(w, h) / sizeFactor 
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const sf4 : number = ScaleUtil.divideScale(sf, 3, parts)
        context.save()
        context.translate(w / 2, h / 2 + (h / 2 - size / 2) * sf4)
        context.rotate(deg * sf3)
        
        DrawingUtil.drawLine(context, 0, -size * sf1, 0, size * sf1)
        for (var j = 0; j < 2; j++) {
            context.save()
            context.scale(1, 1 - 2 *  j)
            context.rotate(gapDeg * sf2)
            DrawingUtil.drawLine(context, 0, 0, 0, -size * sf1)
            context.restore()
        }
        context.restore()
    }

    static drawIRDNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = colors[i]
        DrawingUtil.drawKInvertRotDown(context, scale)
    }
}