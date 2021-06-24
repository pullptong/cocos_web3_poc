
import { _decorator, Component, Node, TiledMap, JsonAsset, TiledLayer, TiledTile, systemEvent, SystemEvent, Vec2, EventMouse } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Worldmap')
export class Worldmap extends Component {

    @property({ type: TiledMap, visible: true })
    private _tiledmap: TiledMap | null = null;

    private tiled!: TiledTile;

    public get tiledmap() {
        return this._tiledmap!;
    }

    onLoad() {
        this.tiled = this.addComponent(TiledTile) as TiledTile;
        this.tiled
    }

    start() {
        let layer: TiledLayer = this.tiledmap.getLayer("Tile Layer 1")!;
        console.log(layer);
        console.log(layer.getTileGIDAt(0, 0));
        layer.setTileGIDAt(1, 0, 0);
        layer.setTileGIDAt(5, 0, 1);
        layer.setTileGIDAt(10, 1, 0);
        layer.setTileGIDAt(4, 0, 2);
        // layer.
        // console.log(layer.getTileSet(0)?.in);
        // layer.getTiledTileAt()

        // let sn = this.tiledmap.tmxAsset.spriteFrameNames;
        // console.log(sn);

        // console.log(this.tiledmap.tmxAsset.spriteFrames)

        // let size = this.tiledmap.getMapSize();
        // let data: any = [];
        // for (let y = 0; y < size.height; y++) {
        //     data.push([]);
        //     for (let x = 0; x < size.width; x++) {
        //         let gid = layer.getTileGIDAt(x, y)!;
        //         data[y].push(gid);
        //     }
        // }

        // console.log('data', data);
    }

    // onKeyUp(e: Event.EventCustom) {
    //     if (e.keyCode == KEY.q) {
    //         this.getComponent(TiledMap).getLayer("Bottom").enabled = !this.getComponent(TiledMap).getLayer("Bottom").enabled;
    //         console.log("Toggled Bottom");
    //     }
    //     if (e.keyCode == KEY.w)
    //         this.getComponent(TiledMap).getLayer("Top").enabled = !this.getComponent(TiledMap).getLayer("Top").enabled;
    // }
    // update (deltaTime: number) {
    //     // [4]
    // }
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
