import React from 'react';
import ItemTypes from '../constants/ItemTypes';
import {DragSource, DropTarget} from 'react-dnd';

const noteSource = {
	beginDrag(props) {
		return {
			id: props.id
		}
	}
}

const noteTarget = {
	hover(targetProps, monitor) {
		const targetId = targetProps.id;
		const sourceProps = monitor.getItem();
		const sourceId = sourceProps.id;
		
		if(sourceId !== targetId) {
			targetProps.onMove({sourceId, targetId});
		}
	}
};

@DragSource(ItemTypes.NOTE, noteSource, (connect) => ({
	connectDragSource: connect.dragSource(),
	isDraggin: monitor.isDraggin()
}))
@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
	connectDropTarget: connect.dropTarget()
}))
export default class Note extends React.Component {
	render() {
		const {connectDragSource, connectDropTarget, id, onMove, ...props} = this.props;
		return connectDragSource(connectDropTarget(
			<li {...this.props}>{this.props.children}</li>
		));
	}
}