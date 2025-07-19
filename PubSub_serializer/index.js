import { PubSub } from './pubsub-js/index.js';

let pubsub = new PubSub();


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

//==========================================================

import ESSerializer  from './esserializer-js/index.js';

class Parent {
    constructor(id ,name, age, bday) {
	    this.id   = id;
	    this.name = name;
	    this.age  = age;
	    this.bday = bday;
	    this.childs = [];
    }
    getId(){return this.id;}
    getName(){return this.name;}
    getAge(){return this.age;}
    getBday(){return this.bday;}
    pushChild(child){this.childs.push(child);}
    getChild(){return this.childs;}
}

class Child {
    constructor(id ,name, age, bday) {
	    this.id   = id;
	    this.name = name;
	    this.age  = age;
	    this.bday = bday;
    }
    getId(){return this.id;}
    getName(){return this.name;}
    getAge(){return this.age;}
    getBday(){return this.bday;}
}

ESSerializer.registerClasses([Parent, Child ]);



function get_input_value(id) {
  var ele = document.querySelector(id);
  return ele.value
}

function set_input_value(id, value) {
  var ele = document.querySelector(id);
  ele.value = value;
}

pubsub.subscribe('class:message', args => {
    let inst = ESSerializer.deserialize(args);
    console.log("subscribe", inst)
    set_input_value("#np-id"  , inst.getId());
    set_input_value("#np-name", inst.getName());
    set_input_value("#np-age" , inst.getAge());
    set_input_value("#np-bday", inst.getBday());
    let childs = inst.getChild();
	
    for (let i = 0 ;i < childs.length; i++) {
	    let id = parseInt(childs[i].getId());
            set_input_value(`#nc-${id}-id`  , childs[i].getId());
            set_input_value(`#nc-${id}-name`, childs[i].getName());
            set_input_value(`#nc-${id}-age` , childs[i].getAge());
            set_input_value(`#nc-${id}-bday`, childs[i].getBday());
    }
    
});

var submit = document.querySelector('#submit');

submit.addEventListener('click', function(event) {
    console.log("submit");
    let p_id   = get_input_value("#p-id");
    let p_name = get_input_value("#p-name");
    let p_age  = get_input_value("#p-age");
    let p_bday = get_input_value("#p-bday");
    let parent = new Parent( p_id, p_name, p_age, p_bday);
    let childs  = document.querySelectorAll('.child');
    for ( let i = 1; i <= childs.length; i++) {
     let c_id   = get_input_value(`#c-${i}-id`);
     let c_name = get_input_value(`#c-${i}-name`);
     let c_age  = get_input_value(`#c-${i}-age`);
     let c_bday = get_input_value(`#c-${i}-bday`);
     let child = new Child( c_id, c_name, c_age, c_bday);
     parent.pushChild(child);
    }
    console.dir(parent);
    let str = ESSerializer.serialize(parent);
    console.log(str)
    pubsub.publish('class:message', str);
    //let inst = ESSerializer.deserialize(str);
    //console.log(inst)

});

//let i = 1;
//set_input_value(`#c-${i}-id`, "0001");

set_input_value("#p-id"  , "9999");
set_input_value("#p-name", "xyz");
set_input_value("#p-age" , 100);
set_input_value("#p-bday", "1960/11/20");

let names = [ "ABC", "DEF", "GHI"];
let ages  = [ 23, 45, 60];
let bdays = [ "2022/11/20", "1989/03/23", "2017/10/03"]



let childs  = document.querySelectorAll('.child');
for ( let i = 1; i <= childs.length; i++) {
    let id  = i.toString().padStart(4,'0')
    set_input_value(`#c-${i}-id`  , `${id}`);
    set_input_value(`#c-${i}-name`, names[ i-1]);
    set_input_value(`#c-${i}-age` , ages[ i-1]);
    set_input_value(`#c-${i}-bday`, bdays[ i-1]);
}
