import socketIOClient from 'socket.io-client';

// the socket should have its own connection 
const socket = socketIOClient('localhost:4001'); // TODO: can be also: socket.connect('localhost:4001');


export default {
  // in map (user)👇🏻
  sendUserTransaction, 
}

// TODO: should be in Map, onclick of the Buttons in the popup:
function sendUserTransaction (data) {
  socket.emit('user-ask-transaction', "data");
  const str = 'Saying hi from getNewTransaction -> actions.transaction -> transactionClickHandler onClick -> sendUserTransaction'
  return Promise.resolve(str);
}
