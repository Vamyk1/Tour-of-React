export default class MessageService {
  messages = [];

  add(message) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
