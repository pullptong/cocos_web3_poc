import { _decorator, Component, Node, EditBox, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WorldmapController')
export class WorldmapController extends Component {
    public perlin!: any;

    @property(EditBox)
    public seedBox: EditBox | null = null;
    @property(EditBox)
    public multiplyBox: EditBox | null = null;
    @property(Button)
    public btn: Button | null = null;

    onLoad() {
        this.btn!.node.on("click", this.onClick, this);

        this.perlin = (window as any).tooloud.Perlin;
    }

    onClick() {
        this.generateMap(
            Number.parseInt(this.seedBox!.string),
            Number.parseFloat(this.multiplyBox!.string)
        );
    }

    generateMap(seed: number, multiplier: number) {
        // [3]

        // for (let i = 0; i < 10; i++) {
        //     for (let j = 0; j < 10; j++) {
        //         let p = this.perlin.noise(j, i, 0);
        //         console.log(p);
        //     }
        // }
        this.perlin.setSeed(Math.floor(Math.random() * 10000));

        let canvasWidth = 10;
        let canvasHeight = 10;
        let arr = this.matrix(canvasHeight, canvasWidth, 0);
        let max = Number.MIN_SAFE_INTEGER;
        let min = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < canvasWidth; i++) {
            for (let j = 0; j < canvasHeight; j++) {

                /*
                let x, y, z;
        
                Normalize:
                x = i / canvasWidth;
                y = j / canvasHeight;
                z = 0;
                // Fixing one of the coordinates turns 3D noise into 2D noise
                // Fixing two of the coordinates turns 3D noise into 1D noise
                // Fixed coordinate will serve as a seed, i.e. you'll get different results for different values
                
                // Scale:
                const scale = 10;
                x = scale * x;
                y = scale * y;
                */

                // In one go:
                // const x = 15 * (i / canvasWidth);
                // const y = 5 * (j / canvasHeight);         // You can use different scale values for each coordinate
                const z = 0;
                const x = j * 0.9;
                const y = i * 0.9;
                // const n = this.perlin.noise(x, y, z);  // Calculate noise value at x, y, z
                // let n = (1 + this.perlin.noise(x, y, z)) / 2;
                let n = this.getPerlin(x, y);
                // console.log('n', n, j, i);
                arr[j][i] = n;
                if (n > max)
                    max = n;
                else if (n < min)
                    min = n;
            }
        }

        console.log('min max', min, max);
        // console.log('arr', arr);

    }

    getPerlin(x: number, y: number) {
        return (1 + this.perlin.noise(x, y, 0)) / 2;
    }

    matrix(rows: number, cols: number, defaultValue: number): number[][] {

        var arr: Array<Array<number>> = [];

        // Creates all lines:
        for (var i = 0; i < rows; i++) {

            // Creates an empty line
            arr.push([]);

            // Adds cols to the empty line:
            arr[i].push(new Array(cols) as any);

            for (var j = 0; j < cols; j++) {
                // Initializes:
                arr[i][j] = defaultValue;
            }
        }

        return arr;
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
