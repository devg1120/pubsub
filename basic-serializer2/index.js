import { Pubsub } from './pubsub.js';

let pubsub = new Pubsub();


document.getElementById('message-input').addEventListener('input', ev => {
  pubsub.publish('input:message', ev.target.value);
});

pubsub.subscribe('input:message', args => {
  const target = document.getElementById('reactive-message');
  target.innerHTML = args;
});


document.getElementById('message-input2').addEventListener('input', ev => {
  pubsub.publish('input:message', ev.target.value);
});

pubsub.subscribe('input:message', args => {
  const target = document.getElementById('reactive-message2');
  target.innerHTML = args;
});

//==============================================================
/*
//------------------------------------------
class Serializer{
    constructor(types){this.types = types;}
    serialize(object) {
        let idx = this.types.findIndex((e)=> {return e.name == object.constructor.name});
        if (idx == -1) throw "type  '" + object.constructor.name + "' not initialized";
        return JSON.stringify([idx, Object.entries(object)]);
    }
    deserialize(jstring) {
        let array = JSON.parse(jstring);
        let object = new this.types[array[0]]();
        array[1].map(e=>{object[e[0]] = e[1];});
        return object;
    }
}

class MyClass {
    constructor(foo) {this.foo = foo;}
    getFoo(){return this.foo;}
    setFoo(data){this.foo = data;}
}

class AdClass {
    constructor(foo) {this.ad = foo;}
    getAd(){return this.ad;}
    setAd(data){this.ad = data;}
}

var serializer = new Serializer([MyClass, AdClass]);

//-------------------------------------------------------------
var str = serializer.serialize(new MyClass(42));
console.log("str", str);
//[0,[["foo",42]]]

let inst = serializer.deserialize(str);
var ans = inst.getFoo();
console.log("ans", ans);
//42

inst.setFoo(99999);
ans = inst.getFoo();
console.log("ans", ans);
//99999

//-------------------------------------------------------------
let ad = new AdClass("Ad")
var str = serializer.serialize(ad);
console.log("str", str);

inst = serializer.deserialize(str);
ans = inst.getAd();
console.log("ans", ans);

inst.setAd("XXXX+");
ans = inst.getAd();
console.log("ans", ans);
//99999
*/
//==============================================================  esserializer/
//https://github.com/shaochuancs/esserializer
//
//import ESSerializer  from './esserializer-ts/dist/index.js';
import ESSerializer  from './esserializer-js/index.js';

class MyClass {
    constructor(foo) {
	    this.foo = foo;
            this.date = new Date(1999, 11, 31, 23, 59, 59, 999);
    }
    getFoo(){return this.foo;}
    setFoo(data){this.foo = data;}
    getDate() { return this.date; }
}

class AdClass {
    constructor(foo) {this.ad = foo;}
    getAd(){return this.ad;}
    setAd(data){this.ad = data;}
    setChild(c) { this.child = c;}
    getChild() { return this.child ;}
}

class ChildClass {
    constructor(foo) {this.ad = foo;}
    getCd(){return this.ad;}
    setCd(data){this.ad = data;}
}

ESSerializer.registerClasses([MyClass, AdClass, ChildClass]);

//-------------------------------------------------------------
console.log("------------------------------");
var str = ESSerializer.serialize(new MyClass(42));
console.log("str", str);
//[0,[["foo",42]]]

let inst = ESSerializer.deserialize(str);
var ans = inst.getFoo();
console.log("ans", ans);
//42

inst.setFoo(99999);
ans = inst.getFoo();
console.log("ans", ans);
//99999
console.log("date", inst.getDate().toString())
//-------------------------------------------------------------
console.log("------------------------------");
let ad = new AdClass("Ad")
let child = new ChildClass("Child++")
ad.setChild(child);

var str = ESSerializer.serialize(ad);
console.log("str", str);

inst = ESSerializer.deserialize(str);
ans = inst.getAd();
console.log("ans", ans);

inst.setAd("XXXX+");
ans = inst.getAd();
console.log("ans", ans);
//99999
let child_ = inst.getChild();
ans = child_.getCd();
console.log("child ans", ans);

