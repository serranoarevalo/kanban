import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import AltContainer from 'alt-container';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';
import Lanes from './Lanes.jsx'

export default class App extends React.Component{
	constructor(props) {
		super(props);

		this.state = NoteStore.getState();
	}
	componentDidMount() {
	    NoteStore.listen(this.storeChanged);  
	}
	componentWillMount(){
		NoteStore.unlisten(this.storeChanged);
	}
	storeChanged = (state) => {
		this.setState(state);
	}
	render() {
		const notes = this.state.notes;
		return (
			<div>
				<button className="add-note" onClick={this.addNote}>+</button>
				<AltContainer
					stores={[NoteStore]}
					inject={{
						items: () => NoteStore.getState().notes
					}}
				>
				<Lanes />
				</AltContainer>
			</div>
		);
	}
	addItem(){
		LaneActions.create({name: 'New lane'});
	}
	addNote() {
		NoteActions.create({task: 'New task'});
	}
	editNote(id, task) {
		NoteActions.update({id, task});
	}
	deleteNote(id) {
		NoteActions.delete(id);
	}
}