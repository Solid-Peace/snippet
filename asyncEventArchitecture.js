import axios from 'axios'
import EventEmitter from 'events'


class MyEmitter extends EventEmitter {
    constructor(){
        super()
        this.process = {}
        this.process.test1 = false
        this.process.test2 = false
    }
}

// MyEmitter.process.test1 = false
// MyEmitter.process.test2 = false

const myEmitter = new MyEmitter()


myEmitter.on('launch', function(){
    console.log(`test 1 == ${this.process.test1} \n test 2 == ${this.process.test2} \n system is launching`)
})

myEmitter.on('pending', function(){
    (this.process.test1 == true && this.process.test2 == true) ?
        (() => { 
            console.log('ressources loading 2/2') 
            this.emit('launch') 
        })()
        :
        console.log('ressources loading 1/2') 
})

myEmitter.test1 = function() {
    setTimeout(function(){
        myEmitter.process.test1 = true
        myEmitter.emit('pending')
    }, 2000)
}


myEmitter.test2 = function() {
    setTimeout(function(){
        myEmitter.process.test2 = true
        myEmitter.emit('pending')
    }, 5000)
}


myEmitter.test1()
myEmitter.test2()
