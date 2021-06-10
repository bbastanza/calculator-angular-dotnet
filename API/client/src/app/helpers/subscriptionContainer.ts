import { Subscription } from 'rxjs';

export class SubscriptionContainer {
  private subscriptions: Subscription[] = [];

  set add(s: Subscription) {
    this.subscriptions.push(s);
  }

  unsubsribe() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
