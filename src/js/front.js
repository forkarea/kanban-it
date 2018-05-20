const kanbanItemsToArray = () => {
	const kanbanItemsArray = [];
	const allKanbanitems = document.querySelectorAll('.single-kanban-item');
	for (let i = 0; i < allKanbanitems.length; i++) {
		kanbanItemsArray.push(allKanbanitems[i].getAttribute('id'));
	}
	sessionStorage.setItem('kanbanItemsArray', kanbanItemsArray);
}

const updateNodes = () => {
	const getParentId = (el) => {
		const parentId = $(el).parent().parent().parent().attr('id');
		return parentId;
	}

	const updateInputs = parentId => {
		$('#' + parentId + ' input').val($('#' + parentId + ' .title')[0].innerText);
		$('#' + parentId + ' textarea').val($('#' + parentId + ' .content')[0].textContent);
	}

	const removeItemButtons = document.querySelectorAll('.remove-item');
	for (i = 0; i < removeItemButtons.length; i++) {
		const parentId = getParentId(removeItemButtons[i]);
		const parentNode = document.getElementById(parentId);
		removeItemButtons[i].addEventListener('click', () => {
			parentNode.remove();
			const storageKeyName = 'simpleKanban-' + parentId.replace('item-', '');
			sessionStorage.removeItem(storageKeyName);
		});
		kanbanItemsToArray();
	}

	const editItemButtons = document.querySelectorAll('.edit-item');
	for (i = 0; i < editItemButtons.length; i++) {
		const parentId = getParentId((editItemButtons[i]));
		editItemButtons[i].addEventListener('click', () => {
			$('#' + parentId + ' .visible-layer').hide();
			$('#' + parentId + ' .hidden-layer').show();
			updateInputs(parentId);
		});
	}

	const cancelItemButtons = document.querySelectorAll('.btn-cancel');
	for (i = 0; i < cancelItemButtons.length; i++) {
		const parentId = getParentId((cancelItemButtons[i]));
		cancelItemButtons[i].addEventListener('click', () => {
			$('#' + parentId + ' .visible-layer').show();
			$('#' + parentId + ' .hidden-layer').hide();
			updateInputs(parentId);
		});
	}

	const saveItemButtons = document.querySelectorAll('.btn-save');
	for (i = 0; i < saveItemButtons.length; i++) {
		const parentId = getParentId((saveItemButtons[i]));
		saveItemButtons[i].addEventListener('click', () => {
			$('#' + parentId + ' .visible-layer').show();
			$('#' + parentId + ' .hidden-layer').hide();
			$('#' + parentId + ' .title')[0].innerText = $('#' + parentId + ' input').val();
			$('#' + parentId + ' .content')[0].textContent = $('#' + parentId + ' textarea').val();
			const storageKeyName = 'simpleKanban-' + parentId.replace('item-', '');
			const storagedKanbanItem = JSON.parse(sessionStorage.getItem(storageKeyName));
			const itemToStorage = new newKanbanItem(
				parentId.replace('item-', ''),
				$('#' + parentId + ' input').val(),
				$('#' + parentId + ' textarea').val(),
				storagedKanbanItem.color,
				storagedKanbanItem.state
			);
			sessionStorage.setItem(storageKeyName, JSON.stringify(itemToStorage));
		});
	}
	const colorItemButtons = document.querySelectorAll('.single-color');
	for (i = 0; i < colorItemButtons.length; i++) {
		const thisElement = $(colorItemButtons[i]);
		const parentId = getParentId(colorItemButtons[i]);
		const itemColor = colorItemButtons[i].getAttribute('data-color');
		colorItemButtons[i].addEventListener('click', () => {
			$('#' + parentId).css({
				'background': itemColor
			});
			$('#' + parentId + ' .single-color').removeClass('active');
			$(thisElement).addClass('active');
			const storageKeyName = 'simpleKanban-' + parentId.replace('item-', '');
			const storagedKanbanItem = JSON.parse(sessionStorage.getItem(storageKeyName))
			const itemToStorage = new newKanbanItem(
				parentId.replace('item-', ''),
				storagedKanbanItem.title,
				storagedKanbanItem.content,
				itemColor,
				storagedKanbanItem.state,
			);
			sessionStorage.setItem(storageKeyName, JSON.stringify(itemToStorage));
		});
	}
}

$(document).ready(() => {
	$('.single-kanban-items-container').sortable({
		connectWith: '.single-kanban-items-container',
		update: function (e, ui) {
			const draggedItem = ui.item[0];
			const draggedItemParent = $(draggedItem).parent().parent();
			let itemNewState;
			if (draggedItemParent[0].id === 'todo') {
				itemNewState = 'todo';
			} else if (draggedItemParent[0].id === 'progress') {
				itemNewState = 'progress';
			} else {
				itemNewState = 'done';
			}
			const parentId = ui.item[0].id;
			const storageKeyName = 'simpleKanban-' + parentId.replace('item-', '');
			const storagedKanbanItem = JSON.parse(sessionStorage.getItem(storageKeyName));
			const itemToStorage = new newKanbanItem(
				Number(parentId.replace('item-', '')),
				storagedKanbanItem.title,
				storagedKanbanItem.content,
				storagedKanbanItem.color,
				itemNewState
			);
			sessionStorage.setItem(storageKeyName, JSON.stringify(itemToStorage));
			kanbanItemsToArray();
		}
	}).disableSelection();
	if (sessionStorage.length > 0) {
		const kanbanItemsStorage = sessionStorage.getItem('kanbanItemsArray');
		const kanbanItemsArray = kanbanItemsStorage.split(',');
		for (let i = 0; i < kanbanItemsArray.length; i++) {
			const kanbanItemId = kanbanItemsArray[i].replace('item-', '');
			const storageKeyName = 'simpleKanban-' + kanbanItemId;
			const storagedKanbanItem = JSON.parse(sessionStorage.getItem(storageKeyName));
			const newItem = new newKanbanItem(
				storagedKanbanItem.id,
				storagedKanbanItem.title,
				storagedKanbanItem.content,
				storagedKanbanItem.color,
				storagedKanbanItem.state
			);
			$('#' + newItem.state + ' .single-kanban-items-container').append(newItem.addNewItem);
		}
	} else {
		const newItem = new newKanbanItem(
			0,
			'type here your title',
			'type here your task description',
			'#fcfcfc',
			'todo'
		);
		$('#todo .single-kanban-items-container').append(newItem.addNewItem);
	}
	updateNodes();
});

$('.add-new-item-btn').click(() => {
	const newItemId = document.querySelectorAll('.single-kanban-item').length;
	const newItem = new newKanbanItem(
		newItemId,
		'type here your title',
		'type here your task description',
		'#fcfcfc',
		'todo'
	);
	$('#todo .single-kanban-items-container').append(newItem.addNewItem);
	updateNodes();
	kanbanItemsToArray();
});
