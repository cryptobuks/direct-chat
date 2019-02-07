import { observable, action } from 'mobx';
import api from 'utils/api';

class NotificationStore {
  @observable notifications = [];
  @observable loading = true;

  async fetchNotifications() {
    this.loading = true;
    const json = await api.fetchNotifications();
    json.forEach(action(notification => this.notifications.push(notification)));
    this.loading = false;
  }

  async sendFriendRequest(contact) {
    console.log('sendFriendRequest:' + contact.email);
    await api.sendFriendRequest(contact.email);
  }
}

const notificationStore = new NotificationStore();

export default notificationStore;
