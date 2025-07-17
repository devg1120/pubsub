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
