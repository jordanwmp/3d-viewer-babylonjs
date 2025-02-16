// import * as BABYLON from '@babylonjs/core/Legacy/legacy'

import {
    Scene
} from '@babylonjs/core/Legacy/legacy'


import Setup from "./setup"

class AnimationModel {
    
    private _animationGroup:any[]
    public scene:Scene

    constructor(setup:Setup){
        this.scene = setup.scene
    }

    set animationsGroup(animations)
    {
        this._animationGroup = animations
    }

    get animationsGroup()
    {
        return this._animationGroup
    }

    resetAnimationsGroup()
    {
        this._animationGroup = []   
    }

    getAnimationByName(animationName:string)
    {
        return this.scene.getAnimationGroupByName(animationName)
    }

    startAnimation(animationGroup:any)
    {
        animationGroup.start(true, 1.0, animationGroup.from, animationGroup.to, false);
    }

    stopAnimation(animationGroup:any)
    {
        animationGroup.stop()
    }
}

export default AnimationModel