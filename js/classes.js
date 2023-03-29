class Sprite { //champions creator, style and frames update
    constructor({position, imageSrc, scale = 1, framesHold = 1, framesMax = 1, offset = {x:0, y:0}}){ //transform the parameter in object {}, now dosent mether the order bcs it is all a sigle thing
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = framesHold // velocity of animation
        this.offset = offset


    }

    draw(){ //sizes and style of champion ????????????????????????????????????
        c.drawImage(
        this.image, 
        this.framesCurrent * (this.image.width / this.framesMax), 
        0, 
        this.image.width / this.framesMax, 
        this.image.height, 
        this.position.x - this.offset.x, 
        this.position.y - this.offset.y, 
        (this.image.width / this.framesMax) * this.scale, 
        this.image.height * this.scale)
    }

    animateFrames() {
        this.framesElapsed ++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) { // -1 set the framesMax of background by 0 remooving this one out of the play, and set the shop 0 too, to start on first frame
                this.framesCurrent++
            }else {
                this.framesCurrent = 0
            }
        }
    }

    update(){ //update the coordinates 
        this.draw()
        this.animateFrames()
    }
}


class Fighter extends Sprite { //champions creator, style and frames update
    constructor({position, velocity, color /*= 'red'*/, imageSrc, scale = 1, framesHold = 1, framesMax = 1, offset = {x:0, y:0}, sprites, attackBox = {offset: {}, width: undefined, height: undefined}}){ //transform the parameter in object {}, now dosent mether the order bcs it is all a sigle thing
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
            framesHold
        })
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastkey
        this.attackBox = {
        position: {
            x: this.position.x,
            y: this.position.y
        },
        offset: attackBox.offset, //it is iqual "offset: offset"
        width: attackBox.width,
        height: attackBox.height,
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        // this. = 5 // velocity of animation
        this.sprites = sprites
        this.dead = false

        for (const sprite in this.sprites) {
            sprites [sprite].image = new Image()
            sprites [sprite].image.src =  sprites [sprite].imageSrc
        }
    }

    // draw(){ //sizes and style of champion
    //     c.fillStyle = this.color
    //     c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
    //     //attackBox draw
    //     if (this.isAttacking) { //now the draw of attackBox just work when the isAttacking is activate (true)
    //         c.fillStyle = this.Color //why fillStyle is working? Is the second time I'm using it here
    //         c.fillRect(
    //             this.attackBox.position.x, 
    //             this.attackBox.position.y, 
    //             this.attackBox.width, 
    //             this.attackBox.height
    //         )
    //     }

    // }

    update(){ //update the coordinates 
        this.draw()
        if (!this.dead) this.animateFrames() // if dead is not true call the animations
        


        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        
        // c.fillRect( // show the attack box
        //     this.attackBox.position.x, 
        //     this.attackBox.position.y, 
        //     this.attackBox.width, 
        //     this.attackBox.height)

        this.position.x += this.velocity.x        
        this.position.y += this.velocity.y

        // gravity function
        if(this.position.y + this.height + this.velocity.y  >= canvas.height - 66){ //feets on the floor (-66 floor of background)
            this.velocity.y = 0
            this.position.y = 360 // flow
        }else this.velocity.y += gravity //?idk well how this work?

        
    }

    attack(){ //when this func is called the isAttacking return true
        this.switchSprite('attack1')
        this.isAttacking = true
        // setTimeout(() => { //after 100ms it is called // now at index.js "if player misses"
        //     this.isAttacking = false
        // }, 1000); //100 ms
    }

    takeHit(){
        this.health -= 20 // one hit is 20 of dmg

        if (this.health <= 0) {
            this.switchSprite('death')
        }else this.switchSprite('takeHit')
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.death.image) {
            if (this.framesCurrent === this.sprites.death.framesMax - 1) this.dead = true
            return}

        // overriding all other animations with the attack animation
        if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax -1) return
            
        // override when fighter gets hit
        if(this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.framesMax -1) return

        switch (sprite ) {
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                this.image = this.sprites.idle.image
                this.framesMax = this.sprites.idle.framesMax
                this.framesCurrent = 0
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image){
                this.image = this.sprites.run.image
                this.framesMax = this.sprites.run.framesMax
                this.framesCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image){
                this.image = this.sprites.jump.image
                this.framesMax = this.sprites.jump.framesMax
                this.framesCurrent = 0
                }
                break
            case 'fall':
                if (this.image !== this.sprites.fall.image){
                this.image = this.sprites.fall.image
                this.framesMax = this.sprites.fall.framesMax
                this.framesCurrent = 0
                }
                break
            case 'attack1':
                if (this.image !== this.sprites.attack1.image){
                this.image = this.sprites.attack1.image
                this.framesMax = this.sprites.attack1.framesMax
                this.framesCurrent = 0
                }
                break
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image){
                this.image = this.sprites.takeHit.image
                this.framesMax = this.sprites.takeHit.framesMax
                this.framesCurrent = 0
                }
                break
            case 'death':
                if (this.image !== this.sprites.death.image){
                this.image = this.sprites.death.image
                this.framesMax = this.sprites.death.framesMax
                this.framesCurrent = 0
                }
                break
        }
    }
}

