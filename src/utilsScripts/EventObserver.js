class EventObserver {
	constructor() {
		this._subscribersStore = {}
		this._subscribers = []
	}

	subscribe(cb, key) {
		const subscribers = key ? this._subscribersStore[key] : this._subscribers
		if (!subscribers && key) {
			this._subscribersStore[key] = [cb]

			return
		}

		if (Array.isArray(cb)) {
			key ? (this._subscribersStore[key] = [...subscribers, ...cb]) : (this._subscribers = [...subscribers, ...cb])

			return
		}

		key ? (this._subscribersStore[key] = [...subscribers, cb]) : (this._subscribers = [...subscribers, cb])
	}

	unsubcribe(cb, key) {
		const subscribers = key ? this._subscribersStore[key] : this._subscribers
		if (!subscribers || !subscribers.length) {
			return
		}

		const filteredSubscribers = subscribers.filter((subscriber) =>
			Array.isArray(cb) ? !cb.includes(subscriber) : subscriber !== cb
		)

		if (!filteredSubscribers.length && key) {
			delete this._subscribersStore[key]

			return
		}

		key ? (this._subscribersStore[key] = filteredSubscribers) : (this._subscribers = filteredSubscribers)
	}

	broadcast(key, context) {
		const subscribers = key ? this._subscribersStore[key] : this._subscribers
		if (!subscribers) {
			throw new Error('Observer subscribers not found!')
		}

		subscribers.forEach((subscriber) => (context ? subscriber.apply(context) : subscriber()))
	}
}

export default EventObserver
