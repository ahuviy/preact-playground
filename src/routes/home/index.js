import { h, Component } from 'preact';
import style from './style';
import * as dataService from '../../services/data.service';
import * as busy from '../../services/busy-indicator.service';

export default class Home extends Component {
	state = {
		clients: [
			{ firstName: 'ahuvi', lastName: 'yearim', id: 'ahuvi' },
			{ firstName: 'nir', lastName: 'krevner', id: 'nir' },
		]
	};
	subs = [];

	componentWillMount() {
		this.subs.push(busy.processes$.subscribe(counter => {
			console.log('counter:', counter);
		}));
	}

	componentWillUnmount() {
		console.log('unsubscribe');
        this.subs.forEach(s => s.unsubscribe());
    }

	edit(e, client) {
		console.log('editing', e, client);
		busy.increase();
	}

	delete(e, client) {
		console.log('deleting', e, client);
		busy.decrease();
	}

	add(e) {
		console.log('adding', e);
		dataService.clients.get().then(res => {
			console.log('lss:', res);
		});
	}

	render(props, { clients }) {
		return (
			<div class={style.home}>
				<div class="row">
					<div class="col-xs-6">
						<h3 class="title">Our clients</h3>
						{clients.map(client =>
							<div class="client-wrapper" key={client.id}>
								<div class={style.clientName}>
									{client.lastName}, {client.firstName}
								</div>
								<button class="btn btn-default" onClick={(e) => this.edit(e, client)}>
									Edit
								</button>
								<button class="btn btn-danger" onClick={(e) => this.delete(e, client)}>
									Delete
								</button>
								<a class="btn btn-default">View orders</a>
							</div>
						)}
						<button class="btn btn-primary" onClick={this.add}>Add client</button>
					</div>
				</div>
			</div>
		);
	}
}
